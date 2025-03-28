import { Typography } from 'antd';
import React from 'react';
interface ICTableParagraphProps {
  children: React.ReactNode;
}
const CTableParagraph: React.FC<ICTableParagraphProps> = ({ children }) => {
  return (
    <Typography.Text ellipsis={{ tooltip: true }} style={{ maxWidth: 200 }}>
      {children}
    </Typography.Text>
  );
};
export default CTableParagraph;
