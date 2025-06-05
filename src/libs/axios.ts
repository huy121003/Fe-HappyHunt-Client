import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { EMethod } from "@/constants";
import AuthService from "@/features/auth/service";
import { ICommonResponse } from "@/interfaces";
import { postMessageHandler } from "@/components/mesage/ToastMessage";
const baseURL = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const NO_RETRY_HEADER = "x-no-retry";
const apiConfig = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
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

// Interceptor xử lý response
apiConfig.interceptors.response.use(
  (response: AxiosResponse) => response?.data ?? response,

  async (error: AxiosError<ICommonResponse>) => {
    const { config, response } = error;

    let errorMessage = "Something went wrong, please try again!";

    if (error.code === "ECONNABORTED") {
      postMessageHandler({
        text: "Request timeout. Please try again!",
        type: "error",
      });
    } else if (error.code === "ERR_NETWORK") {
      errorMessage = "Network error. Please check your connection!";
      postMessageHandler({
        text: errorMessage,
        type: "error",
      });
    } else if (response && config) {
      const { status, data } = response;
      if (status === 500) {
        postMessageHandler({
          text: "Something went wrong, please try again!",
          type: "error",
        });
        return Promise.reject(error);
      }

      if (status === 401 && !config.headers[NO_RETRY_HEADER]) {
        try {
          if (
            ["/login", "/register", "/forgot-password"].includes(
              window.location.pathname
            )
          ) {
            return Promise.reject(error);
          }

          const res = await AuthService.getNewAccessToken();
          const accessToken = res?.data?.access_token;

          if (!accessToken) {
            throw new Error("Failed to get new access token");
          }

          localStorage.setItem("access_token", accessToken);
          config.headers.Authorization = `Bearer ${accessToken}`;
          config.headers[NO_RETRY_HEADER] = "true";

          return apiConfig.request(config);
        } catch (refreshError) {
          errorMessage = "Your session has expired, please login again!";
          localStorage.removeItem("access_token");

          if (
            !["/login", "/register", "/forgot-password"].includes(
              window.location.pathname
            )
          ) {
            window.location.href = "/login";
          }
          return Promise.reject({ ...refreshError, message: errorMessage });
        }
      }
      if (status) {
        postMessageHandler({
          text: data?.message || errorMessage,
          type: "error",
        });
      }

      errorMessage = data?.message || errorMessage; // Nếu API có trả về message, dùng nó
    }

    return Promise.reject({ ...error, message: errorMessage });
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
