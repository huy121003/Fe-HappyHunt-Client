import { IPostItem } from "@/features/posts/data/interface";
import { Card, Typography } from "antd";
import React from "react";
import TimeAgo from "../ui/TimeAgo";
interface IProps {
  data: IPostItem;
}
const PostCardSold: React.FC<IProps> = ({ data }) => {
  return (
    <Card className="w-full  rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
      <Typography.Title level={5} className="m-0 ">
        {data.name}
      </Typography.Title>
      <Typography.Text>
        <TimeAgo date={data.updatedAt} />
      </Typography.Text>
    </Card>
  );
};
export default PostCardSold;
