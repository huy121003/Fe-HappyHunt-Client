import React from "react";
import { Badge, Button, Card, Flex, Image, Tag, Typography } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import TimeAgo from "@/components/TimeAgo";
import { IPostItem } from "../../features/posts/data/interface";
import { API_KEY, EPostStatus } from "../../features/posts/data/constant";
import StatusModal from "../../features/posts/components/ui/StatusModal";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

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
  const client = useQueryClient();
  const navigate = useNavigate();
  const [status, setStatus] = React.useState<EPostStatus>(EPostStatus.SELLING);
  const isSelling = record?.status === EPostStatus.SELLING;
  const canEdit = isSelling || record?.status === EPostStatus.REJECTED;
  const onClose = () => {
    setOpenActiveModal(false);
    setRecord(null);
  };
  const onOpen = (status: EPostStatus) => {
    setOpenActiveModal(true);
    setStatus(status);
  };

  return (
    <Card
      className="p-4 bg-gray-50 rounded-2xl shadow-lg gap-6 border border-gray-300"
      title={record?.name}
      extra={
        <Button
          size="large"
          type="text"
          className="text-orange-500"
          icon={<EyeOutlined />}
          onClick={() => {
            navigate(`/detail-post/${record.slug}`);
            window.scrollTo(0, 0);
            client.invalidateQueries({ queryKey: [API_KEY.POST_DETAIL] });
          }}
        >
          View
        </Button>
      }
    >
      <Flex justify="space-between" align="center" gap={20}>
        {/* Left Side - Image & Info */}
        <Flex gap={15} align="center">
          <Badge
            count={record?.images.length}
            style={{ backgroundColor: "#000" }}
          >
            {record?.images[0] ? (
              <Image
                src={record?.images[0]}
                width={100}
                height={100}
                className="rounded-lg object-cover border border-gray-300"
                alt="Post Image"
              />
            ) : (
              <i className="fas fa-image text-[100px] text-gray-300"></i>
            )}
          </Badge>
          <Flex vertical gap={8}>
            <Typography.Text className="text-gray-500">
              <i className="fas fa-cube"></i> {record?.categoryParent?.name}
              {record?.category && <> - {record?.category?.name}</>}
            </Typography.Text>
            <Typography.Text className="text-gray-500">
              <i className="fas fa-money-bill-wave"></i> Price:{" "}
              {record?.price.toLocaleString()} VNĐ
            </Typography.Text>
            <Typography.Text className="text-gray-500">
              <i className="fas fa-map-marker-alt"></i>{" "}
              {record?.address?.ward?.name}, {record?.address?.district?.name},{" "}
              {record?.address?.province?.name}
            </Typography.Text>

            <Flex gap={8}>
              {isSelling && (
                <Button
                  size="small"
                  type="text"
                  icon={<EyeInvisibleOutlined />}
                  danger
                  onClick={() => onOpen(EPostStatus.HIDDEN)}
                >
                  Hide
                </Button>
              )}
              {canEdit && (
                <Button
                  size="small"
                  type="text"
                  onClick={() => {
                    client.invalidateQueries({
                      queryKey: [API_KEY.POST_DETAIL],
                    });
                    navigate(`/update-post/${record.slug}`);
                    window.scrollTo(0, 0);
                  }}
                  icon={<EditOutlined />}
                >
                  Edit
                </Button>
              )}
            </Flex>
          </Flex>
        </Flex>

        {/* Right Side - Tag, Click Count, Time Ago */}
        <Flex vertical justify="flex-end" gap={5}>
          <Tag
            color={record?.isIndividual ? "green" : "blue"}
            className="text-sm px-3 py-1 rounded-md"
          >
            {record?.isIndividual ? "Individual" : "Professional Seller"}
          </Tag>
          {isSelling && (
            <Typography.Text type="secondary" className="text-gray-500">
              Clicks: <strong>{record.clickCount || 0}</strong>
            </Typography.Text>
          )}
          <Typography.Text type="secondary" className="text-gray-500">
            <TimeAgo date={record?.createdAt} />
          </Typography.Text>
        </Flex>
      </Flex>
      <StatusModal
        setOpen={setOpenActiveModal}
        open={openActiveModal}
        onClose={onClose}
        onOK={() => onActive(record, status)}
        message={`Are you sure you want to ${
          status === EPostStatus.HIDDEN ? "hide" : "edit"
        } this post?`}
        isLoading={isShowLoading}
      />
    </Card>
  );
};

export default PostCardManagement;
