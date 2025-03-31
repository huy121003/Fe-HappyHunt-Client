import React from "react";
import { IPost } from "../../data/interface";
import { Card, Flex } from "antd";
import ImagePostCarousel from "./ImagePostCarousel";
import Description from "./Description";
import Attribute from "./Attribute";
import InfoUser from "./InfoUser";
import PostListUser from "./PostListUser";
import PostRelatedList from "./PostRelatedList";
import { CLoadingPage } from "@/components";

interface IProps {
  isLoading?: boolean;
  data: IPost;
  title?: string;
}

const PostDetail: React.FC<IProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return <CLoadingPage />;
  }
  return (
    <Flex vertical className=" bg-gray-100 p-2 w-full" justify="center">
      <Card className="bg-gray-100 !m-0" bodyStyle={{ padding: 0 }}>
        <Flex
          justify="center"
          className=" lg:flex-row flex-col rounded-lg  mb-2 "
          gap={10}
        >
          {/* Image carousel section */}
          <Flex
            className="lg:w-3/5 w-full rounded-lg bg-white p-2  border-t-2 border-t-flame-orange "
            vertical
            gap={10}
          >
            <ImagePostCarousel record={data} />
          </Flex>

          {/* User info section */}
          <Flex className="lg:w-2/5 w-full" vertical gap={10}>
            <InfoUser record={data} />
          </Flex>
        </Flex>

        {/* Description section */}
        <Description description={data.description} />

        {/* Attributes section */}
        <Attribute
          attributes={(data.attributes || []).map((attr) => ({
            name: attr.name,
            value: attr.value !== undefined ? String(attr.value) : "",
          }))}
        />

        {/* User's other posts section */}
        <Flex vertical className="w-full mb-4 " gap={10}>
          <PostListUser record={data} />
        </Flex>
        <Flex vertical className="w-full mb-4 " gap={10}>
          <PostRelatedList record={data} />
        </Flex>
      </Card>
    </Flex>
  );
};

export default PostDetail;
