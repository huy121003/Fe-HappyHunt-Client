import { Flex, Typography } from "antd";
import React from "react";
import { FileTextOutlined } from "@ant-design/icons";

interface IProps {
  description: string;
}

const Description: React.FC<IProps> = ({ description }) => {
  return (
    <Flex
      vertical
      className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 gap-4 border-t-2 border-t-orange-500"
    >
      <Flex align="center" gap={2}>
        <FileTextOutlined className="text-2xl text-orange-500" />
        <Typography.Title level={5} className="m-0 text-gray-700">
          Description
        </Typography.Title>
      </Flex>
      <Typography.Paragraph
        style={{ whiteSpace: "pre-wrap" }}
        className="text-gray-600 leading-relaxed text-base"
      >
        {description}
      </Typography.Paragraph>
    </Flex>
  );
};

export default Description;
