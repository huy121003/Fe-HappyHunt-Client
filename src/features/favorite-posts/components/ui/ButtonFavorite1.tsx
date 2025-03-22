import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React, { useState } from "react";
import useFavoritePostState from "../../hooks/useFavoritePostState";
import { useMutation } from "@tanstack/react-query";
import FavoritePostService from "../../service";
interface IProps {
  postId: number;
  isFavorite: boolean;
}
function ButtonFavorite1({ postId, isFavorite }: IProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  const { onSuccess, onError } = useFavoritePostState();
  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = favorite
        ? await FavoritePostService.remove(postId)
        : await FavoritePostService.create({ post: postId });

      return response;
    },
    onSuccess: () => {
      onSuccess(
        isFavorite ? "Post removed from favorites" : "Post added to favorites",
        () => {
          setFavorite(!favorite);
        }
      );
    },
    onError,
  });
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutate();
    // Add logic to save to favorites
  };
  return (
    <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
      <Button
        icon={
          isFavorite ? (
            <HeartFilled className="text-orange-500" />
          ) : (
            <HeartOutlined className="hover:text-orange-500" />
          )
        }
        type="default"
        className="hover:bg-orange-50 p-1 rounded-full transition-colors duration-300
        border-[0px]
        "
        onClick={handleFavoriteClick}
      />
    </Tooltip>
  );
}

export default ButtonFavorite1;
