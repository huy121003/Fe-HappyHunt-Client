import ChangePasswordForm from "@/features/auth/components/form/ChangePasswordForm";
import { IChangePassword } from "@/features/auth/data/interface";
import useAuthState from "@/features/auth/hooks/useAuthState";
import AuthService from "@/features/auth/service";
import { useAppDispatch } from "@/redux/reduxHook";
import { logoutAction } from "@/redux/slice/SAuthSlice";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function ChangePasswordPage() {
  const { onSuccess } = useAuthState();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IChangePassword) => {
      const response = await AuthService.changePassword(data);
      return response.data;
    },
    onSuccess: () => {
      onSuccess("Change password successfully, Please login again", () => {
        dispatch(logoutAction());
        localStorage.removeItem("access_token");
        navigate("/login");
      });
    },
  });
  const onSubmit = (values: any) => {
    mutate(values);
  };
  return (
    <ChangePasswordForm
      loading={isPending}
      onSubmit={onSubmit}
      title="Change Password"
    />
  );
}

export default ChangePasswordPage;
