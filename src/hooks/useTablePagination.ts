import { ISearchParams } from '@/interfaces';
import { TablePaginationConfig, TableProps } from 'antd';
import { useMemo, useState } from 'react';

type TTableOnChange = TableProps<any>['onChange'];

interface IProps {
  defaultPagination?: ISearchParams;
}

const useTablePagination = (props?: IProps) => {
  const [pagination, setPagination] = useState<TablePaginationConfig>();

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

  const handleChangePagination: TTableOnChange = (pagination) => {
    setPagination(pagination);
  };

  return {
    pagination,
    parsedPagination,
    handleResetPagination,
    handleChangePagination,
  };
};

export default useTablePagination;
