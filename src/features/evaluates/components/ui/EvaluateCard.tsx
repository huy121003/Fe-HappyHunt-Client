import { IEvaluateItem } from "@/features/evaluates/data/interface";
import { Avatar, Card, Flex, Image, Rate, Typography } from "antd";
import { motion } from "framer-motion";
import TimeAgo from "@/components/ui/TimeAgo";
import { useNavigate } from "react-router-dom";
import { EPostStatus } from "@/features/posts/data/constant";
import CButton from "@/components/buttons/CButton";
import { useAppSelector } from "@/redux/reduxHook";
import { useState } from "react";
import ReportModal from "@/features/report/components/ui/ReportModal";
import { ETargetType } from "@/features/report/data/constant";

interface EvaluateCardProps {
  evaluate: IEvaluateItem;
}

function EvaluateCard({ evaluate }: EvaluateCardProps) {
  const [open, setOpen] = useState(false);
  const account = useAppSelector((state) => state.auth.account);
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="my-2 gap-3"
        title={
          <Flex
            align="center"
            gap={16}
            onClick={() => {
              navigate(`/profile/${evaluate.createdBy.slug}`);
            }}
          >
            <Avatar src={evaluate.createdBy.avatar} size={40} />
            <Typography.Title level={5}>
              {evaluate.createdBy.name || "Unknown User"}
            </Typography.Title>
          </Flex>
        }
        extra={
          <CButton
            hidden={evaluate.target._id !== account?._id}
            type="primary"
            danger
            icon={<i className="fa-solid fa-flag"></i>}
            onClick={() => setOpen(true)}
          >
            Report
          </CButton>
        }
      >
        <Flex wrap gap={10}>
          {evaluate.content.map((item) => (
            <Typography.Paragraph
              className="bg-gray-100 p-2 px-2 rounded-full hover:border-2 hover:border-flame-orange transition-all duration-300 cursor-pointer "
              key={item}
            >
              {item}
            </Typography.Paragraph>
          ))}
        </Flex>
        <Flex gap={10} justify="start" align="center">
          <Rate disabled value={evaluate.star} />
          | <TimeAgo date={evaluate.createdAt} />
        </Flex>
        <Typography.Paragraph>{evaluate.description}</Typography.Paragraph>
        <Card className="">
          <Flex
            className={`${
              evaluate.post.status === EPostStatus.SELLING
                ? "cursor-pointer"
                : "cursor-not-allowed bg-gray-50 opacity-20"
            }`}
            gap={10}
            justify="start"
            align="center"
            onClick={() => {
              if (evaluate.post.status === EPostStatus.SELLING)
                navigate(`/detail-post/${evaluate.post.slug}`);
            }}
          >
            <Image
              src={evaluate.post.images[0].url}
              width={100}
              height={100}
              className="rounded-lg"
            />
            <Flex vertical>
              <Typography.Title level={5}>
                {evaluate.post.name}
              </Typography.Title>
              <Typography.Title level={4}>
                {evaluate.post.price.toLocaleString()}đ
              </Typography.Title>
            </Flex>
          </Flex>
        </Card>
        <ReportModal
          target={evaluate._id}
          targetType={ETargetType.REVIEW}
          open={open}
          setOpen={setOpen}
        />
      </Card>
    </motion.div>
  );
}

export default EvaluateCard;
