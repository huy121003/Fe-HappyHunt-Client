import { useNavigate } from "react-router-dom";
import CButtonActionIcon from "./CButtonActionIcon";
import { Tooltip } from "antd";
function ButtonStore() {
  const navigate = useNavigate();
  return (
    <CButtonActionIcon
      icon="fas fa-store"
      onClick={() => {
        navigate("/post-management");
      }}
      title="Post Management"
    />
  );
}

export default ButtonStore;
