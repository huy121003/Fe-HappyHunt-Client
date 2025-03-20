import { Flex, Image, Typography } from "antd";

function LeftHeader() {
  return (
    <Flex align="center" justify="center">
      <Image src="/logo.png" preview={false} width={30} />
      <Typography.Title
        level={5}
        style={{ color: "#ea580c" }}
        className="hidden md:block"
      >
        HAPPY
      </Typography.Title>
      <Typography.Title
        level={5}
        style={{ color: "#fff" }}
        className="hidden md:block"
      >
        HUNT
      </Typography.Title>
    </Flex>
  );
}

export default LeftHeader;
