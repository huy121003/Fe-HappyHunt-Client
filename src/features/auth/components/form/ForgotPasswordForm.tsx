import React, { useState } from "react";
import {
  IForgotPasswordOtpRequest,
  IForgotPasswordRequest,
} from "../../data/interface";
import { Flex, Form, Typography } from "antd";
import CInput from "@/components/CInput";
import CButton from "@/components/buttons/CButton";
import OtpInput from "react18-input-otp";
import { useNavigate } from "react-router-dom";

interface ForgotPasswordFormProps {
  openOTP: boolean;
  setOpenOTP: React.Dispatch<React.SetStateAction<boolean>>;
  onForgotPassword: (data: IForgotPasswordRequest) => void;
  onSendOtp: (data: IForgotPasswordOtpRequest) => void;
  isSendOtpPending: boolean;
  isForgotPasswordPending: boolean;
}
const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  openOTP,
  setOpenOTP,
  onForgotPassword,
  onSendOtp,
  isSendOtpPending,
  isForgotPasswordPending,
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState<IForgotPasswordRequest>({
    phoneNumber: "",
    otp: "",
  });
  const handleChange = (enteredOtp: any) => {
    setData({ ...data, otp: enteredOtp });
  };
  const onSubmitSendOtp = async () => {
    const values = await form.validateFields();
    onSendOtp({
      phoneNumber: values.phoneNumber,
    });
    setData({ ...data, ...values });
  };

  return (
    <>
      {!openOTP ? (
        <>
          <Form<IForgotPasswordOtpRequest>
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
                  message: "Please input your phone number!",
                },
              ]}
            >
              <CInput placeholder="Phone number" />
            </Form.Item>
          </Form>
          <CButton
            loading={isSendOtpPending}
            onClick={form.submit}
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            Send OTP
          </CButton>
          <Flex justify="center" className="mt-4">
            <Typography.Text>
              <Typography.Text>Remember password?</Typography.Text>
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
              loading={isForgotPasswordPending}
              onClick={() => onForgotPassword(data)}
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
export default ForgotPasswordForm;
