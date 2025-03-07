import { TablePaginationConfig, TableProps, UploadProps } from 'antd';

export interface ICommonResponse<T = unknown> {
  status: number;
  statusCode: number;
  message: string;
  data: T;
}

export interface IPage<L> {
  pageNumber: number;
  pageSize: number;
  totalDocuments: number;
  documentList: L;
}
export interface IPagedResponse<L = unknown>
  extends ICommonResponse<IPage<L>> {}

export interface ISearchParams {
  page?: number;
  size?: number;
  sort?: string[];
}
export interface ITableProps<T> extends Pick<TableProps<T>, 'onChange'> {
  data?: T[];
  isLoading?: boolean;
  notFound?: boolean;
  pagination: TablePaginationConfig;
  onDelete: (someThing: T) => void;
  onUpdate?: (someThing: T) => void;
  onActive?: (someThing: T) => void;
  onInactive?: (someThing: T) => void;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openActiveModal?: boolean;
  setOpenActiveModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

type FileType = Parameters<NonNullable<UploadProps['beforeUpload']>>[0];

export interface IFileType extends FileType {}
export interface IFormRef {
  submit: () => void;
}

export interface IPagination {
  pageNumber?: number;
  pageSize?: number;
  totalDocuments?: number;
}
