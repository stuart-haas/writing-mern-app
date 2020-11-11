import { Request, Response } from 'express';
import Story from '@models/story.model';

export async function findAll(req: Request, res: Response) {
  const stories = await Story.find();
  res.send(stories);
}

export async function findOne(req: Request, res: Response) {
  const story = await Story.findOne({ _id: req.params.id });
  res.send(story);
}

export async function create(req: Request, res: Response) {
  const story = new Story({
    title: req.body.title,
    content: req.body.content,
  });
  await story.save();
  res.send(story);
}
