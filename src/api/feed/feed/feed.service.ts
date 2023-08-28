import { autoInjectable, inject } from 'tsyringe';

import { CreateFeedDto } from './dto/create-feed.dto';
import { FindFeedInputDto, ListFeedInputDto } from './dto/find-feed.dto';
import { RemoveFeedDto } from './dto/remove-feed.dto';
import { FeedResponseDto, MessageResponseDto } from './dto/responses.feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { FeedRepository } from './feed.repository';
import { ApiError } from '../../../middlewares/api.errors';
import { formatFeedResponse } from '../../../utils/feed.utils';
import { HTTP_ERRORS } from '../../../utils/http.errors.utils';
import {
  MongoosePaginationResponse,
  mongoosePaginateParams,
  paginationResponse,
} from '../../../utils/mongoose.utils';

@autoInjectable()
export class FeedService {
  constructor(@inject(FeedRepository) private feedRepository: FeedRepository) {}
  /**
   * Creates a new feed.
   *
   * @param createFeedInput - The input data for creating the feed.
   * @returns The response containing the created feed.
   * @throws {ApiError} If there is an error creating the feed.
   */
  async create(createFeedInput: CreateFeedDto): Promise<FeedResponseDto> {
    try {
      // Create the feed in the repository
      const createdFeed = await this.feedRepository.create(createFeedInput);

      // Format the feed response
      const feed = formatFeedResponse(createdFeed);

      // Return the feed
      return feed;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // Throw an api error if there is an error creating the feed
      throw new ApiError(HTTP_ERRORS.INTERNAL_SERVER_ERROR, 'Error creating feed!');
    }
  }

  async update(updateFeedInput: UpdateFeedDto): Promise<FeedResponseDto> {
    try {
      const feed = await this.feedRepository.update(updateFeedInput);
      // eslint-disable-next-line no-console
      console.log(updateFeedInput, feed);
      if (feed) return formatFeedResponse(feed);
      throw new ApiError(HTTP_ERRORS.NOT_FOUND, 'Feed not found!');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // Throw an api error if there is an error creating the feed
      throw new ApiError(HTTP_ERRORS.INTERNAL_SERVER_ERROR, 'Error updating feed!');
    }
  }

  /**
   * Remove a feed from the database.
   * @param removeFeedDto - The DTO containing the ID of the feed to be removed.
   * @returns A message response DTO indicating the status of the deletion.
   * @throws ApiError if the feed is not found or if there is an error deleting the feed.
   */
  async remove(removeFeedDto: RemoveFeedDto): Promise<MessageResponseDto> {
    try {
      // Delete the feed from the database using the provided ID
      const feed = await this.feedRepository.delete(removeFeedDto.id);

      // If the feed was successfully deleted, return a success message
      if (feed) {
        return { message: 'Feed deleted successfully' };
      }

      // If the feed was not found, throw an error
      throw new ApiError(HTTP_ERRORS.NOT_FOUND, 'Feed not found!');
    } catch (error) {
      // If there was an error deleting the feed, throw an error
      throw new ApiError(HTTP_ERRORS.INTERNAL_SERVER_ERROR, 'Error deleting feed!');
    }
  }

  /**
   * Finds a feed based on the provided input.
   * @param findFeedInput - The input for finding the feed.
   * @returns The response for the found feed.
   * @throws {ApiError} - If the feed is not found or there is an error finding the feed.
   */
  async findOne(findFeedInput: FindFeedInputDto): Promise<FeedResponseDto> {
    try {
      // Generate the search criteria based on the input
      const search = this.whereFieldGenerator(findFeedInput);
      // Find the feed in the repository
      const feed = await this.feedRepository.findOne(search);

      // If feed is found, format the response and return it
      if (feed) return formatFeedResponse(feed);

      // If feed is not found, throw an error
      throw new ApiError(HTTP_ERRORS.NOT_FOUND, 'Feed not found!');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // If there is an error, throw an internal server error
      throw new ApiError(HTTP_ERRORS.INTERNAL_SERVER_ERROR, 'Error finding feed!');
    }
  }

  /**
   * Retrieves a paginated list of feeds based on the provided search criteria.
   *
   * @param listFeedInput - The input parameters for the list feed operation.
   * @returns A paginated response containing the list of feeds.
   * @throws {ApiError} If there is an error finding feeds.
   */
  async findAll(listFeedInput: ListFeedInputDto): Promise<MongoosePaginationResponse> {
    try {
      // Generate the search query based on the provided search criteria
      const search = this.whereFieldGenerator(listFeedInput.search);

      // Retrieve the total number of items that match the search criteria
      const totalItems = await this.feedRepository.count(search);

      // Generate the pagination parameters based on the input and total items
      const paginateParams = mongoosePaginateParams(listFeedInput, totalItems);

      // Retrieve the paginated list of feeds
      const feeds = await this.feedRepository.findAll(search, paginateParams);

      // Format the feed response data
      const data = feeds.map(feed => formatFeedResponse(feed));

      // Generate the paginated response
      return paginationResponse(data, totalItems, paginateParams);
    } catch (error) {
      throw new ApiError(HTTP_ERRORS.INTERNAL_SERVER_ERROR, 'Error finding feeds!');
    }
  }

  /**
   * Generates the query object for filtering search results based on the provided search criteria.
   * @param search - The search criteria.
   * @returns The query object.
   */
  protected whereFieldGenerator(search: FindFeedInputDto | undefined) {
    let result: any = {};
    if (search) {
      if (search.id) result = { ...result, _id: search.id };
      if (search.name) result = { ...result, name: new RegExp(search.name, 'ig') };
      if (search.newspaper) result = { ...result, newspaper: search.newspaper };
      if (search.dates)
        result = {
          ...result,
          createdAt: {
            $gte: new Date(search.dates.start).getTime(),
            $lte: new Date(search.dates.end).getTime(),
          },
        };
    }
    return result;
  }
}
