import { postMessageHandler } from "@/components/mesage/ToastMessage";
import { useNavigate } from "react-router-dom";

function PaymentCancelPage() {
  const navigate = useNavigate();
  setTimeout(() => {
    postMessageHandler({
      type: "error",
      text: "Payment was canceled",
    });
    navigate("/payment");
  }, 200);

  return <></>;
}

export default PaymentCancelPage;
