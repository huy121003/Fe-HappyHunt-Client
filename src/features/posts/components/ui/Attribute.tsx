import React from "react";
import { Table, Typography, Flex, Tag } from "antd";
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
        <div className="flex items-center gap-2 group">
          <div className="w-2 h-2 rounded-full bg-orange-500 group-hover:scale-125 transition-transform"></div>
          <span className="font-medium text-gray-700 group-hover:text-orange-500 transition-colors">
            {value}
          </span>
        </div>
      ),
      width: "30%",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value: string) => (
        <Tag
          color="orange"
          className="text-gray-600 border-0 bg-orange-50 hover:bg-orange-100 transition-colors"
        >
          {value}
        </Tag>
      ),
    },
  ];

  return (
    <Flex
      vertical
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 my-4 p-6 border-t-2 border-t-orange-500"
    >
      <Flex align="center" gap={2} className="mb-4">
        <TagsOutlined className="text-2xl text-orange-500" />
        <Typography.Title level={5} className="m-0 text-gray-700">
          Attributes
        </Typography.Title>
      </Flex>
      <Table
        columns={columns}
        dataSource={attributes.map((item, index) => ({ ...item, key: index }))}
        pagination={false}
        bordered={false}
        className="rounded-lg overflow-hidden"
        rowClassName="hover:bg-orange-50/50 transition-colors"
      />
    </Flex>
  );
};

export default Attribute;
