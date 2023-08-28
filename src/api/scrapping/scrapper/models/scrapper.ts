import axios from 'axios';
import { load, CheerioAPI } from 'cheerio';

import { ScrapperHeadlineI } from '../../../../commons/types';

export abstract class NewspaperScrapper {
  url: string;
  dom: CheerioAPI;

  async generateDOM() {
    const { data } = await axios.get(this.url);
    this.dom = load(data);
  }

  abstract getHeadlines(): Promise<ScrapperHeadlineI[]>;
}
