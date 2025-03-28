import React from "react";
import { IPost } from "../../data/interface";
import { Card, Form, FormInstance } from "antd";
import CInput from "@/components/form/CInput";
import SelectWard from "@/features/wards/components/form/SelectWard";
import SelectDictrict from "@/features/districts/components/form/SelectDictrict";
import SelectProvince from "@/features/provinces/components/form/SelectProvince";
interface IProps {
  data?: IPost;
  form: FormInstance;
}
const AddressForm: React.FC<IProps> = ({ data, form }) => {
  const province = Form.useWatch(["province"], form);
  const district = Form.useWatch(["district"], form);
  const ward = Form.useWatch(["ward"], form);
  return (
    <Card title="Address" className="mb-4">
      <Form.Item
        label="Province"
        name="province"
        rules={[
          {
            required: true,
            message: "Please select province!",
          },
        ]}
      >
        <SelectProvince
          placeholder="Select province"
          onChange={() => {
            form.setFieldsValue({
              district: undefined,
              ward: undefined,
              specificAddress: undefined,
            });
          }}
          defaultSelected={
            data?.address.province
              ? [
                  {
                    _id: data.address.province._id,
                    name: data.address.province.name,
                  },
                ]
              : undefined
          }
        />
      </Form.Item>
      <Form.Item
        name="district"
        label="District"
        rules={[
          {
            required: true,
            message: "Please select district!",
          },
        ]}
      >
        <SelectDictrict
          onChange={() => {
            form.setFieldsValue({
              ward: undefined,
              specificAddress: undefined,
            });
          }}
          placeholder="Select district"
          province={province}
          defaultSelected={
            data?.address.district
              ? [
                  {
                    _id: data.address.district._id,
                    name: data.address.district.name,
                  },
                ]
              : undefined
          }
          disabled={!province}
        />
      </Form.Item>
      <Form.Item
        name="ward"
        label="Ward"
        rules={[{ required: true, message: "Please select ward!" }]}
      >
        <SelectWard
          placeholder="Select ward"
          onChange={() => {
            form.setFieldsValue({
              specificAddress: undefined,
            });
          }}
          province={province}
          district={district}
          defaultSelected={
            data?.address.ward
              ? [
                  {
                    _id: data.address.ward._id,
                    name: data.address.ward.name,
                  },
                ]
              : undefined
          }
          disabled={!province || !district}
        />
      </Form.Item>
      <Form.Item
        label="Specific Address"
        name="specificAddress"
        rules={[
          {
            required: true,
            whitespace: true,
            message: "Please input specific address!",
          },
        ]}
      >
        <CInput
          placeholder="Enter specific address"
          disabled={!province || !district || !ward}
        />
      </Form.Item>
    </Card>
  );
};

export default AddressForm;
