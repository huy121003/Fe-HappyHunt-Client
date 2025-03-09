import React from "react";
import { Layout } from "antd";
import Header from "./Header/Header";
import Bottom from "./Bottom/Bottom";

const { Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Layout className="w-full h-full ">
      <Header />
      <Content className="mt-[100px] ">
        {children}
       
      </Content>
    </Layout>
  );
};

export default AppLayout;
