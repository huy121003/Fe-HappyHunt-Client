import { useNavigate } from "react-router-dom";
import CButtonActionIcon from "./CButtonActionIcon";
import { Tooltip } from "antd";
function ButtonStore() {
  const navigate = useNavigate();
  return (
    <Tooltip title="Post Management">
      <CButtonActionIcon
        icon="fas fa-store"
        onClick={() => {
          navigate("/post-management");
        }}
      />
    </Tooltip>
  );
}

export default ButtonStore;
