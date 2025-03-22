import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
interface IProps {
  children: React.ReactNode;
}

function ScrollableContainer2({ children }: IProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const checkScroll = () => {
    const container = listRef.current;
    if (container) {
      setShowLeftButton(container.scrollLeft > 0);
      setShowRightButton(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkScroll();
    }, 100);
    return () => clearTimeout(timer);
  }, [children]);

  useEffect(() => {
    const container = listRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      checkScroll();
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      container?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (listRef.current) {
      const scrollAmount = listRef.current.offsetWidth * 0.8;
      listRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative px-8">
      {/* Navigation Buttons */}
      {showLeftButton && (
        <Button
          shape="circle"
          size="large"
          className="
                absolute left-0 top-1/2 -translate-y-1/2 
                bg-white shadow-lg hover:bg-orange-50 
                z-10 border border-gray-200
                transition-all duration-300
                hover:border-orange-300
              "
          icon={<LeftOutlined className="text-gray-600" />}
          onClick={() => handleScroll("left")}
        />
      )}

      {/* Posts List */}
      <div
        ref={listRef}
        className="
                flex gap-6 overflow-x-scroll scrollbar-hide 
               
                pb-4 snap-x snap-mandatory
              "
        style={{
          scrollPadding: "0 24px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>
      {showRightButton && (
        <Button
          size="large"
          shape="circle"
          className="
                absolute right-0 top-1/2 -translate-y-1/2 
                bg-white shadow-lg hover:bg-orange-50 
                z-10 border border-gray-200
                transition-all duration-300
                hover:border-orange-300
              "
          icon={<RightOutlined className="text-gray-600" />}
          onClick={() => handleScroll("right")}
        />
      )}
    </div>
  );
}

export default ScrollableContainer2;
