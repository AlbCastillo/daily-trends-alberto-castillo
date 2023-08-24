export interface PaginateInputI {
  limit?: number;
  page?: number;
  sortField?: string;
  sort?: 'ASC' | 'DESC';
}
