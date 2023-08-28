import { singleton, autoInjectable } from 'tsyringe';

import { NewspaperScrapper } from './scrapper';
import { ScrapperHeadlineI } from '../../../../commons/types';
import { CONFIG } from '../../../../config';

@autoInjectable()
@singleton()
export class ElMundoScrapper extends NewspaperScrapper {
  constructor() {
    super();
    this.url = CONFIG.NEWSPAPER.EL_MUNDO;
  }

  async getHeadlines(): Promise<ScrapperHeadlineI[]> {
    await this.generateDOM();

    const headlines: ScrapperHeadlineI[] = [];

    this.dom('div.ue-c-cover-content__main>header').each((_index, element) => {
      const title = this.dom(element).find('h2').text();
      const url = this.dom(element).find('a').attr('href');
      headlines.push({ title, url });
      if (headlines.length === 5) return false;
    });
    return headlines;
  }
}
