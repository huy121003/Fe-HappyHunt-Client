import { CloseOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, Typography } from "antd";
import { motion } from "framer-motion";
import ChatBotCard from "./ChatBotCard";
import { useEffect, useRef } from "react";
import { container } from "@/libs/motion";
import ChatBotForm from "../form/ChatBotForm";
import { IMessageChatbot } from "../../data/interface";
function ChatBotMessageList({
  onCancel,
  message,
  onSend,
  setMessage,
  isPending,
}: {
  onCancel: () => void;
  message: IMessageChatbot[];
  onSend: (message: string) => void;
  setMessage: React.Dispatch<React.SetStateAction<IMessageChatbot[]>>;
  isPending: boolean;
}) {
  const messageListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [message]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.3 }}
    >
      <Flex
        vertical
        className="
  w-[400px] h-[500px]
  rounded-lg
  border-2 border-gray-300
  hover:border-orange-500
  absolute
  bg-gray-100
  z-50
  right-10 bottom-6
  "
      >
        <Flex
          className="
      rounded-t-lg
      p-4 bg-white
      "
        >
          <Flex justify="space-between" align="center" className="w-full">
            <Flex align="center" gap={10} justify="center">
              <Avatar
                src="https://cdn-icons-png.flaticon.com/512/6014/6014401.png"
                size={50}
              />
              <Typography.Title level={5}>Support Assistant</Typography.Title>
            </Flex>

            <Button type="text" icon={<CloseOutlined />} onClick={onCancel} />
          </Flex>
        </Flex>
        <motion.div
          ref={messageListRef}
          variants={container}
          initial="hidden"
          animate="show"
          className="flex h-full flex-col gap-4 p-4 overflow-y-auto"
        >
          {message.map((item, index) => (
            <ChatBotCard key={index} item={item} />
          ))}
          {isPending && (
            <ChatBotCard item={{ sender: "bot", content: "Thinking..." }} />
          )}
        </motion.div>
        <ChatBotForm onSend={onSend} setMessage={setMessage} />
      </Flex>
    </motion.div>
  );
}

export default ChatBotMessageList;
