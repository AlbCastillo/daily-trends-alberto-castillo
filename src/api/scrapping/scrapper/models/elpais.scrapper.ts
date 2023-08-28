import { singleton, autoInjectable } from 'tsyringe';

import { NewspaperScrapper } from './scrapper';
import { ScrapperHeadlineI } from '../../../../commons/types';
import { CONFIG } from '../../../../config';

@autoInjectable()
@singleton()
export class ElPaisScrapper extends NewspaperScrapper {
  constructor() {
    super();
    this.url = CONFIG.NEWSPAPER.EL_PAIS;
  }

  async getHeadlines(): Promise<ScrapperHeadlineI[]> {
    await this.generateDOM();

    const headlines: ScrapperHeadlineI[] = [];

    this.dom('div.z.z-hi>section>div>article').each((index, element) => {
      const title = this.dom(element).find('h2').text();
      const url = this.dom(element).find('a').attr('href');
      const summary = this.dom(element).find('p').text();

      headlines.push({ title, url, summary });

      if (headlines.length === 5) return false;
    });
    return headlines;
  }
}
