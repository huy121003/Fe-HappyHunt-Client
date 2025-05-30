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

export interface IDescriptionPayload {
  categoryParent: number;
  category: number;
  name: string;
  price: number;
  attributes: {
    name: string;
    value: string;
  }[];
}
