import { EPostStatus, ESort } from "@/features/posts/data/constant";
import { ISearchPost } from "@/features/posts/data/interface";
import usePagination from "@/hooks/usePagination";
import { SearchProps } from "antd/es/input";
import { debounce } from "lodash";
import { useMemo, useState } from "react";

const usePostCategoryFilter = () => {
  const [category, setCategory] = useState<number>();
  const [categoryParent, setCategoryParent] = useState<number>();
  const [status, setStatus] = useState<EPostStatus>(EPostStatus.SELLING);
  const [sort, setSort] = useState<ESort>(ESort.RELEVANCE);
  const [attribute, setAttribute] = useState<
    {
      name: string;
      value: string;
    }[]
  >([]);
  const [search, setSearch] = useState<string>("");
  const [isIndividual, setIsIndividual] = useState<boolean>(false);
  const [province, setProvince] = useState<number>();
  const [district, setDistrict] = useState<number>();
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();

  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = usePagination();

  const computtedFilter = useMemo(() => {
    const filters: ISearchPost = {
      ...parsedPagination,
      ...(category && { category }),
      ...(categoryParent && { categoryParent }),
      ...(status && { status }),
      ...(sort && { sort }),
      ...(attribute && { attribute }),
      ...(isIndividual && { isIndividual }),
      ...(province && { province }),
      ...(district && { district }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
    };
    return filters;
  }, [
    parsedPagination,
    category,
    categoryParent,
    status,
    sort,
    attribute,
    isIndividual,
    province,
    district,
    minPrice,
    maxPrice,
    search,
  ]);
  const handleInputSearch: SearchProps["onInput"] = debounce((event) => {
    handleResetPagination();
    setSearch((event.target as HTMLInputElement).value);
  }, 500);
  const handleStatusChange = (status: EPostStatus) => {
    setStatus(status);
    handleResetPagination();
  };
  const handleSelectCategory = (category: number | undefined) => {
    setCategory(category);
    handleResetPagination();
  };
  const handleSelectCategoryParent = (categoryParent: number | undefined) => {
    setCategoryParent(categoryParent);
    handleResetPagination();
  };
  const handleSelectIsIndividual = (value: string | null | undefined) => {
    if (value) {
      const isIndividual =
        value === "true" ? true : value === "false" ? false : undefined;
      setIsIndividual(isIndividual ?? false);
    }
    handleResetPagination();
  };

  const handleSelectProvince = (province: number) => {
    setProvince(province);
    setDistrict(undefined);
    handleResetPagination();
  };
  const handleSelectDistrict = (district: number) => {
    setDistrict(district);
    handleResetPagination();
  };
  const handleSelectSort = (sort: ESort) => {
    setSort(sort);
    handleResetPagination();
  };

  // New handlers for direct number input from CPriceRange
  const handleMinPriceChange = (value: number | undefined) => {
    setMinPrice(value);
    handleResetPagination();
  };

  const handleMaxPriceChange = (value: number | undefined) => {
    setMaxPrice(value);
    handleResetPagination();
  };
  const handleSelectAttribute = (newAttribute: {
    name: string;
    value: string;
  }) => {
    if (newAttribute.value === "all") {
      setAttribute(attribute.filter((attr) => attr.name !== newAttribute.name));
    } else if (attribute.find((attr) => attr.name === newAttribute.name)) {
      setAttribute(attribute.filter((attr) => attr.name !== newAttribute.name));
    } else {
      setAttribute([...attribute, newAttribute]);
    }
    handleResetPagination();
  };
  return {
    computtedFilter,
    handleInputSearch,
    handleStatusChange,
    handleSelectCategory,
    handleSelectCategoryParent,
    handleSelectIsIndividual,
    handleSelectProvince,
    handleSelectDistrict,
    handleMinPriceChange,
    handleMaxPriceChange,
    pagination,
    handleChangePagination,
    handleResetPagination,
    handleSelectAttribute,
    handleSelectSort,
  };
};

export default usePostCategoryFilter;
