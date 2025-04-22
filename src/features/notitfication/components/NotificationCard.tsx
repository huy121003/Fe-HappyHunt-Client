import { Card, Image, Typography, Space, Tag } from "antd";
import { Avatar } from "antd";
import { Flex } from "antd";
import { Menu } from "antd";
import { ENotificationType } from "../data/constant";
import { INotificationItem } from "../data/interface";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/reduxHook";
import TimeAgo from "@/components/ui/TimeAgo";
import { useNavigate } from "react-router-dom";
import { useSocketProvider } from "@/hooks/useSocketProvider";
import { itemAnimation } from "@/libs/motion";
import { motion } from "framer-motion";

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
        return <Tag color="blue">Follow</Tag>;
      case ENotificationType.NEW_POST:
        return <Tag color="green">New Post</Tag>;
      case ENotificationType.POST_APPROVED:
        return <Tag color="success">Approved</Tag>;
      case ENotificationType.POST_WAITING_APPROVE:
        return <Tag color="warning">Pending</Tag>;
      case ENotificationType.POST_DELETED:
        return <Tag color="error">Deleted</Tag>;
      case ENotificationType.POST_REJECTED:
        return <Tag color="red">Rejected</Tag>;
      default:
        return null;
    }
  };

  const renderNotificationContent = () => {
    switch (notification.type) {
      case ENotificationType.FOLLOW_ACCOUNT:
        return (
          <Flex
            gap={12}
            align="center"
            onClick={() => {
              onReadNotification();
              navigate(`/profile/${notification.createdBy.slug}`);
            }}
          >
            <Avatar src={notification.createdBy.avatar} size={48} />
            <Space direction="vertical" size={0}>
              <Typography.Text strong>
                {notification.createdBy.name}
              </Typography.Text>
              <Typography.Text type="secondary">
                started following you
              </Typography.Text>
            </Space>
          </Flex>
        );

      case ENotificationType.NEW_POST:
        if (account?._id !== notification.createdBy._id) {
          return (
            <Flex
              gap={12}
              align="center"
              onClick={() => {
                onReadNotification();
                navigate(`/detail-post/${notification.post?.slug}`);
              }}
            >
              <Avatar src={notification.createdBy.avatar} size={48} />
              <Space direction="vertical" size={0}>
                <Typography.Text strong>
                  {notification.createdBy.name}
                </Typography.Text>
                <Typography.Text type="secondary">
                  posted: {notification.post?.name}
                </Typography.Text>
              </Space>
            </Flex>
          );
        }
        return (
          <Flex
            gap={12}
            align="center"
            onClick={() => {
              onReadNotification();
              navigate(`/post-management`);
            }}
          >
            <Image
              src={notification.post?.images[0].url}
              width={48}
              height={48}
              className="rounded-lg object-cover"
              preview={false}
            />
            <Space direction="vertical" size={0}>
              <Typography.Text strong>Post Approved</Typography.Text>
              <Typography.Text type="secondary">
                {notification.post?.name}
              </Typography.Text>
            </Space>
          </Flex>
        );

      default:
        return (
          <Flex
            gap={12}
            align="center"
            onClick={() => {
              onReadNotification();
              navigate(`/post-management`);
            }}
          >
            <Image
              src={notification.post?.images[0].url}
              width={48}
              height={48}
              className="rounded-lg object-cover"
              preview={false}
            />
            <Space direction="vertical" size={0}>
              <Typography.Text strong>
                {notification.type === ENotificationType.POST_WAITING_APPROVE
                  ? "Post Pending Approval"
                  : notification.type === ENotificationType.POST_DELETED
                    ? "Post Deleted by Admin "
                    : "Post Rejected by Admin "}
              </Typography.Text>
              <Typography.Text type="secondary">
                {notification.post?.name}
              </Typography.Text>
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
          className={`!border-0 transition-colors ${
            !notification.read ? "!bg-blue-50" : "hover:!bg-gray-50"
          }`}
          bodyStyle={{ padding: "12px" }}
        >
          <Flex justify="space-between" align="center">
            {renderNotificationContent()}
            <Space direction="vertical" align="end" size={0}>
              {getNotificationTypeTag()}
              <Typography.Text type="secondary" className="text-xs">
                <TimeAgo date={notification.createdAt} />
              </Typography.Text>
            </Space>
          </Flex>
        </Card>
      </Menu.Item>
    </motion.div>
  );
}

export default NotificationCard;
