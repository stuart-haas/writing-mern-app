import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { check } from 'express-validator';
import User from '@models/user.model';

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
      if (!value) {
        return Promise.reject('Username required');
      } else {
        return User.findOne({ username: value }).then((user: any) => {
          if (!user) {
            return Promise.reject('Username not found');
          }
        });
      }
    }),
  check('password')
    .exists()
    .trim()
    .escape()
    .custom((value: string, { req }) => {
      if (!value) {
        return Promise.reject('Password required');
      } else {
        return User.findOne({ username: req.body.username }).then(
          (user: any) => {
            if (!user) {
              return Promise.reject('Something went wrong');
            } else {
              return bcrypt
                .compare(value, user.password)
                .then((error: boolean) => {
                  if (!error) {
                    return Promise.reject('Wrong password');
                  }
                });
            }
          }
        );
      }
    }),
];

export const updateRules = [
  check('currentPassword')
    .exists()
    .trim()
    .escape()
    .custom((value: string, { req }) => {
      return User.findById(req.user._id).then((user: any) => {
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

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(403).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const payload: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    const { _id, username } = payload;
    req.user = { _id, username };
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

export const generateToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    const { _id, username } = user;
    const payload = { _id, username };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      algorithm: 'HS256',
      expiresIn: process.env.REFRESH_TOKEN_LIFE,
    });

    res.cookie('token', accessToken, { httpOnly: true, secure: false });
    req.user = { _id, username };
    return next();
  }
};
