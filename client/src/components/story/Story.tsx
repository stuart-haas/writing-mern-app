import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { Prompt, Redirect, useParams } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import { getStory, saveStory, deleteStory } from 'services/api';
import { IParams, IStory } from 'common/interfaces';
import { getTimeAgo } from 'utils/functions';
import 'easymde/dist/easymde.min.css';
import './style.scss';

export const defaultProps = {
  title: 'Something creative',
  content: '',
  status: 'Draft',
};

const Story = () => {
  const params = useParams<IParams>();
  const [data, setData] = useState<IStory>(defaultProps);
  const [initialData, setInitialData] = useState(data);
  const [dirty, setDirty] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

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
      const timer = setTimeout(() => {
        setSaved(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [saved]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStory(params.id);
        if (response) {
          setData({ ...response });
          setInitialData({ ...response });
          setLoading(false);
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
      const newStatus = data.status === 'Draft' ? 'Published' : 'Draft';
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
        setMessage(response.status === 'Draft' ? 'Unpublished' : 'Published');
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
  }, [params]);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <Fragment>
      {deleted ? <Redirect to='/stories' /> : null}
      <Prompt when={dirty} message='Are you sure you want to leave?' />
      <div className='story'>
        <div className='story__toolbar flex align-center justify-between'>
          <div className='flex align-center'>
            <div className='btn-group'>
              <button
                className='btn'
                disabled={!dirty}
                onClick={() => handleSave()}
              >
                Save
              </button>
              <button className='btn' onClick={() => handlePublish()}>
                {data.status === 'Draft' ? 'Publish' : 'Unpublish'}
              </button>
            </div>
            <div className='story__meta'>
              {data.updatedAt && (
                <span className='story__meta-data'>{`Last updated ${getTimeAgo(
                  data.updatedAt
                )}`}</span>
              )}
              <span
                className={`story__meta-data ${
                  dirty || saved ? 'is-visible' : 'is-hidden'
                }`}
              >
                {data.updatedAt && <span className='pipe'>|</span>}
                {message}
              </span>
            </div>
          </div>
          <div className='flex align-center'>
            {data._id && (
              <button className='btn' onClick={() => handleDelete()}>
                Delete
              </button>
            )}
          </div>
        </div>

        <input
          className='story__title h1'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setData({ ...data, title: e.currentTarget.value });
          }}
          value={data.title}
        />
        <div className='story__editor'>
          <SimpleMDE
            value={data.content}
            onChange={(content: string | undefined) =>
              setData({ ...data, content })
            }
            options={{
              autofocus: true,
              toolbar: [
                'bold',
                'italic',
                'heading',
                '|',
                'quote',
                'horizontal-rule',
                '|',
                'fullscreen',
              ],
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Story;
