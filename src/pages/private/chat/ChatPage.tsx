import ContentLayout from "@/components/layouts/ContentLayout";
import ChatHistoryList from "@/features/chat/component/ChatHistoryList";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Flex } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ChatPageProps {
  children: React.ReactNode;
}

const ChatPage: React.FC<ChatPageProps> = ({ children }) => {
  const { slugChat } = useParams();
  const [showChat, setShowChat] = useState(slugChat ? false : true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  useEffect(() => {
    if (slugChat) {
      setShowChat(false);
    } else {
      setShowChat(true);
    }
  }, [slugChat]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  const handleToggleChat = () => {
    setShowChat((prev) => !prev);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  return (
    <ContentLayout
      title={
        <Breadcrumb>
          <Breadcrumb.Item
            className="text-lg font-semibold text-gray-400 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-lg font-semibold text-flame-orange cursor-pointer">
            Chat
          </Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Flex className="w-full h-[calc(100vh-200px)] lg:flex-row flex-col">
        {!isMobile ? (
          <>
            <ChatHistoryList onClose={handleCloseChat} />
            {children}
          </>
        ) : (
          <>
            {showChat ? (
              <ChatHistoryList onClose={handleCloseChat} />
            ) : (
              <>
                {" "}
                <Button
                  icon={<UnorderedListOutlined className="text-2xl" />}
                  className="m-2"
                  onClick={() => {
                    navigate("/chat");
                    handleToggleChat();
                  }}
                />
                {children}
              </>
            )}
          </>
        )}
      </Flex>
    </ContentLayout>
  );
};

export default ChatPage;
