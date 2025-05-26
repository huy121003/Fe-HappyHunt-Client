import { Card, Image, Typography, Space, Tag, Badge, Tooltip } from "antd";
import { Avatar } from "antd";
import { Flex } from "antd";
import { Menu } from "antd";
import {
  UserAddOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  CrownOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { ENotificationType } from "../data/constant";
import { INotificationItem } from "../data/interface";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/reduxHook";
import TimeAgo from "@/components/ui/TimeAgo";
import { useNavigate } from "react-router-dom";
import { useSocketProvider } from "@/hooks/useSocketProvider";
import { itemAnimation } from "@/libs/motion";
import { motion } from "framer-motion";

const {  Text } = Typography;

interface NotificationCardProps {
  notification: INotificationItem;
}

function NotificationCard({ notification }: NotificationCardProps) {
  const socket = useSocketProvider();
  const onReadNotification = async () => {
    if (socket) {
      socket.emit("read_notification", notification._id);
    }
  };
  const account = useAppSelector((state: RootState) => state.auth.account);
  const navigate = useNavigate();

  const getNotificationTypeTag = () => {
    switch (notification.type) {
      case ENotificationType.FOLLOW_ACCOUNT:
        return (
          <Tag color="blue" icon={<UserAddOutlined />}>
            Follow
          </Tag>
        );
      case ENotificationType.NEW_POST:
        return (
          <Tag color="green" icon={<FileTextOutlined />}>
            New Post
          </Tag>
        );
      case ENotificationType.POST_APPROVED:
        return (
          <Tag color="success" icon={<CheckCircleOutlined />}>
            Approved
          </Tag>
        );
      case ENotificationType.POST_WAITING_APPROVE:
        return (
          <Tag color="warning" icon={<ClockCircleOutlined />}>
            Pending
          </Tag>
        );
      case ENotificationType.POST_DELETED:
        return (
          <Tag color="error" icon={<DeleteOutlined />}>
            Deleted
          </Tag>
        );
      case ENotificationType.POST_REJECTED:
        return (
          <Tag color="red" icon={<CloseCircleOutlined />}>
            Rejected
          </Tag>
        );
      case ENotificationType.VIP_EXPIRED:
        return (
          <Tag color="orange" icon={<CrownOutlined />}>
            VIP Expired
          </Tag>
        );
      case ENotificationType.VIP_ACTIVE:
        return (
          <Tag color="gold" icon={<StarOutlined />}>
            VIP Active
          </Tag>
        );
      default:
        return <Tag>Notification</Tag>;
    }
  };

  const renderNotificationContent = () => {
    switch (notification.type) {
      case ENotificationType.FOLLOW_ACCOUNT:
        return (
          <Flex
            gap={12}
            align="center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              onReadNotification();
              navigate(`/profile/${notification.createdBy.slug}`);
            }}
          >
            <Badge dot={!notification.read} offset={[-8, 8]}>
              <Avatar
                src={notification.createdBy.avatar}
                size={48}
                icon={<UserAddOutlined />}
              />
            </Badge>
            <Space direction="vertical" size={2}>
              <Text strong style={{ fontSize: "14px" }}>
                {notification.createdBy.name}
              </Text>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                started following you
              </Text>
            </Space>
          </Flex>
        );

      case ENotificationType.VIP_ACTIVE:
        return (
          <Flex
            gap={12}
            align="center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              onReadNotification();
              navigate(`/profile/${notification.createdBy.slug}`);
            }}
          >
            <Badge dot={!notification.read} offset={[-8, 8]}>
              <Avatar
                src={notification.createdBy.avatar}
                size={48}
                icon={<CrownOutlined />}
              />
            </Badge>
            <Space direction="vertical" size={2}>
              <Text strong style={{ fontSize: "14px" }}>
                {notification.createdBy.name}
              </Text>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                activated VIP membership
              </Text>
            </Space>
          </Flex>
        );

      case ENotificationType.VIP_EXPIRED:
        return (
          <Flex
            gap={12}
            align="center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              onReadNotification();
              navigate(`/profile/${account?.slug}`);
            }}
          >
            <Badge dot={!notification.read} offset={[-8, 8]}>
              <Avatar
                src={account?.avatar}
                size={48}
                icon={<CrownOutlined />}
              />
            </Badge>
            <Space direction="vertical" size={2}>
              <Text strong style={{ fontSize: "14px" }}>
                Your VIP membership has expired
              </Text>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                Renew now to continue enjoying premium features
              </Text>
            </Space>
          </Flex>
        );

      case ENotificationType.NEW_POST:
        if (account?._id !== notification.createdBy._id) {
          return (
            <Flex
              gap={12}
              align="center"
              style={{ cursor: "pointer" }}
              onClick={() => {
                onReadNotification();
                navigate(`/detail-post/${notification.post?.slug}`);
              }}
            >
              <Badge dot={!notification.read} offset={[-8, 8]}>
                <Avatar
                  src={notification.createdBy.avatar}
                  size={48}
                  icon={<FileTextOutlined />}
                />
              </Badge>
              <Space direction="vertical" size={2}>
                <Text strong style={{ fontSize: "14px" }}>
                  {notification.createdBy.name}
                </Text>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  posted: <Text strong>{notification.post?.name}</Text>
                </Text>
              </Space>
            </Flex>
          );
        }
        return (
          <Flex
            gap={12}
            align="center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              onReadNotification();
              navigate(`/post-management`);
            }}
          >
            <Badge dot={!notification.read} offset={[-8, 8]}>
              <Image
                src={notification.post?.images?.[0]?.url}
                width={48}
                height={48}
                style={{ borderRadius: "8px", objectFit: "cover" }}
                preview={false}
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
              />
            </Badge>
            <Space direction="vertical" size={2}>
              <Text strong style={{ fontSize: "14px" }}>
                Post Published
              </Text>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                <Text strong>{notification.post?.name}</Text> is now live
              </Text>
            </Space>
          </Flex>
        );

      case ENotificationType.POST_APPROVED:
        return (
          <Flex
            gap={12}
            align="center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              onReadNotification();
              navigate(`/post-management`);
            }}
          >
            <Badge dot={!notification.read} offset={[-8, 8]}>
              <Image
                src={notification.post?.images?.[0]?.url}
                width={48}
                height={48}
                style={{ borderRadius: "8px", objectFit: "cover" }}
                preview={false}
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
              />
            </Badge>
            <Space direction="vertical" size={2}>
              <Text strong style={{ fontSize: "14px" }}>
                Post Approved
              </Text>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                <Text strong>{notification.post?.name}</Text> has been approved
                and published
              </Text>
            </Space>
          </Flex>
        );

      case ENotificationType.POST_WAITING_APPROVE:
        return (
          <Flex
            gap={12}
            align="center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              onReadNotification();
              navigate(`/post-management`);
            }}
          >
            <Badge dot={!notification.read} offset={[-8, 8]}>
              <Image
                src={notification.post?.images?.[0]?.url}
                width={48}
                height={48}
                style={{ borderRadius: "8px", objectFit: "cover" }}
                preview={false}
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
              />
            </Badge>
            <Space direction="vertical" size={2}>
              <Text strong style={{ fontSize: "14px" }}>
                Post Under Review
              </Text>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                <Text strong>{notification.post?.name}</Text> is being reviewed
                by admin
              </Text>
            </Space>
          </Flex>
        );

      case ENotificationType.POST_DELETED:
        return (
          <Flex
            gap={12}
            align="center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              onReadNotification();
              navigate(`/post-management`);
            }}
          >
            <Badge dot={!notification.read} offset={[-8, 8]}>
              <Image
                src={notification.post?.images?.[0]?.url}
                width={48}
                height={48}
                style={{
                  borderRadius: "8px",
                  objectFit: "cover",
                  opacity: 0.6,
                }}
                preview={false}
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
              />
            </Badge>
            <Space direction="vertical" size={2}>
              <Text strong style={{ fontSize: "14px" }}>
                Post Deleted
              </Text>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                <Text strong>{notification.post?.name}</Text> was removed by
                admin for policy violation
              </Text>
            </Space>
          </Flex>
        );

      case ENotificationType.POST_REJECTED:
        return (
          <Flex
            gap={12}
            align="center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              onReadNotification();
              navigate(`/post-management`);
            }}
          >
            <Badge dot={!notification.read} offset={[-8, 8]}>
              <Image
                src={notification.post?.images?.[0]?.url}
                width={48}
                height={48}
                style={{
                  borderRadius: "8px",
                  objectFit: "cover",
                  opacity: 0.6,
                }}
                preview={false}
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
              />
            </Badge>
            <Space direction="vertical" size={2}>
              <Text strong style={{ fontSize: "14px" }}>
                Post Rejected
              </Text>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                <Text strong>{notification.post?.name}</Text> needs revision to
                meet our standards
              </Text>
            </Space>
          </Flex>
        );

      default:
        return (
          <Flex gap={12} align="center">
            <Badge dot={!notification.read} offset={[-8, 8]}>
              <Avatar size={48} />
            </Badge>
            <Space direction="vertical" size={2}>
              <Text strong style={{ fontSize: "14px" }}>
                Notification
              </Text>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                General notification
              </Text>
            </Space>
          </Flex>
        );
    }
  };

  return (
    <motion.div
      key={notification._id}
      variants={itemAnimation}
      className="group"
    >
      <Menu.Item key={notification._id} className="!p-0">
        <Card
          hoverable
          className={`!border-0 transition-colors ${
            !notification.read ? "!bg-blue-50" : ""
          }`}
          bodyStyle={{ padding: "12px 16px" }}
        >
          <Flex justify="space-between" align="flex-start" gap={16}>
            <div style={{ flex: 1 }}>{renderNotificationContent()}</div>
            <Space
              direction="vertical"
              align="end"
              size={4}
              style={{ flexShrink: 0 }}
            >
              {getNotificationTypeTag()}
              <Tooltip
                title={new Date(notification.createdAt).toLocaleString()}
              >
                <Text type="secondary" style={{ fontSize: "11px" }}>
                  <TimeAgo date={notification.createdAt} />
                </Text>
              </Tooltip>
            </Space>
          </Flex>
        </Card>
      </Menu.Item>
    </motion.div>
  );
}

export default NotificationCard;
