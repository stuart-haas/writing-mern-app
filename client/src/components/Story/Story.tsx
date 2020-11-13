import Editor, { ElementData } from 'components/Editor/Editor';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStory } from 'services/api';
import styles from './Story.module.scss';

interface Params {
  id: string;
}

const Story = () => {
  const params = useParams<Params>();

  const [content, setContent] = useState<ElementData[]>();
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await getStory(params.id);
      setTitle(response.title);
      setContent(JSON.parse(response.content));
    };
    fetchData();
  }, [params]);

  return (
    <div className={styles.root}>
      {content && <Editor id={params.id} title={title} content={content} />}
    </div>
  );
};

export default Story;
