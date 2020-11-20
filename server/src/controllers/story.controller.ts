import { NextFunction, Request, Response, Router } from 'express';
import Story from '@models/story.model';
import Controller from '@common/interface';
import StoryNotFoundException from '@exceptions/StoryNotFoundException';

export default class StoryController implements Controller {
  public path = '/story';
  public router = Router();

  constructor() {
    this.useRoutes();
  }

  private useRoutes() {
    this.router.get(this.path, this.findAll);
    this.router.get(`${this.path}/:id`, this.findOne);
    this.router.post(this.path, this.create);
    this.router.patch(`${this.path}/:id`, this.update);
    this.router.delete(`${this.path}/:id`, this.deleteOne);
  }

  private findAll = async (req: Request, res: Response) => {
    const stories = await Story.find();
    res.json(stories);
  };

  private findOne = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const story = await Story.findById(id);
      res.json(story);
    } catch (error) {
      next(new StoryNotFoundException(id));
    }
  };

  private create = async (req: Request, res: Response) => {
    const { title, content, status } = req.body;
    const story = new Story({
      title,
      content,
      status,
    });
    await story.save();
    res.json(story);
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
