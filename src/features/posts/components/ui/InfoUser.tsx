import React, { useState } from "react";
import { IPost } from "../../data/interface";
import { useQuery } from "@tanstack/react-query";
import { API_KEY as API_KEY_EVALUATE } from "@/features/evaluates/data/constant";
import {
  API_KEY as API_KEY_POST,
  EPostStatus,
} from "@/features/posts/data/constant";
import EvaluateService from "@/features/evaluates/service";
import {
  Card,
  Flex,
  Image,
  Spin,
  Typography,
  Divider,
  Badge,
  Button,
  Tag,
} from "antd";
import TimeAgo from "@/components/ui/TimeAgo";
import CButton from "@/components/buttons/CButton";
import { useNavigate } from "react-router-dom";
import PostService from "../../service";
import { useAppSelector } from "@/redux/reduxHook";

import { IChat, IChatPayload } from "@/features/chat/data/interface";
import {
  MessageOutlined,
  UserOutlined,
  EditOutlined,
  WarningOutlined,
  EnvironmentOutlined,
  StarOutlined,
  ShopOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useSocketListenerWithResponse } from "@/hooks/useSocketListenerWithResponse";

import { useSocketProvider } from "@/hooks/useSocketProvider";

import ReportModal from "@/features/report/components/ui/ReportModal";
import { ETargetType } from "@/features/report/data/constant";

interface InfoUserProps {
  record: IPost;
}

