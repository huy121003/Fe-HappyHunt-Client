import { useMemo, useState } from "react";
import { ISearchNotification } from "../data/interface";
import { useAppSelector } from "@/redux/reduxHook";
import usePagination from "@/hooks/usePagination";

const useNotificationFilter = () => {
  const account = useAppSelector((state) => state.auth.account);
  const [target] = useState(account._id);
  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = usePagination();
  const computedFilter = useMemo(() => {
    const filters: ISearchNotification = {
      ...parsedPagination,
      ...(target ? { target } : {}),
    };
    return filters;
  }, [parsedPagination, target]);
  return {
    computedFilter,
    handleChangePagination,
    pagination,
    handleResetPagination,
  };
};

export default useNotificationFilter;
