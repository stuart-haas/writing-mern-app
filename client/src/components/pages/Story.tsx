import { IParams, IStory } from 'common/interfaces';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getStory } from 'redux/story/actions';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Story = () => {
  const dispatch = useDispatch();
  const params = useParams<IParams>();
  const [data, setData] = useState<IStory>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await dispatch(getStory(params.id, 'published'));
      const { data } = response;
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, [dispatch, params.id]);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <Fragment>
      {data && (
        <div className='container'>
          <h1 className='h2'>{data.title}</h1>
          <span className='text dark-gray'>
            Written by {data.user && data.user.username} |{' '}
            {data.createdAt &&
              format(Date.parse(data.createdAt), 'MMMM dd, yyyy')}
          </span>
          <section>
            <article>
              <ReactMarkdown source={data.content} />
            </article>
          </section>
        </div>
      )}
    </Fragment>
  );
};

export default Story;
