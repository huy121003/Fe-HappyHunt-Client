import { IPostItem } from "@/features/posts/data/interface";
import { Avatar, Badge, Flex, Image, Tag, Tooltip } from "antd";
import React, { useState } from "react";
import TimeAgo from "../ui/TimeAgo";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_KEY } from "@/features/posts/data/constant";
import { API_KEY as API_KEY_CATEGORY } from "@/features/categories/data/constants";
import PostService from "@/features/posts/service";
import { useAppSelector } from "@/redux/reduxHook";
import { ShoppingCartOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { truncateWithDots } from "@/configs/truncateWithDots";
import ButtonFavorite1 from "@/features/favorite-posts/components/ButtonFavorite1";

interface IProps {
  record: IPostItem;
}

const PostCard2: React.FC<IProps> = ({ record }) => {
  const account = useAppSelector((state) => state.auth.account);
  const client = useQueryClient();
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      const response = await PostService.updateClickCount(id);
      return response.data;
    },
    onSuccess: () => {
      invalidateQueries();
    },
  });

  const invalidateQueries = () => {
    client.invalidateQueries({
      queryKey: [API_KEY_CATEGORY.GET_CATEGORIES],
    });
    client.invalidateQueries({
      queryKey: [API_KEY.POST_DETAIL],
    });
    client.invalidateQueries({
      queryKey: [API_KEY.POST_RELATED, record.createdBy._id],
    });
    client.invalidateQueries({
      queryKey: [API_KEY.POST_DETAIL, record._id],
    });
    client.invalidateQueries({
      queryKey: [API_KEY.POST_CATEGORY],
    });
    client.invalidateQueries({
      queryKey: [API_KEY.POST_CATEGORY_CHILDREN],
    });
  };

  const handleCardClick = () => {
    if (record.createdBy._id !== account?._id) {
      mutate(record._id);
    }

    navigate(`/detail-post/${record.slug}`);
  };

  // const handleMessageClick = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   navigate(
  //     `/messages/new?recipientId=${record.createdBy._id}&postId=${record._id}`
  //   );
  // };

  return (
    <Tooltip title={record.name}>
      <div
        className="relative bg-white rounded-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-500 hover:shadow-lg group flex"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        {/* Image container */}
        <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden">
          {record.images.length > 0 ? (
            <Image
              src={record.images[0].url}
              height={192}
              width={192}
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              preview={false}
              alt={record.name}
            />
          ) : (
            <div className="h-full w-full bg-gray-50 flex items-center justify-center">
              <ShoppingCartOutlined className="text-3xl text-gray-200" />
            </div>
          )}

          {/* Image overlay with additional actions */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            } flex items-end justify-between p-4`}
          >
            <Badge
              count={record.images.length}
              color="orange"
              showZero={false}
              className="bg-black/50 border-2 border-white"
            />
          </div>

          {/* Seller badge */}
          {record.createdBy && (
            <div className="absolute top-0 right-0">
              <Tag
                color={record.isIndividual ? "default" : "orange"}
                className="rounded-bl-md rounded-tr-md rounded-br-none rounded-tl-none border-none font-medium shadow-sm"
              >
                {record.isIndividual ? "Individual" : "Pro"}
              </Tag>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-2">
            <Flex
              className="text-xs text-gray-400 mb-0.5"
              align="center"
              justify="space-between"
              gap={10}
            >
              <Flex align="center" gap={4}>
                <i className="fas fa-tag text-orange-500"></i>
                <span>{record.categoryParent?.name}</span>
                {record.category && (
                  <>
                    <span className="mx-1">•</span>
                    <span>{record.category?.name}</span>
                  </>
                )}
              </Flex>
              {record.pushedAt && (
                <Tooltip title={`Priority post`}>
                  <ThunderboltOutlined
                    className="
                  text-xl
                text-flame-orange
                "
                  />
                </Tooltip>
              )}
            </Flex>

            <h1 className="text-gray-900 font-bold text-xl leading-tight group-hover:text-orange-500 transition-colors duration-300">
              {truncateWithDots(record.name, 50)}
            </h1>

            {/* Price */}
            <div className="flex items-center">
              <h1 className="text-orange-500 font-bold text-2xl">
                {record.price.toLocaleString()} đ
              </h1>
            </div>
          </div>

          {/* Location and time */}
          <Flex
            justify="space-between"
            align="center"
            className="mt-4 pt-4 border-t border-gray-100"
          >
            <Flex vertical>
              <Flex gap={10} justify="center" align="center">
                <span className="text-gray-700 text-sm flex items-center gap-1">
                  <i className="fas fa-map-marker-alt text-orange-500"></i>
                  {record.address.district.name}, {record.address.province.name}
                </span>
              </Flex>
              <Flex gap={10} justify="start" className="mt-4">
                {record.createdBy.avatar ? (
                  <Image
                    src={record.createdBy.avatar}
                    width={24}
                    height={24}
                    className="rounded-full"
                    preview={false}
                    alt={record.createdBy.name}
                  />
                ) : (
                  <Avatar
                    size={24}
                    className="bg-gray-300 text-gray-700 border border-gray-200"
                    style={{ fontSize: "14px" }}
                  >
                    {record.createdBy.name.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                <span className="text-gray-700 text-sm">
                  {record.createdBy.name}
                </span>
                <span className="text-gray-400 text-sm flex items-center gap-1">
                  <TimeAgo date={record.createdAt} />
                </span>
              </Flex>
            </Flex>

            {/* Action buttons */}
            <Flex gap={2}>
              <ButtonFavorite1
                postId={record._id}
                isFavorite={record.isFavorite ?? false}
              />
              {/* <Tooltip title="Message seller">
              <Button
                hidden={record.createdBy._id === account?._id}
                icon={<MessageOutlined className="hover:text-orange-500" />}
                type="text"
                className="hover:bg-orange-50 p-1 rounded-full transition-colors duration-300"
                onClick={handleMessageClick}
              />
            </Tooltip> */}
            </Flex>
          </Flex>
        </div>
      </div>
    </Tooltip>
  );
};

export default PostCard2;
