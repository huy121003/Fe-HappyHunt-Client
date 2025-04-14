import { useMemo, useState } from "react";
import { ISearchEvaluate } from "../data/interface";
import usePagination from "@/hooks/usePagination";

const useEvaluateFilter = () => {
  const [isSeller, setIsSeller] = useState<string>();

  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = usePagination();

  const computedFilter = useMemo(() => {
    const filters: ISearchEvaluate = {
      ...parsedPagination,
      ...(isSeller !== undefined && { isSeller }),
    };
    return filters;
  }, [parsedPagination, isSeller]);
  const handelChangeIsSeller = (value: string) => {
    if (value == "all") {
      setIsSeller(undefined);
    } else {
      setIsSeller(value == "seller" ? "seller" : "buyer");
    }
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
