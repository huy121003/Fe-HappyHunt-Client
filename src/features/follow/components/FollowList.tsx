import React from "react";
import { IFollowItem } from "../data/interface";

import FollowCard from "./FollowCard";
interface IProps {
  data: IFollowItem[];
}
const FollowList: React.FC<IProps> = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <FollowCard key={item._id} item={item} />
      ))}
    </>
  );
};

export default FollowList;
