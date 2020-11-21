import mongoose, { Document, Schema } from 'mongoose';

export interface IStory extends Document {
  title: string;
  content: string;
  status: string;
  user: any;
}

const StorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default: 'Draft',
      enum: ['Draft', 'Published'],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IStory>('Story', StorySchema, 'stories');
