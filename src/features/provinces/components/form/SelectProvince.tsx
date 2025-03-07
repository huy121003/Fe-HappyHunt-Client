import { SelectProps } from 'antd';
import { IProvinceItem } from '../../data/interface';
import useLoadMore, { IFilters } from '@/hooks/useLoadMore';
import { API_KEY } from '../../data/constant';
import { useMemo } from 'react';
import CInfiniteSelect from '@/components/CInfiniteSelect';
import ProvincesService from '../../service';

interface IProps extends SelectProps {
  defaultSelected?: Partial<IProvinceItem>[];
}
type ILabelRender = SelectProps['labelRender'];

const SelectProvince: React.FC<IProps> = ({ defaultSelected, ...props }) => {
  const fetchFn = ({ search, ...filter }: IFilters) => {
    return ProvincesService.getAll({
      ...filter,
      name: search || '',
    });
  };

  const { items, ...loadMore } = useLoadMore<IProvinceItem>({
    key: API_KEY.PROVINCE,
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
      className="w-1/3"
      {...props}
      options={options}
      labelRender={labelRender}
      {...loadMore}
    />
  );
};

export default SelectProvince;
