import { Tags, ExpensesTable, UpsertExpenseModal } from '@src/components';
import { deleteExpense } from '@src/services/expenses.service';
import { useExpensesList } from '@src/hooks/expenses.hooks';
import { useTagsList } from '@src/hooks/tag.hooks.ts';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import type { Expense } from '@src/types';
import { Flex, FloatButton } from 'antd';
import dayjs from 'dayjs';
import './Home.css';

function Home() {
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);
  const [tagId, setTagId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { expenses, getExpensesList } = useExpensesList();
  const { tags, getTagsList } = useTagsList();

  const fromDateTime = dayjs().utc().startOf('month').format();
  const toDateTime = dayjs().utc().endOf('month').format();

  useEffect(() => {
    (async () => await getExpensesList(1, fromDateTime, toDateTime))();
    (async () => await getTagsList())();
  }, [getExpensesList, getTagsList, fromDateTime, toDateTime]);

  console.log(expenses);
  console.log(tags);

  const handleOpenModal = (expenseToEdit: Expense | null = null, tagId: string | null = null) => {
    setExpenseToEdit(expenseToEdit);
    setTagId(tagId);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setExpenseToEdit(null);
    setTagId(null);
  };

  const handleDeleteExpense = async (id: string) => {
    await deleteExpense(id);
    await getExpensesList(1, fromDateTime, toDateTime);
  };

  const handleRefresh = () => getExpensesList(1, fromDateTime, toDateTime)

  return (
    <Flex gap="middle" vertical className="home-container">
      <Flex vertical className="categories-container">
        <span className="label">Категорії</span>
        <Tags tags={tags} onTagClick={(tagId) => handleOpenModal(null, tagId)} />
      </Flex>
      <Flex vertical className="expenses-container">
        <span className="label">Останні витрати</span>
        <ExpensesTable
          onEdit={(expense) => handleOpenModal(expense)}
          onDelete={(id) => handleDeleteExpense(id)}
          expenses={expenses}
          tags={tags}
        />
      </Flex>
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        className="add-expense-btn"
        onClick={() => handleOpenModal()}
      />
      <UpsertExpenseModal
        handleClose={handleCloseModal}
        expenseToEdit={expenseToEdit}
        handleRefresh={handleRefresh}
        isOpen={isOpen}
        tagId={tagId}
        tags={tags}
      />
    </Flex>
  );
}

export default Home;
