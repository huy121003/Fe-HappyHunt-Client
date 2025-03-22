import { SelectProps, Spin } from 'antd';
import { useMemo } from 'react';
import CSelect from './CSelect';

type TProps = SelectProps & {
  hasMore?: boolean;
  fetchData: () => void;
  fetchMore: () => void;
  threshold?: number;
};

const CInfiniteSelect = ({
  loading,
  hasMore,
  threshold = 20,
  options,
  fetchData,
  fetchMore,
  ...props
}: Readonly<TProps>) => {
  const onScroll: SelectProps['onPopupScroll'] = (event) => {
    if (!hasMore) return;

    const target = event.target as HTMLElement;
    const distance =
      target.scrollTop + target.offsetHeight - target.scrollHeight;

    if (!loading && Math.abs(distance) < threshold) {
      fetchMore();
    }
  };

  const appendedLoadingOptions = useMemo(() => {
    if (loading) {
      return options?.concat({
        label: (
          <div className="text-center">
            <Spin size="small" className="mx-auto" />
          </div>
        ),
        value: 'LOADING',
      });
    }

    return options;
  }, [options, loading]);

  const onDropdownVisibleChange = (open: boolean) => {
    if (open) fetchData();
    props.onDropdownVisibleChange?.(open);
  };

  return (
    <CSelect
      className="w-1/3"
      {...props}
      showSearch
      loading={loading}
      options={appendedLoadingOptions}
      filterOption={false}
      onPopupScroll={onScroll}
      onDropdownVisibleChange={onDropdownVisibleChange}
    />
  );
};

export default CInfiniteSelect;
