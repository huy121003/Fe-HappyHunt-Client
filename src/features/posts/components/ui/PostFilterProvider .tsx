import { createContext, useContext } from "react";
import usePostFilter from "../../hooks/usePostFilter";

const PostFilterContext = createContext<any>(null);

export const PostFilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const postFilter = usePostFilter();
  return (
    <PostFilterContext.Provider value={postFilter}>
      {children}
    </PostFilterContext.Provider>
  );
};

export const usePostFilterContext = () => useContext(PostFilterContext);
