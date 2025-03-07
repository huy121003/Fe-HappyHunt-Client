import { Button, ButtonProps } from 'antd';
import React from 'react';

type TCustomButtonProps = {
  type?: 'default' | 'primary' | 'dashed' | 'link' | 'text';
  htmlType?: 'submit' | 'button' | 'reset';
  className?: string;
  fullWidth?: boolean;
  hasMinW?: boolean;
};

const CButton: React.FC<
  React.PropsWithChildren<TCustomButtonProps & ButtonProps>
> = ({
  children,
  type,
  htmlType,
  className,
  fullWidth = true,
  hasMinW = true,
  ...props
}) => {
  return (
    <Button
      {...props}
      type={type ?? 'primary'}
      htmlType={htmlType}
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <span className={`${hasMinW ? 'min-w-[82px]' : ''} `}>{children}</span>
    </Button>
  );
};

export default CButton;
