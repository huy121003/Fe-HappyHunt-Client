// src/context/SocketContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import {
  disconnectAllSockets,
  getSocket,
  updateSocketAuth,
} from "@/libs/socket";

// Tạo context để chứa socket
const SocketContext = createContext<Socket | null>(null);

// Hook để sử dụng socket context
export const useChatSocketProvider = () => {
  const socket = useContext(SocketContext);

  return socket;
};

// SocketProvider để cung cấp socket cho các component con
export const ChatSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = getSocket();
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
      disconnectAllSockets();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
