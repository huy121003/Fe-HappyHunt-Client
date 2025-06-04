import PortCard1 from "@/components/post-cards/PortCard1";
import PostCard2 from "@/components/post-cards/PostCard2";
import { IPostItem } from "@/features/posts/data/interface";
import { container, itemAnimation } from "@/libs/motion";
import { Flex, Spin, Pagination, Empty } from "antd";
import { PaginationConfig } from "antd/es/pagination";
import { motion } from "framer-motion";

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
          <Spin size="large" className="scale-150" />
        </Flex>
      ) : data?.length > 0 ? (
        <>
          {showListType === "grid" ? (
            <motion.div
              key={data.length} // Force re-render when data changes
              variants={container}
              initial="hidden"
              animate="show"
              className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 auto-rows-fr"
            >
              {data.map((item) => (
                <motion.div
                  key={item._id}
                  variants={itemAnimation}
                  className="group h-full"
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="h-full bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <PortCard1 record={item} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={data.length} // Force re-render when data changes
              variants={container}
              initial="hidden"
              animate="show"
              className="w-full space-y-6"
            >
              {data.map((item) => (
                <motion.div
                  key={item._id}
                  variants={itemAnimation}
                  className="group"
                  whileHover={{
                    scale: 1.01,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <PostCard2 record={item} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          <Flex className="w-full justify-center mt-12">
            <Pagination
              defaultCurrent={1}
              total={pagiantion.total}
              showSizeChanger
              showTotal={(total) => `Total ${total} items`}
              onChange={onChange}
              pageSize={pagiantion.pageSize}
              className="custom-pagination"
              itemRender={(_, type, originalElement) => {
                if (type === "page") {
                  return (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {originalElement}
                    </motion.div>
                  );
                }
                return originalElement;
              }}
            />
          </Flex>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 px-4"
        >
          <Empty
            image="/image8.png"
            imageStyle={{ height: 200 }}
            description={
              <div className="flex flex-col items-center">
                <span className="text-xl font-medium text-gray-400 mb-2">
                  No Posts Found
                </span>
                <p className="text-gray-400 text-center">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            }
          />
        </motion.div>
      )}
    </Flex>
  );
};

export default PostListing;
