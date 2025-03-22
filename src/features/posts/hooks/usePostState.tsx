import { postMessageHandler } from "@/components/mesage/ToastMessage";
import { ICommonResponse } from "@/interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { API_KEY } from "../data/constant";

const usePostState = () => {
  const client = useQueryClient();
  const onSuccess = (
    successMessage: string,
    onSuccessCallback?: () => void
  ) => {
    postMessageHandler({
      type: "success",
      text: successMessage,
    });
    client.invalidateQueries({ queryKey: [API_KEY.POST] });
    client.invalidateQueries({ queryKey: [API_KEY.POST_DETAIL] });
    client.invalidateQueries({ queryKey: [API_KEY.POST_STATUS] });
    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };
  const onError = (error: AxiosError<ICommonResponse<null>>) => {
    postMessageHandler({
      type: "error",
      text: error.message,
    });
  };

  return { onSuccess, onError };
};
export default usePostState;
