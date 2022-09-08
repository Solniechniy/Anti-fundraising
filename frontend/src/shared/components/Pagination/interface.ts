export interface PaginationProps {
  currentPage: number;
  countOfListItems: number;
  changePageHandler(currentPage: number): void;
}
