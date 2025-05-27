import {
  Button,
  Card,
  Form,
  Spin,
  Upload,
  Typography,
  DatePicker,
  UploadFile,
  Flex,
} from "antd";
import React, { useEffect } from "react";
import { IGetAccountInfoResponse, IUpdateProfile } from "../../data/interface";

import { UploadOutlined } from "@ant-design/icons";

import SelectProvince from "@/features/provinces/components/form/SelectProvince";
import SelectDictrict from "@/features/districts/components/form/SelectDictrict";
import SelectWard from "@/features/wards/components/form/SelectWard";
import CTextArea from "@/components/form/CTextArea";
import CInput from "@/components/form/CInput";
import dayjs from "dayjs";
import CSelect from "@/components/form/CSelect";
import { EGender } from "@/features/profile/data/constant";

import ImgCrop from "antd-img-crop";
import useUpload from "@/hooks/useUpload";
import useUploadAvatar from "@/hooks/useUploadAvatar";
import CButton from "@/components/buttons/CButton";

interface IProfileFormProps {
  onSubmit: (values: IUpdateProfile) => void;
  loading?: boolean;
  title?: string;
  data?: IGetAccountInfoResponse;
}
interface IForm extends Omit<IUpdateProfile, "avatar" | "background"> {
  avatar?: UploadFile[];
  background?: UploadFile[];
}
const ProfileForm: React.FC<IProfileFormProps> = ({
  onSubmit,
  loading,
  title,
  data,
}) => {
  const [form] = Form.useForm();
  const {
    handleBeforeUpload,
    fileList,
    setFileList,
    onChange,
    PreviewPlaceholder,
    handlePreview,
  } = useUpload(form);
  const {
    handleBeforeUploadAvatar,
    avatar,
    setAvatar,
    onChangeAvatar,
    PreviewPlaceholderAvatar,
    handlePreviewAvatar,
  } = useUploadAvatar(form);
  const province = Form.useWatch(["province"], form);
  const district = Form.useWatch(["district"], form);
  const ward = Form.useWatch(["ward"], form);
  useEffect(() => {
    if (data) {
      if (data.background)
        setFileList([
          {
            uid: `${Date.now()}`,
            name: data?.background?.split("/").pop() || "image.png",
            status: "done",
            url: data?.background || "",
          },
        ]);
      if (data.avatar)
        setAvatar([
          {
            uid: `${Date.now()}`,
            name: data?.avatar?.split("/").pop() || "image.png",
            status: "done",
            url: data?.avatar || "",
          },
        ]);
      form.setFieldsValue({
        ...data,
        province: data.address.province?._id,
        district: data.address.district?._id,
        ward: data.address.ward?._id,
        specificAddress: data.address.specificAddress,
        gender: data.gender,
        dateOfBirth: dayjs(data.dateOfBirth),
      });
    }
  }, [data, form]);
  const onFinish = async () => {

    const values = await form.validateFields();

    const payload: IUpdateProfile = {
      name: values.name,
      description: values.description,
      background: fileList[0]?.originFileObj ?? "",
      avatar: avatar[0]?.originFileObj || "",
      gender: values.gender,
      dateOfBirth: dayjs(values.dateOfBirth).format("YYYY-MM-DD"),
      address: {
        province: values.province,
        district: values.district,
        ward: values.ward,
        specificAddress: values.specificAddress,
      },
    };
    onSubmit(payload);
  };
  return (
    <Spin spinning={loading}>
      <Form<IForm>
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          ...data,
          avatar: [],
          background: [],
          dateOfBirth: dayjs(data?.dateOfBirth),
        }}
      >
        <Typography.Title level={4} className="mb-4">
          {title || "Profile Information"}
        </Typography.Title>
        <Form.Item
          label="Avatar"
          name="avatar"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
          // rules={[
          //   {
          //     required: true,
          //     message: "Please upload an avatar image!",
          //   },
          // ]}
        >
          <ImgCrop rotationSlider>
            <Upload
              multiple={false}
              listType="picture-circle"
              maxCount={1}
              fileList={avatar}
              onChange={onChangeAvatar}
              beforeUpload={handleBeforeUploadAvatar(".png,.jpg,.jpeg")}
              onPreview={handlePreview}
              accept=".png,.jpg,.jpeg"
            >
              <Button icon={<UploadOutlined />} type="dashed" />
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Form.Item
          label="Background"
          name="background"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
        >
          <ImgCrop rotationSlider aspect={3 / 1} onModalOk={() => {}}>
            <Upload
              action=""
              multiple={false}
              listType="picture-card"
              maxCount={1}
              fileList={fileList}
              onChange={onChange}
              beforeUpload={handleBeforeUpload(".png,.jpg,.jpeg")}
              onPreview={handlePreviewAvatar}
              accept=".png,.jpg,.jpeg"
            >
              <Button icon={<UploadOutlined />} type="dashed" />
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="name"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please input your full name!",
            },
          ]}
        >
          <CInput placeholder="Full Name" maxLength={20} showCount />
        </Form.Item>
        <Form.Item
          label="Date of Birth"
          name="dateOfBirth"
          rules={[
            {
              required: true,
              message: "Please select your date of birth!",
            },
          ]}
        >
          <DatePicker
            placeholder="Date of Birth"
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
            disabledDate={(current) => {
              return current > dayjs();
            }}
          />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: "Please select gender!",
            },
          ]}
        >
          <CSelect
            options={[
              {
                value: EGender.FEMALE,
                label: "Female",
              },
              {
                value: EGender.MALE,
                label: "Male",
              },
              {
                value: EGender.OTHER,
                label: "Other",
              },
            ]}
          />
        </Form.Item>
        <Card title="Address" className="mb-4">
          <Form.Item
            label="Province"
            name="province"
            rules={[{ required: true, message: "Please select province!" }]}
          >
            <SelectProvince
              placeholder="Province"
              onChange={() => {
                form.setFieldsValue({
                  district: undefined,
                  ward: undefined,
                  specificAddress: undefined,
                });
              }}
              defaultSelected={
                data?.address.province
                  ? [
                      {
                        _id: data.address.province._id,
                        name: data.address.province.name,
                      },
                    ]
                  : undefined
              }
            />
          </Form.Item>
          <Form.Item
            name="district"
            label="District"
            rules={[{ required: true, message: "Please select district!" }]}
          >
            <SelectDictrict
              onChange={() => {
                form.setFieldsValue({
                  ward: undefined,
                  specificAddress: undefined,
                });
              }}
              placeholder="District"
              province={province}
              defaultSelected={
                data?.address.district
                  ? [
                      {
                        _id: data.address.district._id,
                        name: data.address.district.name,
                      },
                    ]
                  : undefined
              }
              disabled={!province}
            />
          </Form.Item>
          <Form.Item
            name="ward"
            label="Ward"
            rules={[{ required: true, message: "Please select ward!" }]}
          >
            <SelectWard
              placeholder="Ward"
              onChange={() => {
                form.setFieldsValue({
                  specificAddress: undefined,
                });
              }}
              province={province}
              district={district}
              defaultSelected={
                data?.address.ward
                  ? [
                      {
                        _id: data.address.ward._id,
                        name: data.address.ward.name,
                      },
                    ]
                  : undefined
              }
              disabled={!province || !district}
            />
          </Form.Item>
          <Form.Item
            label="Specific Address"
            name="specificAddress"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input specific address!",
              },
            ]}
          >
            <CInput
              placeholder="Specific Address"
              disabled={!province || !district || !ward}
              maxLength={50}
              showCount
            />
          </Form.Item>
        </Card>

        <Form.Item label="Description" name="description">
          <CTextArea
            placeholder="Description"
            maxLength={200}
            showCount
            rows={4}
          />
        </Form.Item>
        <Flex justify="end" gap={10}>
          <CButton onClick={form.submit}>Save</CButton>
        </Flex>
      </Form>

      {PreviewPlaceholder}
      {PreviewPlaceholderAvatar}
    </Spin>
  );
};
export default ProfileForm;
