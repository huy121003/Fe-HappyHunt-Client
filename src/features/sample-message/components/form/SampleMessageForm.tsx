
import { Form, Input, Button, Flex } from "antd";
import { ISampleMessage } from "../../data/interface";
import { useMutation } from "@tanstack/react-query";
import SampleMessageService from "../../service";

import useSampleMessageState from "../../hooks/useSampleMessageState";

interface SampleMessageFormProps {
  setIsOpen: (isOpen: boolean) => void;
  record: ISampleMessage | null;
}

function SampleMessageForm({ setIsOpen, record }: SampleMessageFormProps) {
  const { onSuccess } = useSampleMessageState();
  const [form] = Form.useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: { message: string }) => {
      if (record) {
        return SampleMessageService.update(record._id, values);
      }
      return SampleMessageService.create(values);
    },
    onSuccess: () =>
      onSuccess("Sample message created successfully", () => {
        setIsOpen(false);
      }),
  });

  const handleSubmit = (values: { message: string }) => {
    mutate(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={record ? { message: record.message } : undefined}
    >
      <Form.Item
        name="message"
        label="Message"
        rules={[{ required: true, message: "Please enter a message" }]}
      >
        <Input.TextArea rows={4} placeholder="Enter your message" />
      </Form.Item>
      <Flex justify="flex-end" gap={10}>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={isPending}>
          {record ? "Update" : "Create"}
        </Button>
      </Flex>
    </Form>
  );
}

export default SampleMessageForm;
