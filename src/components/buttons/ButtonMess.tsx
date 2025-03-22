import CButtonActionIcon from "@/components/buttons/CButtonActionIcon";
import { Tooltip } from "antd";
function ButtonMess() {
  return (
    <Tooltip title="Message">
      <CButtonActionIcon icon="fas fa-comment-alt" />
    </Tooltip>
  );
}

export default ButtonMess;
