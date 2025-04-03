import CButton from "@/components/buttons/CButton";
import PortCard1 from "@/components/post-cards/PortCard1";
import { API_KEY } from "@/features/posts/data/constant";
import PostService from "@/features/posts/service";

import { useQuery } from "@tanstack/react-query";
import { Card, Flex, Spin, Typography } from "antd";

function PostSuggestionList() {
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.POST_SUGGESTION],
    queryFn: async () => {
      const response = await PostService.getAllSuggestion();
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full min-h-[300px] flex items-center justify-center m-2">
        <Spin size="large" className="scale-125" />
      </div>
    );
  }
  const hidden =
    data?.documentList.length === 0 ||
    (data?.totalDocuments ?? 0) <=
      (data?.pageSize ?? 10) * ((data?.pageNumber ?? 0) + 1);

  return (
    <Card
      className="m-4 shadow-sm border-0 overflow-hidden bg-white rounded-xl border-t-2 border-t-orange-500"
      bodyStyle={{ padding: 0 }}
    >
      <div className="p-6">
        <Flex justify="space-between" align="center" className="mb-6">
          <Flex align="center" gap={2} justify="center">
            <Typography.Title
              level={4}
              className="m-0 text-gray-800 font-semibold"
            >
              <i className="fa-solid fa-file-text text-2xl text-orange-500"></i>
              Post Suggestions for you
            </Typography.Title>
          </Flex>
        </Flex>
        <Flex
          gap={10}
          className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6"
        >
          {data?.documentList?.map((item) => (
            <PortCard1 key={item._id} record={item} />
          ))}
        </Flex>
        <Flex justify="center" align="center" className="mt-4">
          <CButton type="default" hidden={hidden}>
            Show More
          </CButton>
        </Flex>
      </div>
    </Card>
  );
}

export default PostSuggestionList;
