import { Flex, Table, Tag, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { formatDateLabel } from '@src/utils/formatDateLabel';
import { TruncatedText } from '@src/components';
import type { Expense } from '@src/types';
import { useTagsState } from '@src/state';
import './ExpensesStatTable.css';

interface ExpensesTableProps {
  expenses: Expense[];
  loading: boolean;
}

const ExpensesStatTable = ({ expenses, loading }: ExpensesTableProps) => {
  const { tagsMap } = useTagsState();
  const columns = [
    {
      title: 'Дата',
      dataIndex: 'spendAt',
      render: (spendAt: string) => (
        <Tooltip title={dayjs(spendAt).format('DD.MM HH:mm')}>{formatDateLabel(spendAt)}</Tooltip>
      ),
    },
    {
      title: 'Категорія',
      dataIndex: 'tagId',
      render: (tagId: string) => {
        const tag = tagsMap.get(tagId);
        return (
          <Tag key={tagId} color={tag?.color} className="tag">
            {tag?.name}
          </Tag>
        );
      },
    },
    {
      title: 'Сумма',
      dataIndex: 'amount',
      render: (amount: string) => `-${amount} UAH`,
    },
    {
      title: 'Опис',
      dataIndex: 'description',
      render: (description: string) => <TruncatedText text={description} />,
    },
  ];
  return (
    <Flex className="expenses-stat-table-container">
      <Table
        dataSource={expenses}
        scroll={{ y: '100%' }}
        pagination={false}
        columns={columns}
        loading={loading}
        size="small"
        rowKey="id"
      />
    </Flex>
  );
};

export default ExpensesStatTable;
