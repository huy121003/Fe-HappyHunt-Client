import { Flex } from "antd";
import RigntHeader from "./Right/RigntHeader";
import LeftHeader from "./Left/LeftHeader";
import CenterHeader from "./Center/CenterHeader";

function Header() {
  return (
    <Flex
      // justify="space-between"
      className=" h-[100px]
       bg-black shadow-md p-4 fixed top-0 w-full z-50"
      align="center"
      gap={50}
    >
      <LeftHeader />
      <CenterHeader />
      <RigntHeader />
    </Flex>
  );
}

export default Header;
