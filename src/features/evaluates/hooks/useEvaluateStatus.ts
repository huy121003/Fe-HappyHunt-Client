import { postMessageHandler } from "@/components/mesage/ToastMessage";
import { useQueryClient } from "@tanstack/react-query";
import { API_KEY } from "../data/constant";

const useEvaluateStatus = () => {
  const client = useQueryClient();
  const onSuccess = (
    successMessage: string,
    onSuccessCallback?: () => void
  ) => {
    postMessageHandler({
      type: "success",
      text: successMessage,
    });
    client.invalidateQueries({ queryKey: [API_KEY.EVALUATE] });
    client.invalidateQueries({ queryKey: [API_KEY.EVALUATE_COUNT] });

    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };
 

  return { onSuccess };
};
export default useEvaluateStatus;
