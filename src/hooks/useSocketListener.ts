// hooks/useSocketListener.ts
import { useEffect } from "react";
import { getSocket } from "@/libs/socket";
import { ESocketNamespace } from "@/constants";

export const useSocketListener = (
  namespace: ESocketNamespace,
  event: string,
  callback: (data: any) => void
) => {
  useEffect(() => {
    const socket = getSocket(namespace);
    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
    };
  }, [namespace, event, callback]);
};
