import CButtonActionIcon from "@/components/buttons/CButtonActionIcon";
import { Tooltip } from "antd";
function ButtonFb() {
  return (
    <Tooltip title="Facebook">
      <CButtonActionIcon
        icon="fa-brands fa-facebook"
        href="https://www.facebook.com/huy121003"
      />
    </Tooltip>
  );
}
export default ButtonFb;
