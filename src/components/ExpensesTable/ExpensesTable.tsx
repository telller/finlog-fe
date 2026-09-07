import { Flex, Table, Tag } from 'antd';
import type { UIEvent } from 'react';
import dayjs from 'dayjs';
import { TableActions } from '@src/components';
import type { Expense } from '@src/types/expenses';
import { useTagsState } from '@src/state';
import './ExpensesTable.css';

interface ExpensesTableProps {
  expenses: { items: Expense[]; total: number };
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
  onLoadMore: () => void;
  loading: boolean;
}

const ExpensesTable = ({ onLoadMore, onDelete, expenses, loading, onEdit }: ExpensesTableProps) => {
  const { tagsMap } = useTagsState();
  const handleLoadMore = async (event: UIEvent<HTMLDivElement>) => {
    if (loading || expenses.items.length >= expenses.total) return;
    const target = event.target as HTMLDivElement;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 20) {
      onLoadMore();
    }
  };
  const columns = [
    {
      title: 'Дата',
      dataIndex: 'spendAt',
      width: 200,
      render: (spendAt: string) => dayjs(spendAt).format('DD.MM.YYYY'),
    },
    {
      title: 'Опис',
      dataIndex: 'description',
    },
    {
      title: 'Категорія',
      dataIndex: 'tagId',
      width: 200,
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
      width: 200,
      render: (amount: string) => `-${amount} UAH`,
    },
    {
      title: '',
      key: 'actions',
      width: 56,
      render: (_: string, record: Expense) => (
        <TableActions expense={record} onEdit={onEdit} onDelete={onDelete} />
      ),
    },
  ];
  return (
    <Flex className="expenses-table-container">
      <Table
        dataSource={expenses.items}
        onScroll={handleLoadMore}
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

export default ExpensesTable;
