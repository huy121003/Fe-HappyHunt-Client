import useTablePagination from "@/hooks/useTablePagination";
import { ISearchHistory } from "../data/interface";
import { useMemo } from "react";

const useSearchFilter = () => {
  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = useTablePagination();

  const computtedFilter = useMemo(() => {
    const filters: ISearchHistory = {
      ...parsedPagination,
    };
    return filters;
  }, [parsedPagination]);

  return {
    pagination,
    handleChangePagination,
    computtedFilter,
    handleResetPagination,
  };
};
export default useSearchFilter;
