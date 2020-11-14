import mongoose, { Document } from 'mongoose';

export interface IStory extends Document {
  title: string;
  content: string;
}

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IStory>('Story', storySchema);
