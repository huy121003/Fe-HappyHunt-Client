import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal, Button, Typography, Card, Tag, Spin, Flex, Avatar } from "antd";
import {
  ClockCircleOutlined,
  RocketOutlined,
  DollarOutlined,
  FireOutlined,
} from "@ant-design/icons";
import React from "react";
import { API_KEY } from "../../data/constant";
import { API_KEY as API_KEY_AUTH } from "@/features/auth/data/constant";
import PostService from "../../service";
import usePostState from "../../hooks/usePostState";

const { Title, Text, Paragraph } = Typography;

interface IPostPushAtModalProps {
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  price: number;
}

const PostPushAtModal: React.FC<IPostPushAtModalProps> = ({
  open,
  setOpen,
  id,
  price,
}) => {
  const { onSuccess } = usePostState();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.POST_PUSH_AT, id],
    queryFn: async () => {
      const res = await PostService.getPushAt(id);
      console.log("PushAt data:", res.data.pushedAt);
      return res.data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await PostService.pushAt(id, price);
      return res.data;
    },
    onSuccess: () => {
      onSuccess("Post pushed successfully");
      setOpen(false);
      window.location.reload();
      queryClient.invalidateQueries({
        queryKey: [API_KEY_AUTH.GET_ACCOUNT_INFO, id],
      });
    },
  });

  const getExpiryDate = (pushDate: Date) => {
    return new Date(new Date(pushDate).getTime() + 12 * 60 * 60 * 1000);
  };

  const isExpired = (pushDate: Date) => {
    return new Date() > getExpiryDate(pushDate);
  };

  if (isLoading) {
    return (
      <Modal
        title="Manage Post Push"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        centered
        width={500}
      >
        <Flex
          justify="center"
          align="center"
          vertical
          style={{ padding: "40px 0" }}
        >
          <Spin size="large" />
          <Text type="secondary" style={{ marginTop: 16 }}>
            Loading...
          </Text>
        </Flex>
      </Modal>
    );
  }

  // Has pushAt - Show expiry info
  if (data?.pushedAt) {
    const expired = isExpired(data.pushedAt);
    const expiryDate = getExpiryDate(data.pushedAt);

    return (
      <Modal
        title={
          <Flex align="center" gap={12}>
            <ClockCircleOutlined
              style={{ color: expired ? "#ff4d4f" : "#52c41a" }}
            />
            <Text strong>{expired ? "Push Expired" : "Push Active"}</Text>
          </Flex>
        }
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        centered
        width={450}
      >
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <Avatar
            size={64}
            icon={<ClockCircleOutlined />}
            style={{
              backgroundColor: expired ? "#ff4d4f" : "#52c41a",
              marginBottom: 16,
            }}
          />

          <Title
            level={4}
            style={{ color: expired ? "#ff4d4f" : "#52c41a", marginBottom: 16 }}
          >
            {expired ? "Push has expired" : "Push is active"}
          </Title>

          <Card
            style={{ backgroundColor: "#f8f9fa", border: "1px solid #e9ecef" }}
          >
            <Text strong>Expires at: </Text>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>
              {expiryDate.toLocaleString()}
            </Text>
          </Card>
        </div>
      </Modal>
    );
  }

  // No pushAt - Show push button
  return (
    <Modal
      title={
        <Flex align="center" gap={12}>
          <RocketOutlined style={{ color: "#ff6b35" }} />
          <Text strong>Push Post to Top</Text>
        </Flex>
      }
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered
      width={450}
    >
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <Avatar
          size={64}
          icon={<RocketOutlined />}
          style={{ backgroundColor: "#ff6b35", marginBottom: 16 }}
        />

        <Title level={4} style={{ marginBottom: 8 }}>
          Boost Your Post Visibility
        </Title>

        <Paragraph style={{ color: "#666", marginBottom: 24 }}>
          Push your post to the top to get more views and engagement.
        </Paragraph>

        <Flex gap={12} style={{ marginBottom: 24 }}>
          <Card size="small" style={{ flex: 1, textAlign: "center" }}>
            <DollarOutlined
              style={{ fontSize: 20, color: "#ff6b35", marginBottom: 8 }}
            />
            <div>
              <Text strong>Cost</Text>
              <Tag color="orange">
                {" "}
                {price.toLocaleString()}
                VNĐ
              </Tag>
            </div>
          </Card>

          <Card size="small" style={{ flex: 1, textAlign: "center" }}>
            <FireOutlined
              style={{ fontSize: 20, color: "#ff6b35", marginBottom: 8 }}
            />
            <div>
              <Text strong>Duration</Text>
              <Tag color="orange">12 hours</Tag>
            </div>
          </Card>
        </Flex>

        <Button
          type="primary"
          size="large"
          icon={<RocketOutlined />}
          onClick={() => mutate()}
          loading={isPending}
          style={{
            background: "#ff6b35",
            borderColor: "#ff6b35",
            height: 44,
            fontSize: 16,
            paddingLeft: 32,
            paddingRight: 32,
          }}
        >
          {isPending ? "Processing..." : "Push Now"}
        </Button>
      </div>
    </Modal>
  );
};

export default PostPushAtModal;
