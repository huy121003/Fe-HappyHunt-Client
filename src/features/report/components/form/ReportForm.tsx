import React from "react";
import {
  EReasonAccount,
  EReasonPost,
  EReasonReview,
  ETargetType,
} from "../../data/constant";
import { IReportPayload } from "../../data/interface";

import { Button, Flex, Form, Radio, Space, Upload, UploadFile } from "antd";
import useUpload from "@/hooks/useUpload";

import CTextArea from "@/components/form/CTextArea";
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import CButton from "@/components/buttons/CButton";
interface IReportFormProps {
  targetType: ETargetType;
  target: number;

  onSubmit: (data: IReportPayload) => void;
  onCancel?: () => void;
  loading: boolean;
}
interface IForm extends Omit<IReportPayload, "images"> {
  image?: UploadFile[];
}
const ReportForm: React.FC<IReportFormProps> = ({
  targetType,
  target,
  onSubmit,
  onCancel = () => {},
  loading,
}) => {
  const [form] = Form.useForm();
  const {
    handleBeforeUpload,
    handlePreview,
    PreviewPlaceholder,
    fileList,
    setFileList,
    onChange,
  } = useUpload(form);
  const onFinish = async () => {
    const values = await form.getFieldsValue();

    if (fileList.length === 0) {
      form.setFields([
        {
          name: "images",
          errors: ["Please upload at least one image as proof"],
        },
      ]);
      return;
    }

    const data: IReportPayload = {
      target,
      targetType,
      ...values,
      images: fileList ? fileList.map((file) => file.originFileObj) : [], // Convert to string if needed
    };

    onSubmit(data);
  };
  return (
    <Form<IForm>
      form={form}
      layout="vertical"
      style={{ width: "100%" }}
      onFinish={onFinish}
      clearOnDestroy={true}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please enter a title" }]}
      >
        <Radio.Group>
          <Space direction="vertical">
            {targetType === ETargetType.POST
              ? Object.values(EReasonPost).map((type) => (
                  <Radio key={type} value={type}>
                    {type}
                  </Radio>
                ))
              : targetType === ETargetType.ACCOUNT
                ? Object.values(EReasonAccount).map((type) => (
                    <Radio key={type} value={type}>
                      {type}
                    </Radio>
                  ))
                : Object.values(EReasonReview).map((type) => (
                    <Radio key={type} value={type}>
                      {type}
                    </Radio>
                  ))}
          </Space>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="reason"
        label="Reason"
        rules={[{ required: true, message: "Please enter a reason" }]}
      >
        <CTextArea placeholder="Please provide a detailed reason for the report" />
      </Form.Item>
      <Form.Item
        name="images"
        label="Upload Proof Images"
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
        className="w-full"
      >
        <ImgCrop>
          <Upload
            accept=".png,.jpg,.jpeg"
            listType="picture-card"
            fileList={fileList}
            maxCount={10}
            onChange={onChange}
            beforeUpload={handleBeforeUpload(".png,.jpg,.jpeg")}
            onPreview={handlePreview}
          >
            <Button icon={<UploadOutlined />} type="dashed" />
          </Upload>
        </ImgCrop>
      </Form.Item>
      <Flex className="w-full justify-end gap-2 mt-4">
        <CButton
          type="default"
          onClick={() => {
            form.resetFields();
            setFileList([]);
            onCancel();
          }}
        >
          Cancel
        </CButton>
        <CButton type="primary" loading={loading} onClick={form.submit}>
          Submit
        </CButton>
      </Flex>
      {PreviewPlaceholder}
    </Form>
  );
};
export default ReportForm;
