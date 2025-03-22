import React, { useRef, useState, useEffect } from "react";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface ScrollableContainerProps {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  scrollAmount?: number;
}

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  children,
  className = "",
  gap = 50,
  scrollAmount = 200,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  // Check scroll position to show/hide buttons
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftButton(container.scrollLeft > 0);
      setShowRightButton(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      // Initial check
      checkScroll();

      // Check on window resize
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      container?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  // Scroll handlers
  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Left Scroll Button */}
      {showLeftButton && (
        <Button
          type="default"
          shape="circle"
          icon={<LeftOutlined />}
          onClick={() => handleScroll("left")}
          className="
            absolute left-0 top-1/2 -translate-y-1/2 z-10 
            bg-white shadow-lg hover:bg-orange-50
            border border-gray-200 hover:border-orange-300
            transition-all duration-300
          "
          style={{
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* Scrollable Content */}
      <div
        ref={scrollContainerRef}
        className={`
          overflow-x-scroll scrollbar-hide
          ${className}
        `}
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <div className="flex w-max" style={{ gap: `${gap}px` }}>
          {children}
        </div>
      </div>

      {/* Right Scroll Button */}
      {showRightButton && (
        <Button
          type="default"
          shape="circle"
          icon={<RightOutlined />}
          onClick={() => handleScroll("right")}
          className="
            absolute right-0 top-1/2 -translate-y-1/2 z-10 
            bg-white shadow-lg hover:bg-orange-50
            border border-gray-200 hover:border-orange-300
            transition-all duration-300
          "
          style={{
            transform: "translate(50%, -50%)",
          }}
        />
      )}
    </div>
  );
};

export default ScrollableContainer;
