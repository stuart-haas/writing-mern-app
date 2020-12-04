import { NextFunction, Request, Response, Router } from 'express';
import User from '@models/user.model';
import Story from '@models/story.model';
import Controller from '@common/interface';
import {
  registrationRules,
  hashPassword,
  loginRules,
  generateToken,
  verifyToken,
  updateRules,
} from '@middlewares/user.middleware';
import { validate } from '@common/middleware';
import UserNotFoundException from '@exceptions/UserNotFoundException';
import { redisClient } from '../index';

export default class UserController implements Controller {
  public path = '/user';
  public router = Router();

  constructor() {
    this.useRoutes();
  }

  private useRoutes() {
    /* eslint-disable */
    this.router
      .route(this.path)
      .patch(verifyToken, updateRules, validate, hashPassword, this.update);
      
    this.router.post(`${this.path}/register`, registrationRules, validate, hashPassword, this.register);
    this.router.post(`${this.path}/login`, loginRules, validate, generateToken, this.login);
    this.router.post(`${this.path}/logout`, this.logout);
    
    this.router.get(`${this.path}/current`, verifyToken, this.findCurrent);
    this.router.get(`${this.path}/search`, this.search);
    this.router.delete(`${this.path}/:id`, verifyToken, this.delete);
    /* eslint-disable */
  }

  private register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = new User({
      username,
      password,
    });
    await user.save();
    res.json(user);
  };

  private login = async (req: any, res: Response) => {
    res.json(req.user);
  };

  private logout = async (req: Request, res: Response) => {
    redisClient.del(req.cookies.refreshToken.payload._id);

    res.clearCookie('token');
    res.clearCookie('refreshToken')
    res.sendStatus(200);
  }

  private search = async (req: Request, res: Response) => {
    const user = await User.findOne(req.query);
    res.json(user);
  };

  private findCurrent = async (req: any, res: Response) => {
    const id = req.user._id;
    const user = await User.findById(id);
    if (user) {
      user.password = '';
      res.json(user);
    }
  };

  private update = async (req: any, res: Response, next: NextFunction) => {
    const id = req.user._id;
    const { username, email, name, password } = req.body;
    try {
      const user = await User.findById(id);
      if (user) {
        if (username) {
          user.username = username;
        }
        if (email) {
          user.email = email;
        }
        if (name) {
          user.name = name;
        }
        if (password) {
          user.password = password;
        }
        await user.save();
        res.json(user);
      }
    } catch (error) {
      next(new UserNotFoundException(id));
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (user) {
        await Story.deleteMany({ user: user._id});
        user.deleteOne();
        res.json(user); 
      }
    } catch(error) {
      next(new UserNotFoundException(id));
    }
  };
}
