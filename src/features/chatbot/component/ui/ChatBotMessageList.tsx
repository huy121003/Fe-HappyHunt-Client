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
 lg:w-[calc(100vw/4)] lg:h-[calc(100vh/1.5)]
 md:w-[calc(100vw/2)] md:h-[calc(100vh/1.5)]
 sm:w-[calc(100vw/1.5)] sm:h-[calc(100vh/1.5)]
 w-[calc(100vw-50px)] h-[calc(100vh-100px)]
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
                src="https://cdn0.iconfinder.com/data/icons/chatbot-10/128/chatbot-chat-robot-bot-face-message-communication-1024.png"
                size={50}
              />
              <Typography.Title level={5}>HappyHunt Assistant</Typography.Title>
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
