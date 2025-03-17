import { useNavigate } from "react-router-dom";
import CButtonActionIcon from "../CButtonActionIcon";

function ButtonStore() {
  const navigate = useNavigate();
  return (
    <CButtonActionIcon
      icon="fas fa-store"
      onClick={() => {
        navigate("/post-management");
        window.scrollTo(0, 0);
      }}
    />
  );
}

export default ButtonStore;
