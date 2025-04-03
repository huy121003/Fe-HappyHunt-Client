import React, { useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/redux/reduxHook";
import { PlusOutlined, ShopOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Flex,
  Image,
  Spin,
  Tabs,
  Typography,
  Badge,
  Tooltip,
  Dropdown,
  Menu,
  Breadcrumb,
  Divider,
} from "antd";
import { API_KEY, EPostStatus } from "../data/constant";
import PostService from "../service";
import Bottom from "@/components/layouts/AppLayout/Bottom/Bottom";
import { CSearch } from "@/components";
import FilterLayout from "@/components/layouts/FilterLayout";

import ContentLayout from "@/components/layouts/ContentLayout";
import { usePostFilterContext } from "../components/ui/PostFilterProvider ";

interface Props {
  children: React.ReactNode;
}

const PostManagementLayout: React.FC<Props> = ({ children }) => {
  const account = useAppSelector((state) => state?.auth?.account);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch post status counts
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.POST_STATUS, account?._id],
    queryFn: async () => {
      const response = await PostService.countStatus(Number(account?._id));
      return response.data;
    },
  });

  const { handleInputSearch, handleStatusChange } = usePostFilterContext();

  // Tab configurations with enhanced styling and icons
  const tabsData = useMemo(
    () =>
      [
        { key: EPostStatus.SELLING, label: "Selling", icon: <ShopOutlined /> },
        {
          key: EPostStatus.EXPIRED,
          label: "Expired",
          icon: <i className="far fa-calendar-times" />,
        },
        {
          key: EPostStatus.REJECTED,
          label: "Rejected",
          icon: <i className="fas fa-ban" />,
        },
        {
          key: EPostStatus.WAITING,
          label: "Waiting",
          icon: <i className="fas fa-hourglass-half" />,
        },
        {
          key: EPostStatus.HIDDEN,
          label: "Hidden",
          icon: <i className="fas fa-eye-slash" />,
        },
      ].map((tab) => ({
        ...tab,
        navigateLink: String(tab.key).toLowerCase(),
      })),
    []
  );

  // Determine active tab based on URL
  const activeTab = useMemo(
    () =>
      tabsData.find((tab) =>
        location.pathname.includes(String(tab.key).toLowerCase())
      )?.key || EPostStatus.SELLING,
    [location.pathname, tabsData]
  );

  // Handle tab click event
  const handleTabClick = useCallback(
    (key: string) => {
      const tab = tabsData.find((tab) => String(tab.key) === key);
      if (tab?.key) {
        handleStatusChange(tab.key);
        navigate(tab.navigateLink);
      }
    },
    [navigate, tabsData, handleStatusChange]
  );

  const userActions = (
    <Menu>
      <Menu.Item
        key="profile"
        onClick={() => navigate(`/profile/${account?.slug}`)}
      >
        <i className="fas fa-user mr-2"></i> View Profile
      </Menu.Item>

      <Menu.Divider />
      <Menu.Item key="newPost" onClick={() => navigate("/create-post")}>
        <i className="fas fa-plus mr-2"></i> Create New Post
      </Menu.Item>
    </Menu>
  );

  return (
    <Spin spinning={isLoading}>
      <>
        <ContentLayout
          title={
            <Breadcrumb>
              <Breadcrumb.Item
                className="text-lg font-semibold text-flame-orange cursor-pointer"
                onClick={() => navigate("/")}
              >
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item className="text-lg font-semibold text-gray-400">
                Post Management
              </Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          {/* User Account Info */}
          <Card className="w-full rounded-lg shadow-sm border-t-2 border-t-flame-orange">
            <Flex justify="space-between" align="center">
              <Dropdown overlay={userActions} trigger={["click"]}>
                <Flex
                  align="center"
                  gap={12}
                  className="cursor-pointer hover:opacity-90 transition-all"
                >
                  <Badge
                    //  dot={account?.hasNotifications}
                    offset={[-5, 5]}
                    color="green"
                  >
                    <Image
                      src={account?.avatar}
                      width={60}
                      height={60}
                      className="rounded-full border-2 border-flame-orange p-1"
                      preview={false}
                    />
                  </Badge>
                  <Flex vertical>
                    <Typography.Title level={4} className="mb-0">
                      {account?.name}
                    </Typography.Title>
                  </Flex>
                </Flex>
              </Dropdown>

              {/* Search Bar and Balance */}
              <Flex vertical justify="end" align="end" gap={8}>
                <Flex align="center" gap={10}>
                  <FilterLayout>
                    <CSearch
                      placeholder="Search your post"
                      onInput={handleInputSearch}
                      allowClear
                      className="min-w-60"
                    />
                  </FilterLayout>
                </Flex>

                <Tooltip title="Click to top up your balance">
                  <Button
                    type="text"
                    className="group px-4 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 text-amber-600 rounded-lg transition-all duration-300 hover:from-flame-orange hover:to-flame-orange hover:text-white"
                    onClick={() => navigate("/payment")}
                  >
                    <Flex align="center" gap={5}>
                      <Typography.Title
                        level={5}
                        className="mb-0 flex items-center"
                      >
                        <i className="fas fa-coins mr-2"></i> Balance:{" "}
                        <span className="font-bold ml-1">
                          {account?.balance || 0}
                        </span>
                        <PlusOutlined className="ml-2 text-amber-600 group-hover:text-white transition-all duration-300" />
                      </Typography.Title>
                    </Flex>
                  </Button>
                </Tooltip>
              </Flex>
            </Flex>
          </Card>

          {/* Tabs and Content */}
          <Card
            className="w-full rounded-lg shadow-sm p-0 min-h-screen border-none"
            bodyStyle={{ padding: 0 }}
          >
            <Tabs
              activeKey={String(activeTab)}
              type="card"
              size="large"
              tabBarStyle={{
                padding: "12px 16px 0",
                marginBottom: 0,
                borderBottom: "1px solid #f0f0f0",
                background: "#fafafa",
              }}
              onTabClick={handleTabClick}
              items={tabsData.map(({ key, label, icon }) => ({
                key: String(key),
                label: (
                  <Flex align="center" gap={6}>
                    <span className="flex items-center justify-center">
                      {icon}
                    </span>
                    <span>{label}</span>
                    <Badge
                      count={data?.[key] ?? 0}
                      showZero
                      style={{
                        backgroundColor:
                          String(key) === String(activeTab)
                            ? "#ff4d4f"
                            : "#999",
                        marginLeft: "4px",
                        fontSize: "12px",
                      }}
                    />
                  </Flex>
                ),
              }))}
            />

            <div className="p-4">{children}</div>
          </Card>
        </ContentLayout>
        <Divider />
        <Bottom />
      </>
    </Spin>
  );
};

export default PostManagementLayout;
