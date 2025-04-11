export interface ISampleMessage {
  _id: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISampleMessageDetail {
  message: string;
}

export interface ISampleMessagePayload extends ISampleMessageDetail {}
