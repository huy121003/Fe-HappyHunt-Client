import { useMemo } from "react";
import { ISearchFollow } from "../data/interface";

import usePagination from "@/hooks/usePagination";

const useFollowerFilter = () => {
  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = usePagination();

  const computtedFilter = useMemo(() => {
    const filters: ISearchFollow = {
      ...parsedPagination,
    };
    return filters;
  }, [parsedPagination]);

  return {
    computtedFilter,
    pagination,
    handleChangePagination,
    handleResetPagination,
  };
};
export default useFollowerFilter;
