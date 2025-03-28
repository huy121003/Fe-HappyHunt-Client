import { ISearchParams } from "@/interfaces";
import { PaginationConfig } from "antd/es/pagination";
import { useMemo, useState } from "react";

interface IProps {
  defaultPagination?: ISearchParams;
}
const usePagination = (props?: IProps) => {
  const [pagination, setPagination] = useState<PaginationConfig>();

  const parsedPagination = useMemo(() => {
    if (pagination) {
      return {
        page: (pagination.current || 1) - 1,
        size: pagination.pageSize,
      };
    }
    return props?.defaultPagination || { page: 0, size: 10 };
  }, [pagination, props?.defaultPagination]);

  const handleResetPagination = () => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
      pageSize: prev?.pageSize || 10,
    }));
  };

  const handleChangePagination = (current: number, pageSize?: number) => {
    setPagination((prev) => ({
      current,
      pageSize: pageSize || prev?.pageSize || 10,
    }));
  };
  return {
    pagination,
    parsedPagination,
    handleResetPagination,
    handleChangePagination,
  };
};

export default usePagination;
