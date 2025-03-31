import PortCard1 from "@/components/post-cards/PortCard1";
import PostCard2 from "@/components/post-cards/PostCard2";
import { IPostItem } from "@/features/posts/data/interface";
import { Flex, Image, Spin, Pagination } from "antd";
import { PaginationConfig } from "antd/es/pagination";

interface IProps {
  data: IPostItem[];
  pagiantion: PaginationConfig;
  onChange: (current: number, pageSize?: number) => void;
  showListType: "grid" | "list";
  loading: boolean;
}
const PostListing = ({
  data,
  pagiantion,
  onChange,
  showListType,
  loading,
}: IProps) => {
  return (
    <Flex vertical className="w-full min-h-[calc(100vh-200px)] items-center">
      {loading ? (
        <Flex className="h-[400px] w-full items-center justify-center">
          <Spin size="large" />
        </Flex>
      ) : data?.length > 0 ? (
        <>
          {showListType === "grid" ? (
            <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
              {data.map((item) => (
                <div
                  key={item._id}
                  className="transform transition-all duration-300 hover:-translate-y-1"
                >
                  <PortCard1 record={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full space-y-4">
              {data.map((item) => (
                <div
                  key={item._id}
                  className="transform transition-all duration-300 hover:-translate-y-1"
                >
                  <PostCard2 record={item} />
                </div>
              ))}
            </div>
          )}
          <Flex className="w-full justify-end mt-8">
            <Pagination
              defaultCurrent={1}
              total={pagiantion.total}
              onChange={onChange}
              pageSize={pagiantion.pageSize}
              className="custom-pagination"
            />
          </Flex>
        </>
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
    </Flex>
  );
};

export default PostListing;
