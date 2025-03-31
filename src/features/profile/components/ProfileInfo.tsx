import React from "react";
import { IProfile } from "../data/interface";
import { useQuery } from "@tanstack/react-query";
import { API_KEY } from "@/features/follow/data/constant";
import { API_KEY as API_KEY_EVALUATE } from "@/features/evaluates/data/constant";
import FollowService from "@/features/follow/service";
import EvaluateService from "@/features/evaluates/service";
import { Card, Flex, Image, Spin, Typography } from "antd";
import CButton from "@/components/buttons/CButton";
import { ShareAltOutlined } from "@ant-design/icons";
import { postMessageHandler } from "@/components/mesage/ToastMessage";
import { useAppSelector } from "@/redux/reduxHook";
import { dayFormat } from "@/configs/date.";
interface IProfileInfoProps {
  data: IProfile;
}
const ProfileInfo: React.FC<IProfileInfoProps> = ({ data }) => {
  const account = useAppSelector((state) => state.auth?.account);
  const { data: followData, isLoading } = useQuery({
    queryKey: [API_KEY.FOLLOW_COUNT, data._id],
    queryFn: async () => {
      const response = await FollowService.count(data._id); // Replace with your API call
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
        const response = await FollowService.getById(data._id); // Replace with your API call
        return response.data;
      },
    }
  );

  return (
    <Card className="w-1/3 min-h-screen ">
      {isLoading ||
        isLoadingFollowDetail ||
        (isLoadingEvaluate ? (
          <Flex className="w-full h-full justify-center items-center">
            <Spin size="large" />
          </Flex>
        ) : (
          <Flex
            vertical
            className="w-full h-full"
            justify="center"
            align="center"
            gap={10}
          >
            <Flex className="w-full" gap={10} align="center">
              <Image
                src={data.avatar}
                alt="Profile"
                width={150}
                height={150}
                preview={false}
                className="rounded-full"
              />
              <Typography.Title level={3}>{data.name}</Typography.Title>
            </Flex>
            <Flex className="w-full" gap={10} align="center">
              {evaluateData && (
                <>
                  <span className=" font-bold text-2xl">
                    {evaluateData.averageStar}
                  </span>

                  <i className="fa-solid fa-star text-2xl text-flame-orange"></i>

                  <span className="text-2xl text-gray-400">
                    {"("} {evaluateData.count} evaluates {")"}
                  </span>
                </>
              )}
            </Flex>
            <Flex className="w-full" gap={10} align="center">
              {followData && (
                <>
                  <span className="  text-2xl">
                    {"("} {followData.following} following {" )"}
                  </span>
                  {"|"}
                  <span className="text-2xl text-gray-400">
                    {"("} {followData.follower} followers {")"}
                  </span>
                </>
              )}
            </Flex>
            <Flex className="w-full" gap={10} align="center">
              <Typography.Paragraph className="text-gray-400 text-start">
                {data.description ? data.description : "No description"}
              </Typography.Paragraph>
            </Flex>
            <CButton
              className="w-full"
              icon={<ShareAltOutlined />}
              onClick={() => {
                postMessageHandler({
                  text: `Copy link to  ${data.name} successfully`,
                  type: "success",
                });
                navigator.clipboard.writeText(
                  `${window.location.origin}/profile/${data.slug}`
                );
              }}
            >
              Share Profile
            </CButton>
            <CButton
              className="w-full"
              type="default"
              hidden={account?._id === data._id}
            >
              {followDetailData ? "Unfollow" : "Follow"}
            </CButton>
            <CButton className="w-full" type="default">
              Update Profile
            </CButton>
            <Flex className="w-full" gap={10} align="center">
              <i className="fa-solid fa-calendar-days text-2xl text-flame-orange"></i>
              <span className="text-2xl ">Participated: </span>
              <span className="text-2xl text-gray-400">
                {dayFormat(data.createdAt)}
              </span>
            </Flex>
            <Flex className="w-full" gap={10} align="center">
              <i className="fa-solid fa-location-dot text-2xl text-flame-orange"></i>
              <span className="text-2xl ">Address: </span>
              {/* {data?.address?.district} */}
            </Flex>
          </Flex>
        ))}
    </Card>
  );
};

export default ProfileInfo;