const InfoUser: React.FC<InfoUserProps> = ({ record }) => {
  const socket = useSocketProvider();

  const navigate = useNavigate();
  const [openReport, setOpenReport] = useState(false);
  const account = useAppSelector((state) => state.auth?.account);
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY_EVALUATE.EVALUATE_COUNT],
    queryFn: () => EvaluateService.countEvaluate(record.createdBy._id),
    select: (response) => response.data,
  });
  const { data: dataCountSold, isLoading: isLoadingCountSold } = useQuery({
    queryKey: [API_KEY_POST.POST_COUNT_SOLD, record.createdBy._id],
    queryFn: () => PostService.countSold(record.createdBy._id),
    select: (response) => response.data,
  });

  const isOwner = record?.createdBy?._id === account?._id;
  const isSellingOrRejected =
    record.status === EPostStatus.SELLING ||
    record.status === EPostStatus.REJECTED;
  const isSelling = record.status === EPostStatus.SELLING;
  useSocketListenerWithResponse("chat_created", (data: IChat) => {
    navigate(`/chat/${data.slug}`);
  });

  const handleCreateChat = () => {
    if (!socket || !account) return;
    const payload: IChatPayload = {
      post: record._id,
      seller: record.createdBy._id,
      buyer: Number(account._id),
    };
    socket.emit("create_chat", payload);
  };
  return (
    <Spin spinning={isLoading || isLoadingCountSold}>
      <Flex gap={16} vertical className="w-full">
        {/* Product Info Card */}
        <Card
          className="w-full rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white border-0"
          bodyStyle={{ padding: "24px" }}
        >
          {/* Product Name */}
          <Typography.Title
            level={4}
            className="text-gray-900 mb-4 font-semibold"
          >
            {record.name}
          </Typography.Title>

          {/* Price */}
          <div className="p-6 mb-6 bg-gradient-to-r from-orange-50 to-white rounded-xl border border-orange-100">
            <Typography.Title
              level={3}
              className="text-orange-600 m-0 text-center font-bold tracking-tight"
            >
              {record.price.toLocaleString()} VND
            </Typography.Title>
          </div>

          <Divider className="my-6 border-gray-100" />

          {/* Location & Time Info */}
          <Flex vertical gap={12} className="mb-6">
            <Flex align="center" className="group">
              <div className="p-2 rounded-lg bg-orange-50 mr-3 group-hover:bg-orange-100 transition-colors">
                <EnvironmentOutlined className="text-orange-500 text-lg" />
              </div>
              <Typography.Text className="text-gray-800 group-hover:text-orange-500 transition-colors">
                {record.address.ward.name} - {record.address.district.name} -{" "}
                {record.address.province.name}
              </Typography.Text>
            </Flex>

            <Flex align="center" className="group">
              <div className="p-2 rounded-lg bg-gray-50 mr-3 group-hover:bg-gray-100 transition-colors">
                <i className="fas fa-clock text-gray-600 text-lg"></i>
              </div>
              <Typography.Text className="text-gray-800 group-hover:text-gray-600 transition-colors">
                Posted <TimeAgo date={record.createdAt} />
              </Typography.Text>
            </Flex>
          </Flex>

          {/* Action Buttons */}
          <Flex className="flex w-full gap-3" wrap="wrap">
            {isOwner && isSellingOrRejected && (
              <CButton
                type="default"
                icon={<EditOutlined />}
                onClick={() => navigate(`/update-post/${record.slug}`)}
                className="px-6 py-2 rounded-lg border-2 border-orange-500 text-orange-500 hover:bg-orange-50 transition-all duration-300"
              >
                Update
              </CButton>
            )}

            {!isOwner && isSelling && (
              <>
                <CButton
                  danger
                  icon={<WarningOutlined />}
                  onClick={() => setOpenReport(true)}
                  className="px-6 py-2 rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-50 transition-all duration-300"
                >
                  Report
                </CButton>
                <CButton
                  type="primary"
                  icon={<EnvironmentOutlined />}
                  onClick={() => {
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${record.address.specificAddress},${record.address.ward.name},${record.address.district.name},${record.address.province.name}`
                    );
                  }}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 border-none transition-all duration-300"
                >
                  Open Map
                </CButton>
              </>
            )}
          </Flex>
        </Card>

        {/* Seller Info Card */}
        <Card
          className="w-full rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white border-0"
          bodyStyle={{ padding: "24px" }}
        >
          <Flex justify="space-between" align="center" className="mb-6">
            <Flex align="center" gap={4}>
              <Badge dot={false} status="success">
                {record.createdBy.avatar ? (
                  <Image
                    src={record.createdBy.avatar}
                    width={60}
                    height={60}
                    className="rounded-xl border-2 border-gray-100 object-cover hover:border-orange-500 transition-colors"
                    preview={false}
                  />
                ) : (
                  <i className="fas fa-user-circle text-gray-400 text-6xl"></i>
                )}
              </Badge>
              <Flex vertical gap={1}>
                <Typography.Title
                  level={5}
                  className="m-0 text-gray-900 font-semibold"
                >
                  {record.createdBy.name}
                </Typography.Title>
                <Tag
                  color={record?.isIndividual ? "orange" : "black"}
                  className="text-xs px-3 py-1 rounded-full border-0"
                  icon={
                    record?.isIndividual ? (
                      <UserOutlined className="mr-1" />
                    ) : (
                      <ShopOutlined className="mr-1" />
                    )
                  }
                >
                  {record?.isIndividual ? "Individual" : "Professional Seller"}
                </Tag>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            className="mb-6 bg-gray-50 p-4 rounded-xl"
            gap={16}
            align="center"
            justify="center"
          >
            <Flex vertical className="w-1/2" align="center">
              <Typography.Text className="text-gray-600 font-medium mb-2">
                Rating
              </Typography.Text>
              <Button
                type="text"
                className="flex items-center gap-2 hover:scale-105 transition-transform"
                onClick={() =>
                  navigate(`/profile/${record.createdBy.slug}/reviews`)
                }
              >
                <StarOutlined className="text-orange-500 text-lg" />
                <Typography.Text strong className="text-gray-900 text-lg">
                  {data?.averageStar?.toFixed(1) || "0.0"}
                </Typography.Text>
                <Typography.Text type="secondary" className="text-sm">
                  ({data?.count || 0})
                </Typography.Text>
              </Button>
            </Flex>

            <Flex vertical flex={1} align="center">
              <Typography.Text className="text-gray-600 font-medium mb-2">
                Products
              </Typography.Text>
              <Flex align="center" gap={16}>
                <Button
                  type="text"
                  className="flex items-center gap-2 hover:scale-105 transition-transform"
                  onClick={() => navigate(`/profile/${record.createdBy.slug}`)}
                >
                  <ShopOutlined className="text-gray-600 text-lg" />
                  <Typography.Text className="text-gray-900 text-lg">
                    {dataCountSold?.selling || 0}
                  </Typography.Text>
                </Button>
                <Button
                  type="text"
                  className="flex items-center gap-2 hover:scale-105 transition-transform"
                  onClick={() => navigate(`/profile/${record.createdBy.slug}`)}
                >
                  <CheckCircleOutlined className="text-gray-600 text-lg" />
                  <Typography.Text className="text-gray-900 text-lg">
                    {dataCountSold?.sold || 0}
                  </Typography.Text>
                </Button>
              </Flex>
            </Flex>
          </Flex>

          {/* Contact Buttons */}
          <Flex wrap="wrap" gap={3} flex={1}>
            {!isOwner && isSelling && (
              <>
                <CButton
                  onClick={handleCreateChat}
                  type="primary"
                  icon={<MessageOutlined />}
                  className="flex-1 px-6 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 border-none transition-all duration-300"
                >
                  Chat
                </CButton>
              </>
            )}
            <CButton
              onClick={() => navigate(`/profile/${record.createdBy.slug}`)}
              type="default"
              icon={<UserOutlined />}
              className="flex-1 px-6 py-2 rounded-lg border-2 border-gray-200 text-gray-700 hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
            >
              Profile
            </CButton>
          </Flex>
        </Card>
      </Flex>
      <ReportModal
        targetType={ETargetType.POST}
        target={record._id}
        open={openReport}
        setOpen={setOpenReport}
      />
    </Spin>
  );
};

export default InfoUser;
