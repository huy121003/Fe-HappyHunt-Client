import PortCard1 from "@/components/post-cards/PortCard1";
import PostCardSold from "@/components/post-cards/PostCardSold";
import { API_KEY, EPostStatus } from "@/features/posts/data/constant";
import usePostFilter from "@/features/posts/hooks/usePostFilter";
import PostService from "@/features/posts/service";
import { ShopOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Card, Flex, Image, Pagination, Spin, Tabs } from "antd";
interface IPostListStatusProps {
  id: number;
}
function PostListStatus({ id }: IPostListStatusProps) {
  const {
    handleChangePagination,
    pagination,
    computtedFilter,
    handleSetSold,
    handleSetStatus,
    status,
  } = usePostFilter();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.POST_PROFILE, computtedFilter],
    queryFn: async () => {
      const response = await PostService.getAllPagination({
        ...computtedFilter,
        createdBy: id,
      });
      return response.data;
    },
  });

  const {
    data: countData,
    isFetched: countFetched,
    isLoading: countLoading,
  } = useQuery({
    queryKey: [API_KEY.POST_PROFILE_COUNT, id],
    queryFn: async () => {
      const response = await PostService.countSold(id);
      return response.data;
    },
  });

  const tabsData = [
    {
      key: EPostStatus.SELLING,
      label: `Selling (${countData?.selling})`,
      icon: <ShopOutlined />,
    },

    {
      key: "SOLD",
      label: `Sold (${countData?.sold})`,
      icon: <i className="far fa-calendar-times" />,
    },
  ];

  return (
    <Card className=" w-full lg:w-2/3 min-h-screen">
      <Tabs
        className="w-full"
        type="card"
        size="large"
        tabBarStyle={{
          padding: "12px 16px 0",
          marginBottom: 0,
          borderBottom: "1px solid #f0f0f0",
          background: "#fafafa",
        }}
        onTabClick={(key) => {
          key === "SOLD" && handleSetSold(true);
          key === "SELLING" && handleSetStatus(EPostStatus.SELLING);
        }}
        items={tabsData}
      />
      {!countFetched ||
        !isFetched ||
        countLoading ||
        (isLoading && (
          <div className="w-full h-full flex justify-center items-center">
            <Spin />
          </div>
        ))}
      <Flex
        gap={10}
        className={`w-full my-4
          ${status === EPostStatus.SELLING && " grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1"}
          `}
      >
        {data?.documentList &&
          data?.documentList?.length > 0 &&
          data?.documentList?.map((item) => (
            <>
              {status === EPostStatus.SELLING ? (
                <PortCard1 record={item} />
              ) : (
                <PostCardSold data={item} />
              )}
            </>
          ))}
      </Flex>
      {data?.documentList && data?.documentList?.length > 0 ? (
        <Flex justify="end" className="w-full mt-10">
          <Pagination
            defaultCurrent={1}
            total={pagination?.total ?? 0}
            onChange={handleChangePagination}
            pageSize={pagination?.pageSize ?? 10}
            className="custom-pagination"
          />
        </Flex>
      ) : (
        <Flex vertical gap={4} className="items-center justify-center py-12">
          <Image
            src="/image8.png"
            width="300px"
            preview={false}
            className="opacity-75"
          />
          <span className="text-xl font-medium text-gray-400">
            No Posts Found
          </span>
        </Flex>
      )}
    </Card>
  );
}

export default PostListStatus;
