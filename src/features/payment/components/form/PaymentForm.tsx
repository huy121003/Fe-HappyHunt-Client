import { IPaymentLinkPayload } from "@/features/payos/data/interface";
import PayOsService from "@/features/payos/service";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import usePaymentState from "../../hooks/usePaymentState";
import { Typography, Button, Flex } from "antd";
import { postMessageHandler } from "@/components/mesage/ToastMessage";
import PaymentModal from "../ui/PaymentModal";
import { useAppSelector } from "@/redux/reduxHook";
import { Amount } from "../../data/constant";

function PaymentForm() {
  const balance = useAppSelector((state) => state.auth.account?.balance);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const { onSuccess } = usePaymentState();
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IPaymentLinkPayload) => {
      const response = await PayOsService.createPaymentLink(data);
      return response.data;
    },
    onSuccess: (data) => {
      onSuccess("Payment link created successfully", () => {
        setId(Number(data._id));
        setSelectedPrice(null);
        setOpen(true);
      });
    },
  });

  const onSubmit = async () => {
    if (!selectedPrice) {
      postMessageHandler({
        type: "error",
        text: "Please select a price to top-up",
      });
      return;
    }
    mutate({ price: selectedPrice });
  };

  return (
    <Flex
      vertical
      flex={1}
      className="bg-white shadow-md rounded-lg p-6 w-full"
    >
      <Flex justify="space-between" className="w-full">
        <Typography.Title level={4} className=" text-black">
          Top-up
        </Typography.Title>
        <Typography.Text className=" text-black">
          Balance: {balance?.toLocaleString()} VND
        </Typography.Text>
      </Flex>
      <Flex className="w-full">
        <Flex className="w-full justify-between grid grid-cols-4 gap-4">
          {Amount.map((price) => (
            <Button
              key={price}
              type="default"
              onClick={() => setSelectedPrice(Number(price))}
              className={`p-10 text-center border rounded-md transition-all ${
                selectedPrice === price
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-black border-gray-300 hover:bg-orange-100"
              }`}
            >
              {price.toLocaleString()} VND
            </Button>
          ))}
        </Flex>
      </Flex>

      <Flex className="w-full justify-end">
        <Button
          onClick={onSubmit}
          type="primary"
          loading={isPending}
          className="mt-6 bg-orange-500 border-orange-500 text-white hover:bg-orange-600"
        >
          Create payment link
        </Button>
      </Flex>
      {id && <PaymentModal id={id} open={open} setOpen={setOpen} />}
    </Flex>
  );
}

export default PaymentForm;
