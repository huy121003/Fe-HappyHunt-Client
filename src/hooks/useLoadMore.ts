import { IPagedResponse } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useRef, useState } from 'react';

const SIZE = 30;

export interface IFilters {
  page: number;
  size: number;
  search?: string | '';
}

interface IProps<T> {
  key: string;
  fetchFn: (filters: IFilters) => Promise<IPagedResponse<T[]>>;
}

const useLoadMore = <T>({ key, fetchFn }: IProps<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const filters = useRef<IFilters>({
    page: 0,
    size: SIZE,
    search: undefined,
  });

  const { isFetching, refetch } = useQuery({
    queryKey: [key, 'scroll'],
    queryFn: async () => {
      const result = await fetchFn(filters.current);

      return result?.data?.documentList || [];
    },
    retry: 0,
    staleTime: 0,
    enabled: false,
  });

  const onSuccess = (data: T[]) => {
    setHasMore(data?.length === SIZE);

    setItems((prev) => prev.concat(data));
  };

  const fetchData = async () => {
    const response = await refetch();

    if (filters.current.page === 0) setItems(() => []);
    if (response.isFetched && response.isSuccess)
      onSuccess(response.data as T[]);
  };

  const fetchMore = () => {
    filters.current.page += 1;
    fetchData();
  };

  const onSearch = debounce((value: string) => {
    setItems(() => []);

    filters.current.page = 0;
    filters.current.search = value || undefined;
    fetchData();
  }, 500);

  return {
    items,
    hasMore,
    loading: isFetching,
    fetchData,
    fetchMore,
    onSearch,
  };
};

export default useLoadMore;
