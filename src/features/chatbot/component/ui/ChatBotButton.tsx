import { Image, Button, Tooltip } from "antd";

interface ChatBotButtonProps {
  onClick: () => void;
}

const ChatBotButton = ({ onClick }: ChatBotButtonProps) => {
  return (
    <Tooltip title="Chat with us">
      <Button
        className="absolute z-50 animate-bounce"
        type="default"
        shape="circle"
        icon={
          <Image
            src="https://cdn-icons-png.flaticon.com/512/6014/6014401.png"
            preview={false}
          />
        }
        onClick={onClick}
        style={{
          insetInlineEnd: 30,
          bottom: 100,
          width: 80,
          height: 80,
        }}
      />
    </Tooltip>
  );
};

export default ChatBotButton;
