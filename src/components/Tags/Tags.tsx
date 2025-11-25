import { Flex, Spin, Tag } from 'antd';
import { map } from 'lodash';
import type { Tag as TagType } from '@src/types/tag.ts';
import './Tags.css';

interface TagsProps {
  onTagClick: (tagId: string) => void;
  loading: boolean;
  tags: TagType[];
}

const Tags = ({ onTagClick, loading, tags }: TagsProps) => {
  return (
    <Flex gap="8px" wrap className="tags-container">
      <Flex justify="center" align="center" className="spin-container">
        <Spin spinning={loading} size="small" />
      </Flex>
      {map(tags, ({ id, name, color }) => (
        <Tag key={id} color={color} className="tag" onClick={() => onTagClick(id)}>
          {name}
        </Tag>
      ))}
    </Flex>
  );
};

export default Tags;
