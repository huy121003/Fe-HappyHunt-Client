import React from "react";
import { Table, Typography, Flex } from "antd";

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
        <p>
          <i className="fas fa-check-circle text-green-500 mr-2"></i>
          {value}
        </p>
      ),
      width: "30%",
    },

    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  return (
    <Flex
      vertical
      className=" bg-white rounded-lg shadow-sm flex-1 my-4 p-4  border-t-2 border-t-flame-orange"
    >
      <Typography.Title level={5} className="p-4 text-gray-700">
        Attribute
      </Typography.Title>
      <Table
        columns={columns}
        dataSource={
          attributes.map((item, index) => ({ ...item, key: index })) || []
        }
        pagination={false}
        bordered
      />
    </Flex>
  );
};

export default Attribute;
