import { Modal } from "antd";
import React from "react";

interface CDeleteModalProps {
  message: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
  loading?: boolean;
}
const CDeleteModal: React.FC<CDeleteModalProps> = ({
  message,
  open,
  setOpen,
  onOk,
  loading,
}) => {
  return (
    <Modal
      style={{ top: "40%" }}
      title="Confirm"
      open={open}
      onOk={() => {
        onOk();
      }}
      onCancel={() => setOpen(false)}
      okButtonProps={{ loading: loading }}
    >
      <p>{message}</p>
    </Modal>
  );
};
export default CDeleteModal;
