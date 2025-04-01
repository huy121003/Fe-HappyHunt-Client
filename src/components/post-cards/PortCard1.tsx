import { IPostItem } from "@/features/posts/data/interface";
import { Badge, Button, Flex, Image, Tag, Tooltip, Typography } from "antd";
import React, { useState } from "react";
import TimeAgo from "../ui/TimeAgo";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_KEY } from "@/features/posts/data/constant";
import { API_KEY as API_KEY_CATEGORY } from "@/features/categories/data/constants";
import PostService from "@/features/posts/service";
import { useAppSelector } from "@/redux/reduxHook";
import {
  MessageOutlined,

  ShoppingCartOutlined,
} from "@ant-design/icons";
import { truncateWithDots } from "@/configs/truncateWithDots";
import ButtonFavorite1 from "@/features/favorite-posts/components/ui/ButtonFavorite1";

interface IProps {
  record: IPostItem;
}

const PortCard1: React.FC<IProps> = ({ record }) => {
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

  const handleMessageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(
      `/messages/new?recipientId=${record.createdBy._id}&postId=${record._id}`
    );
  };

  return (
    <div
      className="relative bg-white rounded-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-500 hover:shadow-lg group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Image container */}
      <div className="relative overflow-hidden">
        {record.images.length > 0 ? (
          <Image
            src={record.images[0].url}
            height={180}
            width="100%"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            preview={false}
            alt={record.name}
          />
        ) : (
          <div className="h-[180px] w-full bg-gray-50 flex items-center justify-center">
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
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <Flex className="text-xs text-gray-400 mb-0.5" align="center" gap={1}>
          <i className="fas fa-tag text-orange-500"></i>
          <span>{record.categoryParent?.name}</span>
          {record.category && (
            <>
              <span className="mx-1">•</span>
              <span>{record.category?.name}</span>
            </>
          )}
        </Flex>

        <h1 className="text-gray-900 font-bold text-base leading-tight group-hover:text-orange-500 transition-colors duration-300">
          {truncateWithDots(record.name, 20)}
        </h1>

        {/* Price */}
        <div className="flex items-center">
          <h1 className="text-orange-500 font-bold text-lg">
            {record.price.toLocaleString()} đ
          </h1>
        </div>

        {/* Location and time */}
        <Flex
          justify="space-between"
          align="center"
          className="mt-2 pt-2 border-t border-gray-100"
        >
          <Flex vertical gap={1}>
            <Typography.Text className="text-gray-700 text-xs flex items-center gap-1">
              <i className="fas fa-map-marker-alt text-orange-500"></i>
              {record.address.province.name}
            </Typography.Text>
            <Typography.Text className="text-gray-400 text-xs flex items-center gap-1">
              <TimeAgo date={record.createdAt} />
            </Typography.Text>
          </Flex>

          {/* Action buttons */}
          <Flex gap={2}>
            <ButtonFavorite1
              postId={record._id}
              isFavorite={record.isFavorite ?? false}
            />
            <Tooltip title="Message seller">
              <Button
              hidden={record.createdBy._id === account?._id}
                icon={<MessageOutlined className="hover:text-orange-500" />}
                type="text"
                className="hover:bg-orange-50 p-1 rounded-full transition-colors duration-300"
                onClick={handleMessageClick}
              />
            </Tooltip>
          </Flex>
        </Flex>
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
  );
};

export default PortCard1;
