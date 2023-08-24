import { Schema, Document } from 'mongoose';
export interface ArticleI {
  title: string;
  content: string;
  link: string;
}
export interface FeedI extends Document {
  name: string;
  newspaper: string;
  articles: ArticleI[];
  createdAt: string;
}

export const FeedSchema: Schema<FeedI> = new Schema<FeedI>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      default: () => `Daily news ${new Date().toUTCString()}`,
    },
    newspaper: {
      type: String,
    },
    articles: [
      {
        type: Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: true },
);
