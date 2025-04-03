import { IPostItem } from "@/features/posts/data/interface";
import { Card, Tooltip, Typography } from "antd";
import React from "react";
import TimeAgo from "../ui/TimeAgo";
import { truncateWithDots } from "@/configs/truncateWithDots";
interface IProps {
  data: IPostItem;
}
const PostCardSold: React.FC<IProps> = ({ data }) => {
  return (
    <Tooltip title={data.name}>
      <Card className="w-full  rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
        <Typography.Title level={5} className="m-0 ">
          {truncateWithDots(data.name, 30)}
        </Typography.Title>
        <Typography.Text>
          <TimeAgo date={data.updatedAt} />
        </Typography.Text>
      </Card>
    </Tooltip>
  );
};
export default PostCardSold;
