import React from "react";
import { Table, Typography, Flex } from "antd";
import { TagsOutlined } from "@ant-design/icons";

interface IProps {
  attributes?: {
    name: string;
    value: string;
  }[];
}

const Attribute: React.FC<IProps> = ({ attributes = [] }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (value: string) => (
        <p className="flex items-center gap-2">
          <i className="fas fa-check-circle text-orange-500"></i>
          <span className="font-medium text-gray-700">{value}</span>
        </p>
      ),
      width: "30%",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value: string) => <span className="text-gray-600">{value}</span>,
    },
  ];

  return (
    <Flex
      vertical
      className="bg-white rounded-xl shadow-sm flex-1 my-4 p-6 border-t-2 border-t-orange-500"
    >
      <Flex align="center" gap={2} className="mb-4">
        <TagsOutlined className="text-2xl text-orange-500" />
        <Typography.Title level={5} className="m-0 text-gray-700">
          Attributes
        </Typography.Title>
      </Flex>
      <Table
        columns={columns}
        dataSource={
          attributes.map((item, index) => ({ ...item, key: index })) || []
        }
        pagination={false}
        bordered
        className="rounded-lg overflow-hidden"
      />
    </Flex>
  );
};

export default Attribute;
