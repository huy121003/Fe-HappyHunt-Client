import  { useState } from "react";
import usePaymentFilter from "../../hooks/usePaymentFilter";
import { useQuery } from "@tanstack/react-query";
import { API_KEY, EStatus } from "../../data/constant";
import PaymentService from "../../service";
import { CTable } from "@/components";
import {
  Button,
  
  Flex,
  TableColumnsType,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { IPaymentItem } from "../../data/interface";
import FilterLayout from "@/components/layouts/FilterLayout";
import CSelect from "@/components/form/CSelect";
import PaymentModal from "./PaymentModal";

function PaymentTable() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const {
    pagination,
    computtedFilter,
    handleChangePagination,
    handleCHangeStatus,
  } = usePaymentFilter();
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.PAYMENT, computtedFilter],
    queryFn: async () => {
      const response = await PaymentService.getAllByUser(computtedFilter);
      return response.data;
    },
  });
  const columns: TableColumnsType = [
    {
      title: "No",
      dataIndex: "index",
      width: 60,
      render: (_, __, index: number) => index + 1,
    },
    {
      title: "Order Code",
      dataIndex: "orderCode",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value: Number) => `${value.toLocaleString()} VND`,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value: EStatus) => {
        return (
          <Tag
            color={
              value === EStatus.PENDING
                ? "orange"
                : value === EStatus.PAID
                  ? "green"
                  : value === EStatus.CANCEL
                    ? "red"
                    : "blue"
            }
          >
            {value}
          </Tag>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (value: string) => dayjs(value).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (value: string) => dayjs(value).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Action",
      dataIndex: "action",
      fixed: "right",
      width: 100,
      render: (_, record: IPaymentItem) => {
        if (record?.status === EStatus.PENDING) {
          return (
            <Tooltip title="Pay">
              <Button
                type="link"
                onClick={() => {
                  setId(Number(record._id));
                  setOpen(true);
                }}
                icon={<i className="fas fa-money-bill"></i>}
              />
            </Tooltip>
          );
        }
        return null;
      },
    },
  ];
  return (
    <>
      <Flex flex={1} className="bg-white shadow-md rounded-lg p-6 w-full">
        <Flex vertical gap={10} className="w-full">
          <Typography.Title level={4}>Payment History</Typography.Title>
          <FilterLayout>
            <CSelect
              onChange={handleCHangeStatus}
              allowClear
              placeholder="Status"
              options={[
                {
                  label: "Pending",
                  value: EStatus.PENDING,
                },
                {
                  label: "Paid",
                  value: EStatus.PAID,
                },
                {
                  label: "Cancel",
                  value: EStatus.CANCEL,
                },
              ]}
            />
          </FilterLayout>
          <CTable
            pagination={{
              ...pagination,
              total: data?.totalDocuments,
            }}
            onChange={handleChangePagination}
            loading={isLoading}
            dataSource={data?.documentList}
            columns={columns}
            rowKey={"_id"}
          />
        </Flex>
      </Flex>
      {id && <PaymentModal id={id} open={open} setOpen={setOpen} />}
    </>
  );
}

export default PaymentTable;
