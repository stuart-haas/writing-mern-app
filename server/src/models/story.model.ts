import mongoose, { Document } from 'mongoose';

export interface IStory extends Document {
  title: string;
  content: string;
  status: string;
}

const storySchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

export default mongoose.model<IStory>('Story', storySchema);
