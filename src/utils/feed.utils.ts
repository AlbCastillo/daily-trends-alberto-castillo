import { FeedResponseDto } from '../api/feed/feed/dto/responses.feed.dto';
import { FeedI } from '../api/feed/feed/models/feed.schema';
/**
 * Format the feed response to match the FeedResponseDto structure.
 * @param feed - The feed object to be formatted.
 * @returns The formatted feed response.
 */
export const formatFeedResponse = (feed: FeedI): FeedResponseDto => {
  // Destructure the feed object and omit the _id and createdAt properties.
  const { _id, createdAt, ...rest } = feed;

  // Return a new object with the formatted properties.
  return {
    id: _id,
    date: createdAt,
    ...rest,
  };
};
