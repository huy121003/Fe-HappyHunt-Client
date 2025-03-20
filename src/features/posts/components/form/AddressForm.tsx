import React from "react";
import { IPost } from "../../data/interface";
import { Card, Form, FormInstance } from "antd";
import CInput from "@/components/CInput";
import SelectWard from "@/features/wards/components/form/SelectWard";
import SelectDictrict from "@/features/districts/components/form/SelectDictrict";
import SelectProvince from "@/features/provinces/components/form/SelectProvince";
interface IProps {
  data?: IPost;
  form: FormInstance;
}
const AddressForm: React.FC<IProps> = ({ data, form }) => {
  const provinceId = Form.useWatch(["provinceId"], form);
  const districtId = Form.useWatch(["districtId"], form);
  const wardId = Form.useWatch(["wardId"], form);
  return (
    <Card title="Address" className="mb-4">
      <Form.Item
        label="Province"
        name="provinceId"
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
              districtId: undefined,
              wardId: undefined,
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
        name="districtId"
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
              wardId: undefined,
              specificAddress: undefined,
            });
          }}
          placeholder="Select district"
          provinceId={provinceId}
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
          disabled={!provinceId}
        />
      </Form.Item>
      <Form.Item
        name="wardId"
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
          provinceId={provinceId}
          districtId={districtId}
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
          disabled={!provinceId || !districtId}
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
          disabled={!provinceId || !districtId || !wardId}
        />
      </Form.Item>
    </Card>
  );
};

export default AddressForm;
