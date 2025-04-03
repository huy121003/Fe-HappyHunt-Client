import { postMessageHandler } from "@/components/mesage/ToastMessage";
import { useQueryClient } from "@tanstack/react-query";
import { API_KEY } from "../data/constant";

const useFollowerState = () => {
  const client = useQueryClient();
  const onSuccess = (
    successMessage: string,
    onSuccessCallback?: () => void
  ) => {
    postMessageHandler({
      type: "success",
      text: successMessage,
    });
    client.invalidateQueries({ queryKey: [API_KEY.FOLLOW] });
    client.invalidateQueries({ queryKey: [API_KEY.FOLLOW_COUNT] });
    client.invalidateQueries({ queryKey: [API_KEY.FOLLOW_DETAIL] });
    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };

  return { onSuccess };
};

export default useFollowerState;
