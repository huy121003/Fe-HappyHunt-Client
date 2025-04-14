import { API_KEY } from "@/features/chat/data/constant";
import { useChatSocketProvider } from "@/features/chat/hooks/useChatSocketProvider";
import ChatService from "@/features/chat/service";
import MessageForm from "@/features/message/components/form/MessageForm";
import InfoCard from "@/features/message/components/ui/InfoCard";
import MessageList from "@/features/message/components/ui/MessageList";
import { IMessagePayload } from "@/features/message/data/interface";
import useMessageFilter from "@/features/message/hooks/useMessageFilter";

import { useAppSelector } from "@/redux/reduxHook";
import { useQuery } from "@tanstack/react-query";
import { Card, Flex, Image, Spin } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function MessagePage() {
  const { slugChat } = useParams();
  const { computedFilter } = useMessageFilter();
  const account = useAppSelector((state) => state.auth.account);

  const chatSocket = useChatSocketProvider();

  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.CHAT_DETAIL, slugChat],
    queryFn: async () => {
      const response = await ChatService.getBySlug(slugChat as string);
      return response.data;
    },
  });
  useEffect(() => {
    if (!chatSocket) return;
    chatSocket.emit("join_chat", data?._id);

    return () => {
      chatSocket?.emit("leave_chat", data?._id);
      chatSocket?.off("message_history");
      chatSocket?.off("new_message");
    };
  }, [chatSocket, slugChat, computedFilter, data?._id]);

  const handleSendMessage = (data: IMessagePayload) => {
    chatSocket?.emit("send_message", data);
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
        />
      </Flex>

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
    </Flex>
  );
}

export default MessagePage;
