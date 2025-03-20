import React, { useState, useRef } from "react";
import { Carousel, Image } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
} from "@ant-design/icons";
import { postMessageHandler } from "@/components/ToastMessage";

interface Props {
  images: string[];
}

const ImagePostCarousel: React.FC<Props> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [liked, setLiked] = useState(false);
  const carouselRef = useRef<any>(null);
  const handleThumbnailClick = (index: number) => {
    setCurrentSlide(index);
    carouselRef.current?.goTo(index);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Main Carousel */}
      <div className="relative overflow-hidden w-full max-w-[550px] bg-white rounded-lg shadow-sm">
        <Carousel
          infinite={false}
          ref={carouselRef}
          autoplay
          dots={false}
          afterChange={(index) => setCurrentSlide(index)}
          className="w-full aspect-square"
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="w-full h-full relative flex items-center justify-center"
            >
              {/* Main image automatically scales with carousel */}
              <img
                src={img}
                alt={`product-image-${index}`}
                className="w-full h-full object-contain rounded-lg"
              />

              {/* Like & Share Icons */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => setLiked(!liked)}
                  className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 backdrop-blur-sm"
                >
                  {liked ? (
                    <HeartFilled className="text-orange-500 text-lg transition-transform scale-110" />
                  ) : (
                    <HeartOutlined className="text-black text-lg" />
                  )}
                </button>
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
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Thumbnail selector */}
      <div className="mt-4 overflow-y-hidden overflow-x-auto flex w-full max-w-md gap-2 justify-start px-1">
        {images.map((img, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              onClick={() => handleThumbnailClick(index)}
              src={img}
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
