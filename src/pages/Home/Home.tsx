import { Tags, ExpensesTable, UpsertExpenseModal } from '@src/components';
import { deleteExpense } from '@src/services/expenses.service';
import { useExpensesList } from '@src/hooks/expenses.hooks';
import { useTagsList } from '@src/hooks/tag.hooks.ts';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import type { Expense } from '@src/types';
import { Flex, FloatButton } from 'antd';
import './Home.css';

function Home() {
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);
  const [tagId, setTagId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { expenses, loading, getExpensesList } = useExpensesList();
  const { tags, getTagsList } = useTagsList();

  useEffect(() => {
    (async () => await getExpensesList(page))();
  }, [getExpensesList, page]);

  useEffect(() => {
    (async () => await getTagsList())();
  }, [getTagsList]);

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
    handleRefresh();
  };

  const handleRefresh = () => {
    if (page === 1) getExpensesList(1).then(() => {});
    else setPage(1);
  };

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
          onLoadMore={() => setPage(page + 1)}
          expenses={expenses}
          loading={loading}
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
        handleRefresh={handleRefresh}
        expenseToEdit={expenseToEdit}
        isOpen={isOpen}
        tagId={tagId}
        tags={tags}
      />
    </Flex>
  );
}

export default Home;
