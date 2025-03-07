import { SelectProps } from 'antd';
import { IDistrictItem } from '../../data/interface';
import useLoadMore, { IFilters } from '@/hooks/useLoadMore';
import { API_KEY } from '../../data/constant';
import { useMemo } from 'react';
import CInfiniteSelect from '@/components/CInfiniteSelect';
import DistrictsService from '../../service';

interface IProps extends SelectProps {
  defaultSelected?: Partial<IDistrictItem>[];
  provinceId?: number;
}
type ILabelRender = SelectProps['labelRender'];

const SelectDictrict: React.FC<IProps> = ({
  defaultSelected,
  provinceId,
  ...props
}) => {
  const fetchFn = ({ search, ...filter }: IFilters) => {
    return DistrictsService.getAll({
      ...filter,
      name: search || '',
      ...(provinceId && { provinceId }),
    });
  };

  const { items, ...loadMore } = useLoadMore<IDistrictItem>({
    key: API_KEY.DISTRICT,
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
      label || defaultSelected?.find((item) => item._id === value)?.name || ''
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
export default SelectDictrict;
