import { useQuery } from "@tanstack/react-query";
import React from "react";
import { API_KEY } from "../../data/constant";
import { API_KEY as API_KEY_PROFILE } from "@/features/profile/data/constant";
import EvaluateService from "../../service";
import { CLoadingPage, CNotFoundPage } from "@/components";
import ContentLayout from "@/components/layouts/ContentLayout";
import { Avatar, Breadcrumb, Card, Flex, Rate, Tabs, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import ProfileService from "@/features/profile/service";
interface EvaluateLayoutProps {
  children: React.ReactNode;
}
function EvaluateLayout({ children }: EvaluateLayoutProps) {
  const navigate = useNavigate();
  const { slugProfile } = useParams();
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: [API_KEY_PROFILE.PROFILE],
    queryFn: async () => {
      const res = await ProfileService.getBySlug(String(slugProfile));
      return res.data;
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.EVALUATE_COUNT, profile?._id],
    queryFn: async () => {
      const res = await EvaluateService.count(Number(profile?._id));
      return res.data;
    },
    enabled: !!profile?._id,
  });
  const { data: countEvaluate, isLoading: isLoadingCountEvaluate } = useQuery({
    queryKey: [API_KEY.EVALUATE_COUNT_EVALUATE, profile?._id],
    queryFn: async () => {
      const res = await EvaluateService.countEvaluate(Number(profile?._id));
      return res.data;
    },
    enabled: !!profile?._id,
  });
  if (isLoadingCountEvaluate || isLoadingProfile || isLoading)
    return <CLoadingPage />;
  if (!profile) return <CNotFoundPage />;
  return (
    <>
      <ContentLayout
        title={
          <Breadcrumb>
            <Breadcrumb.Item
              className="text-lg font-semibold text-gray-500 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="text-lg font-semibold text-gray-500 cursor-pointer"
              onClick={() => navigate(`/profile/${profile.slug}`)}
            >
              {profile.name}'s Profile
            </Breadcrumb.Item>
            <Breadcrumb.Item className="text-lg font-semibold text-flame-orange">
              Reviews
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Card
          className="w-full"
          title={
            <Flex gap={10} className="p-2">
              <Avatar src={profile.avatar} size={100} />
              <Flex vertical gap={5}>
                <Typography.Title level={3}>{profile.name}</Typography.Title>
                <Flex gap={10}>
                  <Rate disabled value={countEvaluate?.averageStar} allowHalf />
                  <Typography.Text>
                    {countEvaluate?.count} reviews
                  </Typography.Text>
                </Flex>
              </Flex>
            </Flex>
          }
        >
          <Tabs
            defaultActiveKey="all"
            onChange={(key) => {
              navigate(`/profile/${profile.slug}/reviews/${key}`);
            }}
            items={[
              {
                label: `All (${data?.totalEvaluate})`,
                key: "",
                children: children,
              },
              {
                label: `Buyer (${data?.evaluateByBuyer})`,
                key: "buyer",
                children: children,
              },
              {
                label: `Seller (${data?.evaluateBySeller})`,
                key: "seller",
                children: children,
              },
            ]}
          />
        </Card>
      </ContentLayout>
    </>
  );
}

export default EvaluateLayout;
