import useTablePagination from '@/hooks/useTablePagination';
import { useMemo, useState } from 'react';
import { ISearchWard } from '../data/interface';
import { SearchProps } from 'antd/es/input';
import { debounce } from 'lodash';

const useWardFilter = () => {
  const [search, setSearch] = useState<string>('');
  const [districtId, setDistrictId] = useState<number | undefined>();
  const [provinceId, setProvinceId] = useState<number | undefined>();
  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = useTablePagination();
  const computtedFilter = useMemo(() => {
    const filters: ISearchWard = {
      ...parsedPagination,
      name: search || '',
      ...(districtId && { districtId }),
      ...(provinceId && { provinceId }),
    };
    return filters;
  }, [search, parsedPagination]);
  const handleInputSearch: SearchProps['onInput'] = debounce((event) => {
    handleResetPagination();
    setSearch((event.target as HTMLInputElement).value);
  }, 500);
  const handleSelectDistrict = (value: number) => {
    setDistrictId(value);
    handleResetPagination();
  };
  const handleSelectProvince = (value: number) => {
    setProvinceId(value);
    handleResetPagination();
    setDistrictId(undefined);
  };
  return {
    handleInputSearch,
    pagination,
    handleChangePagination,
    computtedFilter,
    handleSelectDistrict,
    handleSelectProvince,
  };
};
export default useWardFilter;
