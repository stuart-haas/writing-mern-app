import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Controller from '@interfaces/controller.interface';

export default class App {
  private app: express.Application;
  private controllers: Controller[];

  constructor(controllers: Controller[]) {
    this.app = express();
    this.controllers = controllers;

    this.useEnv();
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

  private useEnv() {
    dotenv.config({ path: '../.env' });
  }

  private useMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private useControllers() {
    this.controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }
}
