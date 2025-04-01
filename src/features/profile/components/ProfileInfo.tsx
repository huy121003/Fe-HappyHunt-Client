import React from "react";
import { IProfile } from "../data/interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_KEY } from "@/features/follow/data/constant";
import { API_KEY as API_KEY_EVALUATE } from "@/features/evaluates/data/constant";
import FollowService from "@/features/follow/service";
import EvaluateService from "@/features/evaluates/service";
import {
  Card,
  Flex,
  Image,
  Spin,
  Typography,
  Divider,
  Badge,
  Tooltip,
} from "antd";
import CButton from "@/components/buttons/CButton";
import {
  ShareAltOutlined,
  StarFilled,
  CalendarOutlined,
  EnvironmentOutlined,
  EditOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { postMessageHandler } from "@/components/mesage/ToastMessage";
import { useAppSelector } from "@/redux/reduxHook";
import { ESex } from "../data/constant";
import useFollowerState from "@/features/follow/hooks/useFollowerState";
import TimeAgo from "@/components/ui/TimeAgo";
import { useNavigate } from "react-router-dom";

interface IProfileInfoProps {
  data: IProfile;
}

const ProfileInfo: React.FC<IProfileInfoProps> = ({ data }) => {
  const naviagte = useNavigate();
  const { onSuccess } = useFollowerState();
  const account = useAppSelector((state) => state.auth?.account);

  const { data: followData, isLoading } = useQuery({
    queryKey: [API_KEY.FOLLOW_COUNT, data._id],
    queryFn: async () => {
      const response = await FollowService.count(data._id);
      return response.data;
    },
  });

  const { data: evaluateData, isLoading: isLoadingEvaluate } = useQuery({
    queryKey: [API_KEY_EVALUATE.EVALUATE_COUNT, data._id],
    queryFn: async () => {
      const response = await EvaluateService.countEvaluate(data._id);
      return response.data;
    },
  });

  const { data: followDetailData, isLoading: isLoadingFollowDetail } = useQuery(
    {
      queryKey: [API_KEY.FOLLOW_DETAIL, data._id],
      queryFn: async () => {
        const response = await FollowService.getById(data._id);
        return response.data;
      },
    }
  );

  const isOwner = account?._id === data._id;
  const isLoaded = !isLoading && !isLoadingFollowDetail && !isLoadingEvaluate;

  const handleShareProfile = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/profile/${data.slug}`
    );
    postMessageHandler({
      text: `Link to ${data.name}'s profile copied to clipboard!`,
      type: "success",
    });
  };
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: number) => {
      const response = await FollowService.create({
        following: id,
      });
      return response.data;
    },
    onSuccess: () => {
      onSuccess(`Successfully followed ${data.name}.`);
    },
  });
  const { mutate: unfollowMutate, isPending: unfollowIsPending } = useMutation({
    mutationFn: async (id: number) => {
      const response = await FollowService.remove(id);
      return response.data;
    },
    onSuccess: () => {
      onSuccess(`Successfully unfollowed ${data.name}.`);
    },
  });
  const handleFollowToggle = () => {
    if (followDetailData) unfollowMutate(data._id);
    else mutate(data._id);
    // Implement follow/unfollow logic here
  };

  return (
    <Card
      className=" w-full lg:w-1/3 min-h-[calc(100vh/2)] rounded-xl shadow-md "
      bordered={false}
    >
      {!isLoaded ? (
        <Flex className="w-full h-full justify-center items-center py-10">
          <Spin size="large" />
        </Flex>
      ) : (
        <Flex vertical className="w-full h-full" gap={6}>
          {/* Profile Header with Cover Background */}
          <div
            className="w-full lg:h-32 h-64 mb-16 relative"
            style={{
              backgroundImage: data.background && `url(${data.background})`,
              background: data.background
                ? `url(${data.background})`
                : "linear-gradient(135deg, #e5d75b 0%, #df6615 100%)",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <Badge
              count={
                evaluateData?.averageStar ? (
                  <Flex align="center" className="bg-white p-1 rounded-md">
                    <StarFilled
                      style={{ color: "#ffa41b", fontSize: "16px" }}
                    />
                    <span className="ml-1 font-semibold text-gray-800">
                      {evaluateData.averageStar}
                    </span>
                  </Flex>
                ) : null
              }
              offset={[-10, 10]}
            >
              <Image
                src={data.avatar || "https://via.placeholder.com/150"}
                alt={data.name}
                width={120}
                height={120}
                preview={false}
                className="rounded-full border-4 border-white absolute"
                style={{
                  left: "24px",
                  bottom: "-60px",
                  objectFit: "contain",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />
            </Badge>
          </div>

          {/* User Info */}
          <Flex vertical className="px-6 pt-3 w-full" gap={4}>
            <Flex align="center" gap={8}>
              <span className="font-semibold text-3xl">{data.name}</span>
              {data.sex && data.sex === ESex.MALE ? (
                <i className="fas fa-mars text-blue-500 text-3xl"></i>
              ) : data.sex === ESex.FEMALE ? (
                <i className="fas fa-venus text-pink-500 text-3xl"></i>
              ) : (
                data.sex === ESex.OTHER && (
                  <i className="fas fa-genderless text-gray-500 text-3xl"></i>
                )
              )}
            </Flex>

            <Typography.Paragraph
              style={{ whiteSpace: "pre-wrap" }}
              className="text-gray-600 leading-relaxed"
            >
              {data.description || "No description"}
            </Typography.Paragraph>

            {/* Stats */}
            <Flex className="w-full justify-between mb-3">
              <Tooltip title="Evaluations">
                <Flex vertical align="center" className="py-2 px-4 rounded-lg">
                  <span className="text-lg font-semibold text-gray-800">
                    {evaluateData?.count || 0}
                  </span>
                  <span className="text-xs text-gray-500">evaluations</span>
                </Flex>
              </Tooltip>

              <Tooltip title="Followers">
                <Flex vertical align="center" className="py-2 px-4 rounded-lg">
                  <span className="text-lg font-semibold text-gray-800">
                    {followData?.follower || 0}
                  </span>
                  <span className="text-xs text-gray-500">followers</span>
                </Flex>
              </Tooltip>

              <Tooltip title="Following">
                <Flex vertical align="center" className="py-2 px-4  rounded-lg">
                  <span className="text-lg font-semibold text-gray-800">
                    {followData?.following || 0}
                  </span>
                  <span className="text-xs text-gray-500">following</span>
                </Flex>
              </Tooltip>
            </Flex>

            <Divider style={{ margin: "16px 0" }} />

            {/* Actions */}
            <Flex vertical className="w-full" gap={10}>
              {!isOwner ? (
                <CButton
                  type="primary"
                  icon={<TeamOutlined />}
                  className="w-full h-10"
                  onClick={handleFollowToggle}
                >
                  {followDetailData ? "Unfollow" : "Follow"}
                </CButton>
              ) : (
                <CButton
                  type="primary"
                  icon={<EditOutlined />}
                  className="w-full h-10"
                  loading={isPending || unfollowIsPending}
                  onClick={() => naviagte("/profile/me/change-profile")}
                >
                  Edit Profile
                </CButton>
              )}

              <CButton
                type="default"
                icon={<ShareAltOutlined />}
                onClick={handleShareProfile}
                className="w-full h-10"
                style={{ borderRadius: "8px" }}
              >
                Share Profile
              </CButton>
            </Flex>

            <Divider style={{ margin: "16px 0" }} />

            {/* Additional Info */}
            <Flex vertical className="w-full" gap={12}>
              <Flex align="center" gap={8}>
                <CalendarOutlined
                  style={{ color: "#ff7e1d", fontSize: "18px" }}
                />
                <span className="text-gray-700 font-medium">Joined:</span>
                <span className="text-gray-500">
                  <TimeAgo date={data.createdAt} />
                </span>
              </Flex>

              <Flex align="center" gap={8}>
                <EnvironmentOutlined
                  style={{ color: "#ff7e1d", fontSize: "18px" }}
                />
                <span className="text-gray-700 font-medium">Location:</span>
                {data.address?.province?.name &&
                data.address?.district?.name ? (
                  <span className="text-gray-500">
                    {data.address?.province?.name +
                      ", " +
                      data.address?.district?.name}
                  </span>
                ) : (
                  <span className="text-gray-500">No location</span>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Card>
  );
};

export default ProfileInfo;
