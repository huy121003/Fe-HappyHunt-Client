// src/context/SocketContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";

import { Socket } from "socket.io-client";
import { disconnectSocket, getSocket, updateSocketAuth } from "@/libs/socket";
import { ESocketNamespace } from "@/constants";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

// Tạo context để chứa socket
const SocketContext = createContext<Socket | null>(null);

// Hook để sử dụng socket context
export const useSocketProvider = () => {
  const socket = useContext(SocketContext);

  return socket;
};

// SocketProvider để cung cấp socket cho các component con
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const account = useSelector((state: RootState) => state.auth.account);
  useEffect(() => {
    const socketInstance = getSocket(
      ESocketNamespace.app,
      Number(account?._id)
    );
    setSocket(socketInstance);

    // Lắng nghe sự kiện storage để cập nhật socket khi token thay đổi
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "access_token") {
        const newSocket = updateSocketAuth();
        if (newSocket) {
          setSocket(newSocket);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      disconnectSocket();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
