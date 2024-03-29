import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Prompt, useParams } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import { getStory, saveStory, deleteStory } from 'redux/story/actions';
import { IParams, IStory } from 'common/interfaces';
import { getTimeAgo } from 'utils/functions';
import 'easymde/dist/easymde.min.css';

const Story = () => {
  const dispatch = useDispatch();
  const params = useParams<IParams>();
  const [data, setData] = useState<IStory>({});
  const [initialData, setInitialData] = useState(data);
  const [dirty, setDirty] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

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
      const response: any = await dispatch(getStory(params.id!));
      const { data } = response;
      setData({ ...data });
      setInitialData({ ...data });
      setLoading(false);
    };
    if (params.id) {
      setLoading(true);
      fetchData();
    }
  }, [dispatch, params]);

  const handleSave = useCallback(async () => {
    const { title, content } = data;
    const response: any = await dispatch(
      saveStory(
        {
          title,
          content,
        },
        params.id!
      )
    );
    handleResponse(response);
  }, [dispatch, params, data]);

  const handlePublish = useCallback(async () => {
    if (!window.confirm('Are you sure?')) return;
    const newStatus = data.status === 'Draft' ? 'Published' : 'Draft';
    const response: any = await dispatch(
      saveStory(
        {
          status: newStatus,
        },
        params.id!,
        data.status === 'Draft' ? 'Story Published!' : 'Story Unpublished'
      )
    );
    handleResponse(response);
  }, [dispatch, params, data]);

  const handleDelete = useCallback(async () => {
    if (!window.confirm('Are you sure?')) return;
    await dispatch(deleteStory(params.id!));
    handleResponse();
  }, [dispatch, params]);

  function handleResponse(response: any = null) {
    if (response) {
      const { data } = response;
      setData({ ...data });
      setInitialData({ ...data });
      setDirty(false);
      setSaved(true);
      setMessage('');
    }
  }

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <Fragment>
      <Prompt when={dirty} message='Are you sure you want to leave?' />
      <div className='story'>
        <div className='flex align-center justify-between'>
          <div className='flex align-center'>
            <div className='button-group'>
              <button
                className='button success'
                disabled={!dirty || !data.title || !data.content}
                onClick={() => handleSave()}
              >
                Save
              </button>
              <button
                className='button success'
                disabled={!data.title || !data.content}
                onClick={() => handlePublish()}
              >
                {data.status === 'Draft' ? 'Publish' : 'Unpublish'}
              </button>
            </div>
            <div className='story-info'>
              {data.updatedAt && (
                <span className='text dark-gray'>{`Last updated ${getTimeAgo(
                  data.updatedAt
                )}`}</span>
              )}
              <span
                className={`text dark-gray ${
                  dirty || saved ? 'is-visible' : 'is-hidden'
                }`}
              >
                {data.updatedAt && message && <span className='pipe'>|</span>}
                {message}
              </span>
            </div>
          </div>
          <div className='flex align-center'>
            {data._id && (
              <button className='button danger' onClick={() => handleDelete()}>
                Delete
              </button>
            )}
          </div>
        </div>

        <div className='story-title'>
          <input
            className='h2'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setData({ ...data, title: e.currentTarget.value });
            }}
            value={data.title}
          />
        </div>
        <div className='story__editor'>
          <SimpleMDE
            value={data.content}
            onChange={(content: string | undefined) =>
              setData({ ...data, content })
            }
            options={{
              autofocus: true,
              status: false,
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
