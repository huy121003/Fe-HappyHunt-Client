import { IFavoritePost } from "../data/interface";
import PostFavorite from "@/components/post-cards/PostFavorite";
interface IProps {
  data: IFavoritePost[];
}
const FavoritePostList: React.FC<IProps> = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <PostFavorite key={item._id} record={item} />
      ))}
    </>
  );
};

export default FavoritePostList;
