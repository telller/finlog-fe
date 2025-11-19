import {useEffect } from 'react'
import './Home.css'
import {useTagsList} from "../../hooks/tag.hooks.ts";
import { map } from 'lodash';

function Home() {
    const { tags, getTagsList } = useTagsList()

    useEffect(() => {
        (async () => await getTagsList())();
    }, [getTagsList])

    console.log(tags);

  return (
    <>
        {map(tags, (tag) => (
            <div key={tag.id}>{tag.name}</div>
        ))}
    </>
  )
}

export default Home
