import { Select, ConfigProvider, SelectProps } from 'antd';
import { debounce, uniq } from 'lodash';
import { DefaultOptionType, FilterFunc } from 'rc-select/lib/Select';
import { FocusEventHandler, useMemo, useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';

type TProps = SelectProps;

const CSelect = ({
  maxLength = 255,
  disabled,
  onSearch,
  onBlur,
  onSelect,
  onInputKeyDown,
  ...props
}: Readonly<TProps>) => {
  const [search, setSearch] = useState('');
  const { componentDisabled } = ConfigProvider.useConfig();

  const suffixIcon = useMemo(() => {
    if (
      props.allowClear &&
      (props.value?.toString().length ||
        props.defaultValue?.toString().length ||
        search)
    )
      return <CloseCircleOutlined />;

    return undefined;
  }, [props.allowClear, props.defaultValue, props.value, search]);

  const handleSearch = (value: string) => {
    const slicedValue = value.substring(0, maxLength);
    setSearch(slicedValue);

    if (onSearch) onSearch(slicedValue);
  };

  const handleFilterOption: FilterFunc<DefaultOptionType> = (input, option) => {
    const label = option?.label?.toString().toLocaleLowerCase() ?? '';

    return label.includes(input.toLocaleLowerCase());
  };

  const handleBlur: FocusEventHandler<HTMLElement> = (event) => {
    setSearch('');
    if (onBlur) onBlur(event);
  };

  const handleSelect: SelectProps['onSelect'] = (value, option) => {
    if (props.mode === 'tags') setSearch('');
    if (onSelect) onSelect(value, option);
  };

  const handleKeyDown: SelectProps['onInputKeyDown'] = debounce((event) => {
    if (props.mode === 'tags') {
      if (event.code === 'Enter') {
        const value = uniq(([] as string[]).concat(props.value ?? [], search));
        if (props.onChange)
          props.onChange(
            value,
            value.map(() => ({}))
          );
        setSearch('');
      }
    }

    if (onInputKeyDown) onInputKeyDown(event);
  }, 100);

  return (
    <Select
      suffixIcon={suffixIcon}
      disabled={disabled !== undefined ? disabled : componentDisabled}
      size="large"
      aria-autocomplete="none"
      rootClassName="w-full"
      defaultActiveFirstOption={false}
      optionFilterProp="children"
      filterOption={handleFilterOption}
      searchValue={search}
      onSearch={props.showSearch ? handleSearch : undefined}
      onBlur={handleBlur}
      onSelect={handleSelect}
      onInputKeyDown={handleKeyDown}
      {...props}
    />
  );
};

export default CSelect;
