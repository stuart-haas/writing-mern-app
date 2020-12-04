import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import randtoken from 'rand-token';
import { check } from 'express-validator';
import User from '@models/user.model';
import { redisClient } from '../index';

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
    .exists()
    .trim()
    .escape()
    .custom((value: string, { req }) => value == req.body.password),
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
  check('currentPassword', 'Password required')
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
  const { refreshToken } = req.cookies;

  if (!token && !refreshToken) {
    return res.sendStatus(401);
  }

  try {
    const payload: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    const { _id, username } = payload;
    req.user = { _id, username };
    return next();
  } catch (error) {
    const { _id } = req.cookies.refreshToken.payload;
    redisClient.get(_id, (error: any, value: any) => {
      const redisToken = value ? JSON.parse(value) : null;
      if (redisToken) {
        if (redisToken.expiresIn > new Date().getDate()) {
          const refreshToken = generateRefreshToken(redisToken.payload);

          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
          });
        }

        const token = jwt.sign(
          redisToken.payload,
          process.env.ACCESS_TOKEN_SECRET!,
          {
            algorithm: 'HS256',
            expiresIn: process.env.ACCESS_TOKEN_LIFE,
          }
        );

        const expiration = getExpiration(process.env.ACCESS_TOKEN_LIFE!);
        req.user = redisToken.payload;
        req.user.expiration = expiration;
        res.cookie('token', token, { httpOnly: true, secure: false });
        return next();
      } else {
        return res.sendStatus(401);
      }
    });
  }
};

export const generateToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    const expiration = getExpiration(process.env.ACCESS_TOKEN_LIFE!);
    const { _id, username } = user;
    const payload = { _id, username };

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      algorithm: 'HS256',
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });

    const refreshToken = generateRefreshToken(payload);

    req.user = { _id, username, expiration };
    res.cookie('token', token, { httpOnly: true, secure: false });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false });
    return next();
  }
};

const generateRefreshToken = (payload: any) => {
  const uid = randtoken.uid(256);
  const expiresIn = getExpiration(process.env.REFRESH_TOKEN_LIFE!);
  const refreshToken = { payload, uid, expiresIn };
  redisClient.set(String(payload._id), JSON.stringify(refreshToken));
  return refreshToken;
};

const getExpiration = (time: any) => {
  const date = new Date(Date.now() + parseInt(time));
  return date;
};
