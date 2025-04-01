import {  Flex, Form, Spin, Typography } from "antd";
import React from "react";
import { IChangePassword } from "../../data/interface";
// import CHeaderForm from '@/components/CHeaderForm';

import CPassword from "@/components/form/CPassword";
import CButton from "@/components/buttons/CButton";

interface IChangePasswordFormProps {
  onSubmit: (values: IChangePassword) => void;
  loading?: boolean;
  title?: string;
}
const ChangePasswordForm: React.FC<IChangePasswordFormProps> = ({
  onSubmit,
  loading,
}) => {
  const [form] = Form.useForm();
  const onFinish = async () => {
    const values = await form.validateFields();
    onSubmit(values);
  };
  return (
    <Spin spinning={loading}>
      <Form<IChangePassword> form={form} layout="vertical" onFinish={onFinish}>
        <Typography.Title level={4} className="mb-4">
          Change Password
        </Typography.Title>
        <Form.Item
          label="Current Password"
          name="currentPassword"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please input your current password!",
            },
          ]}
        >
          <CPassword placeholder="Current Password" />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please input your new password!",
            },
            {
              min: 8,
              message: "Password must be at least 8 characters!",
            },
            {
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must contain at least one letter, one number, and one special character!",
            },
          ]}
        >
          <CPassword placeholder="New Password" />
        </Form.Item>
        <Form.Item
          label="Confirm New Password"
          name="confirmNewPassword"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please confirm your new password!",
            },
            {
              validator: async (_, value) => {
                if (value && value !== form.getFieldValue("newPassword")) {
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                }
              },
            },
          ]}
        >
          <CPassword placeholder="Confirm New Password" />
        </Form.Item>
      </Form>
      <Flex justify="end" className="mb-4 w-full">
        <CButton onClick={form.submit}>Save</CButton>
      </Flex>
    </Spin>
  );
};

export default ChangePasswordForm;
