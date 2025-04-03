import { ISearchParams } from "@/interfaces";

export interface ISearchHistoryItem {
  _id: number;
  keyword: string;
}

export interface ISearchHistoryPayload {
  keyword: string;
}

export interface ISearchHistory extends ISearchParams {
  keyword?: string;
}
