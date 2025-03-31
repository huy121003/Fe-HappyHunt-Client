import { CLoadingPage } from "@/components";
import ContentLayout from "@/components/layouts/ContentLayout";
import ProfileInfo from "@/features/profile/components/ProfileInfo";
import { API_KEY } from "@/features/profile/data/constant";
import ProfileService from "@/features/profile/service";
import { useQuery } from "@tanstack/react-query";
import { Flex } from "antd";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { slugProfile } = useParams<{ slugProfile: string }>();

  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.PROFILE, slugProfile],
    queryFn: async () => {
      const response = await ProfileService.getBySlug(String(slugProfile)); // Replace with your API call
      return response.data;
    },
  });
  if (isLoading || !isFetched) return <CLoadingPage />;
  return (
    <ContentLayout
      title={
        <div className="flex items-center gap-1">
          <h1 className="text-sm font-semibold text-flame-orange cursor-pointer">
            Home
          </h1>
          <h1 className="text-sm font-semibold text-gray-400">/</h1>
          {data?.name && (
            <h1 className="text-sm font-semibold text-gray-400 cursor-pointer">
              {data?.name}
              {"'s Profile"}
            </h1>
          )}
        </div>
      }
    >
      <Flex className="w-full" gap={10}>
        {data && <ProfileInfo data={data} />}
      </Flex>
    </ContentLayout>
  );
};

export default ProfilePage;
