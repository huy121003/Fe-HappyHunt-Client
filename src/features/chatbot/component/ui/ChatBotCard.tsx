import { itemAnimation } from "@/libs/motion";
import { useAppSelector } from "@/redux/reduxHook";
import { Avatar, Typography } from "antd";

import { motion } from "framer-motion";

interface IChatBotCardProps {
  item: {
    sender: "user" | "bot";
    content: string;
  };
}
function ChatBotCard({ item }: IChatBotCardProps) {
  const account = useAppSelector((state) => state.auth.account);
  return (
    <motion.div
      variants={itemAnimation}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      className={`flex gap-2 ${
        item.sender === "user" ? "justify-end" : "justify-start"
      } w-full`}
    >
      {item.sender === "bot" && (
        <Avatar
          src=" https://cdn-icons-png.flaticon.com/512/6014/6014401.png"
          size={30}
        />
      )}
      <span
        className={`wrap p-2 rounded-lg  text-white w-2/3
        ${item.sender === "user" ? "bg-orange-500" : "bg-black"}
        `}
      >
        <Typography.Paragraph
          className="text-wrap break-words text-white"
          style={{ whiteSpace: "pre-line" }}
        >
          {item.content}
        </Typography.Paragraph>
      </span>
      {item.sender === "user" &&
        (account?.avatar ? (
          <Avatar src={account?.avatar} size={30} />
        ) : (
          <i className="fa-solid fa-user text-2xl"></i>
        ))}
    </motion.div>
  );
}

export default ChatBotCard;
