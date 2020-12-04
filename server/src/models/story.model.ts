import mongoose, { Document, Schema } from 'mongoose';
import slugify from 'slugify';

export interface IStory extends Document {
  title: string;
  content: string;
  status: string;
  user: string;
  slug?: string;
}

const StorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    content: {
      type: String,
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

StorySchema.pre<IStory>('save', function (next: any) {
  if (this.status === 'Published') {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

export default mongoose.model<IStory>('Story', StorySchema, 'stories');
