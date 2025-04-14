export interface IMessageChatbot {
  sender: "user" | "bot";
  content: string;
}
export interface IMessageChatbotPayload {
  message: string;
  history?: {
    sender: "user" | "bot";
    content: string;
  }[];
}
