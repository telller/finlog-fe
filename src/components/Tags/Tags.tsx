import { Flex, Tag } from 'antd';
import { map } from 'lodash';
import type { Tag as TagType } from '@src/types/tag.ts';
import './Tags.css';

interface TagsProps {
  onTagClick: (tagId: string) => void;
  tags: TagType[];
}

const Tags = ({ tags, onTagClick }: TagsProps) => {
  return (
    <Flex gap="8px" wrap className="tags-container">
      {map(tags, ({ id, name, color }) => (
        <Tag key={id} color={color} className="tag" onClick={() => onTagClick(id)}>
          {name}
        </Tag>
      ))}
    </Flex>
  );
};

export default Tags;
