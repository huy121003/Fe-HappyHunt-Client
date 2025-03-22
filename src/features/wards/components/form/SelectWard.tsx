import { SelectProps } from "antd";
import { IWardItem } from "../../data/interface";
import useLoadMore, { IFilters } from "@/hooks/useLoadMore";
import { API_KEY } from "../../data/constant";
import { useMemo } from "react";
import CInfiniteSelect from "@/components/form/CInfiniteSelect";
import WardService from "../../service";

interface IProps extends SelectProps {
  defaultSelected?: Partial<IWardItem>[];
  district?: number;
  province?: number;
}
type ILabelRender = SelectProps["labelRender"];
const SelectWard: React.FC<IProps> = ({
  defaultSelected,
  district,
  province,
  ...props
}) => {
  const fetchFn = ({ search, ...filter }: IFilters) => {
    return WardService.getAll({
      ...filter,
      name: search || "",
      ...(district && { district }),
      ...(province && { province }),
    });
  };

  const { items, ...loadMore } = useLoadMore<IWardItem>({
    key: API_KEY.WARD,
    fetchFn,
  });

  const options = useMemo(() => {
    return items.map((item) => ({
      label: item.name,
      value: item._id,
    }));
  }, [items]);

  const labelRender: ILabelRender = (props) => {
    const { label, value } = props;
    return (
      label || defaultSelected?.find((item) => item._id === value)?.name || ""
    );
  };

  return (
    <CInfiniteSelect
      {...props}
      options={options}
      labelRender={labelRender}
      {...loadMore}
    />
  );
};
export default SelectWard;
