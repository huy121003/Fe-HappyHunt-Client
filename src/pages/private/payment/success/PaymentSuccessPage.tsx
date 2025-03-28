import { postMessageHandler } from "@/components/mesage/ToastMessage";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();
  setTimeout(() => {
    postMessageHandler({
      type: "error",
      text: "Success! Payment was successful",
    });
    navigate("/payment");
  }, 200);

  return <div></div>;
}

export default PaymentSuccessPage;
