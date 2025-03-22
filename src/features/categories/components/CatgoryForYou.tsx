import { useQuery } from "@tanstack/react-query";
import { API_KEY } from "../data/constants";
import CategoryService from "../service";
import { Card, Flex, Image, Typography, Spin, theme } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import ScrollableContainer from "@/components/scroll/ScrollableContainer";

const { Text } = Typography;
const { useToken } = theme;

function CatgoryForYou() {
  const { token } = useToken();

  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.GET_CATEGORY_PARENT],
    queryFn: async () => {
      const response = await CategoryService.getParent();
      return response.data.documentList;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full min-h-[300px] flex items-center justify-center m-2">
        <Spin size="large" className="scale-125" />
      </div>
    );
  }

  return (
    <Card
      className="m-4 shadow-sm border-0 overflow-hidden bg-white rounded-xl border-t-2 border-t-orange-500"
      bodyStyle={{ padding: 0 }}
    >
      <div className="p-6">
        {/* Header */}
        <Flex justify="space-between" align="center" className="mb-6">
          <Flex align="center" gap={2} justify="center">
            <Typography.Title
              level={4}
              className="m-0 text-gray-800 font-semibold"
            >
              <AppstoreOutlined className="text-2xl text-orange-500" />
              Categories you might be interested in
            </Typography.Title>
          </Flex>
        </Flex>

        {/* Categories List */}
        <ScrollableContainer gap={50}>
          {data?.map((item) => (
            <div
              key={item._id}
              className="group cursor-pointer w-[130px] transition-transform duration-300 hover:-translate-y-1 flex-shrink-0"
            >
              {/* Image Container */}
              <div className="relative mb-3 rounded-lg overflow-hidden">
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={130}
                  height={130}
                  preview={false}
                  className="object-cover"
                  style={{
                    borderRadius: token.borderRadiusLG,
                  }}
                  rootClassName="
                    transition-all duration-300
                    hover:shadow-[0_0_0_2px] hover:shadow-[#ff6b00]
                    group-hover:scale-105
                  "
                />
              </div>

              {/* Category Name */}
              <Text
                className="
                  block text-center
                  transition-colors duration-300
                  group-hover:text-[#ff6b00]
                  font-medium
                "
              >
                {item.name}
              </Text>
            </div>
          ))}
        </ScrollableContainer>
      </div>
    </Card>
  );
}

export default CatgoryForYou;
