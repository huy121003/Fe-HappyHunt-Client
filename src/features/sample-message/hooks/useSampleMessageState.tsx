import { postMessageHandler } from "@/components/mesage/ToastMessage";
import { useQueryClient } from "@tanstack/react-query";
import { API_KEY } from "../data/constant";

const useSampleMessageState = () => {
  const client = useQueryClient();
  const onSuccess = (
    successMessage: string,
    onSuccessCallback?: () => void
  ) => {
    postMessageHandler({
      type: "success",
      text: successMessage,
    });
    client.invalidateQueries({ queryKey: [API_KEY.SAMPLE_MESSAGE] });
    client.invalidateQueries({ queryKey: [API_KEY.SAMPLE_MESSAGE_DETAIL] });
    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };

  return { onSuccess };
};

export default useSampleMessageState;
