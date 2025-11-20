import { useExpensesList } from '@src/hooks/expenses.hooks';
import { useTagsList } from '@src/hooks/tag.hooks.ts';
import { PlusOutlined } from '@ant-design/icons';
import { Flex, FloatButton } from 'antd';
import { useEffect } from 'react';
import { Tags, ExpensesTable } from '@src/components';
import './Home.css';

function Home() {
  const { expenses, getExpensesList } = useExpensesList();
  const { tags, getTagsList } = useTagsList();

  useEffect(() => {
    (async () => await getExpensesList())();
    (async () => await getTagsList())();
  }, [getExpensesList, getTagsList]);

  console.log(expenses);
  console.log(tags);

  return (
    <Flex gap="middle" vertical className="home-container">
      <Flex vertical className="categories-container">
        <span className="label">Категорії</span>
        <Tags tags={tags} />
      </Flex>
      <Flex vertical className="expenses-container">
        <span className="label">Останні витрати</span>
        <ExpensesTable expenses={expenses} tags={tags} />
      </Flex>
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        className="add-expense-btn"
        onClick={() => {}}
      />
    </Flex>
  );
}

export default Home;
