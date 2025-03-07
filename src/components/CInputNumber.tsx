import React from 'react';
import { Input, InputProps } from 'antd';

type TNumericInputProps = Omit<InputProps, 'value' | 'onChange'> & {
  style: React.CSSProperties;
  value: string;
  onChange: (value: string) => void;
};

const CInputNumber = ({ maxLength = 255, ...props }: TNumericInputProps) => {
  const { value, onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
  };

  return (
    <Input
      type="number"
      {...props}
      maxLength={maxLength}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default CInputNumber;
