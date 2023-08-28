import {
  Route,
  Controller,
  Get,
  Post,
  Delete,
  Path,
  SuccessResponse,
  Body,
  Tags,
  OperationId,
  Put,
} from 'tsoa';
import { inject, injectable } from 'tsyringe';

import { CreateFeedDto } from './dto/create-feed.dto';
import { ListFeedInputDto } from './dto/find-feed.dto';
import { UpdateFeedBodyDto } from './dto/update-feed.dto';
import { FeedService } from './feed.service';

@injectable()
@Route('/feeds')
@Tags('Feed')
export class FeedController extends Controller {
  constructor(@inject(FeedService) private feedService: FeedService) {
    super();
  }

  @Post('/create')
  @SuccessResponse('200', 'OK')
  @OperationId('createFeed')
  async create(@Body() createFeedDto: CreateFeedDto) {
    return this.feedService.create(createFeedDto);
  }

  @Get('/:id')
  @SuccessResponse('200', 'OK')
  @OperationId('findOneFeed')
  async getById(@Path() id: string) {
    return this.feedService.findOne({ id });
  }

  @Post('/all')
  @SuccessResponse('200', 'OK')
  @OperationId('findAllFeeds')
  async getAll(@Body() listFeedInput: ListFeedInputDto) {
    return this.feedService.findAll(listFeedInput);
  }

  @Put('/:id')
  @SuccessResponse('200', 'OK')
  @OperationId('updateFeed')
  async update(@Path() id: string, @Body() body: UpdateFeedBodyDto) {
    return this.feedService.update({ id, ...body });
  }

  @Delete('/:id')
  @SuccessResponse('200', 'OK')
  @OperationId('deleteFeed')
  async deleteById(@Path() id: string) {
    await this.feedService.remove({ id });
    return { message: 'Feed deleted' };
  }
}
