import { useState } from "react";
import { IMessagePayload } from "../../data/interface";
import { Button, Card, Flex, Form, Upload } from "antd";
import CInput from "@/components/form/CInput";
import {
  SendOutlined,
  PictureOutlined,
  MessageOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { UploadFile } from "antd/es/upload/interface";
import useUpload from "@/hooks/useUpload";
import { useAppSelector } from "@/redux/reduxHook";
import checkProfanity from "@/configs/checkProfanity";
import { checkText } from "@/configs/checkText";
import { useChatSocketProvider } from "@/features/chat/hooks/useChatSocketProvider";
import SampleMessageMOdal from "@/features/sample-message/components/ui/SampleMessageModal";

interface MessageFormProps {
  onFinish: (values: IMessagePayload) => void;
  chat: number;
}
interface IForm extends Omit<IMessagePayload, "image"> {
  image?: UploadFile[];
}
const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve("");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

function MessageForm({ onFinish, chat }: MessageFormProps) {
  const [form] = Form.useForm<IForm>();
  const [openSampleMessage, setOpenSampleMessage] = useState<boolean>(false);
  const chatSocket = useChatSocketProvider();
  const account = useAppSelector((state) => state.auth.account);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const {
    onChange,
    fileList,
    setFileList,
    handleBeforeUpload,
    PreviewPlaceholder,
    handlePreview,
  } = useUpload(form);

  const handleSubmit = async () => {
    const values = form.getFieldsValue();
    if (!values.message && fileList.length === 0) return;

    // Chuyển ảnh sang base64 (nếu có)
    const imageBase64 = await getBase64(fileList[0]?.originFileObj as File);

    const payload: IMessagePayload = {
      sender: Number(account?._id),
      message: values.message,
      ...(imageBase64 && { image: imageBase64 }),
      chat: chat,
    };
    onFinish(payload);
    form.setFieldsValue({
      message: "",
      image: [],
    });
    setShowUpload(false);
    setFileList([]);
  };
  const onTyping = () => {
    if (!chatSocket) return;
    chatSocket.emit("typing", {
      chat: chat,
      sender: account?._id,
      name: account?.name,
    });
  };
  const onStopTyping = () => {
    if (!chatSocket) return;
    chatSocket.emit("stop_typing", {
      chat: chat,
      sender: account?._id,
      name: account?.name,
    });
  };
  return (
    <Card className="w-full !p-0 !m-0 rounded-none border-t border-gray-200 ">
      <Form<IForm> form={form} onFinish={handleSubmit}>
        <Flex vertical gap={5}>
          {showUpload && (
            <Flex>
              <Form.Item
                name="image"
                className="!m-0 !p-0"
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
              >
                <Upload
                  onRemove={() => setShowUpload(false)}
                  accept=".png,.jpg,.jpeg"
                  listType="picture-card"
                  maxCount={1}
                  fileList={fileList}
                  onChange={onChange}
                  beforeUpload={handleBeforeUpload(".png,.jpg,.jpeg")}
                  onPreview={handlePreview}
                >
                  {fileList.length === 0 && (
                    <Button
                      type="text"
                      size="large"
                      icon={<PlusOutlined />}
                      className=" !m-0"
                    />
                  )}
                </Upload>
              </Form.Item>
            </Flex>
          )}
          <Flex gap={8} align="center">
            <Button
              hidden={showUpload}
              onClick={() => setShowUpload(true)}
              type="text"
              size="large"
              className="!p-0 !m-0 "
              icon={
                <PictureOutlined className="text-2xl text-gray-500 hover:text-orange-400" />
              }
            />
            <Button
              hidden={showUpload}
              type="text"
              size="large"
              className="!p-0 !m-0"
              onClick={() => setOpenSampleMessage(true)}
              icon={
                <MessageOutlined className="text-2xl text-gray-500 hover:text-orange-400" />
              }
            />

            <Form.Item
              name="message"
              className="!m-0 !p-0 w-full"
              rules={[
                {
                  validator: (_, value) => {
                    const res = checkProfanity(value);
                    if (res) {
                      return Promise.reject(new Error(res));
                    }
                    const resText = checkText(value);
                    if (resText) {
                      return Promise.reject(new Error(resText));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <CInput
                onChange={onTyping}
                onPressEnter={onTyping}
                onBlur={onStopTyping}
                placeholder="Type a message..."
                className="!rounded-full "
                allowClear
              />
            </Form.Item>

            <Button
              onClick={form.submit}
              type="primary"
              className="!w-10 !h-10 !rounded-full !bg-orange-400 hover:!bg-orange-500"
              icon={<SendOutlined className="text-lg" />}
            />
          </Flex>
        </Flex>
      </Form>
      {PreviewPlaceholder}
      <SampleMessageMOdal
        isOpen={openSampleMessage}
        setIsOpen={setOpenSampleMessage}
      />
    </Card>
  );
}

export default MessageForm;
