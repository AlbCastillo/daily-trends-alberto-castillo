import { Schema, Document } from 'mongoose';

export interface FeedI extends Document {
  name: string;
}

export const FeedSchema: Schema<FeedI> = new Schema<FeedI>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});
