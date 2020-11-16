import React, { useEffect, useState, useCallback } from 'react';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useParams } from 'react-router-dom';
import { getStory, saveStory, updateStory } from 'services/api';
import { usePrevious } from 'utils/hooks';
import styles from './Story.module.scss';

interface Params {
  id: string;
}

interface StoryData {
  id?: string;
  title?: string;
  content?: string;
}

const Story = () => {
  const params = useParams<Params>();

  const [data, setData] = useState<StoryData>({});
  const [initialData, setInitialData] = useState({});
  const [dirty, setDirty] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    setDirty(JSON.stringify(initialData) !== JSON.stringify(data));
  }, [initialData, data]);

  useEffect(() => {
    if (dirty) {
      setMessage('You have unsaved changes');
      setSaved(false);
    }
  }, [dirty]);

  useEffect(() => {
    if (saved) {
      setMessage('Saved!');
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }
  }, [saved]);

  const handleSave = useCallback(async () => {
    try {
      const { title, content } = data;
      const response: any = await updateStory(params.id, {
        title,
        content,
      });
      if (response) {
        const { title, content } = response;
        setData({ ...data, title, content });
        setInitialData({ ...initialData, title, content });
        setDirty(false);
        setSaved(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, [params, data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStory(params.id);
        if (response) {
          const { title, content } = response;
          setData({ ...data, title, content });
          setInitialData({ ...initialData, title, content });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (params.id) {
      fetchData();
    }
  }, [params]);

  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <button className={styles.button} onClick={() => handleSave()}>
          Save
        </button>
        <span
          className={`${styles.message} ${dirty ? 'is-visible' : 'is-hidden'}`}
        >
          {message}
        </span>
      </div>
      <input
        className={styles.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setData({ ...data, title: e.target.value });
        }}
        value={data.title}
      />
      <div className={styles.editor}>
        <MDEditor
          value={data.content}
          onChange={(content: string | undefined) =>
            setData({ ...data, content })
          }
          preview={'edit'}
          commands={[
            commands.title,
            commands.bold,
            commands.italic,
            commands.hr,
            commands.divider,
            commands.fullscreen,
          ]}
        />
        <MDEditor.Markdown source={data.content} />
      </div>
    </div>
  );
};

export default Story;
