import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Prompt, Redirect, useParams } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import { getStory, saveStory, deleteStory } from 'redux/story/actions';
import { IParams, IStory } from 'common/interfaces';
import { getTimeAgo } from 'utils/functions';
import 'easymde/dist/easymde.min.css';

const UserStory = () => {
  const dispatch = useDispatch();
  const params = useParams<IParams>();
  const [data, setData] = useState<IStory>({});
  const [initialData, setInitialData] = useState(data);
  const [dirty, setDirty] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
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
      const response: any = await dispatch(getStory(params.id));
      const { data } = response;
      setData({ ...data });
      setInitialData({ ...data });
      setLoading(false);
    };
    if (params.id) {
      setLoading(true);
      fetchData();
    }
  }, [params]);

  const handleSave = useCallback(async () => {
    const { title, content } = data;
    const response: any = await dispatch(
      saveStory(
        {
          title,
          content,
        },
        params.id
      )
    );
    handleResponse(response);
  }, [params, data]);

  const handlePublish = useCallback(async () => {
    if (!window.confirm('Are you sure?')) return;
    const newStatus = data.status === 'Draft' ? 'Published' : 'Draft';
    const response: any = await dispatch(
      saveStory(
        {
          status: newStatus,
        },
        params.id,
        data.status === 'Draft' ? 'Story Published!' : 'Story Unpublished'
      )
    );
    handleResponse(response);
  }, [params, data]);

  const handleDelete = useCallback(async () => {
    if (!window.confirm('Are you sure?')) return;
    await dispatch(deleteStory(params.id));
    handleResponse();
  }, [params]);

  function handleResponse(response: any = null) {
    if (response) {
      const { data } = response;
      setData({ ...data });
      setInitialData({ ...data });
      setDirty(false);
      setSaved(true);
      setMessage('');
    } else {
      setDeleted(true);
    }
  }

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <Fragment>
      {deleted ? <Redirect to='/me/stories' /> : null}
      <Prompt when={dirty} message='Are you sure you want to leave?' />
      <div className='story'>
        <div className='story__toolbar flex align-center justify-between'>
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
            <div className='story__info'>
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

        <div className='story__title'>
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

export default UserStory;
