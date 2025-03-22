import useUpload from "@/hooks/useUpload";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Flex, Upload, Button, Card, Radio, UploadFile } from "antd";
import ImgCrop from "antd-img-crop";
import { Typography } from "antd";
import CategorySelectorPost from "@/features/categories/components/CategorySelectorPost";
import CInput from "@/components/form/CInput";
import AttributeForm from "./AttributeForm";
import CTextArea from "@/components/form/CTextArea";
import CButton from "@/components/buttons/CButton";
import ChooseCategory from "./ChooseCategory";
import { IPost, IPostPayload } from "../../data/interface";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkProfanity from "@/configs/checkProfanity";
import AddressForm from "./AddressForm";
import { checkText } from "@/configs/checkText";

interface IPostFormProps {
  onSubmit: (values: IPostPayload, id?: number) => void;
  data?: IPost;
  disabled?: boolean;
  loading?: boolean;
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
  data,
}) => {
  const [form] = Form.useForm();
  const {
    handleBeforeUpload,

    fileList,
    setFileList,
    onChange,
  } = useUpload(form);
  const navigate = useNavigate();
  const category: string | undefined = Form.useWatch(["category"], form);

  const isPayment = Form.useWatch(["isPayment"], form);
  const pricePayment = Form.useWatch(["pricePayment"], form);
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
          uid: image.url,

          name: image.url,
          status: "done",
          url: image.url,
        }))
      );
    }
  }, [data, form, setFileList]);
  const onCancel = useCallback(() => {
    navigate("/");
  }, [navigate]);
  const onFinish = async () => {
    const values = await form.getFieldsValue();
    if (fileList.length < 3 || fileList.length > 10) {
      form.setFields([
        {
          name: "images",
          errors: ["Please upload 3 to 10 images"],
        },
      ]);
      return;
    }
    if (values.price < 1000 || values.price > 1000000000) {
      form.setFields([
        {
          name: "price",
          errors: ["Price must be between 1.000 and 1.000.000.000 VND"],
        },
      ]);
      return;
    }

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
      saveImages: data?.images?.filter((image) =>
        fileList.find((file) => file.url === image.url)
      ),
      address: {
        province: values.provinceId,
        district: values.districtId,
        ward: values.wardId,
        specificAddress: values.specificAddress,
      },
    };

    onSubmit(payload);
  };

  return (
    <>
      <Flex
        justify="center"
        className="mb-4 flex-1 w-screen  lg:w-[calc(100vw-160px)]
    xl:w-[calc(100vw-200px)] 2xl:w-[calc(100vw-240px)] "
      >
        <Card className="w-full flex-1  border-t-2 border-t-flame-orange">
          <Form<IForm>
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            onFinish={onFinish}
            disabled={disabled || isView}
          >
            <Form.Item name="_id" hidden>
              <CInput hidden />
            </Form.Item>
            <Form.Item hidden name="isPayment">
              <CInput hidden />
            </Form.Item>
            <Form.Item hidden name="pricePayment">
              <CInput hidden />
            </Form.Item>
            <Flex className="lg:flex-row flex-col w-full gap-4">
              <Flex vertical className="lg:w-1/3 w-full">
                <Form.Item
                  name="images"
                  label="Upload Images"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e.fileList}
                  className="w-full"
                >
                  <ImgCrop rotationSlider>
                    <Upload
                      accept=".png,.jpg,.jpeg"
                      listType="picture-card"
                      fileList={fileList}
                      maxCount={10}
                      onChange={onChange}
                      beforeUpload={handleBeforeUpload(".png,.jpg,.jpeg")}
                      onPreview={() => {}}
                    >
                      <Button icon={<UploadOutlined />} type="dashed" />
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
                      data?.categoryParent?.name
                        ? [
                            {
                              fullpath: data.category?.name
                                ? `${data.categoryParent?.name} - ${data.category?.name}`
                                : `${data.categoryParent?.name}`,
                              value: data.category?._id
                                ? `${data.categoryParent?._id}-${data.category?._id}`
                                : `${data.categoryParent?._id}`,
                            },
                          ]
                        : undefined
                    }
                  />
                </Form.Item>
                {category ? (
                  <div className="w-full">
                    <Form.Item
                      name="price"
                      label="Price"
                      rules={[
                        { required: true, message: "Please enter price!" },
                      ]}
                      className="w-full"
                    >
                      <CInput
                        placeholder="Enter price"
                        type="number"
                        min={1000}
                        prefix={<Typography.Text>VND</Typography.Text>}
                      />
                    </Form.Item>
                    <AttributeForm
                      categoryId={category}
                      form={form}
                      attributes={
                        data?.attributes.map((attribute) => ({
                          name: attribute.name,
                          value: attribute.value || "",
                        })) || []
                      }
                    />
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
                            const resText = checkText(value);
                            if (resText) {
                              return Promise.reject(new Error(resText));
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
                            const resText = checkText(value);
                            if (resText) {
                              errors.push(resText);
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
                      <Radio.Group
                        className="w-full"
                        optionType="button"
                        buttonStyle="solid"
                      >
                        <Radio value={true}>Individual</Radio>
                        <Radio value={false}>Professional seller</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <AddressForm data={data} form={form} />
                  </div>
                ) : (
                  <ChooseCategory />
                )}
              </Flex>
            </Flex>
          </Form>
        </Card>
      </Flex>

      <Flex
        className="fixed bottom-0
         w-screen p-4  bg-white"
        justify="end"
        gap={5}
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
          {!isPayment || data
            ? "Save"
            : `Payment ${Number(pricePayment).toLocaleString("vi-VN") || 0} VND`}
        </CButton>
      </Flex>
    </>
  );
};

export default PostForm;
