import { IStory } from 'common/interfaces';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getStory } from 'redux/story/actions';
import { getTimeAgo } from 'utils/functions';
import api from 'services/api';

const UserStories = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await dispatch(getStory());
      const { data } = response;
      setStories(data);
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  async function handleNewStory() {
    const response = await api.post('/story/user/new');
    if (response) {
      const { data } = response;
      history.push(`/me/story/edit/${data._id}`);
    }
  }

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <Fragment>
      {stories.length ? (
        <button className='button success' onClick={() => handleNewStory()}>
          New Story
        </button>
      ) : null}
      <div className='items'>
        {stories.length > 0 ? (
          stories.map((story: IStory, index: number) => (
            <Link
              key={index}
              className='item link'
              to={`/me/story/edit/${story._id}`}
            >
              <h1 className='h2'>{story.title}</h1>
              <div className='text small dark-gray'>
                <span>{story.status}</span>
                <Fragment>
                  <span className='pipe'>|</span>
                  <span></span>
                  <span>{`Started ${getTimeAgo(story.createdAt)}`}</span>
                </Fragment>
                {story.createdAt &&
                  story.updatedAt &&
                  story.updatedAt > story.createdAt && (
                    <Fragment>
                      <span className='pipe'>|</span>
                      <span>
                        {' '}
                        {`Last updated ${getTimeAgo(story.updatedAt)}`}
                      </span>
                    </Fragment>
                  )}
              </div>
            </Link>
          ))
        ) : (
          <div className='text center'>
            <h1>{`Looks like you don't have any stories`}</h1>
            <Link className='button button-light button-sm' to='/stories/new'>
              Start writing
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UserStories;
