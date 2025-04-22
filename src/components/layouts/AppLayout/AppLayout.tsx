import React, { useEffect, useRef } from "react";
import { Layout } from "antd";
import Header from "./Header/Header";
import { useLocation } from "react-router-dom";
import { useSocketProvider } from "@/hooks/useSocketProvider";
import { useAppSelector } from "@/redux/reduxHook";
import ChatBot from "@/features/chatbot/component/ui/ChatBot";

const { Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const socket = useSocketProvider();
  const account = useAppSelector((state) => state.auth?.account);
  useEffect(() => {
    socket?.emit("online", account._id);
  }, [socket, account._id]);
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);

  // Solution 1: Use both window and content element scrolling
  useEffect(() => {
    // Try scrolling the window
    window.scrollTo(0, 0);

    // Also try scrolling the content element
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }

    // Alternative approach with timeout to ensure DOM is ready
    setTimeout(() => {
      window.scrollTo(0, 0);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    }, 100);
  }, [location]); // Using the entire location object as dependency

  return (
    <Layout className="w-full h-full bg-white">
      <Header />
      <Content
        ref={contentRef}
        className="mt-[100px] h-[calc(100vh-100px)]
       overflow-y-auto overflow-x-hidden"
      >
        <ChatBot />
        {children}
      </Content>
    </Layout>
  );
};

export default AppLayout;
