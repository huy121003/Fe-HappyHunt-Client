import ContentLayout from "@/components/layouts/ContentLayout";
import { API_KEY as API_KEY_POSTS } from "@/features/posts/data/constant";

import PostFilter from "@/features/post-category/components/PostFilter";
import { ESort } from "@/features/posts/data/constant";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Card, Flex } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PostService from "@/features/posts/service";
import TabsIndividual from "@/features/post-category/components/TabsIndividual";
import SortBy from "@/features/post-category/components/SortBy";
import usePostCategoryFilter from "@/features/post-category/hooks/usePostCategoryFilter";
import PostListing from "@/features/post-category/components/PostListing";
import { CNotFoundPage } from "@/components";
function SearchPostPage() {
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
  } = usePostCategoryFilter();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("q");
  const navigate = useNavigate();
  const [showListType, setShowListType] = useState<"grid" | "list">("grid");

  // const { data, isLoading } = useQuery({
  //   queryKey: [API_KEY.GET_CATEGORY_BY_SLUG, slugCategory],
  //   queryFn: async () => {
  //     const res = await CategoryService.getBySlug(String(slugCategory));
  //     return res.data;
  //   },
  // });
  useEffect(() => {
    handleSetSearch(searchValue || "");
    handleSelectSort(ESort.RELEVANCE);
  }, [searchValue]);

  const {
    data: postData,
    isLoading: postLoading,
    isFetched: postFetched,
  } = useQuery({
    queryKey: [API_KEY_POSTS.POST_CATEGORY, computtedFilter],
    queryFn: async () => {
      const res = await PostService.getAllPagination(computtedFilter);

      return res.data;
    },
  });

  if (!postData && postFetched) {
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
        <Breadcrumb>
          <Breadcrumb.Item
            className="text-lg font-semibold text-flame-orange cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-lg font-semibold text-gray-400">
            Search
          </Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Flex gap={10} className="w-full">
        <Flex gap={10} className="w-full flex-col">
          <Card
            className={`${postData?.documentList.length === 0 && "bg-gray-100"}`}
            headStyle={{ backgroundColor: "white" }}
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
          attributes={[]}
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

export default SearchPostPage;
