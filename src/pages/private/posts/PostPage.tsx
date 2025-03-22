import { usePostFilterContext } from "@/features/posts/components/ui/PostFilterProvider ";
import PostListStatus from "@/features/posts/components/ui/PostListStatus";
import { API_KEY, EPostStatus } from "@/features/posts/data/constant";
import { IPostItem } from "@/features/posts/data/interface";

import usePostState from "@/features/posts/hooks/usePostState";
import PostService from "@/features/posts/service";
import { useAppSelector } from "@/redux/reduxHook";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

function PostPage() {
  const { handleChangePagination, pagination, computtedFilter } =
    usePostFilterContext();
  const [openModal, setOpenModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const { onSuccess, onError } = usePostState();
  const account = useAppSelector((state) => state.auth.account);
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.POST, computtedFilter],
    queryFn: async () => {
      const response = await PostService.getAllPagination({
        ...computtedFilter,
        ...(account?._id ? { createdBy: account._id } : {}),
      });

      return response.data;
    },
  });
  const { mutate: deleteMutate, isPending: deleteIsPending } = useMutation({
    mutationFn: async (record: IPostItem) => {
      const response = await PostService.remove(record._id);
      console.log(response);
      return response.data;
    },
  });
  const { mutate: updateStatusMutate, isPending: updateStatusIsPending } =
    useMutation({
      mutationFn: async ({
        record,
        status,
      }: {
        record: IPostItem;
        status: EPostStatus;
      }) => {
        const response = await PostService.updateStatus(record._id, status);
        return response.data;
      },
      onSuccess: () => {
        onSuccess("Post status updated successfully");
      },
      onError,
    });

  const handleDelete = (record: IPostItem) => {
    deleteMutate(record);
  };
  const handleUpdateStatus = (record: IPostItem, status: EPostStatus) => {
    updateStatusMutate({ record, status });
  };

  return (
    <>
      <PostListStatus
        data={data?.documentList}
        isLoading={isLoading}
        pagination={{
          ...pagination,
          total: data?.totalDocuments || 0,
          position: undefined,
        }}
        onPaginationChange={handleChangePagination}
        onDelete={handleDelete}
        onActive={handleUpdateStatus}
        setOpenModal={setOpenModal}
        openModal={openModal}
        notFound={isFetched && !data?.totalDocuments}
        openActiveModal={openStatusModal}
        setOpenActiveModal={setOpenStatusModal}
        isDeleteLoading={deleteIsPending}
        isShowLoading={updateStatusIsPending}
      />
    </>
  );
}

export default PostPage;
