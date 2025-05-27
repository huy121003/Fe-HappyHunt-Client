import { EPostStatus, ESort } from "@/features/posts/data/constant";
import { ISearchPost } from "@/features/posts/data/interface";
import usePagination from "@/hooks/usePagination";
import { useMemo, useState } from "react";

const usePostCategoryFilter = () => {
  const [category, setCategory] = useState<number>();
  const [categoryParent, setCategoryParent] = useState<number>();
  const [status, setStatus] = useState<EPostStatus>(EPostStatus.SELLING);
  const [sort, setSort] = useState<ESort>(ESort.NEWEST);
  const [attribute, setAttribute] = useState<
    {
      name: string;
      value: string;
    }[]
  >([]);
  const [search, setSearch] = useState<string>("");
  const [isIndividual, setIsIndividual] = useState<boolean | null>(null);
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
      ...(isIndividual !== null && { isIndividual }),
      ...(province && { province }),
      ...(district && { district }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(search && { q: search }),
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
  const handleSetSearch = (value: string) => {
    setSearch(value);
    handleResetPagination();
  };
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
        value === "true" ? true : value === "false" ? false : null;
      setIsIndividual(isIndividual);
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
    if (!newAttribute.value) {
      setAttribute((prevAttributes) =>
        prevAttributes.filter((attr) => attr.name !== newAttribute.name)
      );
      return;
    }
    setAttribute((prevAttributes) => {
      if (newAttribute.value === "all") {
        return prevAttributes.filter((attr) => attr.name !== newAttribute.name);
      }

      const existingAttr = prevAttributes.find(
        (attr) => attr.name === newAttribute.name
      );

      if (existingAttr) {
        // Cập nhật giá trị thay vì xóa
        return prevAttributes.map((attr) =>
          attr.name === newAttribute.name
            ? { ...attr, value: newAttribute.value }
            : attr
        );
      }

      // Thêm giá trị mới nếu chưa có
      return [...prevAttributes, newAttribute];
    });

    handleResetPagination();
  };

  return {
    computtedFilter,
    handleSetSearch,
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
