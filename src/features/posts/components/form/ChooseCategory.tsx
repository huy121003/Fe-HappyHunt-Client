import { Flex, Image, Typography } from "antd";


function ChooseCategory() {
  return (
    <Flex vertical className="h-full" justify="center" align="center">
      <Image src="./image1.png" width="50%" preview={false} />
      <Typography.Title level={3} className="text-center">
        Quickly - Sell
      </Typography.Title>
      <Typography.Text className="text-center">
        Choose a category to start selling
      </Typography.Text>
    </Flex>
  );
}

export default ChooseCategory;
