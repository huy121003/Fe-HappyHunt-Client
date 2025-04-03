import { CLoadingPage } from "@/components";
import useFollowerFilter from "@/features/follow/hooks/useFollowerFilter";
import { API_KEY } from "@/features/profile/data/constant";
import { API_KEY as API_KEY_FOLLOW } from "@/features/follow/data/constant";
import ProfileService from "@/features/profile/service";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FollowService from "@/features/follow/service";
import ContentLayout from "@/components/layouts/ContentLayout";
import { Breadcrumb, Card, Flex, Pagination } from "antd";
import FollowList from "@/features/follow/components/FollowList";

function FollowPage() {
  const navigate = useNavigate();
  const { slugProfile } = useParams();
  const location = useLocation();
  const isFollowers = location.pathname.includes("followers");

  const { computtedFilter, pagination, handleChangePagination } =
    useFollowerFilter();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.PROFILE, slugProfile],
    queryFn: async () => {
      const response = await ProfileService.getBySlug(String(slugProfile)); // Replace with your API call
      return response.data;
    },
  });
  const {
    data: followData,
    isLoading: isLoadingFollow,
    isFetched: isFetchedFollow,
  } = useQuery({
    queryKey: [API_KEY_FOLLOW.FOLLOW, computtedFilter, data?._id, isFollowers],
    queryFn: async () => {
      if (!data?._id) return;
      const response = await FollowService.getAllFollow(Number(data?._id), {
        ...computtedFilter,
        ...(isFollowers ? { type: "followers" } : { type: "following" }),
      });
      return response.data;
    },
  });
  if (isLoading || !isFetched || !isFetchedFollow || isLoadingFollow)
    return <CLoadingPage />;

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
            {data?.name && (
              <Breadcrumb.Item
                className="text-lg font-semibold text-gray-400 cursor-pointer"
                onClick={() => {
                  navigate(`/profile/${data?.slug}`);
                }}
              >
                {data?.name}
                {"'s Profile"}
              </Breadcrumb.Item>
            )}

            <Breadcrumb.Item className="text-lg font-semibold text-flame-orange  cursor-pointer">
              {isFollowers ? "Followers" : "Following"}
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Card className="w-full min-h-screen">
          {followData &&
            (followData?.documentList.length === 0 ? (
              <Flex className="w-full h-full items-center justify-center">
                <h1 className="text-2xl font-semibold text-gray-500">
                  No data
                </h1>
              </Flex>
            ) : (
              <>
                <FollowList data={followData?.documentList} />
                <Flex className="w-full" justify="end" gap={10}>
                  <Pagination
                    defaultCurrent={1}
                    total={followData?.totalDocuments}
                    showSizeChanger
                    showTotal={(total) => `Total ${total} items`}
                    onChange={handleChangePagination}
                    pageSize={pagination?.pageSize ?? 10}
                    className="custom-pagination"
                  />
                </Flex>
              </>
            ))}
        </Card>
      </ContentLayout>
    </>
  );
}

export default FollowPage;
