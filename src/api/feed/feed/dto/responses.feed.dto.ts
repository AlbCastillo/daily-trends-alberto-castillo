import { ArticleI } from '../models/feed.schema';

export class FeedResponseDto {
  id: string;

  name: string;

  newspaper: string;

  date: string;

  articles: ArticleI[];
}

export class MessageResponseDto {
  message: string;
}

export type ListFeedResponse = {
  data: FeedResponseDto[];
  page: number;
  perPage: number;
  items: number;
  pages: number;
  next: number | null;
  prev: number | null;
};
