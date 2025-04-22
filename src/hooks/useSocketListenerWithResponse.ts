import { useEffect } from "react";
import { getSocket } from "@/libs/socket";
import { ESocketNamespace } from "@/constants";
import { postMessageHandler } from "@/components/mesage/ToastMessage";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export const useSocketListenerWithResponse = <T>(
  event: string,
  callback?: (data: T) => void
) => {
  const account = useSelector((state: RootState) => state.auth.account);
  useEffect(() => {
    const socket = getSocket(ESocketNamespace.app, Number(account?._id));
    const handleResponse = (data: {
      success: boolean;
      message?: string;
      data?: T;
    }) => {
      console.log("data", data);
      if (!data.success) {
        postMessageHandler({
          text: data.message || "Something went wrong",
          type: "error",
        });
      } else if (data.success && callback) {
        callback(data.data as T);
      }
    };

    socket.on(event, handleResponse);

    return () => {
      socket.off(event, handleResponse);
    };
  }, [event, callback]);

  return null;
};
