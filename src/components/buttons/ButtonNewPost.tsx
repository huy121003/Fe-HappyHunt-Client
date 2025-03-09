import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function ButtonNewPost() {
  const navigate = useNavigate();
  return (
    <Button
      type="default"
      size="large"
      onClick={() => navigate("/create-post")}
      icon={<i className="fas fa-plus"></i>}
    >
      New Post
    </Button>
  );
}

export default ButtonNewPost;
