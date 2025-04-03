import { useQueryClient } from "@tanstack/react-query";
import { API_KEY } from "../data/constant";

const useSearchState = () => {
  const client = useQueryClient();
  const onSuccess = () => {
    client.invalidateQueries({ queryKey: [API_KEY.SEARCH_HISTORY] });
  };

  return { onSuccess };
};

export default useSearchState;
