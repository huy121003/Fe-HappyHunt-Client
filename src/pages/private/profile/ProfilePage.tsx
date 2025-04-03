import { CLoadingPage } from "@/components";
import ContentLayout from "@/components/layouts/ContentLayout";
import PostListStatus from "@/features/profile/components/PostListStatus";
import ProfileInfo from "@/features/profile/components/ProfileInfo";
import { API_KEY } from "@/features/profile/data/constant";
import ProfileService from "@/features/profile/service";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Divider, Flex } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Bottom from "@/components/layouts/AppLayout/Bottom/Bottom";
const ProfilePage = () => {
  const { slugProfile } = useParams<{ slugProfile: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.PROFILE, slugProfile],
    queryFn: async () => {
      const response = await ProfileService.getBySlug(String(slugProfile)); // Replace with your API call
      return response.data;
    },
  });
  if (isLoading || !isFetched) return <CLoadingPage />;
  return (
    <>
      {" "}
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
              <Breadcrumb.Item className="text-lg font-semibold text-flame-orange  cursor-pointer">
                {data?.name}
                {"'s Profile"}
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
        }
      >
        <Flex className="w-full lg:flex-row flex-col" gap={10}>
          {data && <ProfileInfo data={data} />}
          {data?._id && <PostListStatus id={data?._id} />}
        </Flex>
      </ContentLayout>
      <Divider />
      <Bottom />
    </>
  );
};

export default ProfilePage;
