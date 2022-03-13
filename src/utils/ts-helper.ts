/**
 * 可空类型
 */
export type Maybe<T> = null | undefined | T;

export type APIParams = {
  results: number;
  page?: number;
  sortField?: string;
  sortOrder?: number;
  [key: string]: any;
};

export type APIPageResult<T> = {
  content: Array<T>;
  empty: true;
  first: false;
  last: true;
  number: 1;
  numberOfElements: 0;
  pageable: {
    offset: 10;
    pageNumber: 1;
    pageSize: 10;
    paged: true;
    sort: { sorted: true; unsorted: false; empty: false };
    empty: false;
    sorted: true;
    unsorted: false;
    unpaged: false;
  };
  size: 10;
  sort: { sorted: true; unsorted: false; empty: false };
  totalElements: 0;
  totalPages: 0;
};
