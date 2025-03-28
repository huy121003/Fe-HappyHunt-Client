import { useQuery } from "@tanstack/react-query";
import { TreeSelect, FormInstance } from "antd";
import { API_KEY } from "../data/constants";
import CategoryService from "../service";
import { ICategoryItem } from "../data/interface";

interface INode {
  title: string;
  value: string;
  disabled?: boolean;
  fullPath: string;
  children: INode[];
}
interface IProps {
  form: FormInstance;
  defaultValue?: {
    fullpath: string;
    value: string;
  }[];
}
const BuildMenuTree = (categories: ICategoryItem[]): INode[] => {
  const map = new Map<number, INode>();

  // Khởi tạo danh mục với children rỗng
  categories.forEach((cat) =>
    map.set(cat._id, {
      title: cat.name,
      value: String(cat._id),
      fullPath: cat.name, // Mặc định tên danh mục
      disabled: false, // Mặc định không bị vô hiệu hóa
      children: [],
    })
  );

  const tree: INode[] = [];

  categories.forEach((cat) => {
    const node = map.get(cat._id)!;

    if (cat.parent) {
      const parent = map.get(cat.parent._id);
      if (parent) {
        parent.children.push(node);
        parent.disabled = true;
        node.fullPath = `${parent.fullPath} - ${node.title}`;
        node.value = `${parent.value}-${node.value}`;
      }
    } else {
      tree.push(node);
    }
  });

  return tree;
};
const CategorySelectorPost = ({ form, defaultValue }: IProps) => {
  const { data, isFetched } = useQuery({
    queryKey: [API_KEY.GET_CATEGORIES],
    queryFn: async () => {
      const response = await CategoryService.getAll();
      return response.data;
    },
  });

  return (
    <TreeSelect
      disabled={!!defaultValue}
      allowClear
      size="large"
      style={{ width: "100%" }}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      treeData={BuildMenuTree(data || [])}
      placeholder="Select category"
      treeDefaultExpandAll
      loading={!isFetched}
      onChange={(value: string | string[]) => {
        form.setFieldsValue({
          category: value,
          attributes: [],

          isPayment: (data ?? []).find(
            (item) =>
              item._id ===
              Number(
                typeof value === "string" ? value.split("-")[1] : value?.[1]
              )
          )?.isPayment,
          pricePayment: (data ?? []).find(
            (item) =>
              item._id ===
              Number(
                typeof value === "string" ? value.split("-")[1] : value?.[1]
              )
          )?.pricePayment,
        });
      }}
      treeNodeLabelProp="fullPath"
      value={defaultValue?.map((item) => item.value)}
    />
  );
};

export default CategorySelectorPost;
