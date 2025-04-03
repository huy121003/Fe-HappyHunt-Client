import { useMemo, useState } from "react";
import { ISearchFollow } from "../data/interface";

import usePagination from "@/hooks/usePagination";

const useFollowerFilter = () => {
  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = usePagination();
  const [type, setType] = useState<"followers" | "following">("followers");
  const computtedFilter = useMemo(() => {
    const filters: ISearchFollow = {
      ...parsedPagination,
      ...(type ? { type } : {}),
    };
    return filters;
  }, [parsedPagination]);
  const handleSelectType = (type: "followers" | "following") => {
    setType(type);
    handleResetPagination();
  };
  return {
    computtedFilter,
    pagination,
    handleChangePagination,
    handleResetPagination,
    handleSelectType,
  };
};
export default useFollowerFilter;
