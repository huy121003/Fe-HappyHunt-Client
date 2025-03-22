import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Flex,
  Image,
  Tag,
  Typography,
  Tooltip,
  Dropdown,
  Menu,
  Space,
} from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
  ShareAltOutlined,
  BarChartOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import TimeAgo from "@/components/ui/TimeAgo";
import { IPostItem } from "../../features/posts/data/interface";
import { API_KEY, EPostStatus } from "../../features/posts/data/constant";
import StatusModal from "../../features/posts/components/ui/StatusModal";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { API_KEY as API_KEY_CATEGORY } from "@/features/categories/data/constants";
import ReasonRejectedModal, {
  RejectedImage,
} from "@/features/posts/components/ui/ReasonRejectedModal";

interface IProps {
  record: IPostItem;
  isShowLoading: boolean;
  openActiveModal: boolean;
  setOpenActiveModal: (value: boolean) => void;
  onActive: (record: IPostItem, status?: EPostStatus) => void;
  setRecord: (value: IPostItem | null) => void;
}

const PostCardManagement: React.FC<IProps> = ({
  record,
  isShowLoading,
  openActiveModal,
  setOpenActiveModal,
  onActive,
  setRecord,
}) => {
  const [showReason, setShowReason] = useState(false);

  const client = useQueryClient();
  const navigate = useNavigate();
  const [status, setStatus] = useState<EPostStatus>(EPostStatus.SELLING);

  const isSelling = record?.status === EPostStatus.SELLING;
  const canEdit = isSelling || record?.status === EPostStatus.REJECTED;
  const openReason = () => {
    setShowReason(true);
  };
  const closeReason = () => {
    setShowReason(false);
  };
  const onClose = () => {
    setOpenActiveModal(false);
    setRecord(null);
  };

  const onOpen = (status: EPostStatus) => {
    setOpenActiveModal(true);
    setStatus(status);
  };

  const getStatusColor = (status: EPostStatus): string => {
    switch (status) {
      case EPostStatus.SELLING:
        return "green";
      case EPostStatus.WAITING:
        return "blue";
      case EPostStatus.REJECTED:
        return "red";
      case EPostStatus.HIDDEN:
        return "gray";
      case EPostStatus.EXPIRED:
        return "orange";
      default:
        return "blue";
    }
  };

  const getStatusIcon = (status: EPostStatus) => {
    switch (status) {
      case EPostStatus.SELLING:
        return <i className="fas fa-tag" />;
      case EPostStatus.WAITING:
        return <i className="fas fa-hourglass-half" />;
      case EPostStatus.REJECTED:
        return <i className="fas fa-ban" />;
      case EPostStatus.HIDDEN:
        return <i className="fas fa-eye-slash" />;
      case EPostStatus.EXPIRED:
        return <i className="fas fa-calendar-times" />;
      default:
        return <i className="fas fa-hourglass-half" />;
    }
  };

  const invalidateQueries = () => {
    client.invalidateQueries({
      queryKey: [API_KEY_CATEGORY.GET_CATEGORIES],
    });
    client.invalidateQueries({
      queryKey: [API_KEY.POST_DETAIL],
    });
  };

  const moreActionsMenu = (
    <Menu>
      {canEdit && (
        <Menu.Item
          key="edit"
          icon={<EditOutlined />}
          onClick={() => {
            invalidateQueries();
            navigate(`/update-post/${record.slug}`);
          }}
        >
          Edit Post
        </Menu.Item>
      )}
      {isSelling && (
        <Menu.Item
          key="hide"
          icon={<EyeInvisibleOutlined />}
          onClick={() => onOpen(EPostStatus.HIDDEN)}
          danger
        >
          Hide Post
        </Menu.Item>
      )}
      <Menu.Item
        key="stats"
        icon={<BarChartOutlined />}
        onClick={() => navigate(`/post-analytics/${record.slug}`)}
      >
        View Analytics
      </Menu.Item>
      <Menu.Divider />

      <Menu.Item
        key="promote"
        icon={<i className="fas fa-bullhorn" />}
        disabled={!isSelling}
      >
        Promote Post
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      className="rounded-xl border border-gray-100 hover:border-orange-500 transition-all duration-300"
      headStyle={{
        borderBottom: "1px solid #f0f0f0",
        background: "#ffffff",
        borderTopLeftRadius: "0.75rem",
        borderTopRightRadius: "0.75rem",
        padding: "16px 24px",
      }}
      bodyStyle={{ padding: "20px" }}
      title={
        <Flex align="center" justify="space-between">
          <Typography.Title
            level={5}
            className="mb-0 truncate"
            style={{ maxWidth: "70%" }}
            title={record?.name}
          >
            {record?.name}
          </Typography.Title>
          <Tag
            icon={getStatusIcon(record?.status)}
            color={getStatusColor(record?.status)}
            className="ml-2 font-medium"
          >
            {record?.status === "WAITING|AI_CHECKING_FAILED"
              ? EPostStatus.WAITING
              : record?.status}
          </Tag>
        </Flex>
      }
      extra={
        <Space>
          <Tooltip title="View Post">
            <Button
              hidden={record.status === EPostStatus.REJECTED}
              type="primary"
              className="bg-black hover:bg-black/80 border-none"
              icon={<EyeOutlined />}
              onClick={() => {
                invalidateQueries();
                navigate(`/detail-post/${record.slug}`);
              }}
            >
              View
            </Button>
          </Tooltip>
          <Tooltip title="View reason rejected">
            <Button
              hidden={record.status !== EPostStatus.REJECTED}
              type="primary"
              style={{ backgroundColor: "red" }}
              icon={<EyeOutlined />}
              onClick={openReason}
            >
              View reason
            </Button>
          </Tooltip>
        </Space>
      }
    >
      <Flex align="stretch" gap={20} className="relative">
        {/* Left Side - Image Gallery */}
        <div className="relative">
          <Badge
            count={record?.images.length}
            style={{ backgroundColor: "#000" }}
            className="border-2 border-white"
          >
            {record?.images[0] ? (
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={record.images[0].url}
                  width={140}
                  height={140}
                  className="rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                  alt={record?.name}
                  preview={{
                    src: record.images[0].url,
                    visible: false,
                    mask: (
                      <div className="flex items-center justify-center text-white">
                        <EyeOutlined className="mr-1" /> View All
                      </div>
                    ),
                  }}
                />
              </div>
            ) : (
              <div className="w-[140px] h-[140px] bg-gray-50 rounded-lg flex items-center justify-center">
                <i className="fas fa-image text-4xl text-gray-200"></i>
              </div>
            )}
          </Badge>
        </div>

        {/* Middle - Details */}
        <Flex vertical justify="space-between" flex={1}>
          <Flex vertical gap={8}>
            <Flex align="center" gap={8}>
              <i className="fas fa-cube text-orange-500"></i>
              <Typography.Text className="text-gray-700">
                {record?.categoryParent?.name}
                {record?.category && (
                  <span className="text-gray-400">
                    {" "}
                    › {record?.category?.name}
                  </span>
                )}
              </Typography.Text>
            </Flex>

            <Flex align="center" gap={8}>
              <i className="fas fa-money-bill-wave text-orange-500"></i>
              <Typography.Text className="font-semibold text-black text-lg">
                {record?.price.toLocaleString()} VNĐ
              </Typography.Text>
            </Flex>

            <Flex align="center" gap={8}>
              <i className="fas fa-map-marker-alt text-orange-500"></i>
              <Typography.Text className="text-gray-600 text-sm truncate">
                {record?.address?.ward?.name}, {record?.address?.district?.name}
                , {record?.address?.province?.name}
              </Typography.Text>
            </Flex>
          </Flex>

          <Flex gap={8} className="mt-2">
            <Tag
              color={record?.isIndividual ? "default" : "orange"}
              className="text-xs px-2 py-0.5 rounded-md font-medium"
              icon={
                record?.isIndividual ? (
                  <i className="fas fa-user mr-1"></i>
                ) : (
                  <i className="fas fa-store mr-1"></i>
                )
              }
            >
              {record?.isIndividual ? "Individual" : "Professional Seller"}
            </Tag>

            {isSelling && (
              <Tag
                className="text-xs px-2 py-0.5 rounded-md bg-black text-white border-none"
                icon={<i className="fas fa-mouse-pointer mr-1"></i>}
              >
                {record.clickCount || 0} Clicks
              </Tag>
            )}

            <span className="text-gray-500">
              <TimeAgo date={record?.createdAt} />
            </span>
          </Flex>
        </Flex>

        {/* Right Side - Actions */}
        <Flex vertical justify="space-between" align="end">
          <Dropdown
            overlay={moreActionsMenu}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button
              type="text"
              icon={<MoreOutlined />}
              className="text-gray-600 hover:bg-gray-50 hover:text-orange-500"
            />
          </Dropdown>

          <Flex vertical gap={6} align="end">
            <Space direction="vertical" size={4}>
              {isSelling && (
                <>
                  <Button
                    type="text"
                    size="small"
                    icon={<ShareAltOutlined />}
                    className="w-24 text-xs flex items-center justify-center hover:text-orange-500"
                  >
                    Share
                  </Button>
                </>
              )}
            </Space>
          </Flex>
        </Flex>
      </Flex>
      {/* Modal for status change */}
      <StatusModal
        setOpen={setOpenActiveModal}
        open={openActiveModal}
        onClose={onClose}
        onOK={() => {
          onActive(record, status);
          onClose();
        }}
        message={`Are you sure you want to ${
          status === EPostStatus.HIDDEN ? "hide" : "edit"
        } this post?`}
        isLoading={isShowLoading}
      />
      <ReasonRejectedModal
        slug={record.slug}
        isOpen={showReason}
        onClose={closeReason}
        images={
          (record?.images || []).filter(
            (img) => img.reasonReject && img.reasonReject.length > 0
          ) as RejectedImage[]
        }
      />
    </Card>
  );
};

export default PostCardManagement;
