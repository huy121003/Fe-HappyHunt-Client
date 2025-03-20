import { Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/redux/reduxHook";
import { API_KEY, EPostStatus } from "@/features/posts/data/constant";
import PostService from "@/features/posts/service";
import PostDetail from "@/features/posts/components/ui/PostDetail";
import CPostIsNotAvailable from "@/components/CPostIsNotAvailable";
import Bottom from "@/components/layouts/AppLayout/Bottom/Bottom";
import ContentLayout from "@/components/layouts/ContentLayout";

function PostDetailPage() {
  const account = useAppSelector((state) => state.auth?.account);
  const { slugPost } = useParams<{ slugPost: string }>();
  const navigate = useNavigate();
  // Nếu không có slug, không cần gọi API
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.POST_DETAIL, slugPost],
    queryFn: async () => {
      if (!slugPost) return null;
      const response = await PostService.getBySlug(slugPost);
      return response.data;
    },
    enabled: Boolean(slugPost),
  });

  return (
    <>
      <ContentLayout
        mb={100}
        title={
          <div className="flex items-center gap-1">
            <h1
              className="text-sm font-semibold text-flame-orange cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </h1>
            <h1 className="text-sm font-semibold text-gray-400">
              / {data?.name}
            </h1>
          </div>
        }
      >
        {/* Hiển thị spinner khi đang tải dữ liệu */}
        {isLoading && <Spin size="large" />}

        {/* Kiểm tra dữ liệu trước khi hiển thị */}
        {isFetched &&
          (data ? (
            account?._id !== data?.createdBy?._id &&
            data?.status !== EPostStatus.SELLING ? (
              <CPostIsNotAvailable />
            ) : (
              <PostDetail data={data} isLoading={isLoading} />
            )
          ) : (
            <CPostIsNotAvailable />
          ))}
      </ContentLayout>
      <Bottom />
    </>
  );
}

export default PostDetailPage;
