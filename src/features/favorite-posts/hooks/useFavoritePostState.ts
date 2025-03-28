import { postMessageHandler } from "@/components/mesage/ToastMessage";
import { useQueryClient } from "@tanstack/react-query";

import { API_KEY } from "../data/constant";
import { API_KEY as POST_API_KEY } from "@/features/posts/data/constant";

const useFavoritePostState = () => {
  const client = useQueryClient();
  const onSuccess = (
    successMessage: string,
    onSuccessCallback?: () => void
  ) => {
    postMessageHandler({
      type: "success",
      text: successMessage,
    });
    client.invalidateQueries({ queryKey: [API_KEY.FAVORITE_POSTS] });
    client.invalidateQueries({ queryKey: [POST_API_KEY.POST] });
    client.invalidateQueries({ queryKey: [POST_API_KEY.POST_DETAIL] });
    client.invalidateQueries({ queryKey: [POST_API_KEY.POST_SUGGESTION] });

    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };

  return { onSuccess };
};

export default useFavoritePostState;
