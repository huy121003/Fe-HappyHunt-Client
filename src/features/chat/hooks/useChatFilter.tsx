import useTablePagination from "@/hooks/useTablePagination";
import { useMemo, useState } from "react";
import { ISearchChat } from "../data/interface";
import { useAppSelector } from "@/redux/reduxHook";
import { ETypeMessage } from "../data/constant";

const useChatFilter = () => {
  const [viewType, setViewType] = useState<ETypeMessage>(ETypeMessage.ALL);
  const account = useAppSelector((state) => state.auth?.account);
  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = useTablePagination();

  const computedFilter = useMemo(() => {
    const filters: ISearchChat = {
      ...parsedPagination,
      ...(viewType ? { viewType } : {}),
      ...(account?._id ? { currentUser: account?._id } : {}),
    };
    return filters;
  }, [parsedPagination, viewType]);

  const handleChangeViewType = (value: ETypeMessage) => {
    setViewType(value);
    handleResetPagination();
  };
  return {
    pagination,
    handleChangePagination,
    computedFilter,
    handleChangeViewType,
    viewType,
  };
};
export default useChatFilter;
