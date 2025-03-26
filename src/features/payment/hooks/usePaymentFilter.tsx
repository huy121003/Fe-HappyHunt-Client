import useTablePagination from "@/hooks/useTablePagination";
import { useMemo, useState } from "react";
import { ISearchPayment } from "../data/interface";

import { EStatus } from "../data/constant";

const usePaymentFilter = () => {
  const [status, setStatus] = useState<EStatus>();
  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = useTablePagination();

  const computtedFilter = useMemo(() => {
    const filters: ISearchPayment = {
      ...parsedPagination,
      ...(status ? { status } : {}),
    };
    return filters;
  }, [status, parsedPagination]);
  const handleCHangeStatus = (value: EStatus) => {
    setStatus(value);
    handleResetPagination();
  };

  return {
    pagination,
    handleChangePagination,
    computtedFilter,
    handleCHangeStatus,
  };
};
export default usePaymentFilter;
