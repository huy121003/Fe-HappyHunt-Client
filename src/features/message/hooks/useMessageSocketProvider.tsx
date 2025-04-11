import { createContext, useContext, useEffect, useState } from "react";
import { ESocketNamespace } from "@/constants";
import { Socket } from "socket.io-client";
import { getSocket } from "@/libs/socket";


const MessageSocketContext = createContext<Socket | null>(null);

export const useMessageSocketProvider = () => {
  const socket = useContext(MessageSocketContext);
  return socket;
};

export const MessageSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = getSocket(ESocketNamespace.message);
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <MessageSocketContext.Provider value={socket}>
      {children}
    </MessageSocketContext.Provider>
  );
};
