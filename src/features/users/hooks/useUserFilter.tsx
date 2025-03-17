import useTablePagination from '@/hooks/useTablePagination';
import { useMemo, useState } from 'react';
import { ISearchUser } from '../data/interface';
import { SearchProps } from 'antd/es/input';
import { debounce } from 'lodash';

const useUserFilter = () => {
  const [search, setSearch] = useState<string>('');

  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [isBanned, setIsBanned] = useState<boolean>();
  const [isVip, setIsVip] = useState<boolean>();
  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = useTablePagination();
  const computtedFilter = useMemo(() => {
    const filters: ISearchUser = {
      ...parsedPagination,
      ...(search && { name: search }),
      ...(phoneNumber && { phoneNumber }),
      ...(isBanned && { isBanned }),
      ...(isVip && { isVip }),
    };
    return filters;
  }, [search, parsedPagination]);
  const handleInputSearch: SearchProps['onInput'] = debounce((event) => {
    handleResetPagination();
    setSearch((event.target as HTMLInputElement).value);
  }, 500);
  const handleInputPhoneNumber: SearchProps['onInput'] = debounce((event) => {
    handleResetPagination();
    setPhoneNumber((event.target as HTMLInputElement).value);
  }, 500);
  const handleSelectIsBanned = (isBanned: boolean | undefined) => {
    setIsBanned(isBanned);
    handleResetPagination();
  };
  const handleSelectIsVip = (isVip: boolean | undefined) => {
    setIsVip(isVip);
    handleResetPagination();
  };

  return {
    handleInputSearch,
    pagination,
    handleChangePagination,
    computtedFilter,

    handleInputPhoneNumber,
    handleSelectIsBanned,
    handleSelectIsVip,
  };
};
export default useUserFilter;
