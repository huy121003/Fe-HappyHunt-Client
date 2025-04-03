import CSelect from "@/components/form/CSelect";
import { ESort } from "@/features/posts/data/constant";
import React from "react";
import { useLocation } from "react-router-dom";
interface SortByProps {
  handleSelectSort: (sort: ESort) => void;
}
const SortBy: React.FC<SortByProps> = ({ handleSelectSort }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("q");

  return (
    <CSelect
      size="large"
      defaultValue={
        searchValue
          ? {
              values: [ESort.RELEVANCE],
              label: "Relevance",
            }
          : {
              values: [ESort.NEWEST],
              label: "Newest",
            }
      }
      className="min-w-[180px] shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300"
      onChange={handleSelectSort}
      options={[
        ...(searchValue
          ? [{ value: ESort.RELEVANCE, label: "Most Relevant" }]
          : []),
        {
          value: ESort.NEWEST,
          label: "Newest First",
        },
        {
          value: ESort.HIGHEST_PRICE,
          label: "Price: High to Low",
        },
        {
          value: ESort.LOWEST_PRICE,
          label: "Price: Low to High",
        },
      ]}
      style={{
        borderColor: "#e5e7eb",
        backgroundColor: "white",
      }}
    />
  );
};

export default SortBy;
