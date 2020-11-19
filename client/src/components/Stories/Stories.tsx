import { IStory } from 'common/interfaces';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStory } from 'services/api';
import { getTimeAgo } from 'utils/functions';
import { defaultStoryProps } from 'common/interfaces';
import styles from './Stories.module.scss';

const Dashboard = () => {
  const [stories, setStories] = useState([defaultStoryProps]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStory();
      setStories(data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.root}>
      <Link className={styles.button} to='/stories/new'>
        New Story
      </Link>
      {stories.length > 0 ? (
        stories.map((story: IStory, index: number) => (
          <Link
            key={index}
            className={styles.item}
            to={`/stories/edit/${story._id}`}
          >
            <div className={styles.itemContent}>
              <h1>{story.title}</h1>
              <div className={styles.info}>
                <span>{story.status}</span>
                <Fragment>
                  <span className={styles.divider}>|</span>
                  <span></span>
                  <span>{`Started ${getTimeAgo(story.createdAt)}`}</span>
                </Fragment>
                {story.createdAt &&
                  story.updatedAt &&
                  story.updatedAt > story.createdAt && (
                    <Fragment>
                      <span className={styles.divider}>|</span>
                      <span>
                        {' '}
                        {`Last updated ${getTimeAgo(story.updatedAt)}`}
                      </span>
                    </Fragment>
                  )}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className={styles.header}>
          <h1>{`Looks like you don't have any stories`}</h1>
          <Link className={styles.button} to='/stories/new'>
            Start writing
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
