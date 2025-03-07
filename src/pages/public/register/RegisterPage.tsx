import { useCallback, useState } from "react";
import { Typography } from "antd";
import AuthLayout from "@/components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import AuthService from "@/features/auth/service";
import RegisterForm from "@/features/auth/components/form/RegisterForm";
import {
  IRegisterOtpRequest,
  IRegisterRequest,
} from "@/features/auth/data/interface";
import useAuthState from "@/features/auth/hooks/useAuthState";

function RegisterPage() {
  const navigate = useNavigate();
  const { onSuccess, onError } = useAuthState();
  const [openOTP, setOpenOTP] = useState(false);

  const { mutate: sendOtpMutation, isPending: isSendOtpPending } = useMutation({
    mutationFn: async (data: IRegisterOtpRequest) => {
      const res = await AuthService.registerOtp(data);
      return res;
    },
    onSuccess: () => {
      onSuccess("OTP sent successfully!", () => {
        setOpenOTP(true);
      });
    },
    onError,
  });
  const { mutate: registerMutation, isPending: isRegisterPending } =
    useMutation({
      mutationFn: async (data: IRegisterRequest) => {
        const res = await AuthService.register(data);
        return res;
      },
      onSuccess: () => {
        onSuccess("Register successfully. Please login to use the app!", () => {
          navigate("/login");
        });
      },
      onError,
    });
  const onRegister = useCallback(
    (data: IRegisterRequest) => {
      registerMutation(data);
    },
    [registerMutation]
  );
  const onSendOtp = useCallback(
    (data: IRegisterOtpRequest) => {
      sendOtpMutation(data);
    },
    [sendOtpMutation]
  );

  return (
    <AuthLayout>
      <div className="w-full shadow-md p-6 rounded-xl ">
        <Typography.Title level={3}>Register</Typography.Title>
        <RegisterForm
          openOTP={openOTP}
          setOpenOTP={setOpenOTP}
          onRegister={onRegister}
          onSendOtp={onSendOtp}
          isSendOtpPending={isSendOtpPending}
          isRegisterPending={isRegisterPending}
        />
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;
