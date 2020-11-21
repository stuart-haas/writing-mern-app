import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { check } from 'express-validator';
import User from '@models/user.model';

const secret = 'mysupersecretkey';

export const registrationRules = [
  check('username', 'Your username must have more than 5 characters')
    .exists()
    .isLength({ min: 5 })
    .trim()
    .escape(),
  check('password', 'Your password must be at least 5 characters')
    .exists()
    .isLength({ min: 5 })
    .trim()
    .escape(),
  check('passwordConfirm', 'Passwords do not match')
    .custom((value: string, { req }) => value == req.body.password)
    .trim()
    .escape(),
];

export const loginRules = [
  check('username')
    .exists()
    .trim()
    .escape()
    .custom((value: string) => {
      return User.findOne({ username: value }).then((user: any) => {
        if (!user) {
          return Promise.reject('Username not found');
        }
      });
    }),
  check('password')
    .exists()
    .trim()
    .escape()
    .custom((value: string, { req }) => {
      return User.findOne({ username: req.body.username }).then((user: any) => {
        return bcrypt.compare(value, user.password).then((error: boolean) => {
          if (!error) {
            return Promise.reject('Password does not match');
          }
        });
      });
    }),
];

export const hashPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  bcrypt.hash(req.body.password, 10, (error: any, hash: string) => {
    req.body.password = hash;
    return next();
  });
};

export const verifyJWT = (req: any, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
  } else {
    jwt.verify(token, secret, (error: any, decoded: any) => {
      if (error) {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
      } else {
        const { _id, username } = decoded;
        const user = { _id, username };
        req.user = user;
        return next();
      }
    });
  }
};

export const signJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    const { _id, username } = user;
    const payload = { _id, username };

    const token = jwt.sign(payload, secret, {
      expiresIn: '15min',
    });
    res.cookie('token', token, { httpOnly: true });
    return next();
  }
};
