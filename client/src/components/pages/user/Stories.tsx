import { IStory } from 'common/interfaces';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStory, createStory } from 'redux/story/actions';
import { getTimeAgo } from 'utils/functions';

const Stories = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await dispatch(getStory());
      const { data } = response;
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <Fragment>
      {data && data.length ? (
        <button
          className='button success'
          onClick={() => dispatch(createStory)}
        >
          New Story
        </button>
      ) : null}
      <div className='items'>
        {data && data.length > 0 ? (
          data.map((story: IStory, index: number) => (
            <div key={index} className='item'>
              <Link
                className='h2 tall link'
                to={`/me/stories/edit/${story._id}`}
              >
                {story.title}
              </Link>
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
            </div>
          ))
        ) : (
          <div className='text center'>
            <h2 className='h2'>{`Looks like you don't have any stories`}</h2>
            <button
              className='button success'
              onClick={() => dispatch(createStory)}
            >
              Start writing
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Stories;
