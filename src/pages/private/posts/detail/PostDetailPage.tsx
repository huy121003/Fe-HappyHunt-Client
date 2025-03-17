import CPostIsNotAvailable from "@/components/CPostIsNotAvailable";
import Bottom from "@/components/layouts/AppLayout/Bottom/Bottom";

import PostDetail from "@/features/posts/components/ui/PostDetail";
import { API_KEY, EPostStatus } from "@/features/posts/data/constant";

import PostService from "@/features/posts/service";
import { useAppSelector } from "@/redux/reduxHook";

import { useQuery } from "@tanstack/react-query";
import { Flex } from "antd";

import { useParams } from "react-router-dom";

function PostDetailPage() {
  const account = useAppSelector((state) => state.auth?.account);

  const { slugPost } = useParams<{ slugPost: string }>();

  // Kiểm tra slugPost trước khi gọi API
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.POST_DETAIL, slugPost], // Đảm bảo mỗi bài post có cache riêng
    queryFn: async () => {
      if (!slugPost) return null;
      const response = await PostService.getBySlug(slugPost);
      return response.data;
    },
    enabled: !!slugPost, // Chỉ gọi API nếu slugPost có giá trị
  });

  if (isFetched && data) {
    if (
      account?._id !== data?.createdBy?._id &&
      data?.status !== EPostStatus.SELLING
    ) {
      return <CPostIsNotAvailable />;
    }
  }

  return (
    <Flex
      vertical
      justify="center"
      align="center"
      className="flex-1 flex overflow-y-hidden min-h-screen"
    >
      {data && <PostDetail data={data} isLoading={isLoading || !isFetched} />}
      <Bottom />
    </Flex>
  );
}

export default PostDetailPage;
