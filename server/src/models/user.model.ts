import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  stories: any[];
}

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    stories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Story',
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema, 'users');
