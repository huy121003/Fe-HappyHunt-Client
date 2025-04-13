// ChatHistoryList.tsx
import { useEffect, useState } from "react";
import { ESocketNamespace } from "@/constants";
import useChatFilter from "../hooks/useChatFilter";
import { IChatItem, ISearchChat } from "../data/interface";
import { useChatSocketProvider } from "../hooks/useChatSocketProvider";
import { IPage } from "@/interfaces";
import { Button, Card, Dropdown, Menu, Typography, Skeleton } from "antd";
import { motion } from "framer-motion";
import { container, itemAnimation } from "@/libs/motion";
import { useAppSelector } from "@/redux/reduxHook";
import { ETypeMessage } from "../data/constant";
import ChatCard from "./ChatCard";
import { useSocketListenerWithResponse } from "@/hooks/useSocketListenerWithResponse";

interface IChatHistoryListProps {
  onClose: () => void;
}

function ChatHistoryList({ onClose }: IChatHistoryListProps) {
  const account = useAppSelector((state) => state.auth?.account);
  const [chatHistory, setChatHistory] = useState<IChatItem[]>([]);
  const [countNotRead, setCountNotRead] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const { computedFilter, handleChangeViewType, viewType } = useChatFilter();
  const socket = useChatSocketProvider();
  useEffect(() => {
    if (!socket) return;
    const payload: ISearchChat = computedFilter;

    setChatHistory([]);
    socket.emit("fetch_chat_history", payload);
    socket.emit("count_not_read", account?._id);
    return () => {
      socket.off("chat_history");
      socket.off("count_not_read");
    };
  }, [computedFilter, socket]);

  useSocketListenerWithResponse(
    ESocketNamespace.chat,
    "chat_history",
    (data: IPage<IChatItem[]>) => {
      if (data && data.documentList) {
        setChatHistory((prev) => [...prev, ...data.documentList]);
        setTotal(data.totalDocuments);
      }
    }
  );
  useSocketListenerWithResponse(
    ESocketNamespace.chat,
    "chat_updated",
    (data: IChatItem) => {
      if (chatHistory.find((item) => item._id === data._id)) {
        setChatHistory((prev) => [
          data,
          ...prev.filter((item) => item._id !== data._id),
        ]);
      } else {
        setChatHistory((prev) => [data, ...prev]);
      }
    }
  );
  useSocketListenerWithResponse(
    ESocketNamespace.chat,
    "chat_read",
    (data: IChatItem) => {
      setChatHistory((prev) =>
        prev.map((item) => (item._id === data._id ? data : item))
      );
    }
  );
  useSocketListenerWithResponse(
    ESocketNamespace.chat,
    "count_not_read",
    (data: number) => {
      setCountNotRead(data);
    }
  );
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (total === chatHistory.length || isLoadingMore) return;

    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const scrollPosition = scrollTop;
    const threshold = scrollHeight - clientHeight - 100;

    // Check if scrolling down and near the bottom
    if (scrollPosition > threshold && scrollPosition > lastScrollTop) {
      setIsLoadingMore(true);

      socket?.emit("fetch_chat_history", {
        ...computedFilter,
        page: Math.ceil(chatHistory.length / (computedFilter.size ?? 10)) + 1,
      });

      // Add a small delay to prevent rapid consecutive loads
      setTimeout(() => {
        setIsLoadingMore(false);
      }, 500);
    }

    setLastScrollTop(scrollPosition);
  };
  const menu = (
    <Menu
      items={[
        {
          key: "all",
          label: "All",
          onClick: () => handleChangeViewType(ETypeMessage.ALL),
        },
        {
          key: "seller",
          label: "I am seller",
          onClick: () => handleChangeViewType(ETypeMessage.SELLER),
        },
        {
          key: "buyer",
          label: "I am buyer",
          onClick: () => handleChangeViewType(ETypeMessage.BUYER),
        },
        {
          key: "notRead",
          label: `Not read (${countNotRead})`,
          onClick: () => handleChangeViewType(ETypeMessage.NOT_READ),
        },
      ]}
    />
  );

  return (
    <Card className="lg:w-1/3  w-full !p-0 !m-0 rounded-none ">
      <Dropdown overlay={menu}>
        <Button
          icon={<i className="fas fa-ellipsis-v mr-5 p-0"></i>}
          className="m-2"
        >
          <Typography.Text>
            {viewType === ETypeMessage.SELLER
              ? "I am seller"
              : viewType === ETypeMessage.BUYER
                ? "I am buyer"
                : viewType === ETypeMessage.NOT_READ
                  ? `Not read (${countNotRead})`
                  : "All"}
          </Typography.Text>
        </Button>
      </Dropdown>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full "
      >
        <div
          className="w-full overflow-y-auto max-h-[calc(100vh-300px)] custom-scrollbar"
          onScroll={onScroll}
        >
          {chatHistory.map((item) => (
            <motion.div
              key={item._id}
              variants={itemAnimation}
              className="group"
            >
              <ChatCard item={item} onClose={onClose} />
            </motion.div>
          ))}
          {isLoadingMore && (
            <div className="flex justify-center w-full py-2">
              <Skeleton.Input active style={{ width: 300 }} />
            </div>
          )}
        </div>
      </motion.div>
    </Card>
  );
}

export default ChatHistoryList;
