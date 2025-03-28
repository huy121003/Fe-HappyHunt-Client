import { postMessageHandler } from "@/components/mesage/ToastMessage";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { API_KEY } from "../data/constant";

const useProvinceState = () => {
  const client = useQueryClient();
  const navigate = useNavigate();
  const onSuccess = (
    successMessage: string,
    onSuccessCallback?: () => void
  ) => {
    postMessageHandler({
      type: "success",
      text: successMessage,
    });
    client.invalidateQueries({ queryKey: [API_KEY.PROVINCE] });
    client.invalidateQueries({ queryKey: [API_KEY.PROVINCE_DETAIL] });
    navigate("/addresses/provinces");
    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };

  return { onSuccess };
};
export default useProvinceState;
