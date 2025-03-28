import { Input, InputProps } from 'antd';

const CInput = ({ maxLength = 255, onInput, ...rest }: InputProps) => {
  const handleInput: InputProps['onInput'] = (e) => {
    const target = e.target as HTMLInputElement;

    if (target.value?.length > maxLength) {
      target.blur();
      setTimeout(() => {
        target.focus();
      }, 0);
    }

    if (onInput) onInput(e);
  };

  return (
    <Input maxLength={maxLength} size="large" onInput={handleInput} {...rest} />
  );
};

export default CInput;
