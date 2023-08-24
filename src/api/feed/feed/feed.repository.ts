import { autoInjectable, singleton } from 'tsyringe';

import { CreateFeedDto } from './dto/create-feed.dto';
import { FindFeedInputDto } from './dto/find-feed.dto';
import { UpdatedInputDto } from './dto/update-feed.dto';
import FeedModel from './models/feed.model';
import { FeedI } from './models/feed.schema';

@singleton()
@autoInjectable()
export class FeedRepository {
  async create(createFeedInput: CreateFeedDto): Promise<FeedI> {
    return FeedModel.create(createFeedInput);
  }

  async delete(id: string) {
    return FeedModel.findByIdAndDelete(id);
  }

  async update(updateFeedInput: UpdatedInputDto): Promise<FeedI | null> {
    return FeedModel.findOneAndUpdate(
      { _id: updateFeedInput.id },
      updateFeedInput.articles,
    );
  }

  async get(id: string) {
    return FeedModel.findById(id);
  }

  async findAll(search: FindFeedInputDto = {}) {
    return FeedModel.find(search);
  }

  async count(search: FindFeedInputDto = {}) {
    return FeedModel.count(search);
  }
}
