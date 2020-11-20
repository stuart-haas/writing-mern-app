import App from './app';
import StoryController from '@controllers/story.controller';
import UserController from '@controllers/user.controller';

const app = new App([new StoryController(), new UserController()]);

app.start();
