import { API_KEY } from "@/features/chat/data/constant";
import ChatService from "@/features/chat/service";
import MessageForm from "@/features/message/components/form/MessageForm";
import InfoCard from "@/features/message/components/ui/InfoCard";
import MessageList from "@/features/message/components/ui/MessageList";
import { IMessagePayload } from "@/features/message/data/interface";
import useMessageFilter from "@/features/message/hooks/useMessageFilter";
import { useSocketProvider } from "@/hooks/useSocketProvider";

import { useAppSelector } from "@/redux/reduxHook";
import { useQuery } from "@tanstack/react-query";
import { Card, Flex, Image, Spin } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function MessagePage() {
  const accountBlock = useAppSelector(
    (state) => state.auth.account.accountBlock as number[]
  );
  const blockAccount = useAppSelector(
    (state) => state.auth.account.blockAccount as number[]
  );
  const postBlock = useAppSelector(
    (state) => state.auth.account.postBlock as number[]
  );

  const { slugChat } = useParams();
  const { computedFilter } = useMessageFilter();
  const account = useAppSelector((state) => state.auth.account);

  const socket = useSocketProvider();

  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.CHAT_DETAIL, slugChat],
    queryFn: async () => {
      const response = await ChatService.getBySlug(slugChat as string);
      return response.data;
    },
  });
  useEffect(() => {
    if (!socket) return;
    socket.emit("join_chat", data?._id);

    return () => {
      socket?.emit("leave_chat", data?._id);
      socket?.off("message_history");
      socket?.off("new_message");
    };
  }, [socket, slugChat, computedFilter, data?._id]);

  const handleSendMessage = (data: IMessagePayload) => {
    socket?.emit("send_message", data);
  };
  if (isLoading || !isFetched)
    return (
      <Card className="lg:w-2/3 w-full h-full !p-0 flex justify-center items-center">
        <Spin />
      </Card>
    );
  if (
    !data ||
    (account._id !== data?.buyer._id && account._id !== data?.seller._id)
  )
    return (
      <Card className="lg:w-2/3 w-full h-full !p-0 flex flex-col justify-center items-center">
        <Image src="./image8.png" width={100} height={100} preview={false} />
        <span className="text-2xl text-gray-500">Chat not found</span>
      </Card>
    );

  return (
    <Flex vertical className="lg:w-2/3 w-full h-full !p-0 !m-0">
      <InfoCard
        post={data.post}
        user={account._id !== data.seller._id ? data.seller : data.buyer}
      />
      <Flex className="flex-1 flex overflow-hidden">
        <MessageList
          chat={data._id}
          post={data.post._id}
          isSeller={account._id === data.seller._id}
          target={
            data.buyer._id === account._id ? data.seller._id : data.buyer._id
          }
          isBanned={!data.buyer.isBanned || !data.seller.isBanned}
        />
      </Flex>
      {data.buyer.isBanned &&
      data.seller.isBanned &&
      !accountBlock?.includes(data.buyer._id) &&
      !accountBlock?.includes(data.seller._id) &&
      !blockAccount?.includes(data.buyer._id) &&
      !blockAccount?.includes(data.seller._id) &&
      !postBlock?.includes(data.post._id) ? (
        <MessageForm
          onFinish={handleSendMessage}
          chat={data._id}
          message={
            data.post.category
              ? data.buyer._id === account._id
                ? data.post.category.messages.map(
                    (message) => message.messageSeller
                  )
                : data.post.category.messages.map(
                    (message) => message.messageBuyer
                  )
              : data.buyer._id === account._id
                ? data.post.categoryParent.messages.map(
                    (message) => message.messageBuyer
                  )
                : data.post.categoryParent.messages.map(
                    (message) => message.messageSeller
                  )
          }
        />
      ) : (
        <Card className="w-full !p-0 !m-0 rounded-none border-t border-gray-200">
          <Flex justify="center" align="center" className="h-full">
            <span className="text-xl text-gray-500 font-semibold">
              {accountBlock?.includes(data.buyer._id) ||
              accountBlock?.includes(data.seller._id)
                ? "You have blocked this user"
                : blockAccount?.includes(data.buyer._id) ||
                    blockAccount?.includes(data.seller._id)
                  ? "You have been blocked by this user"
                  : postBlock?.includes(data.post._id) &&
                    "This post has been blocked"}
            </span>
            <span className="text-xl text-gray-500 font-semibold">
              . You cannot send messages to this user
            </span>
          </Flex>
        </Card>
      )}
    </Flex>
  );
}

export default MessagePage;
