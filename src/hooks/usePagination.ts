import { useMemo, useState } from 'react';

interface IPaginationState {
  current: number;
  pageSize: number;
  total?: number;
}

interface IProps {
  defaultPagination?: IPaginationState;
}

const usePagination = (props?: IProps) => {
  const [pagination, setPagination] = useState<IPaginationState>(
    props?.defaultPagination || { current: 1, pageSize: 10 }
  );

  const parsedPagination = useMemo(
    () => ({
      page: pagination.current - 1,
      size: pagination.pageSize,
    }),
    [pagination]
  );

  const handleResetPagination = () => {
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleChangePagination = (current: number, pageSize?: number) => {
    setPagination((prev) => ({
      current,
      pageSize: pageSize || prev.pageSize,
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
