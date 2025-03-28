// import React from "react";
// import { Pagination } from "antd";

// interface CPaginationProps {
//   total: number;
//   pageSize: number;
//   current: number;
//   onChange: (pagination: any) => void;
// }

// const CPagination: React.FC<CPaginationProps> = ({
//   total,
//   pageSize,
//   current,
//   onChange,
// }) => {
//   return (
//     <Pagination
//       pageSizeOptions={["10", "20", "50", "100"]}
//       showSizeChanger
//       showQuickJumper
//       className="table-pagination"
//       total={total}
//       pageSize={pageSize}
//       current={current}
//       onChange={onChange}
//       itemRender={(page, type, originalElement) => {
//         if (type === "prev") {
//           return <p className="ant-pagination-item-link"> Previous </p>;
//         }
//         if (type === "next") {
//           return <p className="ant-pagination-item-link"> Next </p>;
//         }
//         if (type === "jump-prev" || type === "jump-next") {
//           return "...";
//         }
//         if (type === "page") {
//           return <p className="ant-pagination-item-link">{page}</p>;
//         }
//         return originalElement;
//       }}
//     />
//   );
// };

// export default CPagination;
