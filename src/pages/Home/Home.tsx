import { useEffect } from 'react';
import { map } from 'lodash';
import { useTagsList } from '@src/hooks/tag.hooks.ts';

function Home() {
  const { tags, getTagsList } = useTagsList();

  useEffect(() => {
    (async () => await getTagsList())();
  }, [getTagsList]);

  console.log(tags);

  return (
    <>
      {map(tags, (tag) => (
        <div key={tag.id}>{tag.name}</div>
      ))}
    </>
  );
}

export default Home;
