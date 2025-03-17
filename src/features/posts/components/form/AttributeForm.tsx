import CInput from "@/components/CInput";
import CSelect from "@/components/CSelect";
import { API_KEY } from "@/features/categories/data/constants";
import CategoryService from "@/features/categories/service";
import { useQuery } from "@tanstack/react-query";
import { Form, Spin } from "antd";
import React from "react";
interface AttributeFormProps {
  categoryId: string;
}
const AttributeForm: React.FC<AttributeFormProps> = ({ categoryId }) => {
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.GET_CATEGORY_BY_ID, categoryId],
    queryFn: async () => {
      if (categoryId === "") return;
      if (categoryId.split("-").length > 1) {
        categoryId = categoryId.split("-")[1];
      }
      const response = await CategoryService.getbyId(Number(categoryId));
      return response.data.attributes;
    },
  });
  return (
    <Spin spinning={isLoading}>
      <>
        <Form.List name="attributes">
          {() =>
            data &&
            data.map((attribute: any, index: number) => (
              <div key={index}>
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
                  <CSelect
                    showSearch
                    placeholder="Select value"
                    allowClear
                    options={attribute.values.map((value: string) => ({
                      label: value,
                      value,
                    }))}
                  />
                </Form.Item>
              </div>
            ))
          }
        </Form.List>
      </>
    </Spin>
  );
};

export default AttributeForm;
