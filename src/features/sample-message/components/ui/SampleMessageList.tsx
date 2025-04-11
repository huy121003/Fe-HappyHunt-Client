
import { ISampleMessage } from "../../data/interface";
import { Button, Flex, List, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CButton from "@/components/buttons/CButton";

interface SampleMessageListProps {
  data: ISampleMessage[];
  setIsOpen: (isOpen: boolean) => void;
  setRecord: (record: ISampleMessage | null) => void;
}

function SampleMessageList({
  data,
  setIsOpen,
  setRecord,
}: SampleMessageListProps) {
  return (
    <Flex gap={10} vertical>
      <Typography.Text type="secondary">
        You can create up to 5 sample messages
      </Typography.Text>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                key="edit"
                type="text"
                icon={<EditOutlined />}
                onClick={() => {
                  setRecord(item);
                  setIsOpen(true);
                }}
              />,
              <Button
                key="delete"
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  // TODO: Implement delete functionality
                }}
              />,
            ]}
          >
            <Typography.Text>{item.message}</Typography.Text>
          </List.Item>
        )}
      />
      <CButton
        hidden={data.length >= 5}
        onClick={() => {
          setRecord(null);
          setIsOpen(true);
        }}
      >
        Create New Sample Message {`(${data.length}/5)`}
      </CButton>
    </Flex>
  );
}

export default SampleMessageList;
