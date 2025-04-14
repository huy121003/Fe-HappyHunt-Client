import { Button, Card, Flex, Rate, Typography } from "antd";
import React, { useState } from "react";
import EvaluateModal from "./EvaluateModal";

interface IEvaluateShowProps {
  target: number;
  post: number;
  isSeller: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
function EvaluateShow({ target, post, isSeller, setShow }: IEvaluateShowProps) {
  const [star, setStar] = useState(0);
  const [open, setOpen] = useState(false);
  return (
    <Card
      className="w-full  rounded-none"
      extra={
        <Button
          type="text"
          icon={<i className="fa-solid fa-xmark" />}
          onClick={() => setShow(false)}
        />
      }
    >
      <Flex justify="space-between" align="center">
        <Flex vertical>
          <Typography.Text>Review this user</Typography.Text>
          <Rate onChange={setStar} />
        </Flex>
        <Flex vertical>
          <Button
            disabled={star === 0}
            onClick={() => setOpen(true)}
            type="primary"
            icon={<i className="fa-solid fa-pen-to-square" />}
          >
            Review
          </Button>
        </Flex>
      </Flex>
      <EvaluateModal
        open={open}
        setOpen={setOpen}
        star={star}
        setStar={setStar}
        target={target}
        post={post}
        isSeller={isSeller}
        setShow={setShow}
      />
    </Card>
  );
}

export default EvaluateShow;
