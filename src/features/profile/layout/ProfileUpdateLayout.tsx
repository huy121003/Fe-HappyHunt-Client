import ContentLayout from "@/components/layouts/ContentLayout";
import { Breadcrumb, Card, Flex, Menu } from "antd";
import Bottom from "@/components/layouts/AppLayout/Bottom/Bottom";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface IProps {
  children: React.ReactNode;
}
function ProfileUpdateLayout({ children }: IProps) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <ContentLayout
        title={
          <Breadcrumb>
            <Breadcrumb.Item className="text-lg font-semibold text-flame-orange cursor-pointer">
              Home
            </Breadcrumb.Item>

            <Breadcrumb.Item className="text-lg font-semibold text-gray-400">
              Update Profile
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Flex className="w-full min-h-screen" gap={10}>
          <Card className="!border-none !p-0 max-h-[calc(100vh/2)]">
            <Menu
              className="!border-none !p-0"
              mode="inline"
              items={[
                {
                  label: "Change Profile",
                  key: "1",
                  onClick: () => navigate("/profile/me/change-profile"),
                },

                {
                  label: "Change Password",
                  key: "2",
                  onClick: () => navigate("/profile/me/change-password"),
                },
              ]}
              defaultSelectedKeys={
                location.pathname === "/profile/me/change-password"
                  ? ["2"]
                  : ["1"]
              }
            />
          </Card>
          <Card className="w-full">{children}</Card>
        </Flex>
      </ContentLayout>
      <Bottom />
    </>
  );
}

export default ProfileUpdateLayout;
