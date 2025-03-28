import { useMemo, useState } from "react";
import { ISearchPost } from "../data/interface";
import { SearchProps } from "antd/es/input";
import { debounce } from "lodash";
import usePagination from "@/hooks/usePagination";
import { EPostStatus } from "../data/constant";
import { useLocation } from "react-router-dom";

const usePostFilter = () => {
  const [search, setSearch] = useState<string>("");

  const [category, setCategory] = useState<number>();
  const [categoryParent, setCategoryParent] = useState<number>();
  const [isIndividual, setIsIndividual] = useState<boolean>();
  const [city, setCity] = useState<number>();
  const [district, setDistrict] = useState<number>();
  const [ward, setWard] = useState<number>();
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const location = useLocation();

  // Lấy phần cuối cùng của pathname và chuyển thành chữ hoa
  const getStatusFromPath = (): EPostStatus => {
    const pathSegments = location.pathname.split("/").filter(Boolean); // Loại bỏ phần tử rỗng
    const lastSegment = pathSegments[
      pathSegments.length - 1
    ]?.toUpperCase() as EPostStatus;

    return Object.values(EPostStatus).includes(lastSegment)
      ? lastSegment
      : EPostStatus.SELLING;
  };

  const [status, setStatus] = useState<EPostStatus>(getStatusFromPath());


  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = usePagination();

  const computtedFilter = useMemo(() => {
    const filters: ISearchPost = {
      ...parsedPagination,
      ...(search && { name: search }),
      ...(category && { category }),
      ...(categoryParent && { categoryParent }),
      ...(isIndividual && { isIndividual }),
      ...(city && { city }),
      ...(district && { district }),
      ...(ward && { ward }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(status && { status }),
    };
    return filters;
  }, [
    search,
    parsedPagination,
    category,
    categoryParent,
    isIndividual,
    city,
    district,
    ward,
    minPrice,
    maxPrice,
    status,
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
  const handleSelectIsIndividual = (isIndividual: boolean | undefined) => {
    setIsIndividual(isIndividual);
    handleResetPagination();
  };
  const handleSelectCity = (city: number | undefined) => {
    setCity(city);
    handleResetPagination();
  };
  const handleSelectDistrict = (district: number | undefined) => {
    setDistrict(district);
    handleResetPagination();
  };
  const handleSelectWard = (ward: number | undefined) => {
    setWard(ward);
    handleResetPagination();
  };
  const handleSelectMinPrice = (minPrice: number | undefined) => {
    setMinPrice(minPrice);
    handleResetPagination();
  };
  const handleSelectMaxPrice = (maxPrice: number | undefined) => {
    setMaxPrice(maxPrice);
    handleResetPagination();
  };
  return {
    handleInputSearch,
    pagination,
    handleChangePagination,
    computtedFilter,
    handleSelectCategory,
    handleSelectCategoryParent,
    handleSelectIsIndividual,
    handleSelectCity,
    handleSelectDistrict,
    handleSelectWard,
    handleSelectMinPrice,
    handleSelectMaxPrice,
    handleStatusChange,
  };
};
export default usePostFilter;
