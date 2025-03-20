import CPermissionEditPost from "@/components/CPermissionEditPost";
import ContentLayout from "@/components/layouts/ContentLayout";
import PostForm from "@/features/posts/components/form/PostForm";
import { API_KEY, EPostStatus } from "@/features/posts/data/constant";
import { IPostPayload } from "@/features/posts/data/interface";
import usePostState from "@/features/posts/hooks/usePostState";
import PostService from "@/features/posts/service";
import { useAppSelector } from "@/redux/reduxHook";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
function PostUpdatePage() {
  const navigate = useNavigate();
  const account = useAppSelector((state) => state.auth.account);
  const { onSuccess, onError } = usePostState();
  const { slugPost } = useParams<{ slugPost: string }>();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.POST_DETAIL],
    queryFn: async () => {
      const response = await PostService.getBySlug(String(slugPost));
      return response.data;
    },
    enabled: !!slugPost,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IPostPayload) => {
      const { _id, ...rest } = data;
      const response = await PostService.update(Number(_id), rest);

      return response.data;
    },
    onSuccess: () => {
      onSuccess("Post updated successfully", () => {
        navigate("/post-management/waiting");
      });
    },
    onError,
  });
  const onSubmit = (data: IPostPayload) => {
    mutate(data);
  };
  if (isFetched) {
    if (
      (data?.status !== EPostStatus.SELLING &&
        data?.status !== EPostStatus.REJECTED &&
        data?.createdBy._id === account?._id) ||
      data?.createdBy._id !== account?._id
    ) {
      return <CPermissionEditPost />;
    }
  }
  return (
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
          <h1 className="text-sm font-semibold text-gray-400">{"/"}</h1>
          <h1
            className="text-sm font-semibold text-flame-orange "
            onClick={() => {
              navigate(`/detail-post/${data?.slug}`, { replace: true });
            }}
          >
            {data?.name}
          </h1>
          <h1 className="text-sm font-semibold text-gray-400">{"/ "}Update</h1>
        </div>
      }
    >
      <PostForm
        onSubmit={onSubmit}
        loading={isPending || isLoading}
        data={data}
      />
    </ContentLayout>
  );
}

export default PostUpdatePage;
