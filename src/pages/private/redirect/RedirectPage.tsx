import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RedirectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const slug = searchParams.get("slug");

    if (slug) {
      navigate(`/detail-post/${slug}`, { replace: true });
    }
  }, [location, navigate]);

  return null;
};

export default RedirectPage;
