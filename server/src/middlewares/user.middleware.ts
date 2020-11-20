import * as bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import User from '@models/user.model';

export const registrationRules = [
  check('username', 'Your username must have more than 5 characters')
    .exists()
    .isLength({ min: 5 })
    .trim()
    .escape(),
  check('email', 'Your email is not valid').exists().trim().escape().isEmail(),
  check('password', 'Your password must be at least 5 characters')
    .exists()
    .isLength({ min: 5 })
    .trim()
    .escape(),
  check('passwordConfirm', 'Passwords do not match')
    .custom((value, { req }) => value == req.body.password)
    .trim()
    .escape(),
];

export const loginRules = [
  check('username')
    .exists()
    .trim()
    .escape()
    .custom((value) => {
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
    .custom((value, { req }) => {
      return User.findOne({ username: req.body.username }).then((user: any) => {
        return bcrypt.compare(value, user.password).then((error) => {
          if (!error) {
            return Promise.reject('Password does not match');
          }
        });
      });
    }),
];

export const encryptPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  bcrypt.hash(req.body.password, 10, (err: Error, hash: string) => {
    req.body.password = hash;
    return next();
  });
};
