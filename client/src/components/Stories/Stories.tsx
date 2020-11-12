import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStories } from 'services/api';
import styles from './Stories.module.scss';

interface IStory {
  _id: string;
  title: string;
  content: string;
}

const Dashboard = (props: any) => {
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
      {stories &&
        stories.map((story: IStory, index: number) => (
          <Link
            key={index}
            className={styles.item}
            to={`/stories/${story._id}`}
          >
            <div className={styles.itemContent}>
              <h1>{story.title}</h1>
              <p>{story.content}</p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Dashboard;
