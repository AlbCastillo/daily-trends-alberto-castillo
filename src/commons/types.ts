export interface PaginateInputI {
  limit?: number;
  page?: number;
  sortField?: string;
  sort?: 'ASC' | 'DESC';
}

export interface ScrapperHeadlineI {
  title: string | undefined;
  url: string | undefined;
  summary?: string | undefined;
}
