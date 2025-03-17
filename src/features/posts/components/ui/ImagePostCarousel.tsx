import React, { useState, useRef } from "react";
import { Carousel, Image, Row, Col } from "antd";
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
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      {/* Carousel chính */}
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <Carousel
          infinite={false}
          ref={carouselRef}
          autoplay
          dots={false}
          afterChange={(index) => setCurrentSlide(index)}
          className="w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-xl object-cover"
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] relative  flex items-center justify-center"
            >
              {/* Ảnh chính */}
              <Image
                src={img}
                alt={`product-image-${index}`}
                width="100%"
                height="100%"
              />

              {/* Overlay tối nhẹ */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 rounded-xl"></div>

              {/* Icon Like & Share */}
              <div className="absolute top-3 right-3 flex gap-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition-all duration-300"
                >
                  {liked ? (
                    <HeartFilled className="text-red-500 text-lg transition-all scale-110" />
                  ) : (
                    <HeartOutlined className="text-red-500 text-lg" />
                  )}
                </button>
                <button
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    postMessageHandler({
                      text: "Copied link to clipboard!",
                      type: "success",
                    });
                  }}
                >
                  <ShareAltOutlined className="text-blue-500 text-lg" />
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Thumbnail selector */}
      <Row gutter={[10, 10]} justify="center" className="mt-4">
        {images.map((img, index) => (
          <Col key={index}>
            <div
              className={`cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                currentSlide === index
                  ? "border-orange-500 scale-105 shadow-md"
                  : "border-transparent"
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <Image
                src={img}
                width={80}
                height={80}
                preview={false}
                className="object-cover rounded-lg hover:opacity-80 transition duration-200"
              />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ImagePostCarousel;
