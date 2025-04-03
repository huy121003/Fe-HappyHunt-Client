import ScrollableContainer2 from "@/components/scroll/ScrollableContainer2";
import { ICategoryItem } from "@/features/categories/data/interface";
import { Card, Flex, Image } from "antd";
import { useNavigate } from "react-router-dom";

interface CategoryChildSelectProps {
  data: ICategoryItem[];
}
const CategoryChildSelect: React.FC<CategoryChildSelectProps> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="w-full bg-white shadow-md rounded-lg border-0 p-0"
      size="small"
      title="Subcategories"
    >
      <ScrollableContainer2>
        <Flex gap={4} className="">
          {data.map((item) => (
            <Flex
              onClick={() => {
                navigate(
                  `/category/${item?.parent?.slug}/child-category/${item.slug}`
                );
              }}
              vertical
              key={item._id}
              className="group cursor-pointer transition-all duration-300 hover:-translate-y-1 flex-shrink-0 min-w-[80px] px-2 py-1 rounded-lg hover:bg-gray-100"
            >
              <Flex
                className="relative rounded-full overflow-hidden bg-white w-[60px] h-[60px] items-center justify-center mx-auto shadow-sm group-hover:shadow-md transition-shadow duration-300"
                justify="center"
                align="center"
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={40}
                  height={40}
                  preview={false}
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </Flex>

              <span className="block text-center text-sm text-black transition-colors duration-300 group-hover:text-flame-orange font-medium truncate w-full">
                {item.name}
              </span>
            </Flex>
          ))}
        </Flex>
      </ScrollableContainer2>
    </Card>
  );
};

export default CategoryChildSelect;
