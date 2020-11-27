import { NextFunction, Request, Response, Router } from 'express';
import Story from '@models/story.model';
import User from '@models/user.model';
import Controller from '@common/interface';
import StoryNotFoundException from '@exceptions/StoryNotFoundException';
import { verifyJWT } from '@middlewares/user.middleware';

export default class StoryController implements Controller {
  public path = '/story';
  public router = Router();

  constructor() {
    this.useRoutes();
  }

  private useRoutes() {
    // Public
    this.router.get(`${this.path}/public`, this.findAll);
    this.router.get(`${this.path}/public/:username`, this.findAllByUserName);

    // Private
    this.router.get(`${this.path}`, verifyJWT, this.findAllByUserId);
    this.router.get(`${this.path}/:id`, verifyJWT, this.findOneByUserId);
    this.router.post(`${this.path}`, verifyJWT, this.create);
    this.router.patch(`${this.path}/:id`, verifyJWT, this.update);
    this.router.delete(`${this.path}/:id`, verifyJWT, this.deleteOne);
  }

  private findAll = async (req: Request, res: Response) => {
    const story = await Story.find({ status: 'Published' }).populate(
      'user',
      'username'
    );
    res.json(story);
  };

  private findAllByUserName = async (req: Request, res: Response) => {
    const story = await User.findOne({
      username: req.params.username,
    })
      .select('username')
      .populate({ path: 'stories', match: { status: 'Published' } });
    if (story) {
      res.json(story);
    }
  };

  private findAllByUserId = async (req: any, res: Response) => {
    const story = await User.findById(req.user._id).populate('stories');
    if (story) {
      res.json(story.stories);
    }
  };

  private findOneByUserId = async (req: any, res: Response) => {
    const story = await User.findById(req.user._id).populate({
      path: 'stories',
      match: { _id: req.params.id },
    });
    if (story) {
      res.json(story.stories[0]);
    }
  };

  private create = async (req: any, res: Response) => {
    const user = req.user._id;
    const { title, content, status } = req.body;
    const story = new Story({
      title,
      content,
      status,
      user,
    });
    const newStory = await story.save();
    if (newStory) {
      const user = await User.findById(req.user._id);
      if (user) {
        user.stories.push(story);
        user.save();
        res.json(user);
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

  private deleteOne = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    try {
      const story = await Story.findByIdAndDelete(id);
      res.json(story);
    } catch (error) {
      next(new StoryNotFoundException(id));
    }
  };
}
