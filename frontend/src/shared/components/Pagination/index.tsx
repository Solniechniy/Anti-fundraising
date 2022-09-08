/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';

import { ITEMS_PER_PAGE } from 'shared/constant';

import { ReactComponent as Arrow } from '../../../assets/images/arrow.svg';
import { PaginationProps } from './interface';
import { PaginationStyled } from './styles';

export enum KeyboardButton {
  ENTER_BUTTON = 'Enter',
}

export default function Pagination({
  currentPage,
  countOfListItems,
  changePageHandler,
}: PaginationProps) {
  function calculatePagesCount(count: number) {
    return Math.ceil(count / ITEMS_PER_PAGE);
  }

  const [currentPageState, setCurrentPage] = useState<number>(currentPage);
  const [pagesCount, setPagesCount] = useState<number>(
    calculatePagesCount(countOfListItems),
  );
  const [temp, setTemp] = useState<number>(currentPageState);

  const firstPage = currentPageState === 1;
  const lastPage = currentPageState === pagesCount;

  function prevPage() {
    if (firstPage) return;
    setCurrentPage((prev) => Number(prev) - 1);
    setTemp((prev) => Number(prev) - 1);
  }

  function nextPage() {
    if (lastPage) return;
    setCurrentPage((prev) => Number(prev) + 1);
    setTemp((prev) => Number(prev) + 1);
  }

  function enterPage(event: any) {
    if (event.key === KeyboardButton.ENTER_BUTTON) {
      event.preventDefault();
      const { value } = event.target;

      setTemp(value);
    }
  }

  function changePage(event: any) {
    const { value } = event.target;

    if (value > pagesCount || value < 1) {
      setCurrentPage(currentPageState);
    } else {
      setCurrentPage(value);
    }
  }

  useEffect(() => {
    changePageHandler(currentPageState);
  }, [temp]);

  useEffect(() => {
    setPagesCount(calculatePagesCount(countOfListItems));
  }, [pagesCount, countOfListItems]);

  return (
    <PaginationStyled className="pagination">
      <div>
        <button
          onClick={prevPage}
          className={`${firstPage ? 'disabled' : ''} prev`}
        >
          <Arrow />
        </button>
        <input
          type="number"
          value={currentPageState}
          onKeyDown={enterPage}
          onChange={changePage}
          onBlur={() => setCurrentPage(temp)}
        />
        <button
          onClick={nextPage}
          className={`${lastPage ? 'disabled' : ''} next`}
        >
          <Arrow />
        </button>
        <span>
          of
          {' '}
          {pagesCount}
        </span>
      </div>
    </PaginationStyled>
  );
}
