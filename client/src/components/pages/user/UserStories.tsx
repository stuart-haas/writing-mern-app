import { IStory } from 'common/interfaces';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStory, newStory } from 'redux/story/actions';
import { getTimeAgo } from 'utils/functions';

const UserStories = () => {
  const dispatch = useDispatch();
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

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <Fragment>
      {stories && stories.length ? (
        <button className='button success' onClick={() => dispatch(newStory)}>
          New Story
        </button>
      ) : null}
      <div className='items'>
        {stories && stories.length > 0 ? (
          stories.map((story: IStory, index: number) => (
            <Link
              key={index}
              className='item link'
              to={`/me/stories/edit/${story._id}`}
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
            <h2 className='h2'>{`Looks like you don't have any stories`}</h2>
            <button
              className='button success'
              onClick={() => dispatch(newStory)}
            >
              Start writing
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UserStories;
