import PaymentTable from "@/features/payment/components/ui/PaymentTable";
import ContentLayout from "@/components/layouts/ContentLayout";
import PaymentForm from "@/features/payment/components/form/PaymentForm";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";

const PaymentPage = () => {
  const navigate = useNavigate();
  return (
    <ContentLayout
      title={
        <Breadcrumb>
          <Breadcrumb.Item
            className="text-lg font-semibold text-gray-400 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-lg font-semibold text-flame-orange ">
            Payment Management
          </Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <PaymentForm />
      <PaymentTable />
    </ContentLayout>
  );
};

export default PaymentPage;
