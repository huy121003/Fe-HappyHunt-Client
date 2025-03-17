import { Card, Col, Row, Typography } from "antd";
import React from "react";
interface IProps {
  attributes: {
    name: string;
    value: string;
  }[];
}
const Attribute: React.FC<IProps> = ({ attributes }) => {
  return (
    <>
      <Card className="p-4 bg-gray-50 rounded-2xl shadow-lg gap-6 border border-gray-300">
        <Typography.Title level={5}>Attributes</Typography.Title>
        <Row gutter={[16, 16]}>
          {attributes.map((attribute, index) => (
            <Col key={index} span={12}>
              <Typography.Text>
                <i className="fas fa-check-circle text-flame-orange mr-2"></i>
                {attribute.name}: {attribute.value}
              </Typography.Text>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
};

export default Attribute;
