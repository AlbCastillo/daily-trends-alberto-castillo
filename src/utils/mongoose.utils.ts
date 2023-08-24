import { PaginateInputI } from '../commons/types';

export interface MongoosePaginateParamsI {
  skip: number;
  sortOptions: any;
  take: number;
  pages: number;
  next: number | null;
  prev: number | null;
  page: number;
  perPage: number;
}

export interface MongoosePaginationResponse<T> {
  data: T[];
  page: number;
  perPage: number;
  items: number;
  pages: number;
  next: number | null;
  prev: number | null;
}
/**
 * Generates pagination parameters based on the given input and total number of items.
 * @param {PaginateInputI} params - The pagination input parameters.
 * @param {number} totalItems - The total number of items in the collection.
 * @returns {MongoosePaginateParamsI} - An object with the generated pagination parameters.
 */
export const mongoosePaginateParams = (
  params: PaginateInputI,
  totalItems: number,
): MongoosePaginateParamsI => {
  // Destructure the pagination input parameters
  const { limit = 10, page = 1, sortField, sort } = params;

  // Calculate the total number of pages
  let pages = limit < 0 ? 0 : Math.ceil(totalItems / limit);
  if (pages === Infinity) pages = 1;

  // Set the current page based on the input page parameter
  let currentPage = 1;
  if (page > 1) currentPage = page > pages ? pages : page;

  // Determine the sort order
  const sortOrder = sort === 'ASC' ? '' : '-';

  // Calculate the number of items to skip
  const skip = page > 0 ? (page - 1) * limit : 0;

  // Set the sort options
  const sortOptions = sortField ? `${sortOrder}${sortField}` : '_id';

  // Calculate the number of items to take
  const take = Math.min(limit, totalItems - skip);

  // Generate the pagination parameters object
  const paginationParams: MongoosePaginateParamsI = {
    skip,
    sortOptions,
    take,
    pages,
    next: currentPage < pages ? currentPage + 1 : null,
    prev: currentPage > 1 ? currentPage - 1 : null,
    page: currentPage,
    perPage: take,
  };

  return paginationParams;
};

/**
 * Generates a Mongoose pagination response object.
 * @param data - The data to be included in the response.
 * @param totalItems - The total number of items.
 * @param paginateParams - The pagination parameters.
 * @returns The pagination response object.
 */
export const paginationResponse = (
  data: any[],
  totalItems: number,
  paginateParams: MongoosePaginateParamsI,
): MongoosePaginationResponse<any> => {
  const { page, take, pages, next, prev } = paginateParams;
  const perPage = take || totalItems;

  return {
    data,
    page,
    perPage,
    items: totalItems,
    pages,
    next,
    prev,
  };
};
