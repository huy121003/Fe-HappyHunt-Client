import { useEffect } from "react";
import { getSocket } from "@/libs/socket";
import { ESocketNamespace } from "@/constants";
import { postMessageHandler } from "@/components/mesage/ToastMessage";

export const useSocketListenerWithResponse = <T>(
  namespace: ESocketNamespace,
  event: string,
  callback?: (data: T) => void
) => {
  useEffect(() => {
    const socket = getSocket(namespace);

    const handleResponse = (data: {
      status: "success" | "error";
      message?: string;
      data?: T;
    }) => {
      if (data.status === "error") {
        postMessageHandler({
          text: data.message || "Something went wrong",
          type: "error",
        });
      } else if (data.status === "success" && callback) {
        callback(data.data as T);
      }
    };

    socket.on(event, handleResponse);

    return () => {
      socket.off(event, handleResponse);
    };
  }, [namespace, event, callback]);

  return null;
};
