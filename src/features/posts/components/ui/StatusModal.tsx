import { Modal } from "antd";
import React from "react";

interface IProps {
  message: string;
  onOK: () => void;
  onClose: () => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  isLoading?: boolean;
}
const StatusModal: React.FC<IProps> = ({
  message,
  onOK,
  onClose,
  open,
  isLoading,
}) => {
  return (
    <Modal
      title="Confirm"
      open={open}
      onOk={onOK}
      onCancel={onClose}
      okText="OK"
      cancelText="Cancel"
      style={{ top: "40%" }}
      okButtonProps={{ loading: isLoading }}
      // Compare this snippet from src/features/posts/components/ui/StatusModal.tsx:
      // footer={[
      //   <Button key="back" onClick={onClose}>
      //     Cancel
      //   </Button>,
      //   <Button key="submit" type="primary" onClick={onOK}>
      //     OK
      //   </Button>,
      // ]}
    >
      {message}
    </Modal>
  );
};

export default StatusModal;
