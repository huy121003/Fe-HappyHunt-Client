import useTablePagination from '@/hooks/useTablePagination';
import { useMemo, useState } from 'react';
import { ISearchProvince } from '../data/interface';
import { SearchProps } from 'antd/es/input';
import { debounce } from 'lodash';

const useProvinceFilter = () => {
  const [search, setSearch] = useState<string>('');
  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = useTablePagination();
  const computtedFilter = useMemo(() => {
    const filters: ISearchProvince = {
      ...parsedPagination,
      name: search || '',
    };
    return filters;
  }, [search, parsedPagination]);
  const handleInputSearch: SearchProps['onInput'] = debounce((event) => {
    handleResetPagination();
    setSearch((event.target as HTMLInputElement).value);
  }, 500);
  return {
    handleInputSearch,
    pagination,
    handleChangePagination,
    computtedFilter,
  };
};
export default useProvinceFilter;
