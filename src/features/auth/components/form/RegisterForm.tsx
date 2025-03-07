import React, { useState } from "react";
import { IRegisterOtpRequest, IRegisterRequest } from "../../data/interface";
import { Flex, Form, Typography } from "antd";
import CInput from "@/components/CInput";
import CPassword from "@/components/CPassword";
import CButton from "@/components/buttons/CButton";
import OtpInput from "react18-input-otp";
import { useNavigate } from "react-router-dom";
interface RegisterFormProps {
  openOTP: boolean;
  setOpenOTP: React.Dispatch<React.SetStateAction<boolean>>;
  onRegister: (data: IRegisterRequest) => void;
  onSendOtp: (data: IRegisterOtpRequest) => void;
  isSendOtpPending: boolean;
  isRegisterPending: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  openOTP,
  setOpenOTP,
  onRegister,
  onSendOtp,
  isSendOtpPending,
  isRegisterPending,
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState<IRegisterRequest>({
    phoneNumber: "",
    username: "",
    password: "",
    otp: "",
  });
  const handleChange = (enteredOtp: any) => {
    setData({ ...data, otp: enteredOtp });
  };
  const onSubmitSendOtp = async () => {
    const values = await form.validateFields();
    onSendOtp({
      phoneNumber: values.phoneNumber,
      username: values.username,
    });
    setData({ ...data, ...values });
  };

  return (
    <>
      {!openOTP ? (
        <>
          <Form<IRegisterRequest>
            layout="vertical"
            form={form}
            onFinish={onSubmitSendOtp}
          >
            <Form.Item
              label="Phone number"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please input your phone number!",
                },
                {
                  pattern: new RegExp(/^(0[3|5|7|8|9])+([0-9]{8})\b/g),
                  message: "Invalid phone number",
                },
              ]}
            >
              <CInput placeholder="Phone number" />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please input your username!",
                },
                {
                  validator: async (_, value) => {
                    if (!/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*$/g.test(value)) {
                      return Promise.reject(
                        "Invalid username format (e.g., admin.super, admin123.232)"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <CInput placeholder="Username" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <CPassword placeholder="Password" />
            </Form.Item>
          </Form>
          <CButton
            loading={isSendOtpPending}
            onClick={form.submit}
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            Register
          </CButton>
          <Flex justify="center" className="mt-4">
            <Typography.Text>
              Already have an account?{" "}
              <Typography.Link
                style={{ color: "#f55409" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Typography.Link>
            </Typography.Text>
          </Flex>
        </>
      ) : (
        <>
          <Flex vertical justify="center" align="center" className="mt-6">
            <div className="my-4 mb-10">
              <Flex gap={8} align="center">
                <i
                  className="fas fa-arrow-left text-4xl text-flame-orange cursor-pointer"
                  onClick={() => {
                    setOpenOTP(!openOTP);
                    setData({
                      phoneNumber: "",
                      username: "",
                      password: "",
                      otp: "",
                    });
                  }}
                />
                <p className="text-lg">OTP verification</p>
              </Flex>
              <OtpInput
                value={data.otp}
                onChange={handleChange}
                numInputs={6}
                separator={<span> </span>}
                isInputNum={true}
                isSuccessed={false}
                inputStyle="lg:text-6xl text-5xl h-[70px] lg:h-[100px] text-center border-2 border-sunflower-yellow rounded-md mx-[5px] "
              />
            </div>
            <CButton
              loading={isRegisterPending}
              onClick={() => onRegister(data)}
              type="primary"
              className="w-full"
            >
              Verify OTP
            </CButton>
          </Flex>
        </>
      )}
    </>
  );
};

export default RegisterForm;
