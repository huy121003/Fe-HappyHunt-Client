import ButtonCate from "@/components/buttons/ButtonCate";
import CSearch from "@/components/form/CSearch";
import { usePostFilterContext } from "../components/PostFilterProvider";

import { Flex } from "antd";

function CenterHeader() {
  const { handleInputSearch } = usePostFilterContext();
  return (
    <Flex align="center" justify="center" className="flex-1">
      <ButtonCate />
      <CSearch onInput={handleInputSearch} />
    </Flex>
  );
}

export default CenterHeader;
