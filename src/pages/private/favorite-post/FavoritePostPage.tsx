import { CLoadingPage } from "@/components";
import ContentLayout from "@/components/layouts/ContentLayout";
import FavoritePostList from "@/features/favorite-posts/components/FavoritePostList";
import { API_KEY } from "@/features/favorite-posts/data/constant";
import useFavoritePostFilter from "@/features/favorite-posts/hooks/useFavoritePostFilter";
import FavoritePostService from "@/features/favorite-posts/service";
import { useAppSelector } from "@/redux/reduxHook";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Card, Flex, Image, Pagination } from "antd";
import { useNavigate } from "react-router-dom";

function FavoritePostPage() {
  const navigate = useNavigate();
  const account = useAppSelector((state) => state.auth.account);
  const { handleChangePagination, computedFilter, pagination } =
    useFavoritePostFilter();

  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.FAVORITE_POSTS, computedFilter],
    queryFn: async () => {
      const response = await FavoritePostService.getAll(computedFilter);
      return response.data;
    },
  });
  if (isLoading || !isFetched) return <CLoadingPage />;
  return (
    <>
      <ContentLayout
        title={
          <Breadcrumb>
            <Breadcrumb.Item
              className="text-lg font-semibold text-gray-400 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </Breadcrumb.Item>
            {account?.name && (
              <Breadcrumb.Item
                className="text-lg font-semibold text-gray-400  cursor-pointer"
                onClick={() => {
                  navigate(`/profile/${account?.slug}`);
                }}
              >
                {account?.name}
                {"'s Profile"}
              </Breadcrumb.Item>
            )}
            <Breadcrumb.Item className="text-lg font-semibold text-orange-500 cursor-pointer">
              Favorite Post
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Card className="w-full min-h-screen">
          {data && data.documentList?.length === 0 ? (
            <Flex className="w-full h-sereen items-center justify-center">
              <Image
                src="./image8.png"
                width={200}
                height={200}
                preview={false}
              />
            </Flex>
          ) : (
            <>
              <FavoritePostList data={data?.documentList || []} />
              <Flex className="w-full" justify="end" gap={10}>
                <Pagination
                  defaultCurrent={1}
                  total={data?.totalDocuments}
                  showSizeChanger
                  showTotal={(total) => `Total ${total} items`}
                  onChange={handleChangePagination}
                  pageSize={pagination?.pageSize ?? 10}
                  className="custom-pagination"
                />
              </Flex>
            </>
          )}
        </Card>
      </ContentLayout>
    </>
  );
}

export default FavoritePostPage;
