import { IChatItem } from "../data/interface";
import { Flex, Typography, Avatar } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "@/redux/reduxHook";
import { Image } from "antd";
import TimeAgo from "@/components/ui/TimeAgo";
import { truncateWithDots } from "@/configs/truncateWithDots";
import { EStatusMessage } from "@/features/message/data/constant";
import { useSocketProvider } from "@/hooks/useSocketProvider";

interface IProps {
  item: IChatItem;
  onClose: () => void;
}

function ChatCard({ item, onClose }: IProps) {
  const { slugChat } = useParams();
  const socket = useSocketProvider();
  const navigate = useNavigate();
  const account = useAppSelector((state) => state.auth?.account);

  const onReadMessage = () => {
    if (!socket) return;
    socket.emit("read_message", {
      chat: item._id,
      sender: item.lastMessage.sender,
    });
  };

  const isCurrentChat = slugChat === item.slug;
  const isUnread =
    item.lastMessage?.sender !== account._id &&
    item.lastMessage?.status === EStatusMessage.SENT;

  const otherUser = account._id !== item.seller._id ? item.seller : item.buyer;

  return (
    <Flex
      onClick={() => {
        navigate(`/chat/${item.slug}`);
        onClose();
        onReadMessage();
      }}
      gap={12}
      align="flex-start"
      className={`
        p-3 w-full border-b border-gray-100 
        hover:bg-gray-50 transition-all duration-200 
        cursor-pointer group
        ${isCurrentChat ? "bg-blue-50 border-blue-200" : ""}
        ${isUnread ? "bg-orange-25" : ""}
      `}
    >
      {/* Avatar Section */}
      <div className="flex-shrink-0">
        <Avatar
          size={48}
          src={otherUser.avatar}
          alt={otherUser.name}
          className="border-2 border-gray-200"
        >
          {otherUser.name?.charAt(0)?.toUpperCase()}
        </Avatar>
      </div>

      {/* Content Section */}
      <Flex vertical gap={4} className="flex-1 min-w-0">
        {/* Header: Name and Time */}
        <Flex justify="space-between" align="center" className="w-full">
          <Typography.Text
            strong
            className={`text-base truncate ${isUnread ? "text-gray-900" : "text-gray-700"}`}
          >
            {otherUser.name}
          </Typography.Text>
          <Typography.Text className="text-xs text-gray-400 flex-shrink-0 ml-2">
            <TimeAgo date={item?.lastMessage?.timeSend || item?.createdAt} />
          </Typography.Text>
        </Flex>

        {/* Post Name */}
        <Typography.Text
          className="text-sm text-gray-600 font-medium leading-tight"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.post.name}
        </Typography.Text>

        {/* Last Message */}
        {item.lastMessage && (
          <Flex gap={6} align="center" className="w-full min-w-0">
            <Typography.Text
              className={`text-sm leading-tight ${
                isUnread ? "text-gray-900 font-medium" : "text-gray-500"
              }`}
            >
              {item.lastMessage.sender === account._id ? (
                <span className="text-gray-400">You: </span>
              ) : (
                <span className="text-gray-400">
                  {item.lastMessage.sender === item.seller._id
                    ? item.seller.name
                    : item.buyer.name}
                  :
                </span>
              )}

              <Flex gap={4} align="center" className="inline-flex">
                {item?.lastMessage?.image && (
                  <i className="fas fa-image text-gray-400 text-xs"></i>
                )}
                <span className="truncate">
                  {item.lastMessage.message
                    ? truncateWithDots(item.lastMessage.message, 30)
                    : item?.lastMessage?.image
                      ? "Photo"
                      : ""}
                </span>
              </Flex>
            </Typography.Text>
          </Flex>
        )}
      </Flex>

      {/* Post Image */}
      <div className="flex-shrink-0">
        <Image
          src={item.post?.images?.[0]?.url}
          width={60}
          height={60}
          preview={false}
          className="rounded-lg object-cover border border-gray-200"
          fallback="/api/placeholder/60/60"
        />
      </div>

      {/* Unread Indicator */}
      {isUnread && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
      )}
    </Flex>
  );
}

export default ChatCard;
