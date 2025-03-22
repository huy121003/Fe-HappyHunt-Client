import { Tooltip } from "antd";
import CButtonActionIcon from "./CButtonActionIcon";

function ButtonCate() {
  return (
    <Tooltip title="Search by Category">
      <CButtonActionIcon icon="fas fa-bars" />
    </Tooltip>
  );
}

export default ButtonCate;
