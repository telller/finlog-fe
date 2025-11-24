import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Popconfirm } from 'antd';
import type { Expense } from '@src/types';

interface TableActionsProps {
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
  expense: Expense;
}

const TableActions = ({ expense, onEdit, onDelete }: TableActionsProps) => {
  const items = [
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: (
        <span onClick={() => onEdit(expense)} style={{ userSelect: 'none' }}>
          Редагувати
        </span>
      ),
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: (
        <Popconfirm
          onConfirm={() => onDelete(expense.id)}
          title="Видалити?"
          cancelText="Ні"
          okText="Так"
        >
          Видалити
        </Popconfirm>
      ),
    },
  ];
  return (
    <Dropdown trigger={['click']} menu={{ items }} placement="bottomRight">
      <Button
        type="text"
        icon={<MoreOutlined style={{ fontSize: 18 }} />}
        aria-label="Більше дій"
        style={{ padding: 6 }}
      />
    </Dropdown>
  );
};

export default TableActions;
