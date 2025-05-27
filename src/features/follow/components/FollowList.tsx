import React from "react";
import { IFollowItem } from "../data/interface";
import { motion } from "framer-motion";
import { container, itemAnimation } from "@/libs/motion";
import FollowCard from "./FollowCard";
interface IProps {
  data: IFollowItem[];
}
const FollowList: React.FC<IProps> = ({ data }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      {data.map((item) => (
        <motion.div
          key={item._id}
          variants={itemAnimation}
          className="group h-full"
        >
          <FollowCard key={item._id} item={item} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FollowList;
