import { Flex } from "antd";
import { IFavoritePost } from "../data/interface";
import PostFavorite from "@/components/post-cards/PostFavorite";
import { motion } from "framer-motion";
import { container, itemAnimation } from "@/libs/motion";
interface IProps {
  data: IFavoritePost[];
}
const FavoritePostList: React.FC<IProps> = ({ data }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <Flex className="w-full" vertical gap={10}>
        {data.map((item) => (
          <motion.div
            key={item._id}
            variants={itemAnimation}
            className="group h-full"
          >
            <PostFavorite key={item._id} record={item} />
          </motion.div>
        ))}
      </Flex>
    </motion.div>
  );
};

export default FavoritePostList;
