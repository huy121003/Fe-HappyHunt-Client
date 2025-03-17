import React, { useEffect } from "react";
import { Layout } from "antd";
import Header from "./Header/Header";
import { useLocation } from "react-router-dom";

const { Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo && window.scrollTo(0, 0);
  }, [pathname, window.scrollY]);

  return (
    <Layout className="w-full h-full bg-gray-100">
      <Header />
      <Content
        className="mt-[100px] h-[calc(100vh-100px)]
       overflow-x-hidden "
      >
        {children}
      </Content>
    </Layout>
  );
};

export default AppLayout;
