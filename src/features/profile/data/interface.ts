import { ESex } from "./constant";

export interface IProfile {
  _id: number;
  name: string;
  phoneNumber: string;
  description: string;
  username: string;
  isBanned: boolean;
  avatar: string;
  isVip: boolean;
  address: {
    province: {
      _id: number;
      name: string;
    };
    district: {
      _id: number;
      name: string;
    };
    ward: {
      _id: number;
      name: string;
    };
    specificAddress: string;
  };
  slug: string;
  createdAt: string;
  dateOfBirth: Date;
  sex: ESex;
  background: string;
}
