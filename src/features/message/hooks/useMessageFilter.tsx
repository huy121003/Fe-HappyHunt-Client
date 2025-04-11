import useTablePagination from "@/hooks/useTablePagination";
import { useMemo, useState } from "react";
import { ISearchMessage } from "../data/interface";

const useMessageFilter = () => {
  const [chat, SetChat] = useState<number | null>();

  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = useTablePagination();
  const computedFilter = useMemo(() => {
    const filters: ISearchMessage = {
      ...parsedPagination,
      ...(chat ? { chat } : {}),
    };

    return filters;
  }, [parsedPagination, chat]);
  const handleChangeChat = (value: number) => {
    SetChat(value);
    handleResetPagination();
  };
  return {
    computedFilter,
    handleChangePagination,
    pagination,
    handleChangeChat,
  };
};

export default useMessageFilter;
