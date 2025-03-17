import { Button, Flex, Image, Typography } from "antd";
import Bottom from "./layouts/AppLayout/Bottom/Bottom";
import { useNavigate } from "react-router-dom";
function CPostIsNotAvailable() {
  const naviagate = useNavigate();
  return (
    <>
      <Flex
        vertical
        justify="center"
        align="center"
        className="flex-1 flex overflow-y-hidden min-h-[calc(100vh/1.5)] p-4"
        gap={20}
      >
        <Image src="/image8.png" width="30%" preview={false} />
        <Typography.Text type="secondary" className="text-2xl">
          This post is not available, plesae try again later
        </Typography.Text>
        <Button
          type="default"
          onClick={() => {
            naviagate("/");
          }}
        >
          Back to Home
        </Button>
      </Flex>
      <Bottom />
    </>
  );
}

export default CPostIsNotAvailable;
