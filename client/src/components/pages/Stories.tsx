import { IStory } from 'common/interfaces';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStory } from 'redux/story/actions';
import { getTimeAgo } from 'utils/functions';
import { defaultProps } from 'components/pages/Story';

const Stories = () => {
  const dispatch = useDispatch();
  const [stories, setStories] = useState([defaultProps]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await dispatch(getStory());
      const { data } = response;
      setStories(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <Fragment>
      {stories.length ? (
        <Link className='button success' to='/stories/new'>
          New Story
        </Link>
      ) : null}
      <div className='items'>
        {stories.length > 0 ? (
          stories.map((story: IStory, index: number) => (
            <Link
              key={index}
              className='item link'
              to={`/stories/edit/${story._id}`}
            >
              <h1 className='h1'>{story.title}</h1>
              <div className='item-text'>
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

export default Stories;
