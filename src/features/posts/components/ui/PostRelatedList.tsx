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

const PostRelatedList: React.FC<IProps> = ({ record }) => {
  const { computtedFilter } = usePostFilter();

  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.POST_RELATED, record.createdBy._id, computtedFilter],
    queryFn: async () => {
      const response = await PostService.getAllPagination({
        ...computtedFilter,
        q: record.name,
        status: EPostStatus.SELLING,
        ...(record.category && { category: record.category._id }),
        ...(record.categoryParent && {
          categoryParent: record.categoryParent._id,
        }),
        ...(record.address.province && {
          province: record.address.province._id,
        }),
        ...(record.address.district && {
          district: record.address.district._id,
        }),
        ...(record.address.ward && { ward: record.address.ward._id }),
        sort: "relevance",
        filterType: "suggest",
        ...(record.slug ? { currentSlug: record.slug } : {}),
      });
      return response.data.documentList;
    },
  });

  const handleViewAll = () => {
    navigate(`/user-posts/${record.createdBy._id}`);
  };

  return (
    <Card className="shadow-sm border-0 overflow-hidden bg-white rounded-xl border-t-2 border-t-orange-500">
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
                Related posts
              </Typography.Title>
            </Flex>
            <Button
              hidden={!data?.length || data.length <= 10}
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
                  <Typography.Text>No related posts</Typography.Text>
                </Flex>
              </Flex>
            )}
          </ScrollableContainer2>
        </div>
      </Spin>
    </Card>
  );
};

export default PostRelatedList;
