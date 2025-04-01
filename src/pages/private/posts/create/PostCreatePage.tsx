import ContentLayout from "@/components/layouts/ContentLayout";
import { API_KEY } from "@/features/auth/data/constant";
import PostForm from "@/features/posts/components/form/PostForm";
import { IPostPayload } from "@/features/posts/data/interface";
import usePostState from "@/features/posts/hooks/usePostState";
import PostService from "@/features/posts/service";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";

function PostCreatePage() {
  const navigate = useNavigate();
  const client = useQueryClient();
  const { onSuccess } = usePostState();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IPostPayload) => {
      const response = await PostService.create(data);
      return response.data;
    },
    onSuccess: () => {
      onSuccess("Post created successfully", () => {
        client.invalidateQueries({ queryKey: [API_KEY.GET_ACCOUNT_INFO] });
        navigate("/post-management/waiting");
      });
    },
  });
  const onSubmit = (data: IPostPayload) => {
    mutate(data);
  };

  return (
    <ContentLayout
      mb={100}
      title={
        <Breadcrumb>
          <Breadcrumb.Item
            className="text-lg font-semibold text-flame-orange cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-lg font-semibold text-gray-400">
            Create New Post
          </Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <PostForm onSubmit={onSubmit} loading={isPending} />
    </ContentLayout>
  );
}

export default PostCreatePage;
