import { autoInjectable, inject } from 'tsyringe';

import { CreateFeedDto } from './dto/create-feed.dto';
import { FeedRepository } from './feed.repository';
import { FeedI } from './models/feed.schema';
import { ApiError } from '../../../middlewares/api.errors';
import { HTTP_ERRORS } from '../../../utils/http.errors';

@autoInjectable()
export class FeedService {
  constructor(@inject(FeedRepository) private feedRepository: FeedRepository) {}

  async create(feed: CreateFeedDto): Promise<FeedI> {
    try {
      return await this.feedRepository.create(feed);
    } catch (error) {
      throw new ApiError(HTTP_ERRORS.INTERNAL_SERVER_ERROR, 'Error creating feed!');
    }
  }

  async remove(id: string): Promise<FeedI> {
    try {
      const feed = await this.feedRepository.delete(id);
      if (feed) return feed;
      throw new ApiError(HTTP_ERRORS.NOT_FOUND, 'Feed not found!');
    } catch (error) {
      throw new ApiError(HTTP_ERRORS.INTERNAL_SERVER_ERROR, 'Error deleting feed!');
    }
  }

  async findOne(id: string): Promise<FeedI> {
    try {
      const feed = await this.feedRepository.get(id);
      if (feed) return feed;
      throw new ApiError(HTTP_ERRORS.NOT_FOUND, 'Feed not found!');
    } catch (error) {
      throw new ApiError(HTTP_ERRORS.INTERNAL_SERVER_ERROR, 'Error finding feed!');
    }
  }

  async findAll(): Promise<FeedI[]> {
    try {
      return this.feedRepository.findAll();
    } catch (error) {
      throw new ApiError(HTTP_ERRORS.INTERNAL_SERVER_ERROR, 'Error finding feeds!');
    }
  }
}
