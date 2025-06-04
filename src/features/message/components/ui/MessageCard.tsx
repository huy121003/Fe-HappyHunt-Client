import { Avatar, Image, Tooltip, Typography } from "antd";
import { motion } from "framer-motion";
import { CheckCircleOutlined } from "@ant-design/icons";
import { IMessageItem } from "../../data/interface";
import { timeSendMessage } from "@/configs/date.";
import { itemAnimation } from "@/libs/motion";
import { EStatusMessage } from "../../data/constant";
import { decryptMessage } from "@/configs/encrypt";
interface MessageCardProps {
  message: IMessageItem;
  isOwnMessage: boolean;
  isLastMessage: boolean;
}

const MessageCard = ({
  message,
  isOwnMessage,
  isLastMessage,
}: MessageCardProps) => {
  return (
    <motion.div
      variants={itemAnimation}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} w-full`}
    >
      <div
        className={`flex items-end gap-2 max-w-[70%] ${
          isOwnMessage ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <Tooltip title={`${timeSendMessage(message.timeSend)}`}>
          {message.sender.avatar ? (
            <Avatar
              src={message.sender.avatar}
              size={40}
              className="border-2 border-white shadow-sm"
            />
          ) : (
            <Avatar
              size={40}
              className="bg-gray-300 text-gray-700 border-2 border-white shadow-sm"
              icon={<i className="fas fa-user-circle text-2xl"></i>}
            />
          )}
        </Tooltip>

        <div
          className={`flex flex-col gap-1 ${
            isOwnMessage ? "items-end" : "items-start"
          }`}
        >
          {message.image && (
            <div className="rounded-lg overflow-hidden shadow-sm">
              <Image
                src={message.image}
                height={200}
                className="object-cover"
                preview
              />
            </div>
          )}
          {message.message && (
            <div
              className={`rounded-2xl px-4 py-2 shadow-sm ${
                isOwnMessage
                  ? "bg-orange-500 text-white"
                  : "bg-black text-white"
              }`}
            >
              <Typography.Paragraph
                className="text-wrap break-words text-white"
                style={{ whiteSpace: "pre-line" }}
              >
                {decryptMessage(message.message)}
              </Typography.Paragraph>
            </div>
          )}
          {isOwnMessage && isLastMessage && (
            <div className="text-xs text-gray-500 flex items-center">
              <CheckCircleOutlined className="mr-1" />
              {message.status === EStatusMessage.READ ? "Read" : "Sent"}{" "}
              {message.timeRead
                ? timeSendMessage(message.timeRead)
                : timeSendMessage(message.timeSend)}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageCard;
