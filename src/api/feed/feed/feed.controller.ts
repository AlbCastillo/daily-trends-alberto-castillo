import { Route, Controller, Get, Path, Post, SuccessResponse, Body } from 'tsoa';
import { inject, injectable } from 'tsyringe';

import { CreateFeedDto } from './dto/create-feed.dto';
import { FeedService } from './feed.service';
import { FeedI } from './models/feed.schema';

@injectable()
@Route('v1/feed')
export class FeedController extends Controller {
  constructor(@inject(FeedService) private feedService: FeedService) {
    super();
  }

  @Get('/get/{id}')
  @SuccessResponse('200', 'OK')
  async getFeed(@Path() id: string): Promise<FeedI> {
    this.setStatus(200);
    return this.feedService.findOne(id);
  }

  @Get('/all')
  @SuccessResponse('200', 'OK')
  async getAllFeeds(): Promise<FeedI[]> {
    this.setStatus(200);
    return this.feedService.findAll();
  }

  @Post()
  @SuccessResponse('201', 'Created')
  async createFeed(@Body() feed: CreateFeedDto): Promise<FeedI> {
    this.setStatus(201);
    return this.feedService.create(feed);
  }

  @Post('/delete/{id}')
  @SuccessResponse('200', 'OK')
  async deleteFeed(@Path() id: string): Promise<FeedI> {
    this.setStatus(200);
    return this.feedService.remove(id);
  }
}
