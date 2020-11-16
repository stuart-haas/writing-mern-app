import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStories } from 'services/api';
import styles from './Stories.module.scss';

interface IStory {
  _id: string;
  title: string;
  content: string;
}

const Dashboard = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStories();
      setStories(data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.root}>
      {stories.length > 0 ? (
        stories.map((story: IStory, index: number) => (
          <Link
            key={index}
            className={styles.item}
            to={`/stories/edit/${story._id}`}
          >
            <div className={styles.itemContent}>
              <h1>{story.title}</h1>
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
