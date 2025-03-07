import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { EMethod } from "@/constants";
import { postMessageHandler } from "@/components/ToastMessage";
import AuthService from "@/features/auth/service";
import { ICommonResponse } from "@/interfaces";
const baseURL = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const NO_RETRY_HEADER = "x-no-retry";
const apiConfig = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 5000,
});

// Lấy access token từ localStorage

// Interceptor Request
apiConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor Response

// Xử lý thông báo lỗi
const showError = (message: string) => {
  postMessageHandler({ type: "error", text: message });
};

// Interceptor xử lý response
apiConfig.interceptors.response.use(
  (response: AxiosResponse) => response?.data ?? response,

  async (error: AxiosError<ICommonResponse>) => {
    const { config, response } = error;

    console.log("error", error);

    if (!config || !response) {
      return Promise.reject(error);
    }

    const { status } = response;

    // Xử lý lỗi 401 - Unauthorized (Không retry nếu đã thử refresh trước đó)
    if (status === 401 && !config.headers[NO_RETRY_HEADER]) {
      try {
        if (
          ["/login", "/register", "/forgot-password"].includes(
            window.location.pathname
          )
        ) {
          return Promise.reject(error); // Không xử lý refresh token trên trang không cần auth
        }

        // Lấy token mới
        const res = await AuthService.getNewAccessToken();
        const accessToken = res?.data?.access_token;

        if (!accessToken) {
          throw new Error("Failed to get new access token");
        }

        // Lưu token mới vào localStorage
        localStorage.setItem("access_token", accessToken);

        // Gán token mới vào request header
        config.headers.Authorization = `Bearer ${accessToken}`;
        config.headers[NO_RETRY_HEADER] = "true"; // Đánh dấu để tránh lặp vô hạn

        // Gửi lại request
        return apiConfig.request(config);
      } catch (refreshError) {
        showError("Your session has expired, please login again!");
        localStorage.removeItem("access_token");

        if (
          !["/login", "/register", "/forgot-password"].includes(
            window.location.pathname
          )
        ) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    // Trả về lỗi để các hàm gọi API có thể xử lý tiếp
    return Promise.reject(response?.data ?? error);
  }
);

// API Request Wrapper
const apiRequest = async <T, R>(
  method: EMethod,
  url: string,
  isFormData = false,
  data?: T
): Promise<R> => {
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    },
  };

  return apiConfig.request<T, R>({
    method,
    url,
    data,
    ...config,
  });
};

export default apiRequest;
