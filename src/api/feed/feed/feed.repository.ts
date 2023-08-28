import { autoInjectable, singleton } from 'tsyringe';

import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import FeedModel from './models/feed.model';
import { FeedI } from './models/feed.schema';
import { MongoosePaginateParamsI } from '../../../utils/mongoose.utils';

@singleton()
@autoInjectable()
export class FeedRepository {
  async create(createFeedInput: CreateFeedDto): Promise<FeedI> {
    return FeedModel.create(createFeedInput);
  }

  async delete(id: string) {
    return FeedModel.findByIdAndDelete(id);
  }

  async update(updateFeedInput: UpdateFeedDto): Promise<FeedI | null> {
    const { id, ...rest } = updateFeedInput;
    return FeedModel.findByIdAndUpdate(id, rest, {
      new: true,
    });
  }

  async findOne(filter: object): Promise<FeedI | null> {
    return FeedModel.findOne(filter);
  }

  async findAll(
    search: object = {},
    paginateParams: MongoosePaginateParamsI,
  ): Promise<FeedI[]> {
    return FeedModel.find(search)
      .sort(paginateParams.sortOptions)
      .skip(paginateParams.skip)
      .limit(paginateParams.take)
      .exec();
  }

  async count(search: object = {}) {
    return FeedModel.count(search);
  }
}
