import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Flex, FloatButton } from 'antd';
import { Tags, ExpensesTable, UpsertExpenseModal } from '@src/components';
import { useExpensesState, useTagsState } from '@src/state';
import { deleteExpense } from '@src/services';
import type { Expense } from '@src/types';
import './Home.css';

function Home() {
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);
  const [tagId, setTagId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { expenses, loading: expensesLoading, getExpensesList } = useExpensesState();
  const { tags, loading: tagsLoading, getTagsList } = useTagsState();

  useEffect(() => {
    (async () => await getExpensesList(page))();
  }, [getExpensesList, page]);

  useEffect(() => {
    (async () => await getTagsList())();
  }, [getTagsList]);

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
        <Tags
          onTagClick={(tagId) => handleOpenModal(null, tagId)}
          loading={tagsLoading}
          tags={tags}
        />
      </Flex>
      <Flex vertical className="expenses-container">
        <span className="label">Останні витрати</span>
        <ExpensesTable
          onEdit={(expense) => handleOpenModal(expense)}
          onDelete={(id) => handleDeleteExpense(id)}
          onLoadMore={() => setPage(page + 1)}
          loading={expensesLoading}
          expenses={expenses}
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
