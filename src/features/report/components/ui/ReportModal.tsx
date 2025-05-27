import React from "react";
import { ETargetType } from "../../data/constant";
import { Modal } from "antd";
import { useMutation } from "@tanstack/react-query";
import { IReportPayload } from "../../data/interface";
import ReportService from "../../service";
import { postMessageHandler } from "@/components/mesage/ToastMessage";
import ReportForm from "../form/ReportForm";
interface ReportModalProps {
  targetType: ETargetType;
  target: number;
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ReportModal: React.FC<ReportModalProps> = ({
  targetType,
  target,
  open,
  setOpen,
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IReportPayload) => {
      const res = await ReportService.create(data);
      return res.data; // Placeholder for actual service call
    },
    onSuccess: () => {
      setOpen(false);
      postMessageHandler({
        type: "success",
        text: `Report for ${targetType} submitted successfully.`,
      });
    },
  });
  const onSubmit = (data: IReportPayload) => {
    mutate(data);
  };

  return (
    <Modal
      title={`Report ${targetType}`}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered
    >
      <ReportForm
        targetType={targetType}
        target={target}

        onSubmit={onSubmit}
        onCancel={() => setOpen(false)}
        loading={isPending}
      />
    </Modal>
  );
};

export default ReportModal;
