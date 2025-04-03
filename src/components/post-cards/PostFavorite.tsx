import { Badge, Flex, Image, Tooltip, Typography } from "antd";
import { useState } from "react";
import TimeAgo from "../ui/TimeAgo";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { truncateWithDots } from "@/configs/truncateWithDots";
import { IFavoritePost } from "@/features/favorite-posts/data/interface";
import ButtonFavorite2 from "@/features/favorite-posts/components/ButtonFavorite2";
import { EPostStatus } from "@/features/posts/data/constant";

interface IProps {
  record: IFavoritePost;
}
function PostFavorite({ record }: IProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const handleCardClick = () => {
    navigate(`/detail-post/${record?.post?.slug}`);
  };
  return (
    <Tooltip title={record?.post?.name}>
      <div
        className="relative bg-white rounded-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-500 hover:shadow-lg group flex"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={
          record?.post?.status === EPostStatus.SELLING
            ? handleCardClick
            : undefined
        }
      >
        <div className="relative w-[150px] h-[150px] flex-shrink-0 overflow-hidden">
          {record?.post?.images?.length > 0 ? (
            <Image
              src={record?.post?.images[0].url}
              height={150}
              width={150}
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              preview={false}
              alt={record?.post?.name}
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
              count={record?.post?.images?.length}
              color="orange"
              showZero={false}
              className="bg-black/50 border-2 border-white"
            />
          </div>
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h1 className="text-gray-900 font-bold text-xl leading-tight group-hover:text-orange-500 transition-colors duration-300">
              {record?.post?.name
                ? truncateWithDots(record?.post?.name, 50)
                : "This post has been deleted"}
            </h1>

            {/* Price */}
            <div className="flex items-center">
              <h1 className="text-orange-500 font-bold text-2xl">
                {record?.post?.price?.toLocaleString() || 0} đ
              </h1>
            </div>
          </div>
        </div>
        <Flex
          justify="space-between"
          align="center"
          className="mt-4 pt-4 border-t border-gray-100"
        >
          <Flex vertical>
            <Flex gap={10} justify="start" className="mt-4">
              {record?.post?.status !== EPostStatus.SELLING && (
                <Typography.Text className="text-red-500 font-semibold text-sm">
                  This post has been hidden
                </Typography.Text>
              )}
              <span className="text-gray-400 text-sm flex items-center gap-1">
                <TimeAgo date={record.createdAt} />
              </span>
            </Flex>
          </Flex>

          {/* Action buttons */}
          <Flex gap={2}>
            <ButtonFavorite2 postId={record?._id} isFavorite={true} />
          </Flex>
        </Flex>
      </div>
    </Tooltip>
  );
}

export default PostFavorite;
