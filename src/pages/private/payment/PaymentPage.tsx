import PaymentTable from "@/features/payment/components/ui/PaymentTable";
import ContentLayout from "@/components/layouts/ContentLayout";
import PaymentForm from "@/features/payment/components/form/PaymentForm";

const PaymentPage = () => {
  return (
    <ContentLayout title="Thanh toán">
      <PaymentForm />
      <PaymentTable />
    </ContentLayout>
  );
};

export default PaymentPage;
