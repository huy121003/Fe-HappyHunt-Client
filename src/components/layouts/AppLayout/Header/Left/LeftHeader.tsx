
import { Flex, Image, Typography } from "antd";


function LeftHeader() {
  return (
    <Flex align="center" justify="center">
      <Image src="/logo.png" preview={false} width={30} />

      <Typography.Title level={5} style={{ color: "#ea580c" }}>
        HAPPY
      </Typography.Title>

      <Typography.Title level={5} style={{ color: "#fff" }}>
        HUNT
      </Typography.Title>
    </Flex>
  );
}

export default LeftHeader;
