import { IStory } from 'common/interfaces';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getStory } from 'redux/story/actions';
import { format } from 'date-fns';

const PublishedStories = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams<any>();

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await dispatch(
        getStory(params.username, 'published/user')
      );
      const { data } = response;
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, [dispatch, params]);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <Fragment>
      <h2 className='h2'>Stories written by {data.username}</h2>
      <div className='items'>
        {data && data.stories.length > 0 ? (
          data.stories.map((story: IStory, index: number) => (
            <div key={index} className='item'>
              <Link className='h2 link block' to={`/${story._id}`}>
                {story.title}
              </Link>
              <span className='text small dark-gray'>
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
