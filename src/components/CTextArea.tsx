import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';

const CTextArea = ({
  maxLength = 2000,
  autoSize = { minRows: 3, maxRows: 10 },
  onInput,
  ...rest
}: TextAreaProps) => {
  const handleInput: TextAreaProps['onInput'] = (e) => {
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
    <Input.TextArea
      {...rest}
      maxLength={maxLength}
      autoSize={autoSize}
      size="large"
      className="w-full"
      onInput={handleInput}
    />
  );
};

export default CTextArea;
