import { postMessageHandler } from "@/components/mesage/ToastMessage";
import { useEffect } from "react";

function useSocketResponse<T>(data: {
  status: "success" | "error";
  message?: string;
  data?: T;
}) {
  useEffect(() => {
    if (data.status === "error") {
      postMessageHandler({
        text: data.message || "Something went wrong",
        type: "error",
      });
    }
  }, [data]);
  return data.status === "success" ? data.data : null;
}

export default useSocketResponse;
