import CButtonActionIcon from "@/components/buttons/CButtonActionIcon";

import { useSocketListenerWithResponse } from "@/hooks/useSocketListenerWithResponse";
import { Badge } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ButtonMess() {
  const [countNotRead, setCountNotRead] = useState(0);
  const navigate = useNavigate();
  useSocketListenerWithResponse("count_not_read", (data: number) => {
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
