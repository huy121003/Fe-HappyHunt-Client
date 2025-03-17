import { Card, Typography } from "antd";
import React from "react";

interface IProps {
  description: string;
}

const Description: React.FC<IProps> = ({ description }) => {
  return (
    <Card className="p-4 bg-gray-50 rounded-2xl shadow-lg gap-6 border border-gray-300">
      <Typography.Title level={5} className="mb-2 text-gray-700">
        Description
      </Typography.Title>
      <Typography.Paragraph
        style={{ whiteSpace: "pre-wrap" }}
        className="text-gray-600"
      >
        {description}
      </Typography.Paragraph>
    </Card>
  );
};

export default Description;
