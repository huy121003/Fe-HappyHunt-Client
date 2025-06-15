import { postMessageHandler } from "@/components/mesage/ToastMessage";
import { useQueryClient } from "@tanstack/react-query";
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
    //client.invalidateQueries({ queryKey: [API_KEY.POST_DETAIL] });
    client.invalidateQueries({ queryKey: [API_KEY.POST_STATUS] });
    client.invalidateQueries({ queryKey: [API_KEY.POST_MANAGER] });
    client.invalidateQueries({ queryKey: [API_KEY.POST_PUSH_AT] });
    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };

  return { onSuccess };
};
export default usePostState;
