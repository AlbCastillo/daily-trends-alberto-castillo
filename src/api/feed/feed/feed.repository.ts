import { autoInjectable, singleton } from 'tsyringe';

import { CreateFeedDto } from './dto/create-feed.dto';
import FeedModel from './models/feed.model';
import { FeedI } from './models/feed.schema';

@singleton()
@autoInjectable()
export class FeedRepository {
  async create(feedInput: CreateFeedDto): Promise<FeedI> {
    return FeedModel.create(feedInput);
  }

  async delete(id: string) {
    return FeedModel.findByIdAndDelete(id);
  }

  async get(id: string) {
    return FeedModel.findById(id);
  }

  async findAll() {
    return FeedModel.find();
  }
}
