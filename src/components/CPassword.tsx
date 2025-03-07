import { Input, InputProps } from 'antd';

const CPassword = ({ maxLength = 255, onInput, ...rest }: InputProps) => {
  const handleInput: InputProps['onInput'] = (e) => {
    const target = e.target as HTMLInputElement;

    if (target.value?.length > maxLength) {
      target.blur();
      setTimeout(() => target.focus(), 0);
    }

    if (onInput) onInput(e);
  };

  return (
    <Input.Password
      maxLength={maxLength}
      size="large"
      className="w-full"
      onInput={handleInput}
      {...rest}
    />
  );
};

export default CPassword;
