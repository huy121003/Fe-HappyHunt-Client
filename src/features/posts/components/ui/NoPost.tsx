import { Button, Flex, Image, Typography } from "antd";
import { useNavigate } from "react-router-dom";

function NoPost() {
  const navigate = useNavigate();
  return (
    <Flex vertical className="h-1/2 " justify="center" align="center" gap={10}>
      <Image src="/image8.png" width="40%" preview={false} />
      <Typography.Text type="secondary" className="text-2xl">
        You don't have any post yet, let's create one
      </Typography.Text>
      <Button
        type="default"
        onClick={() => {
          navigate("/create-post");
        }}
      >
        Create New Post
      </Button>
    </Flex>
  );
}

export default NoPost;
