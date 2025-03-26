import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { API_KEY, EStatus } from "../../data/constant";
import PaymentService from "../../service";
import { Button, Flex, Image, Modal, Tabs, Typography } from "antd";
import { QRCodeCanvas } from "qrcode.react";
import { CopyOutlined } from "@ant-design/icons";
import { postMessageHandler } from "@/components/mesage/ToastMessage";
import usePaymentState from "../../hooks/usePaymentState";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHook";
import { updateAccountAction } from "@/redux/slice/SAuthSlice";

interface PaymentModalProps {
  id: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const QRCodeTab: React.FC<{
  qrCode: string;
}> = ({ qrCode }) => (
  <div className="flex flex-col items-center justify-center gap-6">
    <QRCodeCanvas value={qrCode || ""} size={300} />
    <Image src="/mb1.jpg" height={100} preview={false} className="rounded-lg" />
    <Typography.Text className="text-black">
      Scan the QR code to make payment
    </Typography.Text>
  </div>
);

const PaymentInfoTab: React.FC<{
  data: any;
}> = ({ data }) => (
  <div className="space-y-4">
    <div className="flex gap-4">
      <Image
        src="/mb2.png"
        width={50}
        height={50}
        preview={false}
        className="rounded-lg"
      />
      <div className="items-center">
        <Typography.Title level={5} className="text-black">
          Bank
        </Typography.Title>
        <Typography.Text className="text-black">MB Bank</Typography.Text>
      </div>
    </div>
    <div>
      <Typography.Title level={5} className="text-black">
        Account number
      </Typography.Title>
      <div className="flex justify-between items-center p-2 bg-orange-100 rounded-lg">
        <Typography.Text className="text-black">
          {data?.accountNumber}
        </Typography.Text>
        <Button
          type="link"
          icon={<CopyOutlined className="text-orange-500" />}
          onClick={() => {
            navigator.clipboard.writeText(data?.accountNumber || "");
            postMessageHandler({
              type: "success",
              text: "Copied to clipboard",
            });
          }}
        />
      </div>
    </div>
    <div>
      <Typography.Title level={5} className="text-black">
        Account holder
      </Typography.Title>
      <div className="flex justify-between items-center p-2 bg-orange-100 rounded-lg">
        <Typography.Text className="text-black">
          {data?.accountName}
        </Typography.Text>
        <Button
          type="link"
          icon={<CopyOutlined className="text-orange-500" />}
          onClick={() => {
            navigator.clipboard.writeText(data?.accountName || "");
            postMessageHandler({
              type: "success",
              text: "Copied to clipboard",
            });
          }}
        />
      </div>
    </div>
    <div>
      <Typography.Title level={5} className="text-black">
        Amount
      </Typography.Title>
      <div className="flex justify-between items-center p-2 bg-orange-100 rounded-lg">
        <Typography.Text className="text-black">{data?.amount}</Typography.Text>
        <Button
          type="link"
          icon={<CopyOutlined className="text-orange-500" />}
          onClick={() => {
            navigator.clipboard.writeText(String(data?.amount) || "");
            postMessageHandler({
              type: "success",
              text: "Copied to clipboard",
            });
          }}
        />
      </div>
    </div>
    <div>
      <Typography.Title level={5} className="text-black">
        Content
      </Typography.Title>
      <div className="flex justify-between items-center p-2 bg-orange-100 rounded-lg">
        <Typography.Text className="text-black">
          {data?.description}
        </Typography.Text>
        <Button
          type="link"
          icon={<CopyOutlined className="text-orange-500" />}
          onClick={() => {
            navigator.clipboard.writeText(String(data?.description) || "");
            postMessageHandler({
              type: "success",
              text: "Copied to clipboard",
            });
          }}
        />
      </div>
    </div>
    <Typography.Text className="text-black">
      Warning: Please enter the exact amount and content of transfer
    </Typography.Text>
  </div>
);

const PaymentModal: React.FC<PaymentModalProps> = ({ id, open, setOpen }) => {
  const balance = useAppSelector((state) => state.auth.account.balance);
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = React.useState(1);
  const { onSuccess } = usePaymentState();
  const { data: dataPayment, isLoading } = useQuery({
    queryKey: [API_KEY.PAYMENT_DETAIL, { id }],
    queryFn: async () => {
      const response = await PaymentService.getById(Number(id));
      return response.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await PaymentService.updateStatus(
        Number(id),
        EStatus.CANCEL
      );
      return response.data;
    },
    onSuccess: () => {
      onSuccess("Payment has been canceled", () => {
        setOpen(false);
      });
    },
  });
  const { mutate: checkStatus } = useMutation({
    mutationFn: async () => {
      const response = await PaymentService.checkStatus(Number(id));
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.status === EStatus.PAID) {
        onSuccess("Payment has been paid", () => {
          dispatch(
            updateAccountAction({ balance: balance + (dataPayment?.amount ?? 0) })
          );
          setOpen(false);
        });
      }
    },
  });
  useEffect(() => {
    let interval: any = null;

    if (open) {
      // Start polling every 10 seconds when the modal is open
      interval = setInterval(() => {
        checkStatus();
      }, 2000);
    }

    return () => {
      // Clear the interval when the modal is closed or unmounted
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [open, checkStatus]);

  const handleCancel = () => {
    mutate();
  };

  return (
    <Modal
      loading={isLoading}
      centered
      open={open}
      onCancel={() => setOpen(false)}
      title={
        <Typography.Title level={4} className="text-black">
          Confirm Payment
        </Typography.Title>
      }
      footer={null}
      className="bg-white rounded-lg"
    >
      {dataPayment && (
        <>
          <Tabs
            onChange={(key) => setActiveTab(Number(key))}
            defaultActiveKey="1"
            className="my-4 items-center"
            items={[
              {
                label: (
                  <Flex gap={10} justify="center" align="center">
                    <i className="fas fa-qrcode text-xl"></i>
                    QR Code
                  </Flex>
                ),
                key: "1",
              },
              {
                label: (
                  <Flex gap={10} justify="center" align="center">
                    <i className="fas fa-bank text-xl"></i>
                    Transfer Information
                  </Flex>
                ),
                key: "2",
              },
            ]}
          />
          {activeTab === 1 ? (
            <QRCodeTab qrCode={dataPayment?.qrCode} />
          ) : (
            <PaymentInfoTab data={dataPayment} />
          )}
          <div className="flex justify-center gap-4 mt-6">
            <Button type="default" onClick={handleCancel} loading={isPending}>
              Cancel Payment
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default PaymentModal;
