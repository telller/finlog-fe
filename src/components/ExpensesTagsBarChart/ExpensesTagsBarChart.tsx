import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from 'recharts';
import { Card } from 'antd';
import { map } from 'lodash';
import { useTagsState, useTagsStatState } from '@src/state';
import { formatAmount } from '@src/utils/formatAmount.ts';

const ExpensesTagsBarChart = () => {
  const { tagsStat } = useTagsStatState();
  const { tagsMap } = useTagsState();

  const chartData = map(tagsStat, ({ tagId, amount, percent }) => {
    const tag = tagsMap.get(tagId);
    return {
      name: tag?.name ?? 'Без категорії',
      color: tag?.color,
      amount,
      percent,
    };
  });
  return (
    <Card title="Витрати по категоріях">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 8,
            right: 24,
            left: 16,
            bottom: 8,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />

          <XAxis type="number" tickFormatter={(value) => `${value / 1000}k`} />

          <YAxis type="category" dataKey="name" width={120} />

          <Tooltip
            formatter={(value, _, props) => [
              `${formatAmount(Number(value))} (${props.payload.percent}%)`,
              'Витрати',
            ]}
            labelFormatter={(label) => `Категорія: ${label}`}
          />

          <Bar dataKey="amount" name="Витрати" radius={[0, 6, 6, 0]} barSize={24}>
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
            <LabelList
              dataKey="amount"
              position="insideRight"
              fill="#666"
              formatter={(value) => formatAmount(Number(value))}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ExpensesTagsBarChart;
