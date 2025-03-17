import React from "react";
import { IPost } from "../../data/interface";
import { Flex, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import ImagePostCarousel from "./ImagePostCarousel";
import Description from "./Description";
import Attribute from "./Attribute";
import InfoUser from "./InfoUser";
import PostListUser from "./PostListUser";
interface IProps {
  isLoading?: boolean;
  data: IPost;
  title?: string;
}
const PostDetail: React.FC<IProps> = ({ data, isLoading, title }) => {
  const navigate = useNavigate();
  return data && isLoading ? (
    <Spin spinning={isLoading} />
  ) : (
    <Flex
      vertical
      className=" xl:w-3/4 w-full h-full min-h-[calc(100vh-100px)] bg-slate-50  "
    >
      <Flex justify="start" align="center" gap={10} className="mb-4 p-4">
        <h1
          className="text-2xl font-semibold text-flame-orange cursor-pointer"
          onClick={() => {
            navigate("/");
            window.scrollTo(0, 0);
          }}
        >
          HappyHunt
        </h1>
        <h1 className="text-2xl font-semibold text-gray-400">{">"}</h1>
        <h1 className="text-2xl font-semibold text-gray-400">
          {title ? `${title}>>${data.name}` : data.name}
        </h1>
      </Flex>
      <Flex className="flex-1 xl:flex-row flex-col" gap={20}>
        <Flex className="xl:w-3/5 w-full p-4 " vertical gap={20}>
          <ImagePostCarousel images={data.images} />
          <Description description={data.description} />
          <Attribute attributes={data.attributes} />
        </Flex>
        <Flex className="xl:w-2/5 w-full p-4" vertical gap={20}>
          <InfoUser record={data} />
        </Flex>
      </Flex>
      <Flex vertical className=" w-full mb-4 p-4" gap={20}>
        <PostListUser idUser={data.createdBy._id} name={data.createdBy.name} />
      </Flex>
    </Flex>
  );
};

export default PostDetail;
