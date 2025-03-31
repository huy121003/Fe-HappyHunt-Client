import ContentLayout from "@/components/layouts/ContentLayout";
import { API_KEY } from "@/features/categories/data/constants";
import { API_KEY as API_KEY_POSTS } from "@/features/posts/data/constant";
import CategoryService from "@/features/categories/service";
import PostFilter from "@/features/post-category/components/PostFilter";
import { ESort } from "@/features/posts/data/constant";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Flex } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PostService from "@/features/posts/service";
import TabsIndividual from "@/features/post-category/components/TabsIndividual";
import SortBy from "@/features/post-category/components/SortBy";
import usePostCategoryFilter from "@/features/post-category/hooks/usePostCategoryFilter";
import PostListing from "@/features/post-category/components/PostListing";
import { CLoadingPage, CNotFoundPage } from "@/components";

function PostCategoryPage() {
  const {
    pagination,
    handleChangePagination,
    handleSetSearch,
    handleSelectIsIndividual,
    computtedFilter,
    handleSelectSort,
    handleSelectAttribute,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleSelectProvince,
    handleSelectDistrict,
    handleSelectCategory,
    handleSelectCategoryParent,
  } = usePostCategoryFilter();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("q");
  const navigate = useNavigate();
  const { slugChildCategory } = useParams<string>();
  const [showListType, setShowListType] = useState<"grid" | "list">("grid");

  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.GET_CATEGORY_BY_SLUG, slugChildCategory],
    queryFn: async () => {
      const res = await CategoryService.getBySlug(String(slugChildCategory));
      return res.data;
    },
  });
  useEffect(() => {
    handleSetSearch(searchValue || "");
    handleSelectSort(ESort.RELEVANCE);
    handleSelectCategoryParent(data?.parent?._id);
    handleSelectCategory(data?._id);
  }, [searchValue, data]);
  const {
    data: postData,
    isLoading: postLoading,
    isFetched: postFetched,
  } = useQuery({
    queryKey: [API_KEY_POSTS.POST_CATEGORY_CHILDREN, computtedFilter],
    queryFn: async () => {
      const res = await PostService.getAllPagination(computtedFilter);

      return res.data;
    },
  });

  if (isLoading) {
    return <CLoadingPage />;
  }

  if (!data) {
    return (
      <Flex align="center" justify="center" className="min-h-screen">
        <CNotFoundPage />
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
          <h1
            className="text-sm font-semibold text-flame-orange cursor-pointer"
            onClick={() => {
              navigate(`/category/${data?.parent?.slug}`);
            }}
          >
            {data?.parent?.name}
          </h1>
          <h1 className="text-sm font-semibold text-flame-orange">{"/"}</h1>
          <h1 className="text-sm font-semibold text-gray-400 ">{data?.name}</h1>
        </div>
      }
    >
      <Flex gap={10} className="w-full">
        <Flex gap={10} className="w-full flex-col">
          <Card
            title={
              <TabsIndividual
                handleSelectIsIndividual={handleSelectIsIndividual}
              />
            }
            extra={
              <Flex gap={10} justify="end" align="center">
                <SortBy handleSelectSort={handleSelectSort} />
                <Button
                  size="large"
                  type="text"
                  onClick={() => {
                    setShowListType(showListType === "grid" ? "list" : "grid");
                  }}
                  icon={
                    showListType === "grid" ? (
                      <AppstoreOutlined />
                    ) : (
                      <BarsOutlined />
                    )
                  }
                />
              </Flex>
            }
          >
            <PostListing
              data={postData?.documentList || []}
              pagiantion={{
                ...pagination,
                total: postData?.totalDocuments || 0,
              }}
              onChange={handleChangePagination}
              showListType={showListType}
              loading={postLoading || !postFetched}
            />
          </Card>
        </Flex>
        <PostFilter
          attributes={data?.attributes || []}
          childrenLength={0}
          handleSelectAttribute={handleSelectAttribute}
          handleMinPriceChange={handleMinPriceChange}
          handleMaxPriceChange={handleMaxPriceChange}
          handleSelectProvince={handleSelectProvince}
          handleSelectDistrict={handleSelectDistrict}
          computtedFilter={computtedFilter}
        />
      </Flex>
    </ContentLayout>
  );
}

export default PostCategoryPage;
