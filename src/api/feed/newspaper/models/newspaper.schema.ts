import { Schema, Document } from 'mongoose';

export interface NewspaperI extends Document {
  name: string;
}

export const NewspaperSchema: Schema<NewspaperI> = new Schema<NewspaperI>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});
