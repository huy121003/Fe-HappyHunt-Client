import useTablePagination from "@/hooks/useTablePagination";
import { useMemo, useState } from "react";
import { ISearchWard } from "../data/interface";
import { SearchProps } from "antd/es/input";
import { debounce } from "lodash";

const useWardFilter = () => {
  const [search, setSearch] = useState<string>("");
  const [district, setdistrict] = useState<number | undefined>();
  const [province, setprovince] = useState<number | undefined>();
  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = useTablePagination();
  const computtedFilter = useMemo(() => {
    const filters: ISearchWard = {
      ...parsedPagination,
      name: search || "",
      ...(district && { district }),
      ...(province && { province }),
    };
    return filters;
  }, [search, parsedPagination]);
  const handleInputSearch: SearchProps["onInput"] = debounce((event) => {
    handleResetPagination();
    setSearch((event.target as HTMLInputElement).value);
  }, 500);
  const handleSelectDistrict = (value: number) => {
    setdistrict(value);
    handleResetPagination();
  };
  const handleSelectProvince = (value: number) => {
    setprovince(value);
    handleResetPagination();
    setdistrict(undefined);
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
