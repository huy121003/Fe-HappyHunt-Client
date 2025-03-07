import useTablePagination from '@/hooks/useTablePagination';
import { useMemo, useState } from 'react';
import { ISearchDistrict } from '../data/interface';
import { SearchProps } from 'antd/es/input';
import { debounce } from 'lodash';

const useDistrictFilter = () => {
  const [search, setSearch] = useState<string>('');
  const [provinceId, setProvinceId] = useState<number>();
  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = useTablePagination();
  const computtedFilter = useMemo(() => {
    const filters: ISearchDistrict = {
      ...parsedPagination,
      name: search || '',
      ...(provinceId && { provinceId }),
    };
    return filters;
  }, [search, parsedPagination]);
  const handleInputSearch: SearchProps['onInput'] = debounce((event) => {
    handleResetPagination();
    setSearch((event.target as HTMLInputElement).value);
  }, 500);
  const handleSelectProvince = (provinceId: number | undefined) => {
    setProvinceId(provinceId);
    handleResetPagination();
  };
  return {
    handleInputSearch,
    pagination,
    handleChangePagination,
    computtedFilter,
    handleSelectProvince,
  };
};
export default useDistrictFilter;
