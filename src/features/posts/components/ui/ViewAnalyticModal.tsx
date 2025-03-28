import { Flex, Image, Modal, Typography } from "antd";
import CountClickBarChart from "@/features/history-click/components/ui/CountClickBarChart";
interface ViewAnalyticModalProps {
  postId: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  totalClick: number;
}
function ViewAnalyticModal({
  postId,
  totalClick,
  setIsOpen,
  isOpen,
}: ViewAnalyticModalProps) {
  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
      title="View Analytic"
    >
      {totalClick > 0 ? (
        <CountClickBarChart postId={postId} totalClick={totalClick} />
      ) : (
        <Flex vertical gap={10} justify="center" flex={1} align="center">
          <Image src="/image8.png" width="40%" preview={false} />
          <Typography.Text type="secondary" className="text-2xl">
            Your post has not been clicked yet
          </Typography.Text>
        </Flex>
      )}
    </Modal>
  );
}

export default ViewAnalyticModal;
