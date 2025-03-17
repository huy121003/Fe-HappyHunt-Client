import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

interface TruncateProps {
  text: string;
}

export const CCTruncateWithNewLine: React.FC<TruncateProps> = ({ text }) => {
  return (
    <Text>
      {text.length > 15 ? (
        <>
          {text.slice(0, 15)}
          <br />
          {text.slice(15)}
        </>
      ) : (
        text
      )}
    </Text>
  );
};

export const CTruncateWithDots: React.FC<TruncateProps> = ({ text }) => {
  return (
    <Text ellipsis={{ tooltip: text }}>
      {text.length > 20 ? `${text.slice(0, 30)}...` : text}
    </Text>
  );
};
