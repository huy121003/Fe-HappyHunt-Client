import { useCallback, useState } from "react";
import { Typography } from "antd";
import AuthLayout from "@/components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AuthService from "@/features/auth/service";
import {
  IForgotPasswordOtpRequest,
  IForgotPasswordRequest,
} from "@/features/auth/data/interface";
import useAuthState from "@/features/auth/hooks/useAuthState";
import ForgotPasswordForm from "@/features/auth/components/form/ForgotPasswordForm";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { onSuccess, onError } = useAuthState();
  const [openOTP, setOpenOTP] = useState(false);

  const { mutate: sendOtpMutation, isPending: isSendOtpPending } = useMutation({
    mutationFn: async (data: IForgotPasswordOtpRequest) => {
      const res = await AuthService.forgotpasswordOtp(data);
      return res;
    },
    onSuccess: () => {
      onSuccess("Send OTP successfully!", () => {
        setOpenOTP(true);
      });
    },
    onError,
  });
  const { mutate: forgotPasswordMutation, isPending: isForgotPasswordPending } =
    useMutation({
      mutationFn: async (data: IForgotPasswordRequest) => {
        const res = await AuthService.forgotpassword(data);
        return res;
      },
      onSuccess: () => {
        onSuccess("Forgot password successfully!", () => {
          navigate("/login");
        });
      },
      onError,
    });
  const onForgotPassword = useCallback(
    (data: IForgotPasswordRequest) => {
      forgotPasswordMutation(data);
    },
    [forgotPasswordMutation]
  );
  const onSendOtp = useCallback(
    (data: IForgotPasswordOtpRequest) => {
      sendOtpMutation(data);
    },
    [sendOtpMutation]
  );

  return (
    <AuthLayout>
      <div className="w-full shadow-md p-6 rounded-xl ">
        <Typography.Title level={4}>Forgot Password</Typography.Title>
        <ForgotPasswordForm
          openOTP={openOTP}
          setOpenOTP={setOpenOTP}
          onForgotPassword={onForgotPassword}
          onSendOtp={onSendOtp}
          isSendOtpPending={isSendOtpPending}
          isForgotPasswordPending={isForgotPasswordPending}
        />
      </div>
    </AuthLayout>
  );
}
export default ForgotPasswordPage;
