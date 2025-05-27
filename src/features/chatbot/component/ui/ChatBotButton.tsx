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
            src="https://cdn0.iconfinder.com/data/icons/chatbot-10/128/chatbot-chat-robot-bot-face-message-communication-1024.png"
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
