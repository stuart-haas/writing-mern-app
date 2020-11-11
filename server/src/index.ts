import App from './app';
import StoryController from '@controllers/story.controller';

const app = new App([new StoryController()]);

app.start();
