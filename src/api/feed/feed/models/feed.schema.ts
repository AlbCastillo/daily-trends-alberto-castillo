import { Schema, Document } from 'mongoose';

import { getFeedDefaultName } from '../../../../utils/date.utils';
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
      default: getFeedDefaultName(),
    },
    newspaper: {
      type: String,
      required: true,
    },
    articles: [
      {
        type: Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: true },
);
