import { Flex, Image } from "antd";

function SelectChat() {
  return (
    <Flex vertical className="w-2/3  justify-center items-center">
      <Image src="./image8.png" width={500} height={500} preview={false} />
      <span className="text-2xl  text-center text-gray-400">
        Please select a chat to start conversation
      </span>
    </Flex>
  );
}

export default SelectChat;
