import { NextFunction, Request, Response, Router } from 'express';
import Story from '@models/story.model';
import User from '@models/user.model';
import Controller from '@common/interface';
import StoryNotFoundException from '@exceptions/StoryNotFoundException';
import { verifyToken } from '@middlewares/user.middleware';

export default class StoryController implements Controller {
  public path = '/story';
  public router = Router();

  constructor() {
    this.useRoutes();
  }

  private useRoutes() {
    /* eslint-disable */
    this.router.get(`${this.path}/published`, this.findAll);
    this.router.get(`${this.path}/published/:slug`, this.findOne);

    this.router
      .route(this.path)
      .get(verifyToken, this.findAllByUserId)
      .post(verifyToken, this.create)

    this.router
      .route(`${this.path}/:id`)
      .get(verifyToken, this.findByUserId)
      .patch(verifyToken, this.update)
      .delete(verifyToken, this.delete)
    /* eslint-disable */
  }

  private findAll = async (req: Request, res: Response) => {
    if (req.query.username) {
      const { username }: any = req.query;
      const story = await User.findOne({
        username,
      })
        .select('username')
        .populate({ path: 'stories', match: { status: 'Published' } });
      if (story) {
        return res.json(story);
      }
    }
    const story = await Story.find({ status: 'Published' })
      .sort('-createdAt')
      .populate('user', 'username');
    res.json(story);
  };

  private findOne = async (req: Request, res: Response) => {
    const story = await Story.findOne({ slug: req.params.slug }).populate(
      'user',
      'username'
    );
    res.json(story);
  }

  private findAllByUserId = async (req: any, res: Response) => {
    const story = await User.findById(req.user._id).populate({
      path: 'stories',
      options: { sort: { createdAt: -1 } },
    });
    if (story) {
      res.json(story.stories);
    }
  };

  private findByUserId = async (req: any, res: Response) => {
    const story = await User.findById(req.user._id).populate({
      path: 'stories',
      match: { _id: req.params.id },
    });
    if (story) {
      res.json(story.stories[0]);
    }
  };

  private create = async (req: any, res: Response) => {
    const type = req.query.type;
    const user = req.user._id;
    const data = type === 'draft' ? { title: 'New Story', slug: '', content: '', status: 'Draft', user, } : req.body;
    const story = new Story(data);
    const newStory = await story.save();
    if (newStory) {
      const user = await User.findById(req.user._id);
      if (user) {
        user.stories.push(story);
        user.save();
        res.json(newStory);
      }
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, content, status } = req.body;
    try {
      const story = await Story.findById(id);
      if (story) {
        if (title) {
          story.title = title;
        }
        if (content) {
          story.content = content;
        }
        if (status) {
          story.status = status;
        }
        await story.save();
        res.json(story);
      }
    } catch (error) {
      next(new StoryNotFoundException(id));
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const story = await Story.findById(id);
      if(story) {
        User.findById(story.user)
          .populate('stories')
          .exec((err: any, user: any) => {
              user.stories = user.stories.filter((story: any) => story.id !== id);
              user.save();
              story.deleteOne();
              res.json(story);
          });
      }
    } catch (error) {
      next(new StoryNotFoundException(id));
    }
  };
}
