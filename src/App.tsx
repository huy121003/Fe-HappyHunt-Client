import { RouterProvider } from "react-router-dom";
import router from "@/routers/router";
import { ConfigProvider } from "antd";

import { useAppDispatch, useAppSelector } from "./redux/reduxHook";

import { getUserAction } from "./redux/slice/SAuthSlice";
import { CLoadingPage } from "./components";

import ToastMessage from "./components/ToastMessage";
import theme from "./libs/theme";
import { useQuery } from "@tanstack/react-query";
import { API_KEY } from "./features/auth/data/constant";
import AuthService from "./features/auth/service";

function App() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  // Kiểm tra nếu đang ở trang login, register, forgot-password thì không gọi API
  const authPages = ["/login", "/register", "/forgot-password"];
  // Dùng useQuery để fetch dữ liệu
  const { isLoading } = useQuery({
    queryKey: [API_KEY.GET_ACCOUNT_INFO],
    queryFn: async () => {
      const response = await AuthService.getAccountInfo();
      if (response.statusCode === 200) {
        dispatch(getUserAction(response.data));
      }
    },
    enabled: !authPages.includes(window.location.pathname) && !isAuthenticated,
  });

  // Nếu đang tải thì hiển thị loading
  if (isLoading) {
    return <CLoadingPage />;
  }

  if (isAuthenticated || authPages.includes(window.location.pathname)) {
    return (
      <ConfigProvider theme={theme}>
        <RouterProvider router={router} />
        <ToastMessage />
      </ConfigProvider>
    );
  }
}

export default App;
