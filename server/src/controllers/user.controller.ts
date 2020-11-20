import { NextFunction, Request, Response, Router } from 'express';
import User from '@models/user.model';
import Controller from '@common/interface';
import UserNotFoundException from '@exceptions/UserNotFoundException';
import {
  registrationRules,
  hashPassword,
  loginRules,
  signJWT,
  verifyJWT,
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
    this.router.get(`${this.path}/token`, verifyJWT, this.token);
    this.router.get(`${this.path}/user`, verifyJWT, this.user);
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

  private login = async (req: Request, res: Response) => {
    res.sendStatus(200);
  };

  private logout = async (req: Request, res: Response) => {
    res.clearCookie('token');
    res.sendStatus(200);
  };

  private token = async (req: Request, res: Response) => {
    res.sendStatus(200);
  };

  private user = async (req: any, res: Response) => {
    const { username } = req;
    res.json({ username });
  };
}
