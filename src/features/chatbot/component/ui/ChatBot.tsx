import { useEffect, useState } from "react";
import ChatBotButton from "./ChatBotButton";
import { useAppSelector } from "@/redux/reduxHook";
import ChatBotMessageList from "./ChatBotMessageList";
import { IMessageChatbot } from "../../data/interface";
import { useMutation } from "@tanstack/react-query";
import QAChatbotsService from "../../service";
import { useLocation } from "react-router-dom";

function ChatBot() {
  const account = useAppSelector((state) => state.auth.account);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsVisible(false);
  }, [location]);
  const [message, setMessage] = useState<IMessageChatbot[]>([
    {
      sender: "bot",
      content: `Hello ${account?.name}, how can I help you today?`,
    },
  ]);
  const { mutate, isPending } = useMutation({
    mutationFn: async (question: string) => {
      const response = await QAChatbotsService.getAnswer({
        message: question,
        history: message,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setMessage((prev) => [
        ...prev,
        {
          sender: "bot",
          content: data,
        },
      ]);
    },
    onError: () => {
      setMessage((prev) => [
        ...prev,
        {
          sender: "bot",
          content: "Sorry,I can't answer that question.Please try again later",
        },
      ]);
    },
  });
  const onSend = (message: string) => {
    mutate(message);
  };

  return (
    <>
      {isVisible ? (
        <ChatBotMessageList
          onCancel={() => setIsVisible(false)}
          message={message}
          onSend={onSend}
          isPending={isPending}
          setMessage={setMessage}
        />
      ) : (
        <ChatBotButton onClick={() => setIsVisible(true)} />
      )}
    </>
  );
}

export default ChatBot;
