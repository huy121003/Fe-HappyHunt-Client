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

  return <PostForm onSubmit={onSubmit} loading={isPending} />;
}

export default PostCreatePage;
