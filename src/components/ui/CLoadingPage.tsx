import { Flex, Spin } from "antd";

function CLoadingPage() {
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Spin size="large" />
    </Flex>
  );
}

export default CLoadingPage;
