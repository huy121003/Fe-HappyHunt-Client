import { IChatItem } from "../data/interface";
import { Flex, Typography } from "antd";
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
  return (
    <Flex
      onClick={() => {
        navigate(`/chat/${item.slug}`);
        onClose();
        onReadMessage();
      }}
      gap={10}
      align="center"
      justify="space-between"
      className={`p-2 w-full border-b-1 border-gray-200 hover:shadow-md transition-all duration-300 py-2 hover:bg-orange-50 cursor-pointer rounded-lg ${
        slugChat === item.slug ? "bg-orange-200" : ""
      }`}
    >
      <Flex className=" " justify="start" align="center" gap={10}>
        <Image
          width={70}
          height={70}
          className="rounded-full"
          src={
            account._id !== item.seller._id
              ? item.seller.avatar
              : item.buyer.avatar
          }
          preview={false}
        />
        <Flex vertical gap={5}>
          <Flex gap={10} align="center">
            <Typography.Title level={4}>
              {account._id !== item.seller._id
                ? item.seller.name
                : item.buyer.name}
            </Typography.Title>
            <Typography.Text>
              <TimeAgo
                date={
                  item?.lastMessage?.timeSend
                    ? item?.lastMessage?.timeSend
                    : item?.createdAt
                }
              />
            </Typography.Text>
          </Flex>
          <span className="text-gray-500 text-xl font-semibold">
            {item.post.name}
            {/* {truncateWithDots(item?.post?.name, 20)} */}
          </span>
          <span className="text-gray-500 text-sm font-semibold">
            {item.lastMessage && (
              <Flex
                gap={10}
                className={`
                ${
                  item.lastMessage.sender !== account._id &&
                  item.lastMessage.status === EStatusMessage.SENT
                    ? "text-black"
                    : "text-gray-500"
                }`}
              >
                {item.lastMessage.sender === account._id
                  ? "You: "
                  : `${
                      item.lastMessage.sender === item.seller._id
                        ? item.seller.name
                        : item.buyer.name
                    } :`}
                <Flex gap={10} align="center">
                  {item?.lastMessage?.image && <i className="fas fa-image"></i>}
                  <span className=" text-sm ">
                    {item.lastMessage.message &&
                      truncateWithDots(item.lastMessage.message, 20)}
                  </span>
                </Flex>
              </Flex>
            )}
          </span>
        </Flex>
      </Flex>
      <Image
        src={item.post?.images[0]?.url}
        width={100}
        height={100}
        preview={false}
        className="rounded-lg"
      />
    </Flex>
  );
}

export default ChatCard;
