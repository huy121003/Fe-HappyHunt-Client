import CTextArea from "@/components/form/CTextArea";
import { Checkbox, Form, Modal, Rate } from "antd";
import React, { useEffect } from "react";
import { ESampleEvaluate } from "../../data/constant";
import { IEvaluatePayload } from "../../data/interface";
import { useMutation } from "@tanstack/react-query";
import EvaluateService from "../../service";
import useEvaluateStatus from "../../hooks/useEvaluateStatus";

interface EvaluateModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  star: number;
  setStar: React.Dispatch<React.SetStateAction<number>>;
  target: number;
  post: number;
  isSeller: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
function EvaluateModal({
  open,
  setOpen,
  star,
  setStar,
  target,
  post,
  isSeller,
  setShow,
}: EvaluateModalProps) {
  const [form] = Form.useForm();
  const { onSuccess } = useEvaluateStatus();
  useEffect(() => {
    form.setFieldsValue({
      star: star,
    });
  }, [star]);
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: IEvaluatePayload) => {
      return await EvaluateService.create(payload);
    },
    onSuccess: () => {
      onSuccess("Review successfully", () => {
        setOpen(false);
        setStar(0);
        form.resetFields();
        setShow(false);
      });
    },
  });
  const onSumit = () => {
    const values = form.getFieldsValue();
    if (values.star === 0) {
      form.setFields([
        {
          name: "star",
          errors: ["Please select a star"],
        },
      ]);
      return;
    }
    const payload: IEvaluatePayload = {
      star: values.star,
      target: target,
      post: post,
      isSeller: isSeller,
      ...(values.content && { content: values.content }),
      ...(values.description && { description: values.description }),
    };

    mutate(payload);
  };
  return (
    <Modal
      centered
      open={open}
      onCancel={() => {
        setOpen(false);
        setStar(0);
        form.resetFields();
      }}
      title="Review"
      onOk={onSumit}
      okButtonProps={{ disabled: star === 0, loading: isPending }}
    >
      <Form form={form} layout="vertical" clearOnDestroy>
        <Form.Item name="star">
          <Rate
            defaultValue={star}
            value={star}
            onChange={(value) => setStar(value)}
          />
        </Form.Item>
        {star >= 4 && (
          <Form.Item name="content" valuePropName="checked">
            <Checkbox.Group
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
              options={Object.values(ESampleEvaluate).map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </Form.Item>
        )}
        <Form.Item name="description">
          <CTextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EvaluateModal;
