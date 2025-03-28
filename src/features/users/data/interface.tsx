import { ISearchParams } from "@/interfaces";
export interface IUser {
  role?: {
    name: string;
    _id: number;
  };
  isVip: boolean;
  isBanned: boolean;
  description: string;
  name: string;
  username?: string;
  avatar?: string;
  phoneNumber?: string;
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
}
export interface IUserItem {
  isVip: boolean;
  _id: number;
  isBanned: boolean;
  name: string;
  username?: string;
  avatar?: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt?: string;
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
}

export interface ISearchUser extends ISearchParams {
  name?: string;
  phoneNumber?: string;
  isBanned?: boolean;
  province?: number;
  district?: number;
  ward?: number;
}
