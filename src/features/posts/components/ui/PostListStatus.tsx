import { IPaginationProps } from "@/interfaces";
import React, { useState } from "react";
import { IPostItem } from "../../data/interface";
import NoPost from "./NoPost";
import { Flex, Pagination, Spin } from "antd";
import PostCardManagement from "../../../../components/post-cards/PostCardManagement";
interface IProps extends IPaginationProps<IPostItem> {
  isDeleteLoading?: boolean;
  isShowLoading?: boolean;
}

const PostListStatus: React.FC<IProps> = ({
  data,
  isLoading,
  pagination,
  notFound,
  onPaginationChange,
  onActive,
  isShowLoading,
  openActiveModal,
  setOpenActiveModal,
}) => {
  const [record, setRecord] = useState<IPostItem | null>(null);
  return (
    <Spin spinning={isLoading}>
      <Flex vertical gap="20px" className=" overflow-hidden">
        {!notFound && data && data.length > 0 ? (
          <>
            {data.map((item: IPostItem) => (
              <PostCardManagement
                isShowLoading={!!isShowLoading}
                key={item._id}
                onActive={onActive || (() => {})}
                openActiveModal={openActiveModal ?? false}
                setOpenActiveModal={setOpenActiveModal || (() => {})}
                record={item || record}
                setRecord={setRecord}
              />
            ))}
            <Pagination
              {...pagination}
              onChange={onPaginationChange}
              showSizeChanger={true}
              showQuickJumper
              showTotal={(total) => `Total ${total} items`}
            />
          </>
        ) : (
          <NoPost />
        )}
      </Flex>
    </Spin>
  );
};

export default PostListStatus;
