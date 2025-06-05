import { Avatar, Button, Card, Flex, Image, Tooltip, Typography } from "antd";

import { IFollowItem } from "../data/interface";
import useFollowerState from "../hooks/useFollowerState";
import { useLocation, useNavigate } from "react-router-dom";
import FollowService from "../service";
import { useAppSelector } from "@/redux/reduxHook";
import { useMutation } from "@tanstack/react-query";
interface IProps {
  item: IFollowItem;
}
function FollowCard({ item }: IProps) {
  const location = useLocation();
  const { onSuccess } = useFollowerState();
  const isFollowers = location.pathname.includes("followers");
  const avatarUrl = isFollowers
    ? item.createdBy?.avatar
    : item?.following?.avatar;
  const naviagte = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: async (item: IFollowItem) => {
      const response = await FollowService.remove(item.following._id);
      return response.data;
    },
    onSuccess: () => {
      onSuccess(`Successfully unfollowed `);
    },
  });
  const handleUnfollow = (item: IFollowItem) => {
    mutate(item);
  };
  const account = useAppSelector((state) => state.auth.account);

  return (
    <Tooltip
      key={item._id}
      title={isFollowers ? item.createdBy?.name : item?.following?.name}
    >
      <Card
        key={item._id}
        className="w-full hover hover:border-flame-orange shadow-sm mb-4 hover:shadow-lg transition-all duration-300"
      >
        <Flex
          gap={10}
          className="w-full"
          justify="space-between"
          align="center"
        >
          <Flex
            gap={10}
            align="center"
            className="w-full cursor-pointer"
            onClick={() =>
              naviagte(
                `/profile/${isFollowers ? item.createdBy?.slug : item?.following?.slug}`
              )
            }
          >
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt=""
                width={60}
                height={60}
                preview={false}
                className="rounded-full w-10 h-10"
              />
            ) : (
              <Avatar
                size={60}
                className="bg-gray-300 text-gray-700 border border-gray-200"
                style={{ fontSize: "24px" }}
              >
                {isFollowers
                  ? item.createdBy?.name.charAt(0).toUpperCase()
                  : item?.following?.name.charAt(0).toUpperCase()}
              </Avatar>
            )}
            <Typography.Title
              level={5}
              className="m-0 text-gray-800 font-semibold"
            >
              {isFollowers ? item.createdBy?.name : item?.following?.name}
            </Typography.Title>
          </Flex>
          {!isFollowers && account?._id !== item?.following?._id && (
            <Button
              icon={<i className="fas fa-user-minus" />}
              size="large"
              onClick={() => handleUnfollow(item)}
              loading={isPending}
            >
              Unfollow
            </Button>
          )}
        </Flex>
      </Card>
    </Tooltip>
  );
}

export default FollowCard;
