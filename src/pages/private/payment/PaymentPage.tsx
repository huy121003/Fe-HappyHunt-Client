import PaymentTable from "@/features/payment/components/ui/PaymentTable";
import ContentLayout from "@/components/layouts/ContentLayout";
import PaymentForm from "@/features/payment/components/form/PaymentForm";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  return (
    <ContentLayout
      title={
        <div className="flex items-center gap-1">
          <h1
            className="text-sm font-semibold text-flame-orange cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </h1>
          <h1 className="text-sm font-semibold text-gray-400">{"/"}</h1>
          <h1 className="text-sm font-semibold text-gray-400">
            Payment Management
          </h1>
        </div>
      }
    >
      <PaymentForm />
      <PaymentTable />
    </ContentLayout>
  );
};

export default PaymentPage;
