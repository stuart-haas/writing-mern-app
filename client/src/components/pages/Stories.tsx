import { IStory } from 'common/interfaces';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStory } from 'redux/story/actions';
import { format } from 'date-fns';

const Stories = () => {
  const dispatch = useDispatch();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await dispatch(getStory('', 'published'));
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
      <div className='items'>
        {stories.length > 0 ? (
          stories.map((story: IStory, index: number) => (
            <Link
              key={index}
              className='item link'
              to={`/stories/${story._id}`}
            >
              <h1 className='h2'>{story.title}</h1>
              <span className='text small dark-gray'>
                Written by {story.user && story.user.username} |{' '}
                {story.createdAt &&
                  format(Date.parse(story.createdAt), 'MMMM dd, yyyy')}
              </span>
            </Link>
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

export default Stories;
