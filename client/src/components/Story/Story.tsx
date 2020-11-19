import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { getStory, saveStory, deleteStory } from 'services/api';
import { IParams, IStory } from 'common/interfaces';
import { getTimeAgo } from 'utils/functions';
import styles from './Story.module.scss';

export const defaultProps = {
  title: 'Something creative',
  content: '',
  status: 'Draft',
};

const Story = () => {
  const params = useParams<IParams>();

  let timer: NodeJS.Timeout;
  const [data, setData] = useState<IStory>(defaultProps);
  const [initialData, setInitialData] = useState(data);
  const [dirty, setDirty] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
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
      timer = setTimeout(() => {
        setSaved(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [saved]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStory(params.id);
        if (response) {
          setData({ ...response });
          setInitialData({ ...response });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (params.id) {
      fetchData();
    }
  }, [params]);

  const handleSave = useCallback(async () => {
    try {
      clearTimeout(timer);
      const { title, content } = data;
      const response: IStory = await saveStory(
        {
          title,
          content,
        },
        params.id
      );
      if (response) {
        setData({ ...response });
        setInitialData({ ...response });
        setDirty(false);
        setSaved(true);
        setMessage('Saved!');
      }
    } catch (error) {
      console.log(error);
    }
  }, [params, data]);

  const handlePublish = useCallback(async () => {
    if (!window.confirm('Are you sure?')) return;
    try {
      clearTimeout(timer);
      const newStatus = data.status == 'Draft' ? 'Published' : 'Draft';
      const response: IStory = await saveStory(
        {
          status: newStatus,
        },
        params.id
      );
      if (response) {
        setData({ ...response });
        setInitialData({ ...response });
        setDirty(false);
        setSaved(true);
        setMessage(response.status == 'Draft' ? 'Unpublished' : 'Published');
      }
    } catch (error) {
      console.log(error);
    }
  }, [params, data]);

  const handleDelete = useCallback(async () => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const response: IStory = await deleteStory(params.id);
      if (response) {
        setDeleted(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, [params, data]);

  return (
    <Fragment>
      {deleted ? <Redirect to='/stories' /> : null}
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.headerInner}>
            <button
              className='btn btn-light btn-sm'
              disabled={!dirty}
              onClick={() => handleSave()}
            >
              Save
            </button>
            <button
              className='btn btn-success btn-sm'
              onClick={() => handlePublish()}
            >
              {data.status == 'Draft' ? 'Publish' : 'Unpublish'}
            </button>
            <div className={styles.info}>
              {data.updatedAt && (
                <span>{`Last updated ${getTimeAgo(data.updatedAt)}`}</span>
              )}
              <span
                className={`${styles.message} ${
                  dirty || saved ? 'is-visible' : 'is-hidden'
                }`}
              >
                {data.updatedAt && <span className={styles.divider}>|</span>}
                {message}
              </span>
            </div>
          </div>
          <div className={styles.headerInner}>
            {data._id && (
              <button
                className='btn btn-danger btn-sm'
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            )}
          </div>
        </div>

        <input
          className={styles.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setData({ ...data, title: e.currentTarget.value });
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
    </Fragment>
  );
};

export default Story;
