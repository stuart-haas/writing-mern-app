import { IStory } from 'common/interfaces';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStory } from 'redux/story/actions';
import { format } from 'date-fns';

const PublishedStories = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await dispatch(getStory('', 'published'));
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
      <div className='items'>
        {data && data.length > 0 ? (
          data.map((story: IStory, index: number) => (
            <div key={index} className='item'>
              <Link className='link' to={`/stories/${story._id}`}>
                <h1 className='h2'>{story.title}</h1>
              </Link>
              <span className='text small dark-gray'>
                Written by{' '}
                {story.user && (
                  <Link
                    className='link underline'
                    to={`/stories/user/${story.user.username}`}
                  >
                    {story.user.username}
                  </Link>
                )}{' '}
                |{' '}
                {story.createdAt &&
                  format(Date.parse(story.createdAt), 'MMMM dd, yyyy')}
              </span>
            </div>
          ))
        ) : (
          <div className='text center'>
            <h1>{`Looks like there aren't any data yet`}</h1>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default PublishedStories;
