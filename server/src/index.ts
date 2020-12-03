import App from './app';
import StoryController from '@controllers/story.controller';
import UserController from '@controllers/user.controller';
import redis, { RedisClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const app = new App([new StoryController(), new UserController()]);

export const redisClient: RedisClient = redis.createClient(
  process.env.REDIS_URL!
);

redisClient.on('connect', () => {
  console.log(`Redis is connected to ${process.env.REDIS_URL}`);
});

app.start();
