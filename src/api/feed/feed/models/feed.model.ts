import { model } from 'mongoose';

import { FeedI, FeedSchema } from './feed.schema';

export default model<FeedI>('Feed', FeedSchema);
