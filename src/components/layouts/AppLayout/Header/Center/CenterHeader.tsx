import CSearch from "@/components/CSearch";
import { Flex } from "antd";
import ButtonCate from "../../../../buttons/ButtonCate";

function CenterHeader() {
  return (
    <Flex align="center" justify="center" className="flex-1">
      <ButtonCate />
      <CSearch />
    </Flex>
  );
}

export default CenterHeader;
