import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { API_KEY } from "../../data/constant";
import HistoryClickService from "../../service";
import { Flex, Spin, Typography } from "antd";
interface CountClickBarChartProps {
  postId: number;
  totalClick: number;
}
function CountClickBarChart({ postId, totalClick }: CountClickBarChartProps) {
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.GET_HISTORY_CLICK_COUNT, postId],
    queryFn: async () => {
      const res = await HistoryClickService.getHistoryClickCount(postId);
      return res.data;
    },
  });
  return (
    <>
      <Spin spinning={isLoading}>
        {data && data?.length > 0 && (
          <Flex vertical gap={10}>
            <Typography.Text>Total click: {totalClick || 0}</Typography.Text>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#fa4903"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Flex>
        )}
      </Spin>
    </>
  );
}

export default CountClickBarChart;
