import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Flex, Typography } from 'antd';
import { map } from 'lodash';
import { useTagsState, useTagsStatState } from '@src/state';
import type { TagStat } from '@src/types';

const ExpensesBarChart = () => {
  const { tagsStat } = useTagsStatState();
  const { tagsMap } = useTagsState();
  return (
    <ResponsiveContainer width="100%" aspect={1} maxHeight={300}>
      <PieChart>
        <Pie
          data={tagsStat as unknown as Record<string, string | number>[]}
          dataKey="amount"
          nameKey="tagId"
        >
          {map(tagsStat, ({ tagId }) => (
            <Cell key={`cell-${tagId}`} fill={tagsMap.get(tagId)?.color} />
          ))}
        </Pie>
        <Legend
          content={({ payload }) => (
            <Flex gap="8px" wrap justify="center">
              {map(payload, ({ color, payload }: { color: string; payload: TagStat }) => (
                <Flex align="center">
                  <div
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: color,
                      marginRight: '5px',
                    }}
                  />
                  <Typography.Text type="secondary">
                    {tagsMap.get(payload.tagId)?.name}
                    <Typography.Text
                      strong
                    >{` ${payload.amount}(${payload.percent}%)`}</Typography.Text>
                  </Typography.Text>
                </Flex>
              ))}
            </Flex>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpensesBarChart;
