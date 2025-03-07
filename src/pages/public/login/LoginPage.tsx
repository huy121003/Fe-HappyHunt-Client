import AuthLayout from "@/components/layouts/AuthLayout";
import LoginForm from "@/features/auth/components/form/LoginForm";
import { Typography } from "antd";

function LoginPage() {
  return (
    <AuthLayout>
      <div className="w-full shadow-md p-6 rounded-xl ">
        <Typography.Title level={3}>Login</Typography.Title>
        <LoginForm />
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
