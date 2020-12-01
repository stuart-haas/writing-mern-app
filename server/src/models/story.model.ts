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
      unique: true,
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

StorySchema.pre<IStory>('save', function (next: any) {
  if (this.status === 'Published') {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

StorySchema.pre<IStory>('deleteOne', function (next: any) {
  this.model('User').remove({ stories: '5fc5cd6921d8c9047d9e2211' }, next());
});

export default mongoose.model<IStory>('Story', StorySchema, 'stories');
