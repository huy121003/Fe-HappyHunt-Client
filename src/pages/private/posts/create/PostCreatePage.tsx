import ContentLayout from "@/components/layouts/ContentLayout";
import PostForm from "@/features/posts/components/form/PostForm";
import { IPostPayload } from "@/features/posts/data/interface";
import usePostState from "@/features/posts/hooks/usePostState";
import PostService from "@/features/posts/service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function PostCreatePage() {
  const navigate = useNavigate();
  const { onSuccess, onError } = usePostState();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IPostPayload) => {
      const response = await PostService.create(data);
      return response.data;
    },
    onSuccess: () => {
      onSuccess("Post created successfully", () => {
        navigate("/post-management/waiting");
      });
    },
    onError,
  });
  const onSubmit = (data: IPostPayload) => {
    mutate(data);
  };

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
          <h1 className="text-sm font-semibold text-gray-400">
            Create New Post
          </h1>
        </div>
      }
    >
      <PostForm onSubmit={onSubmit} loading={isPending} />
    </ContentLayout>
  );
}

export default PostCreatePage;
