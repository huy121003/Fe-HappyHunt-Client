import React from "react";
import { Layout } from "antd";
import Header from "./Header";

const { Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppCategoryLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Layout className="w-full h-full bg-gray-100">
      <Header />
      <Content
        className="mt-[100px] h-[calc(100vh-100px)]
       overflow-y-auto overflow-x-hidden"
      >
        {children}
      </Content>
    </Layout>
  );
};

export default AppCategoryLayout;
