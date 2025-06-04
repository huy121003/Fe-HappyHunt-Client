import { useEffect, useState } from "react";
import { IMessagePayload } from "../../data/interface";
import { Button, Card, Flex, Form, Typography, Upload } from "antd";
import {
  SendOutlined,
  PictureOutlined,
  MessageOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { UploadFile } from "antd/es/upload/interface";
import useUpload from "@/hooks/useUpload";
import { useAppSelector } from "@/redux/reduxHook";

import SampleMessageMOdal from "@/features/sample-message/components/ui/SampleMessageModal";
import { useQuery } from "@tanstack/react-query";
import { API_KEY } from "@/features/sample-message/data/constant";
import SampleMessageService from "@/features/sample-message/service";
import CTextArea from "@/components/form/CTextArea";
import { truncateWithDots } from "@/configs/truncateWithDots";
import { useSocketProvider } from "@/hooks/useSocketProvider";
import { encryptMessage } from "@/configs/encrypt";
interface MessageFormProps {
  onFinish: (values: IMessagePayload) => void;
  chat: number;
  message: string[];
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

function MessageForm({ onFinish, chat, message }: MessageFormProps) {
  const [messageList, setMessageList] = useState<string[]>(message);
  const [form] = Form.useForm<IForm>();
  const [openSampleMessage, setOpenSampleMessage] = useState<boolean>(false);
  const socket = useSocketProvider();
  const account = useAppSelector((state) => state.auth.account);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const { data } = useQuery({
    queryKey: [API_KEY.SAMPLE_MESSAGE],
    queryFn: async () => {
      const res = await SampleMessageService.getAll();
      return res.data;
    },
  });
  useEffect(() => {
    if (data) {
      setMessageList([]);
      setMessageList(() => [...data.map((item) => item.message), ...message]);
    }
  }, [data]);
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
      message: encryptMessage(values.message),
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
    if (!socket) return;
    socket.emit("typing", {
      chat: chat,
      sender: account?._id,
      name: account?.name,
    });
  };
  const onStopTyping = () => {
    if (!socket) return;
    socket.emit("stop_typing", {
      chat: chat,
      sender: account?._id,
      name: account?.name,
    });
  };
  return (
    <Card className="w-full !p-0 !m-0 rounded-none border-t border-gray-200 ">
      <Form<IForm> form={form} onFinish={handleSubmit}>
        <Flex vertical gap={10}>
          <Flex
            gap={10}
            className="overflow-x-auto w-full whitespace-nowrap flex-nowrap"
            style={{ scrollbarWidth: "thin" }}
          >
            {messageList.map((item) => (
              <Flex
                onClick={() => form.setFieldsValue({ message: item })}
                key={item}
                className="!p-2 !m-0 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer flex-shrink-0"
              >
                <Typography.Text>{truncateWithDots(item, 20)}</Typography.Text>
              </Flex>
            ))}
          </Flex>
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
                // rules={[
                //   {
                //     validator: (_, value) => {
                //       const res = checkProfanity(value);
                //       if (res) {
                //         return Promise.reject(new Error(res));
                //       }
                //       const resText = checkText(value);
                //       if (resText) {
                //         return Promise.reject(new Error(resText));
                //       }
                //       return Promise.resolve();
                //     },
                //   },
                // ]}
              >
                <CTextArea
                  autoSize={{ minRows: 1, maxRows: 3 }}
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
