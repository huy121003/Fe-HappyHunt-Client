import { Flex, Image, Typography } from "antd";

function CLogo() {
  return (
    <Flex align="center" gap={3} justify="center">
      <Image src="/logo.png" preview={false} width={50} />

      <Typography.Title level={3} style={{ color: "#ea580c" }}>
        HAPPY
      </Typography.Title>

      <Typography.Title level={3} style={{ color: "#000" }}>
        HUNT
      </Typography.Title>
    </Flex>
  );
}

export default CLogo;
