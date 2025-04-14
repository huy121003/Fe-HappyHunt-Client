import { Card, Skeleton } from "antd";
import { useEffect, useState, useRef } from "react";
import { IMessageItem } from "../../data/interface";
import { useAppSelector } from "@/redux/reduxHook";

import useMessageFilter from "../../hooks/useMessageFilter";
import { IPage } from "@/interfaces";
import { ESocketNamespace } from "@/constants";
import { motion } from "framer-motion";
import { container } from "@/libs/motion";

import { useChatSocketProvider } from "@/features/chat/hooks/useChatSocketProvider";
import TypingIndicator from "@/components/TypingIndicator";

import MessageCard from "./MessageCard";
import { useSocketListenerWithResponse } from "@/hooks/useSocketListenerWithResponse";
import EvaluateShow from "@/features/evaluates/components/ui/EvaluateShow";
import { useQuery } from "@tanstack/react-query";
import { API_KEY } from "@/features/evaluates/data/constant";
import EvaluateService from "@/features/evaluates/service";

interface MessageListProps {
  chat: number;
  post: number;
  isSeller: boolean;
  target: number;
}

function MessageList({ chat, post, isSeller, target }: MessageListProps) {
  const { computedFilter } = useMessageFilter();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const chatSocket = useChatSocketProvider();
  const [messages, setMessages] = useState<IMessageItem[]>([]);
  const account = useAppSelector((state) => state.auth.account);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [typing, setTyping] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [showEvaluate, setShowEvaluate] = useState<boolean>(false);
  const {
    data: evaluate,
    isFetched,
    isLoading,
  } = useQuery({
    queryKey: [API_KEY.EVALUATE_DETAIL, post, target],
    queryFn: async () => {
      const response = await EvaluateService.getOne(post, target);
      return response.data;
    },
  });
  useEffect(() => {
    setShowEvaluate(false);
    if (total >= 10 && !evaluate && isFetched && !isLoading) {
      setShowEvaluate(true);
    }
  }, [evaluate, isFetched, isLoading, total, target]);
  // Fetch initial messages
  useEffect(() => {
    if (!chatSocket) return;

    setMessages([]); // Reset messages when chat changes
    setIsInitialLoad(true);

    chatSocket.emit("fetch_messages", {
      ...computedFilter,
      chat: chat,
    });
  }, [chatSocket, chat, computedFilter]);

  // Socket listener for message history
  useSocketListenerWithResponse(
    ESocketNamespace.chat,
    "message_history",
    (data: IPage<IMessageItem[]>) => {
      if (data && data.documentList) {
        setLoading(false);

        setMessages((prev) => {
          const newMessages = [...prev, ...data.documentList];
          if (isInitialLoad) {
            setTimeout(() => {
              scrollToBottom();
              setIsInitialLoad(false);
            }, 100);
          }
          return newMessages;
        });

        setTotal(data.totalDocuments);
      }
    }
  );

  // Socket listener for new messages
  useSocketListenerWithResponse(
    ESocketNamespace.chat,
    "new_message",
    (newMessage: IMessageItem) => {
      setMessages((prev) => [newMessage, ...prev]);
      // Schedule scroll to bottom after the new message is rendered
      setTimeout(scrollToBottom, 100);
    }
  );
  useSocketListenerWithResponse(
    ESocketNamespace.chat,
    "message_read",
    (data: IMessageItem[]) => {
      if (data.length === 0) return;

      setMessages((prev) =>
        prev.map((msg) => data.find((item) => item._id === msg._id) || msg)
      );
    }
  );
  useSocketListenerWithResponse(ESocketNamespace.chat, "user_typing", (_) => {
    setTyping(true);
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  });
  useSocketListenerWithResponse(
    ESocketNamespace.chat,
    "user_stop_typing",
    (_) => {
      setTyping(false);
    }
  );

  const onReadMessage = () => {
    if (!chatSocket) return;
    chatSocket.emit("read_message", {
      chat: chat,
      sender: messages.filter((msg) => msg.sender._id !== account?._id)[0]
        ?.sender?._id,
    });
  };
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  // Auto-scroll when messages change if user was already at bottom
  useEffect(() => {
    if (messages.length > 0 && messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      const isAtBottom =
        container.scrollHeight - container.clientHeight <=
        container.scrollTop + 50;

      if (isAtBottom || isInitialLoad) {
        scrollToBottom();
      }
    }
  }, [messages, isInitialLoad]);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    onReadMessage();
    if (total === messages.length || loading || isLoadingMore) return;

    const { scrollTop } = e.currentTarget;
    const scrollPosition = scrollTop;
    const threshold = 100;

    // Check if scrolling up and near the top
    if (scrollPosition < threshold && scrollPosition < lastScrollTop) {
      setIsLoadingMore(true);
      setLoading(true);

      chatSocket?.emit("fetch_messages", {
        ...computedFilter,
        page: Math.ceil(messages.length / (computedFilter.size ?? 10)) + 1,
        chat: chat,
      });

      // Add a small delay to prevent rapid consecutive loads
      setTimeout(() => {
        setIsLoadingMore(false);
      }, 500);
    }

    setLastScrollTop(scrollPosition);
  };

  return (
    <Card
      className="w-full !rounded-none overflow-y-auto bg-gray-50"
      onScroll={onScroll}
      ref={messagesContainerRef}
      onClick={onReadMessage}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col-reverse gap-10 p-4"
      >
        <div ref={messagesEndRef} />
        {messages.map((message) => {
          const isOwnMessage = message.sender._id === account?._id;
          const isLastMessage =
            message._id ===
            messages.filter((msg) => msg.sender._id === account?._id)[0]?._id;

          return (
            <MessageCard
              key={message._id}
              message={message}
              isOwnMessage={isOwnMessage}
              isLastMessage={isLastMessage}
            />
          );
        })}
        {loading && (
          <div className="flex justify-center w-full py-2">
            <Skeleton.Input active style={{ width: 300 }} />
          </div>
        )}
      </motion.div>
      {typing && <TypingIndicator />}
      {showEvaluate && (
        <EvaluateShow
          target={target}
          post={post}
          isSeller={isSeller}
          setShow={setShowEvaluate}
        />
      )}
    </Card>
  );
}

export default MessageList;
