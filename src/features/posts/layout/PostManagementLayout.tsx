import React, { useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/redux/reduxHook";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Image, Spin, Tabs, Typography } from "antd";
import { API_KEY, EPostStatus } from "../data/constant";
import PostService from "../service";
import Bottom from "@/components/layouts/AppLayout/Bottom/Bottom";
import { CSearch } from "@/components";
import FilterLayout from "@/components/layouts/FilterLayout";
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

  // Tab configurations
  const tabsData = useMemo(
    () =>
      [
        { key: EPostStatus.SELLING, label: "Selling" },
        { key: EPostStatus.EXPIRED, label: "Expired" },
        { key: EPostStatus.REJECTED, label: "Rejected" },
        { key: EPostStatus.WAITING, label: "Waiting" },
        { key: EPostStatus.HIDDEN, label: "Hidden" },
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
        window.scrollTo(0, 0);
      }
    },
    [navigate, tabsData]
  );

  return (
    <Spin spinning={isLoading}>
      <Flex
        vertical
        className="w-screen overflow-x-hidden bg-slate-100 max-h-full"
        justify="center"
        align="center"
      >
        <Card className="lg:w-3/4 ư-full h-full overflow-x-hidden m-2">
          <Flex justify="start" align="center" gap={10} className="mb-4">
            <h1
              className="text-2xl font-semibold text-flame-orange cursor-pointer"
              onClick={() => {navigate("/")
                window.scrollTo(0, 0);
              }}
            >
              HappyHunt
            </h1>
            <h1 className="text-2xl font-semibold text-gray-400">{">"}</h1>
            <h1 className="text-2xl font-semibold text-gray-400">
              Post Management
            </h1>
          </Flex>
          {/* User Account Info */}
          <Card className="p-4 bg-gray-50 rounded-2xl shadow-lg gap-6 border border-gray-300">
            <Flex justify="space-between" align="center">
              <Flex align="center" gap={12}>
                <Image
                  src={account?.avatar}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <Flex vertical>
                  <Typography.Title level={5} className="mb-0">
                    {account?.name}
                  </Typography.Title>
                </Flex>
              </Flex>

              {/* Search Bar */}
              <Flex vertical justify="end" align="end" gap={10}>
                <FilterLayout>
                  <CSearch
                    placeholder="Search your post"
                    onInput={handleInputSearch}
                  />
                </FilterLayout>

                <Button
                  type="text"
                  className="w-40 px-4 py-2  text-flame-orange rounded-lg transition-all duration-300 hover:bg-flame-orange hover:text-white"
                >
                  <Flex align="center" gap={5}>
                    <Typography.Title
                      level={5}
                      className="mb-0 flex items-center"
                    >
                      <i className="fas fa-coins mr-2"></i> Balance:{" "}
                      {account?.coin || 0}
                      <PlusOutlined className="ml-2 text-flame-orange group-hover:text-white transition-all duration-300" />
                    </Typography.Title>
                  </Flex>
                </Button>
              </Flex>
            </Flex>
          </Card>

          {/* Tabs and Content */}
          <Flex vertical className="w-full overflow-x-hidden">
            <Tabs
              activeKey={String(activeTab)}
              type="card"
              size="middle"
              tabBarStyle={{ padding: "10px", width: "100%" }}
              onTabClick={handleTabClick}
              items={tabsData.map(({ key, label }) => ({
                key: String(key),
                label: `${label} (${data?.[key] ?? 0})`,
              }))}
            />

            {children}
          </Flex>
        </Card>
      </Flex>
      <Bottom />
    </Spin>
  );
};

export default PostManagementLayout;
