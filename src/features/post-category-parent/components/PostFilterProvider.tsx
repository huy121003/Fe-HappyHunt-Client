import { createContext, useContext } from "react";
import usePostCategoryFilter from "../hooks/usePostCategoryFilter";

const PostFilterContext = createContext<any>(null);

export const PostFilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const postFilter = usePostCategoryFilter();
  return (
    <PostFilterContext.Provider value={postFilter}>
      {children}
    </PostFilterContext.Provider>
  );
};

export const usePostFilterContext = () => useContext(PostFilterContext);
