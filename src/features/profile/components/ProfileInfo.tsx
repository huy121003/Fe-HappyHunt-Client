import React, { useState } from "react";
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
  Tooltip,
  Rate,
  Avatar,
} from "antd";
import CButton from "@/components/buttons/CButton";
import {
  ShareAltOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  EditOutlined,
  TeamOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { postMessageHandler } from "@/components/mesage/ToastMessage";
import { useAppSelector } from "@/redux/reduxHook";
import useFollowerState from "@/features/follow/hooks/useFollowerState";
import TimeAgo from "@/components/ui/TimeAgo";
import { useNavigate } from "react-router-dom";
import { EGender } from "../data/constant";
import ReportModal from "@/features/report/components/ui/ReportModal";
import { ETargetType } from "@/features/report/data/constant";

interface IProfileInfoProps {
  data: IProfile;
}

const ProfileInfo: React.FC<IProfileInfoProps> = ({ data }) => {
  const naviagte = useNavigate();
  const [open, setOpen] = useState(false);
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
      className=" w-full lg:w-1/3 min-h-[calc(100vh/2)] border-0 shadow-lg "
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
            {data?.avatar ? (
              <Image
                src={data.avatar}
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
            ) : (
              <Avatar
                size={120}
                className="rounded-full border-4 border-white absolute"
                style={{
                  left: "24px",
                  bottom: "-60px",
                  backgroundColor: "#241f1f",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                {data.name.charAt(0).toUpperCase()}
              </Avatar>
            )}
          </div>

          {/* User Info */}
          <Flex vertical className="px-6 pt-3 w-full" gap={4}>
            <Flex align="center" gap={8}>
              <span className="font-semibold text-3xl">{data.name}</span>
              {data.gender && data.gender === EGender.MALE ? (
                <i className="fas fa-mars text-blue-500 text-3xl"></i>
              ) : data.gender === EGender.FEMALE ? (
                <i className="fas fa-venus text-pink-500 text-3xl"></i>
              ) : (
                data.gender === EGender.OTHER && (
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
            <Tooltip title="View Reviews">
              <Flex
                className="w-full"
                gap={10}
                {...(evaluateData?.averageStar !== 0 && {
                  onClick: () => naviagte(`/profile/${data.slug}/reviews`),
                })}
              >
                <Flex gap={10}>
                  <Flex>
                    <Rate
                      disabled
                      allowHalf
                      value={evaluateData?.averageStar}
                    />
                    <span className="text-gray-500">
                      {"("} {evaluateData?.count || 0} Reviews{" )"}
                    </span>
                  </Flex>
                </Flex>
              </Flex>
            </Tooltip>
            <Divider />
            <Flex className="mb-3 gap-10 w-full justify-between">
              <Tooltip title="View Followers">
                <Flex
                  justify="center"
                  align="center"
                  className="py-2 px-4 rounded-lg cursor-pointer w-full hover:bg-gray-50 transition-all duration-200 border border-gray-200"
                  {...(followData?.follower !== 0 && {
                    onClick: () => naviagte(`/profile/${data.slug}/followers`),
                  })}
                >
                  <Flex vertical align="center" gap={2}>
                    <span className="text-2xl font-bold text-gray-800">
                      {followData?.follower || 0}
                    </span>
                    <span className="text-sm text-gray-500">Followers</span>
                  </Flex>
                </Flex>
              </Tooltip>

              <Tooltip title="View Following">
                <Flex
                  justify="center"
                  align="center"
                  className="py-2 px-4 rounded-lg cursor-pointer w-full hover:bg-gray-50 transition-all duration-200 border border-gray-200"
                  {...(followData?.following !== 0 && {
                    onClick: () => naviagte(`/profile/${data.slug}/following`),
                  })}
                >
                  <Flex vertical align="center" gap={2}>
                    <span className="text-2xl font-bold text-gray-800">
                      {followData?.following || 0}
                    </span>
                    <span className="text-sm text-gray-500">Following</span>
                  </Flex>
                </Flex>
              </Tooltip>
            </Flex>

            <Divider style={{ margin: "16px 0" }} />

            {/* Actions */}
            <Flex vertical className="w-full" gap={10}>
              {!isOwner ? (
                <>
                  {" "}
                  <CButton
                    type="primary"
                    icon={<TeamOutlined />}
                    className="w-full h-10"
                    onClick={handleFollowToggle}
                  >
                    {followDetailData ? "Unfollow" : "Follow"}
                  </CButton>
                  <CButton
                    danger
                    icon={<ExclamationCircleOutlined />}
                    onClick={() => setOpen(true)}
                    className="w-full h-10"
                    style={{ borderRadius: "8px" }}
                  >
                    Report Account
                  </CButton>
                </>
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
          <ReportModal
            open={open}
            setOpen={setOpen}
            target={data._id}
            targetType={ETargetType.ACCOUNT}
          />
        </Flex>
      )}
    </Card>
  );
};

export default ProfileInfo;
