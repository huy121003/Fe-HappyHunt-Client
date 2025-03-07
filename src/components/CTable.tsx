import { Empty, Table, Typography } from 'antd';
import type { TableProps } from 'antd/es/table';
const { Text } = Typography;
interface CTableProps<T> extends TableProps<T> {
  notFound?: boolean;
}

function CTable<T>(props: CTableProps<T>) {
  const {
    columns,
    dataSource = [],
    loading,
    pagination,
    rowKey,

    notFound,
    onChange,
  } = props;

  return (
    <Table<T>
      onChange={onChange}
      locale={{
        emptyText: (
          <Empty
            description={
              <Text type="secondary">
                {notFound ? 'No data found' : 'No data'}
              </Text>
            }
          />
        ),
      }}
      className="table-container"
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={
        pagination === false
          ? false
          : {
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50', '100'],
              ...pagination,
            }
      }
      showSorterTooltip={false}
      rowKey={rowKey}
      scroll={{ x: 800, y: 400 }}
    />
  );
}

export default CTable;
