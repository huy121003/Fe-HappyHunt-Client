import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("Navigated to:", pathname);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]); // Chạy mỗi khi URL thay đổi

  return null;
};

export default ScrollToTop;
