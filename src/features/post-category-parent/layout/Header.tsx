import { Flex } from "antd";

import CenterHeader from "./CenterHeader";
import LeftHeader from "@/components/layouts/AppLayout/Header/Left/LeftHeader";
import RigntHeader from "@/components/layouts/AppLayout/Header/Right/RigntHeader";

function Header() {
  return (
    <Flex
      // justify="space-between"
      className=" h-[100px] 
       bg-black shadow-md px-4 fixed top-0 w-full z-50"
      align="center"
      gap={10}
    >
      <LeftHeader />
      <CenterHeader />
      <RigntHeader />
    </Flex>
  );
}

export default Header;
