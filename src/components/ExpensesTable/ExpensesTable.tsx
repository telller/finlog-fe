import { Flex, Table, Tag, Tooltip } from 'antd';
import type { UIEvent } from 'react';
import dayjs from 'dayjs';
import { TruncatedText, TableActions } from '@src/components';
import { formatDateLabel } from '@src/utils/formatDateLabel';
import type { Tag as TagType } from '@src/types/tag';
import type { Expense } from '@src/types/expenses';
import './ExpensesTable.css';

interface ExpensesTableProps {
  expenses: { items: Expense[]; total: number };
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
  onLoadMore: () => void;
  loading: boolean;
  tags: TagType[];
}

const ExpensesTable = ({
  onLoadMore,
  onDelete,
  expenses,
  loading,
  onEdit,
  tags,
}: ExpensesTableProps) => {
  const handleLoadMore = async (event: UIEvent<HTMLDivElement>) => {
    if (loading || expenses.items.length >= expenses.total) return;
    const target = event.target as HTMLDivElement;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 20) {
      onLoadMore();
    }
  };
  const tagMap = new Map(tags.map(({ id, ...rest }) => [id, rest]));
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
        const tag = tagMap.get(tagId);
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
    {
      title: '',
      key: 'actions',
      width: 56,
      render: (_: string, record: Expense) => (
        <TableActions expense={record} onEdit={onEdit} onDelete={onDelete} />
      ),
    },
  ];
  console.log({ loading });
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
