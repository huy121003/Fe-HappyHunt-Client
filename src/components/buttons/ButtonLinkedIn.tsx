import CButtonActionIcon from "@/components/buttons/CButtonActionIcon";
import { Tooltip } from "antd";
function ButtionLinkedIn() {
  return (
    <Tooltip title="LinkedIn">
      <CButtonActionIcon
        icon="fa-brands fa-linkedin"
        href="https://www.linkedin.com/in/quanghuy2003/"
      />
    </Tooltip>
  );
}

export default ButtionLinkedIn;
