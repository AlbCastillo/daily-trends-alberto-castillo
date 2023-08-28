import { autoInjectable, inject } from 'tsyringe';

import { ElMundoScrapper } from './models/elmundo.scrapper';
import { ElPaisScrapper } from './models/elpais.scrapper';
import { ScrapperHeadlineI } from '../../../commons/types';
import { ApiError } from '../../../middlewares/api.errors';
import { HTTP_ERRORS } from '../../../utils/http.errors.utils';
import { CreateFeedArticleDto } from '../../feed/feed/dto/create-feed.dto';
import { MessageResponseDto } from '../../feed/feed/dto/responses.feed.dto';
import { FeedService } from '../../feed/feed/feed.service';
@autoInjectable()
export class ScrapperService {
  constructor(
    @inject(ElMundoScrapper) private readonly elMundoScrapper: ElMundoScrapper,
    @inject(ElPaisScrapper) private readonly elPaisScrapper: ElPaisScrapper,
    @inject(FeedService) private readonly feedService: FeedService,
  ) {}
  /**
   * Generates news headlines from El Mundo and El Pais.
   * @returns {Promise<{message: string}>} - A promise that resolves with a success message.
   */
  async generateNews(): Promise<MessageResponseDto> {
    try {
      // Call the functions to create headlines from El Mundo and El Pais
      await Promise.all([
        this.createElMundoTodayHeadlines(),
        this.createElPaisTodayHeadlines(),
      ]);

      // Return a success message
      return { message: 'News generated successfully' };
    } catch (error) {
      // Throw an API error if there is an error generating the news
      throw new ApiError(
        HTTP_ERRORS.INTERNAL_SERVER_ERROR,
        'Error generating news from scrapper!',
      );
    }
  }

  /**
   * Create El Mundo Today headlines
   * @returns {Promise<void>} - Promise that resolves when the headlines are created
   * @throws {ApiError} - if there's an error creating the headlines
   */
  private async createElMundoTodayHeadlines(): Promise<void> {
    try {
      // Get the headlines from El Mundo scrapper
      const headlines = await this.elMundoScrapper.getHeadlines();

      // Transform the headlines into articles
      const articles = this.transformHeadLineOnArticle(headlines);

      // Create the headlines in the feed service
      await this.feedService.create({ newspaper: 'El Mundo', articles });
    } catch (error) {
      // Throw an error if there's an issue creating the headlines
      throw new ApiError(
        HTTP_ERRORS.INTERNAL_SERVER_ERROR,
        'Error creating El Mundo headlines',
      );
    }
  }

  /**
   * Creates today's headlines from El Pais newspaper
   * and saves them to the feed service.
   * @throws {ApiError} If there is an error creating the headlines
   */
  private async createElPaisTodayHeadlines() {
    try {
      // Get the headlines from El Pais
      const headlines = await this.elPaisScrapper.getHeadlines();

      // Transform the headlines into articles
      const articles = this.transformHeadLineOnArticle(headlines);

      // Save the articles to the feed service
      return await this.feedService.create({ newspaper: 'El Pais', articles });
    } catch (e) {
      throw new ApiError(
        HTTP_ERRORS.INTERNAL_SERVER_ERROR,
        'Error creating El Pais headlines',
      );
    }
  }

  /**
   * Transforms the headlines from a scrapper into an array of CreateFeedArticleDto objects.
   *
   * @param headlines - The array of headlines to transform.
   * @returns An array of transformed CreateFeedArticleDto objects.
   */
  private transformHeadLineOnArticle(
    headlines: ScrapperHeadlineI[],
  ): CreateFeedArticleDto[] {
    return headlines.map(({ title, url, summary }) => ({
      title: title || '',
      url: url || '',
      summary: summary || '',
    }));
  }
}
