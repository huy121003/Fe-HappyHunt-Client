import { useMemo, useState } from "react";
import { ISearchEvaluate } from "../data/interface";
import usePagination from "@/hooks/usePagination";

const useEvaluateFilter = () => {
  const [isSeller, setIsSeller] = useState<boolean>();

  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = usePagination();

  const computedFilter = useMemo(() => {
    const filters: ISearchEvaluate = {
      ...parsedPagination,
      ...(isSeller && { isSeller }),
    };
    return filters;
  }, [parsedPagination, isSeller]);
  const handelChangeIsSeller = (value: boolean) => {
    setIsSeller(value);
    handleResetPagination;
  };
  return {
    computedFilter,
    handleChangePagination,
    pagination,
    handleResetPagination,
    handelChangeIsSeller,
  };
};
export default useEvaluateFilter;
