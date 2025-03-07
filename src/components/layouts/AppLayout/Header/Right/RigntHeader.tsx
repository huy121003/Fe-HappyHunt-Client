import { Flex } from "antd";

import ButtonActionProfile from "./ButtonActionProfile";
import { useAuthen } from "@/hooks/useAuthen";
import AuthAction from "./AuthAction";
import ButtonNewPost from "../../../../buttons/ButtonNewPost";
import ButtonMess from "../../../../buttons/ButtonMess";
import ButtonNoti from "../../../../buttons/ButtonNoti";
import ButtonStore from "../../../../buttons/ButtonStore";

function RigntHeader() {
  const isAuthen = useAuthen();

  return (
    <Flex vertical justify="center" align="center">
      {isAuthen ? (
        <Flex gap={10} justify="center" align="center">
          <ButtonNoti />
          <ButtonMess />
          <ButtonStore />
          <ButtonActionProfile />
          <ButtonNewPost />
        </Flex>
      ) : (
        <AuthAction />
      )}
    </Flex>
  );
}

export default RigntHeader;
