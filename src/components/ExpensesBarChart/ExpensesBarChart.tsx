import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Tooltip } from 'antd';
import { useDaysStatState } from '@src/state';

const ExpensesBarChart = () => {
  const { daysStat } = useDaysStatState();
  return (
    <ResponsiveContainer width="100%" aspect={1} maxHeight={300}>
      <BarChart data={daysStat}>
        <XAxis dataKey="date" />
        <YAxis width="auto" />
        <Tooltip />
        <Bar dataKey="amount" fill="teal" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpensesBarChart;
