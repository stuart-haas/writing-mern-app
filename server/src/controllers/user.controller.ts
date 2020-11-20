import { NextFunction, Request, Response, Router } from 'express';
import User from '@models/user.model';
import Controller from '@interfaces/controller.interface';
import UserNotFoundException from '@exceptions/UserNotFoundException';
import {
  registrationRules,
  encryptPassword,
  loginRules,
} from '@middlewares/user.middleware';
import { validate } from '@middlewares/validator';

export default class UserController implements Controller {
  public path = '/user';
  public router = Router();

  constructor() {
    this.useRoutes();
  }

  private useRoutes() {
    // eslint-disable-next-line prettier/prettier
    this.router.post(`${this.path}/register`, registrationRules, validate, encryptPassword, this.register);
    this.router.post(`${this.path}/login`, loginRules, validate, this.login);
  }

  private register = async (req: Request, res: Response) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.json(user);
  };

  private login = async (req: Request, res: Response) => {
    res.send('User Logged In!');
  };
}
