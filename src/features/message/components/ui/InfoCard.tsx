import { IAccount } from "@/features/chat/data/interface";

import { EPostStatus } from "@/features/posts/data/constant";
import { IPost } from "@/features/posts/data/interface";
import { useSocketListenerWithResponse } from "@/hooks/useSocketListenerWithResponse";
import { useSocketProvider } from "@/hooks/useSocketProvider";
import { Avatar, Card, Flex, Image, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface IProps {
  post: IPost;
  user: IAccount;
}
function InfoCard({ post, user }: IProps) {
  const [isOnline, setIsOnline] = useState<{
    accountId: number;
    status: "online" | "offline";
  }>({
    accountId: user._id,
    status: "offline",
  });
  const socket = useSocketProvider();
  useEffect(() => {
    socket?.emit("get_status_account", {
      accountId: user._id,
      targetAccountId: user._id,
    });
  }, [socket, user._id]);
  useSocketListenerWithResponse(
    "status_account",
    (data: { accountId: number; status: "online" | "offline" }) => {
      if (data.accountId === user._id) {
        setIsOnline(data);
      }
    }
  );
  const navigate = useNavigate();
  return (
    <>
      <Card
        className={`!p-0 !m-0  w-full flex-col flex rounded-none
      
        `}
      >
        <Flex
          gap={10}
          align="center"
          onClick={() => {
            navigate(`/profile/${user.slug}`);
          }}
        >
          {user.avatar ? (
            <Image
              src={user.avatar}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <Avatar
              size={40}
              className="bg-gray-300"
              style={{ fontSize: "20px" }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
          )}
          <Flex vertical>
            <Typography.Title level={4}>{user.name}</Typography.Title>
            <Flex gap={5} align="center">
              <div
                className={` rounded-full
                  ${isOnline.status === "online" ? "bg-green-500 p-2" : ""}
                  `}
              />
              <span
                className={`${isOnline.status === "online" ? "text-green-500" : "text-red-500"}`}
              >
                {isOnline.status === "online" && "Online"}
              </span>
            </Flex>
          </Flex>
        </Flex>
      </Card>
      <Card
        {...(post.status === EPostStatus.SELLING &&
          user.isBanned && {
            onClick: () => navigate(`/detail-post/${post.slug}`),
          })}
        className={`!p-0 !m-0 rounded-none   ${post.status !== EPostStatus.SELLING ? "bg-gray-100" : ""}`}
      >
        <Flex gap={10} align="center">
          <Image
            src={post.images[0].url}
            width={60}
            height={60}
            className="rounded-lg"
          />
          <Flex gap={5} vertical>
            <Typography.Title level={4}>{post.name}</Typography.Title>

            {post.status !== EPostStatus.SELLING ? (
              <span className="text-gray-500">This post is hidden or sold</span>
            ) : (
              <span className="text-red-500 font-bold">
                {post.price.toLocaleString()} VNĐ
              </span>
            )}
          </Flex>
        </Flex>
      </Card>
    </>
  );
}

export default InfoCard;
