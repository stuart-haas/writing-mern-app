import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import Controller from '@common/interface';

export default class App {
  private app: express.Application;
  private controllers: Controller[];

  constructor(controllers: Controller[]) {
    this.app = express();
    this.controllers = controllers;

    this.useMiddlewares();
    this.useControllers();
  }

  public start() {
    mongoose
      .connect(process.env.MONGO_DATABASE_URL!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(
          `Database is connected to ${process.env.MONGO_DATABASE_URL}`
        );
        this.app.listen(process.env.PORT, () => {
          console.log(
            `Application is up and running on port ${process.env.PORT}`
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private useMiddlewares() {
    this.app.use(helmet());
    this.app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private useControllers() {
    this.controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }
}
