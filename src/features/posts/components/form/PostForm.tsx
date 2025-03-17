import useUpload from "@/hooks/useUpload";
import { UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Flex,
  Upload,
  Button,
  Card,
  Radio,
  UploadFile,
  Spin,
} from "antd";
import ImgCrop from "antd-img-crop";
import { Typography } from "antd";

import CategorySelectorPost from "@/features/categories/components/CategorySelectorPost";

import CInput from "@/components/CInput";
import AttributeForm from "./AttributeForm";
import CTextArea from "@/components/CTextArea";
import SelectProvince from "@/features/provinces/components/form/SelectProvince";
import SelectDictrict from "@/features/districts/components/form/SelectDictrict";
import SelectWard from "@/features/wards/components/form/SelectWard";
import CButton from "@/components/buttons/CButton";
import ChooseCategory from "./ChooseCategory";
import { IPost, IPostPayload } from "../../data/interface";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkProfanity from "@/configs/checkProfanity";
interface IPostFormProps {
  onSubmit: (values: IPostPayload, id?: number) => void;
  data?: IPost;
  disabled?: boolean;
  loading?: boolean;
  title?: string | React.ReactNode;
  isView?: boolean;
}
interface IForm extends Omit<IPost, "images"> {
  image?: UploadFile[];
}
const PostForm: React.FC<IPostFormProps> = ({
  onSubmit,
  disabled,
  loading,
  isView,
  title,
  data,
}) => {
  const [form] = Form.useForm();
  const {
    handleBeforeUpload,
    PreviewPlaceholder,
    fileList,
    setFileList,
    onChange,
  } = useUpload(form);
  const navigate = useNavigate();
  const category: string | undefined = Form.useWatch(["category"], form);
  const provinceId = Form.useWatch(["provinceId"], form);
  const districtId = Form.useWatch(["districtId"], form);
  const wardId = Form.useWatch(["wardId"], form);
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        category: `${data.categoryParent._id}${
          data.category?._id ? `-${data.category._id}` : ""
        }`,
        provinceId: data.address.province._id,
        districtId: data.address.district._id,
        wardId: data.address.ward._id,
        specificAddress: data.address.specificAddress,
      });
      setFileList(
        data.images.map((image) => ({
          uid: image,
          name: image,
          status: "done",
          url: image,
        }))
      );
    }
  }, [data, form, setFileList]);
  const onCancel = useCallback(() => {
    navigate("/");
    window.scrollTo(0, 0);
  }, [navigate]);
  const onFinish = async () => {
    const values = await form.getFieldsValue();
    console.log(values);
    const payload: IPostPayload = {
      ...values,
      ...(values._id ? { _id: values._id } : {}),
      categoryParent: values.category?.split("-")
        ? values.category.split("-")[0]
        : values.category,
      category: values.category?.split("-")
        ? values.category.split("-")[1]
        : undefined,
      images: fileList
        .filter((file) => file.status !== "done")
        .map((file) => file.originFileObj),
      saveImages: data?.images.filter((image) =>
        fileList.find((file) => file.url === image)
      ),
      address: {
        province: values.provinceId,
        district: values.districtId,
        ward: values.wardId,
        specificAddress: values.specificAddress,
      },
    };
    console.log(payload);
    onSubmit(payload);
  };

  return (
    <>
      <Spin spinning={loading}>
        <Flex
          vertical
          className="w-screen p-2 mb-[100px]"
          justify="center"
          align="center"
        >
          <Card className="lg:w-3/4 w-full h-full min-h-[calc(100vh-200px)]  ">
            <Flex justify="start" gap={10} className="mb-4 ">
              <h1
                className="text-2xl font-semibold text-flame-orange cursor-pointer"
                onClick={() => {
                  navigate("/");
                  window.scrollTo(0, 0);
                }}
              >
                HappyHunt
              </h1>
              <h1 className="text-2xl font-semibold text-gray-400">{">"}</h1>

              {title ? (
                title
              ) : (
                <h1 className="text-2xl font-semibold text-gray-400">
                  Create New Post
                </h1>
              )}
            </Flex>
            <Form<IForm>
              form={form}
              style={{ width: "100%" }}
              layout="vertical"
              onFinish={onFinish}
              disabled={disabled || isView}
            >
              <Form.Item name="_id" hidden>
                <CInput hidden />
              </Form.Item>
              <Flex className="lg:flex-row flex-col ">
                <Flex vertical className="lg:w-1/3 w-full">
                  <Form.Item
                    name="images"
                    label="Upload Images"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
                  >
                    <ImgCrop rotationSlider>
                      <Upload
                        accept=".png,.jpg,.jpeg"
                        listType="picture-card"
                        fileList={fileList}
                        maxCount={6}
                        onChange={onChange}
                        beforeUpload={handleBeforeUpload(".png,.jpg,.jpeg")}
                        onPreview={() => {}}
                      >
                        {fileList.length < 6 && (
                          <Button icon={<UploadOutlined />} type="dashed" />
                        )}
                      </Upload>
                    </ImgCrop>
                  </Form.Item>
                </Flex>
                <Flex className="lg:w-2/3 w-full" vertical>
                  <Form.Item
                    name="category"
                    label="Category"
                    rules={[
                      { required: true, message: "Please select category!" },
                    ]}
                    className="w-full"
                  >
                    <CategorySelectorPost
                      form={form}
                      defaultValue={
                        data?.category
                          ? [
                              {
                                fullpath: data.category.name
                                  ? `${data.categoryParent.name} - ${data.category.name}`
                                  : `${data.categoryParent.name}`,
                                value: data.category._id
                                  ? `${data.categoryParent._id}-${data.category._id}`
                                  : `${data.categoryParent._id}`,
                              },
                            ]
                          : undefined
                      }
                    />
                  </Form.Item>
                  {category ? (
                    <>
                      <Form.Item
                        name="price"
                        label="Price"
                        rules={[
                          { required: true, message: "Please enter price!" },
                          {
                            validator: (_, value) => {
                              if (value < 1000) {
                                return Promise.reject(
                                  new Error(
                                    "Price must be greater than 1,000 VND"
                                  )
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                        className="w-full"
                      >
                        <CInput
                          placeholder="Enter price"
                          type="number"
                          min={0}
                          prefix={<Typography.Text>VND</Typography.Text>}
                        />
                      </Form.Item>
                      <AttributeForm categoryId={category} />
                      <Typography.Title level={4}>
                        Title & Description
                      </Typography.Title>
                      <Form.Item
                        name="name"
                        label="Title"
                        rules={[
                          { required: true, message: "Please enter title!" },
                          {
                            validator: (_, value) => {
                              const res = checkProfanity(value);
                              if (res) {
                                return Promise.reject(new Error(res));
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                        className="w-full"
                      >
                        <CInput
                          placeholder="Enter title"
                          showCount
                          maxLength={50}
                        />
                      </Form.Item>
                      <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                          {
                            required: true,
                            message: "Please enter description!",
                          },
                          {
                            validator: (_, value) => {
                              const errors: string[] = [];

                              if (value.split(/\s+/).length < 10) {
                                errors.push(
                                  "Description must be at least 10 words!"
                                );
                              }

                              const profanityCheck = checkProfanity(value);
                              if (profanityCheck) {
                                errors.push(profanityCheck);
                              }

                              if (errors.length > 0) {
                                return Promise.reject(
                                  new Error(errors.join("\n"))
                                );
                              }

                              return Promise.resolve();
                            },
                          },
                        ]}
                        className="w-full"
                      >
                        <CTextArea
                          placeholder="Enter description"
                          showCount
                          maxLength={1500}
                        />
                      </Form.Item>
                      <Typography.Title level={4}>
                        Seller Information
                      </Typography.Title>
                      <Form.Item
                        name="isIndividual"
                        label="You are ?"
                        rules={[
                          {
                            required: true,
                            message: "Please select seller type!",
                          },
                        ]}
                        className="w-full"
                      >
                        <Radio.Group>
                          <Radio value={true}>Individual</Radio>
                          <Radio value={false}>Semi-professional seller </Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Card title="Address" className="mb-4">
                        <Form.Item
                          label="Province"
                          name="provinceId"
                          rules={[
                            {
                              required: true,
                              message: "Please select province!",
                            },
                          ]}
                        >
                          <SelectProvince
                            placeholder="Select province"
                            onChange={() => {
                              form.setFieldsValue({
                                districtId: undefined,
                                wardId: undefined,
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
                          name="districtId"
                          label="District"
                          rules={[
                            {
                              required: true,
                              message: "Please select district!",
                            },
                          ]}
                        >
                          <SelectDictrict
                            onChange={() => {
                              form.setFieldsValue({
                                wardId: undefined,
                                specificAddress: undefined,
                              });
                            }}
                            placeholder="Select district"
                            provinceId={provinceId}
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
                            disabled={!provinceId}
                          />
                        </Form.Item>
                        <Form.Item
                          name="wardId"
                          label="Ward"
                          rules={[
                            { required: true, message: "Please select ward!" },
                          ]}
                        >
                          <SelectWard
                            placeholder="Select ward"
                            onChange={() => {
                              form.setFieldsValue({
                                specificAddress: undefined,
                              });
                            }}
                            provinceId={provinceId}
                            districtId={districtId}
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
                            disabled={!provinceId || !districtId}
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
                            placeholder="Enter specific address"
                            disabled={!provinceId || !districtId || !wardId}
                          />
                        </Form.Item>
                      </Card>
                    </>
                  ) : (
                    <ChooseCategory />
                  )}
                </Flex>
              </Flex>
            </Form>
          </Card>
        </Flex>
        {PreviewPlaceholder}
      </Spin>
      <Flex
        className=" fixed bottom-0 w-full p-4  bg-white"
        justify="end"
        gap={20}
      >
        <CButton type="default" onClick={onCancel} size="large">
          Cancel
        </CButton>

        <CButton
          size="large"
          type="primary"
          onClick={form.submit}
          loading={loading}
        >
          Save
        </CButton>
      </Flex>
    </>
  );
};

export default PostForm;
