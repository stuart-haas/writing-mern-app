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
    this.router.get(`${this.path}/published`, this.findAll);
    // eslint-disable-next-line prettier/prettier
    this.router.get(`${this.path}/published/user/:username`, this.findPublishedByUsername);
    this.router.get(`${this.path}/published/:id`, this.findPublishedById);

    // Private
    this.router.get(`${this.path}/user`, verifyJWT, this.findAllByUserId);
    this.router.get(`${this.path}/user/:id`, verifyJWT, this.findByUserId);
    this.router.post(`${this.path}/user/new`, verifyJWT, this.new);
    this.router.post(`${this.path}/user`, verifyJWT, this.create);
    this.router.patch(`${this.path}/user/:id`, verifyJWT, this.update);
    this.router.delete(`${this.path}/user/:id`, verifyJWT, this.delete);
  }

  private findAll = async (req: Request, res: Response) => {
    const story = await Story.find({ status: 'Published' })
      .sort('-createdAt')
      .populate('user', 'username');
    res.json(story);
  };

  private findPublishedById = async (req: any, res: Response) => {
    const story = await Story.findOne({ _id: req.params.id }).populate(
      'user',
      'username'
    );
    res.json(story);
  };

  private findPublishedByUsername = async (req: Request, res: Response) => {
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

  private new = async (req: any, res: Response) => {
    const user = req.user._id;
    const story = new Story({
      title: 'New Story',
      content: '',
      status: 'Draft',
      user,
    });
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

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const story = await Story.findByIdAndDelete(id);
      res.json(story);
    } catch (error) {
      next(new StoryNotFoundException(id));
    }
  };
}
