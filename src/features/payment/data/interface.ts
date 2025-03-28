import { EStatus } from "./constant";
import { ISearchParams } from "@/interfaces";

export interface IPayment {
  bin: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  description: string;
  orderCode: number;
  currency: string;
  paymentLinkId: string;
  status: EStatus;
  checkoutUrl: string;
  qrCode: string;
}

export interface IPaymentItem {
  _id: string;
  bin: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  description: string;
  orderCode: number;
  currency: string;
  paymentLinkId: string;
  status: EStatus;
  checkoutUrl: string;
  qrCode: string;
  transactionDateTime: string;
}

export interface ISearchPayment extends ISearchParams {
  amount?: number;
  createdBy?: number;
  status?: EStatus;
}
