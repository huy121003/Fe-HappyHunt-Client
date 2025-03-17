import { IPostItem } from "@/features/posts/data/interface";
import { Button, Card, Flex, Image, Typography } from "antd";
import React from "react";
import TimeAgo from "../TimeAgo";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { API_KEY } from "@/features/posts/data/constant";
import { CTruncateWithDots } from "../CTruncateWithNewLine";

interface IProps {
  record: IPostItem;
}

const PortCard1: React.FC<IProps> = ({ record }) => {
  const client = useQueryClient();
  const navigate = useNavigate();
  return (
    <Card
      className="bg-white  shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer  relative"
      onClick={() => {
        window.scrollTo(0, 0);
        navigate(`/detail-post/${record.slug}`);
        client.invalidateQueries({ queryKey: [API_KEY.POST_DETAIL] });
      }}
    >
      {/* Hình ảnh */}
      <div className="overflow-hidden rounded-lg relative">
        <Image
          src={record.images[0]}
          width={220}
          height={160}
          className="rounded-lg object-cover transition-transform duration-300 hover:scale-105"
          preview={false}
        />
      </div>

      {/* Nội dung */}
      <div className="mt-3 space-y-2">
        <Typography.Title level={5}>
          <CTruncateWithDots text={record.name} />
        </Typography.Title>
        <Typography.Title level={5} style={{ color: "#ff4d4f" }}>
          {record.price.toLocaleString()} VND
        </Typography.Title>

        {/* Địa chỉ và thời gian */}
        <Flex justify="space-between" align="center" className="mt-2">
          <Flex vertical>
            <Typography.Text className="text-gray-600">
              {record.address.province.name}
            </Typography.Text>
            <Typography.Text className="text-gray-400 text-sm">
              <TimeAgo date={record.createdAt} />
            </Typography.Text>
          </Flex>

          {/* Nút xem chi tiết */}
          <Button
            icon={<i className="fas fa-eye text-gray-500"></i>}
            type="text"
            className="hover:bg-gray-100 p-2 rounded-md transition"
          />
        </Flex>
      </div>
    </Card>
  );
};

export default PortCard1;
