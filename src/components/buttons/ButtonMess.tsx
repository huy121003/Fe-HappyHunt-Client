import CButtonActionIcon from "@/components/buttons/CButtonActionIcon";
import { ESocketNamespace } from "@/constants";
import { useSocketListener } from "@/hooks/useSocketListener";
import { Badge } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ButtonMess() {
  const [countNotRead, setCountNotRead] = useState(0);
  const navigate = useNavigate();
  useSocketListener(ESocketNamespace.chat, "count_not_read", (data: number) => {
    setCountNotRead(data);
  });
  return (
    <Badge
      count={countNotRead}
      size="small"
      color="red"
      onClick={() => navigate("/chat")}
    >
      <CButtonActionIcon icon="fas fa-comment-alt" title="Message" />
    </Badge>
  );
}

export default ButtonMess;
