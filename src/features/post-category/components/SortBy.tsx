import CSelect from "@/components/form/CSelect";
import { ESort } from "@/features/posts/data/constant";
import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface SortByProps {
  handleSelectSort: (sort: ESort) => void;
}

const SortBy: React.FC<SortByProps> = ({ handleSelectSort }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("q");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
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
        className=" shadow-sm rounded-xl hover:shadow-md transition-all duration-300"
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
        dropdownStyle={{
          borderRadius: "12px",
          padding: "8px",
        }}
        dropdownRender={(menu) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {menu}
          </motion.div>
        )}
      />
    </motion.div>
  );
};

export default SortBy;
