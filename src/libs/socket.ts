import { ESocketNamespace } from "@/constants";
import { io, Socket } from "socket.io-client";

// Đối tượng lưu trữ các kết nối socket theo namespace
const sockets: Record<string, Socket> = {};

export const getSocket = (
  namespace: ESocketNamespace = ESocketNamespace.app,
  accountId?: number
): Socket => {
  if (!sockets[namespace]) {
    const socket = io(`${import.meta.env.VITE_PUBLIC_URL}${namespace}`, {
      transports: ["websocket"],
      reconnectionAttempts: 3,
      timeout: 10000,
      withCredentials: true,
      query: {
        accountId: accountId,
      },
      auth: {
        token: localStorage.getItem("access_token"),
      },
    });

    // Kiểm tra kết nối socket
    socket.on("connect", () => {
      console.log(`Socket connected to ${namespace}: ${socket.id}`);
    });

    socket.on("connect_error", (error) => {
      console.error(`Socket connection error to ${namespace}:`, error);
    });

    // Lưu socket vào object
    sockets[namespace] = socket;
  }

  return sockets[namespace];
};

export const disconnectSocket = (
  namespace: ESocketNamespace = ESocketNamespace.app
) => {
  if (sockets[namespace]) {
    sockets[namespace].disconnect();
    delete sockets[namespace];
  }
};

// Hàm để cập nhật socket với token mới
export const updateSocketAuth = (
  namespace: ESocketNamespace = ESocketNamespace.app,
  accountId?: number
) => {
  if (sockets[namespace]) {
    // Ngắt kết nối socket cũ
    sockets[namespace].disconnect();
    delete sockets[namespace];

    // Tạo socket mới với token mới
    return getSocket(namespace, accountId);
  }
  return null;
};

// Hàm để xóa tất cả socket khi đăng xuất
export const disconnectAllSockets = () => {
  Object.keys(sockets).forEach((namespace) => {
    disconnectSocket(namespace as ESocketNamespace);
  });
};
