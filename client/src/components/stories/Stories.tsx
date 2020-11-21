import { IStory } from 'common/interfaces';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStory } from 'services/api';
import { getTimeAgo } from 'utils/functions';
import { defaultProps } from 'components/story/Story';
import './style.scss';

const Dashboard = () => {
  const [stories, setStories] = useState([defaultProps]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStory();
      setStories(data);
    };
    fetchData();
  }, []);

  return (
    <div className='stories'>
      {stories.length ? (
        <Link className='btn' to='/stories/new'>
          New Story
        </Link>
      ) : null}
      {stories.length > 0 ? (
        stories.map((story: IStory, index: number) => (
          <Link
            key={index}
            className='stories__story'
            to={`/stories/edit/${story._id}`}
          >
            <h1 className='h1'>{story.title}</h1>
            <div className='stories__story-meta'>
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
        <div className='text-center'>
          <h1>{`Looks like you don't have any stories`}</h1>
          <Link className='btn btn-light btn-sm' to='/stories/new'>
            Start writing
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
