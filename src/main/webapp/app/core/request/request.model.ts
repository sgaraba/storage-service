export interface Pagination {
  page: number;
  size: number;
  sort: string[];
}

export interface SearchPagination {
  query: string;
  page: number;
  size: number;
  sort: string[];
}

export interface SearchWithPagination extends SearchPagination, Pagination { }
