import { FeedResponseDto } from '../api/feed/feed/dto/responses.feed.dto';
import { FeedI } from '../api/feed/feed/models/feed.schema';
/**
 * Format the feed response to match the FeedResponseDto structure.
 * @param feed - The feed object to be formatted.
 * @returns The formatted feed response.
 */
export const formatFeedResponse = (feed: FeedI): FeedResponseDto => {
  return {
    id: feed._id,
    date: feed.createdAt,
    name: feed.name,
    newspaper: feed.newspaper,
    articles: feed.articles,
  };
};
