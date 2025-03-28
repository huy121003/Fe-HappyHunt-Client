import React, { useState, useRef } from "react";
import { Carousel, Image, Tooltip } from "antd";

import { postMessageHandler } from "@/components/mesage/ToastMessage";
import ButtonFavorite1 from "@/features/favorite-posts/components/ui/ButtonFavorite1";
import { IPost } from "../../data/interface";
import { ShareAltOutlined } from "@ant-design/icons";

interface Props {
  record: IPost;
}

const ImagePostCarousel: React.FC<Props> = ({ record }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselRef = useRef<any>(null);
  const handleThumbnailClick = (index: number) => {
    setCurrentSlide(index);
    carouselRef.current?.goTo(index);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Main Carousel */}
      <div className="relative overflow-hidden w-full max-w-[600px] bg-white rounded-lg shadow-sm">
        <Carousel
          infinite={false}
          ref={carouselRef}
          autoplay
          dots={false}
          afterChange={(index) => setCurrentSlide(index)}
          className="w-full aspect-square"
        >
          {record.images.map((img, index) => (
            <div
              key={index}
              className="w-full h-full relative flex items-center justify-center"
            >
              {/* Main image automatically scales with carousel */}
              <img
                src={img.url}
                alt={`product-image-${index}`}
                className="w-full h-full object-contain rounded-lg"
              />

              {/* Like & Share Icons */}
              <div className="absolute top-3 right-3 flex gap-2">
                <ButtonFavorite1
                  postId={record._id}
                  isFavorite={record.isFavorite ?? false}
                />
                <Tooltip title="Share">
                  <button
                    className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 backdrop-blur-sm"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      postMessageHandler({
                        text: "Copied link to clipboard!",
                        type: "success",
                      });
                    }}
                  >
                    <ShareAltOutlined className="text-black text-lg" />
                  </button>
                </Tooltip>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Thumbnail selector */}
      <div className="mt-4 overflow-y-hidden overflow-x-auto flex w-full max-w-md gap-2 justify-start px-1">
        {record.images.map((img, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              onClick={() => handleThumbnailClick(index)}
              src={img.url}
              width={50}
              height={50}
              preview={false}
              className={`object-cover rounded-lg hover:opacity-90 transition-all duration-200
              cursor-pointer shadow-sm
              ${
                index === currentSlide
                  ? "border-2 border-orange-500 scale-105"
                  : "border border-gray-200 hover:border-orange-300"
              }`}
              alt={`product-thumbnail-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePostCarousel;
