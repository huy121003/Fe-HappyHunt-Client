import ContentLayout from "@/components/layouts/ContentLayout";
import { API_KEY } from "@/features/categories/data/constants";
import CategoryService from "@/features/categories/service";
import PostFilter from "@/features/post-category-parent/components/PostFilter";
import { useQuery } from "@tanstack/react-query";
import { Flex, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";

function PostCategoryParentPage() {
  const navigate = useNavigate();
  const { slugCategory } = useParams<string>();

  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.GET_CATEGORY_BY_SLUG, slugCategory],
    queryFn: async () => {
      const res = await CategoryService.getBySlug(String(slugCategory));
      return res.data;
    },
  });

  const { data: children, isLoading: isLoadingChildren } = useQuery({
    queryKey: [API_KEY.GET_CATEGORIES_CHILDREN, data?._id],
    queryFn: async () => {
      if (!data) return [];
      const res = await CategoryService.getChildren(data._id);
      return res.data;
    },
  });

  if (isLoading || isLoadingChildren) {
    return (
      <Flex align="center" justify="center" className="min-h-screen">
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <ContentLayout
      mb={100}
      title={
        <div className="flex items-center gap-1">
          <h1
            className="text-sm font-semibold text-flame-orange cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </h1>
          <h1 className="text-sm font-semibold text-gray-400">{"/"}</h1>
          <h1 className="text-sm font-semibold text-gray-400 ">{data?.name}</h1>
        </div>
      }
    >
      <Flex gap={10} className="w-full">
        <PostFilter
          attributes={data?.attributes || []}
          childrenLength={children?.length || 0}
        />
        <div className="flex-1">
          {/* Content area - Add your posts/items grid here */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Available Items</h2>
            {/* Add your content here */}
          </div>
        </div>
      </Flex>
    </ContentLayout>
  );
}

export default PostCategoryParentPage;
