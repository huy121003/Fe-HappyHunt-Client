import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { API_KEY, EPostStatus } from "../../data/constant";
import PostService from "../../service";
import { Button, Flex, Spin, Typography, Card } from "antd";
import usePostFilter from "../../hooks/usePostFilter";
import PortCard1 from "@/components/post-cards/PortCard1";
import { IPostItem } from "../../data/interface";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface IProps {
  idUser: number;
  name: string;
}

const PostListUser: React.FC<IProps> = ({ idUser, name }) => {
  const { computtedFilter } = usePostFilter();
  const listRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.POST, idUser, computtedFilter],
    queryFn: async () => {
      const response = await PostService.getAllPagination(idUser, {
        ...computtedFilter,
        status: EPostStatus.SELLING,
      });
      return response.data.documentList;
    },
  });

  const handleScroll = (direction: "left" | "right") => {
    if (listRef.current) {
      const scrollAmount = listRef.current.offsetWidth * 0.8;
      listRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Card
      className="shadow-sm border-0 overflow-hidden bg-white rounded-xl  border-t-2 border-t-flame-orange"
      bodyStyle={{ padding: 0 }}
    >
      <Spin spinning={isLoading}>
        <div className="p-6">
          {/* Header */}
          <Flex justify="space-between" align="center" className="mb-6">
            <Typography.Title
              level={4}
              className="m-0 text-gray-800 font-semibold"
            >
              More from {name}
            </Typography.Title>
            <Button type="text" className="text-orange-500">
              View All
            </Button>
          </Flex>

          {/* Carousel Container */}
          <div className="relative px-8">
            {/* Navigation Buttons */}
            <Button
              shape="circle"
              size="large"
              className="
                absolute left-0 top-1/2 -translate-y-1/2 
                bg-white shadow-md hover:bg-gray-100 
                z-10 border border-gray-200 opacity-50
              "
              icon={<LeftOutlined className="text-gray-600" />}
              onClick={() => handleScroll("left")}
              hidden={
                isLoading || !data?.length || listRef.current?.scrollLeft === 0
              }
            />

            {/* Posts List */}
            <div
              ref={listRef}
              className="
                flex gap-6 overflow-x-auto 
                scroll-smooth no-scrollbar 
                pb-4 snap-x snap-mandatory
              "
              style={{ scrollPadding: "0 24px" }}
            >
              {data && data?.length > 0 ? (
                data.map((item: IPostItem) => <PortCard1 record={item} />)
              ) : (
                <Flex
                  align="center"
                  justify="center"
                  className="w-full py-8 text-gray-500"
                >
                  <Typography.Text>
                    No posts available from {name}
                  </Typography.Text>
                </Flex>
              )}
            </div>

            <Button
              size="large"
              shape="circle"
              className="
                absolute right-0 top-1/2 -translate-y-1/2 
                bg-white shadow-md hover:bg-gray-100 
                z-10 border border-gray-200 opacity-50
              "
              icon={<RightOutlined className="text-gray-600" />}
              onClick={() => handleScroll("right")}
              hidden={
                isLoading ||
                !data?.length ||
                listRef.current?.scrollLeft === listRef.current?.scrollWidth
              }
            />
          </div>
        </div>
      </Spin>
    </Card>
  );
};

export default PostListUser;
