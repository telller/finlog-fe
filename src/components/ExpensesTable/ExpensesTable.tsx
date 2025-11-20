import { Table, Tag, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { formatDateLabel } from '@src/utils/formatDateLabel';
import type { Tag as TagType } from '@src/types/tag';
import type { Expense } from '@src/types/expenses';
import { TruncatedText } from '@src/components';

interface ExpensesTableProps {
  expenses: { items: Expense[]; total: number };
  tags: TagType[];
}

const ExpensesTable = ({ expenses, tags }: ExpensesTableProps) => {
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
          <Tag key={tagId} color={tag?.color}>
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
    <Table
      dataSource={expenses.items}
      scroll={{ y: 500 }}
      pagination={false}
      columns={columns}
      size="small"
      rowKey="id"
    />
  );
};

export default ExpensesTable;
