import { Route, Tags, Controller, SuccessResponse, OperationId, Post } from 'tsoa';
import { inject, injectable } from 'tsyringe';

import { ScrapperService } from './scrapper.service';

@injectable()
@Route('/scrapper')
@Tags('Scrapper')
export class ScrapperController extends Controller {
  constructor(
    @inject(ScrapperService) private readonly scrapperService: ScrapperService,
  ) {
    super();
  }

  @Post('/generate/today')
  @SuccessResponse('200', 'OK')
  @OperationId('scrapperTodayNews')
  async getTodayews() {
    return await this.scrapperService.generateNews();
  }
}
