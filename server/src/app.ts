import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Controller from '@interfaces/controller.interface';

export default class App {
  private app: express.Application;
  private port: string | undefined;
  private databaseUrl: string | undefined;
  private controllers: Controller[];

  constructor(controllers: Controller[]) {
    this.app = express();
    this.port = process.env.PORT;
    this.databaseUrl = process.env.MONGO_DATABASE_URL;
    this.controllers = controllers;

    this.useEnv();
    this.useMiddlewares();
    this.useControllers();
  }

  public start() {
    mongoose
      .connect(this.databaseUrl!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(`Database is connected to ${this.databaseUrl}`);
        this.app.listen(this.port, () => {
          console.log(`Application is up and running on port ${this.port}`);
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
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private useControllers() {
    this.controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }
}
