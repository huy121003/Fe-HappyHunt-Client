import usePagination from "@/hooks/usePagination";
import { useMemo, useState } from "react";
import { ISearchFavoritePost } from "../data/interface";

 const useFavoritePostFilter = () => {
  const [post, setPost] = useState<number>();

  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = usePagination();

  const computedFilter = useMemo(() => {
    const filters: ISearchFavoritePost = {
      ...parsedPagination,
      ...(post && { post }),
    };
    return filters;
  }, [parsedPagination, post]);

  const handleChangePost = (value: number) => {
    setPost(value);
    handleResetPagination();
  };

  return {
    computedFilter,
    handleChangePagination,
    pagination,
    handleResetPagination,
    handleChangePost,
  };
};

export default useFavoritePostFilter;
