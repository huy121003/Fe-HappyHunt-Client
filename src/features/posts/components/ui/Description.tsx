import { Flex, Typography } from "antd";
import React from "react";

interface IProps {
  description: string;
}

const Description: React.FC<IProps> = ({ description }) => {
  return (
    <Flex
      vertical
      className="p-4 bg-white rounded-lg shadow-sm gap-6  border-t-2 border-t-flame-orange"
    >
      <Typography.Title level={5} className="mb-2 text-gray-700">
        Description
      </Typography.Title>
      <Typography.Paragraph
        style={{ whiteSpace: "pre-wrap" }}
        className="text-gray-600"
      >
        {description}
      </Typography.Paragraph>
    </Flex>
  );
};

export default Description;
