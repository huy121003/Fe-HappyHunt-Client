import { useQuery } from "@tanstack/react-query";
import React from "react";
import { API_KEY, EPostStatus } from "../../data/constant";
import PostService from "../../service";
import { Button, Flex, Spin, Typography, Card } from "antd";
import usePostFilter from "../../hooks/usePostFilter";
import PortCard1 from "@/components/post-cards/PortCard1";
import { IPostItem } from "../../data/interface";
import { ShopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import ScrollableContainer2 from "@/components/scroll/ScrollableContainer2";
import { IPost } from "../../data/interface";

interface IProps {
  record: IPost;
}

const PostListUser: React.FC<IProps> = ({ record }) => {
  const { computtedFilter } = usePostFilter();

  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.POST, record.createdBy._id, computtedFilter],
    queryFn: async () => {
      const response = await PostService.getAllPagination({
        ...computtedFilter,
        status: EPostStatus.SELLING,
        createdBy: record.createdBy._id,
        ...(record.slug ? { currentSlug: record.slug } : {}),
      });
      return response.data.documentList;
    },
  });

  const handleViewAll = () => {
    navigate(`/user-posts/${record.createdBy._id}`);
  };

  return (
    <Card
      className="shadow-sm border-0 overflow-hidden bg-white rounded-xl border-t-2 border-t-orange-500"
      bodyStyle={{ padding: 0 }}
    >
      <Spin spinning={isLoading}>
        <div className="p-6">
          {/* Header */}
          <Flex justify="space-between" align="center" className="mb-6">
            <Flex align="center" gap={2}>
              <ShopOutlined className="text-2xl text-orange-500" />
              <Typography.Title
                level={4}
                className="m-0 text-gray-800 font-semibold"
              >
                More from {record.createdBy.name}
              </Typography.Title>
            </Flex>
            <Button
              type="primary"
              className="bg-orange-500 hover:bg-orange-600 border-none"
              onClick={handleViewAll}
            >
              View All
            </Button>
          </Flex>

          <ScrollableContainer2>
            {data && data?.length > 0 ? (
              data.map((item: IPostItem) => (
                <div key={item._id} className="flex-shrink-0">
                  <PortCard1 record={item} />
                </div>
              ))
            ) : (
              <Flex
                align="center"
                justify="center"
                className="w-full py-12 text-gray-500"
              >
                <Flex vertical align="center" gap={2}>
                  <ShopOutlined className="text-4xl text-gray-300" />
                  <Typography.Text>
                    No posts available from {record.createdBy.name}
                  </Typography.Text>
                </Flex>
              </Flex>
            )}
          </ScrollableContainer2>
        </div>
      </Spin>
    </Card>
  );
};

export default PostListUser;
