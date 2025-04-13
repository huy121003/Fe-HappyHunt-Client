import CInput from "@/components/form/CInput";
import { Button, Card, Flex, Form } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { IMessageChatbot } from "../../data/interface";
interface ChatBotFormProps {
  onSend: (message: string) => void;
  setMessage: React.Dispatch<React.SetStateAction<IMessageChatbot[]>>;
}
function ChatBotForm({ onSend, setMessage }: ChatBotFormProps) {
  const [form] = Form.useForm();
  const onFinish = () => {
    const values = form.getFieldsValue();
    if (!values.message.trim()) return;
    setMessage((prev) => [
      ...prev,
      {
        sender: "user",
        content: values.message,
      },
    ]);
    onSend(values.message);
    form.resetFields();
  };
  return (
    <Card className="rounded-none !p-0">
      <Form form={form} layout="vertical" onFinish={onFinish} className="!p-0">
        <Flex gap={10}>
          <Form.Item
            className="!p-0 !m-0 w-full"
            name="message"
            rules={[{ required: true, whitespace: true }]}
          >
            <CInput placeholder="Type a question..." />
          </Form.Item>
          <Button
            onClick={form.submit}
            type="primary"
            className="!w-10 !h-10 !rounded-full !bg-orange-400 hover:!bg-orange-500"
            icon={<SendOutlined className="text-lg" />}
          />
        </Flex>
      </Form>
    </Card>
  );
}

export default ChatBotForm;
