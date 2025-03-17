import { useQuery } from "@tanstack/react-query";
import React from "react";
import { API_KEY, EPostStatus } from "../../data/constant";
import PostService from "../../service";
import { Button, Flex, Spin, Typography } from "antd";
import usePostFilter from "../../hooks/usePostFilter";
import PortCard1 from "@/components/post-cards/PortCard1";
import { IPostItem } from "../../data/interface";
interface IProps {
  idUser: number;
  name: string;
}
const PostListUser: React.FC<IProps> = ({ idUser, name }) => {
  const { computtedFilter } = usePostFilter();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.POST, idUser, computtedFilter],
    queryFn: async () => {
      const response = await PostService.getAllPagination(idUser, {
        ...computtedFilter,
        status: EPostStatus.SELLING,
      });
      return response.data.documentList;
    },
  });
  return (
    <>
      {isLoading || !isFetched ? (
        <Spin />
      ) : (
        <>
          <Flex justify="space-between" align="center">
            <Typography.Title level={5} className="text-gray-800">
              Other Posts of {name}
            </Typography.Title>
            <Button type="default">See all</Button>
          </Flex>
          <Flex gap={10} className="overflow-x-auto">
            {data ? (
              data.map((item: IPostItem) => {
                return <PortCard1 key={item._id} record={item} />;
              })
            ) : (
              <div>Không có bài viết nào</div>
            )}
          </Flex>
        </>
      )}
    </>
  );
};
export default PostListUser;
