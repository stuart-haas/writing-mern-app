import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from '@routes/index.route';

dotenv.config({ path: '../.env' });

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

mongoose
  .connect(process.env.MONGO_DATABASE_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log(`Database is connected to ${process.env.MONGO_DATABASE_URL}`);
    app.listen(PORT, () => {
      console.log(`Application is up and running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
