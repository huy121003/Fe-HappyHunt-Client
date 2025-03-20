import CInput from "@/components/CInput";
import CSelect from "@/components/CSelect";
import { API_KEY, Type } from "@/features/categories/data/constants";
import CategoryService from "@/features/categories/service";
import { useQuery } from "@tanstack/react-query";
import { Col, Form, FormInstance, Radio, Row, Spin } from "antd";

import React, { useState } from "react";

interface AttributeFormProps {
  categoryId: string;
  form: FormInstance;
  attributes?: {
    name: string;
    value: string | number | boolean;
  }[];
}

const AttributeForm: React.FC<AttributeFormProps> = ({ categoryId }) => {
  const [type, setType] = useState<Type[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.GET_CATEGORY_BY_ID, categoryId],
    queryFn: async () => {
      if (!categoryId) return;
      if (categoryId.includes("-")) {
        categoryId = categoryId.split("-")[1];
      }
      const response = await CategoryService.getbyId(Number(categoryId));
      setType(response.data.attributes.map((attribute: any) => attribute.type));
      return response.data.attributes;
    },
  });

  // Nhóm dữ liệu theo type
  const groupedAttributes: {
    select: { attribute: any; index: number }[];
    radio: { attribute: any; index: number }[];
    boolean: { attribute: any; index: number }[];
    number: { attribute: any; index: number }[];
    text: { attribute: any; index: number }[];
  } = {
    select: [],
    radio: [],
    boolean: [],
    number: [],
    text: [],
  };

  data?.forEach((attribute: any, index: number) => {
    const attributeType = type[index];

    if (attributeType === Type.SELECT || attributeType === Type.YEAR) {
      groupedAttributes.select.push({ attribute, index });
    } else if (attributeType === Type.RADIO) {
      groupedAttributes.radio.push({ attribute, index });
    } else if (attributeType === Type.BOOLEAN) {
      groupedAttributes.boolean.push({ attribute, index });
    } else if (attributeType === Type.NUMBER) {
      groupedAttributes.number.push({ attribute, index });
    } else {
      groupedAttributes.text.push({ attribute, index });
    }
  });

  const renderFormItems = (group: { attribute: any; index: number }[]) => {
    if (group.length === 0) return null;

    return (
      <>
        <Row gutter={[16, 16]}>
          {group.map(({ attribute, index }) => (
            <Col span={12} key={index}>
              <Form.Item
                hidden
                name={[index, "name"]}
                initialValue={attribute.name}
              >
                <CInput hidden />
              </Form.Item>
              <Form.Item
                name={[index, "value"]}
                label={attribute.name}
                rules={[{ required: true, message: "Please input value!" }]}
              >
                {type[index] === Type.SELECT || type[index] === Type.YEAR ? (
                  <CSelect
                    showSearch
                    allowClear
                    placeholder={`Select ${attribute.name}`}
                    options={attribute.values.map((option: any) => ({
                      label: option,
                      value: option,
                    }))}
                  />
                ) : type[index] === Type.RADIO ? (
                  <Radio.Group
                    optionType="button"
                    buttonStyle="solid"
                    options={attribute.values.map((option: any) => ({
                      label: option,
                      value: option,
                    }))}
                  />
                ) : type[index] === Type.BOOLEAN ? (
                  <Radio.Group
                    optionType="button"
                    buttonStyle="solid"
                    options={[
                      { label: "True", value: "true" },
                      { label: "False", value: "false" },
                    ]}
                  />
                ) : type[index] === Type.NUMBER ? (
                  <CInput
                    type="number"
                    min={0}
                    placeholder={`Enter ${attribute.name}`}
                  />
                ) : (
                  <CInput
                    showCount
                    maxLength={50}
                    placeholder={`Enter ${attribute.name}`}
                  />
                )}
              </Form.Item>
            </Col>
          ))}
        </Row>
      </>
    );
  };

  return (
    <Spin spinning={isLoading}>
      <Form.List name="attributes">
        {() => (
          <>
            {renderFormItems(groupedAttributes.select)}
            {renderFormItems(groupedAttributes.radio)}
            {renderFormItems(groupedAttributes.boolean)}
            {renderFormItems(groupedAttributes.number)}
            {renderFormItems(groupedAttributes.text)}
          </>
        )}
      </Form.List>
    </Spin>
  );
};

export default AttributeForm;
