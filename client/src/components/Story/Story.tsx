import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStory } from 'services/api';
import styles from './Story.module.scss';

interface Params {
  id: string;
}

interface IStory {
  _id: string;
  title: string;
  content: string;
}

const Story = () => {
  const params = useParams<Params>();

  const [story, setStory] = useState<IStory>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStory(params.id);
      setStory(data);
    };
    fetchData();
  }, [params]);

  return (
    <div className={styles.root}>
      {story && (
        <div className={styles.content}>
          <h1>{story.title}</h1>
          <p>{story.content}</p>
        </div>
      )}
    </div>
  );
};

export default Story;
