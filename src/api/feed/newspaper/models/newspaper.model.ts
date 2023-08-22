import { model } from 'mongoose';

import { NewspaperI, NewspaperSchema } from './newspaper.schema';

export default model<NewspaperI>('Newspaper', NewspaperSchema);
