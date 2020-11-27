import { Request, Response, Router } from 'express';
import User from '@models/user.model';
import Controller from '@common/interface';
import {
  registrationRules,
  hashPassword,
  loginRules,
  signJWT,
} from '@middlewares/user.middleware';
import { validate } from '@common/middleware';

export default class UserController implements Controller {
  public path = '/auth';
  public router = Router();

  constructor() {
    this.useRoutes();
  }

  private useRoutes() {
    // eslint-disable-next-line prettier/prettier
    this.router.post(`${this.path}/register`, registrationRules, validate, hashPassword, this.register);
    // eslint-disable-next-line prettier/prettier
    this.router.post(`${this.path}/login`, loginRules, validate, signJWT, this.login);
    this.router.post(`${this.path}/logout`, this.logout);
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
    res.clearCookie('token').sendStatus(200);
  };
}
