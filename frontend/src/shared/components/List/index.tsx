import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as DiagramArrow } from 'assets/images/diagram-arrow.svg';
import {
  Case, CategoryMap,
} from 'providers/interfaces';
import { ITEMS_PER_PAGE } from 'shared/constant';

import Pagination from '../Pagination';

export const ListWrapper = styled.div`
  padding: 24px;
  background-color: rgb(29, 29, 35);
  width: 699px;
  height: 959px;
  align-self: center;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ListItemWrapper = styled.div<{ isStatic: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  border-radius: 16px;
  padding: 8px;
  :hover{
    ${({ isStatic }) => !isStatic && 'background-color:rgb(41,40,46);'}
  }
`;

export const Column = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Row = styled.div<{ justify?: string, align?: string }>`
  display: flex;
  justify-content: ${({ justify }) => (justify || 'center')};
  flex-direction: row;
  margin: 9.5px;
`;

export const CaseTitle = styled.h1`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 140%;

  display: flex;
  align-items: center;

  color: #E5E5E5;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;

export const Id = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;

  display: flex;
  align-items: center;

  color: #B8B8BF;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;

export const DateWrapper = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;

  display: flex;
  align-items: center;

  color: #B8B8BF;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;

export const CategoryWrapper = styled.div`
  border: 1px solid rgba(184, 184, 191, 0.4);
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-left: 10px;
`;

export const CategoryText = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;

  display: flex;
  align-items: center;

  color: #B8B8BF;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  margin: 2px 4px;
`;

export const CasesWrapper = styled.div``;

export const DiagramLink = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 140%;

  display: flex;
  align-items: center;
  color: #B8B8BF;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;

export const DiagramRow = styled(Row)`
  padding: 2px 6px;
  border-radius: 10px;
  :hover{
    background-color: #B8B8BF1A;
  }
`;

const formatCaseDate = (date: Date) => {
  try {
    return format(date, 'yyyy-mm-dd, hh:mm:ss');
  } catch (e){
    console.warn(date);
    return 0;
  }
};

export function ListItem({ singleCase, isStatic = false }: { singleCase: Case, isStatic?: boolean }){
  return (
    <ListItemWrapper isStatic={isStatic}>
      <Column>
        <Row justify="flex-start">
          <CaseTitle>
            {singleCase.title}
          </CaseTitle>
        </Row>
        <Row justify="flex-start">
          <Id>
            ID:
            {' '}
            {singleCase.id}
          </Id>
          <CategoryWrapper>
            <CategoryText>{CategoryMap[singleCase.category]}</CategoryText>
          </CategoryWrapper>
        </Row>
      </Column>
      <Column>
        <Row justify="flex-end">
          <DiagramRow>
            <DiagramLink>
              Show Diagram
              {' '}
            </DiagramLink>
            <DiagramArrow />
          </DiagramRow>
        </Row>
        <Row>
          <DateWrapper>
            {`Updated: ${formatCaseDate(singleCase.date)} UTC`}
          </DateWrapper>
        </Row>
      </Column>
    </ListItemWrapper>
  );
}

export default function List({ cases }:{ cases: { [key:string]: Case } }){
  const [skip, setSkip] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [currentCases, setCurrentCases] = useState(Object.values(cases));
  function generateSkip(page: number): number {
    return (page - 1) * ITEMS_PER_PAGE;
  }

  useEffect(() => {
    setSkip(generateSkip(currentPage));
  }, [currentPage]);

  useEffect(() => {
    setCurrentCases(Object.values(cases).slice(skip));
  }, [cases, skip]);

  return (
    <ListWrapper>
      <CasesWrapper>
        {currentCases.map((el) => <ListItem key={el.id} singleCase={el} />)}
      </CasesWrapper>
      <Pagination
        currentPage={currentPage}
        countOfListItems={Object.keys(cases).length}
        changePageHandler={setCurrentPage}
      />
    </ListWrapper>
  );
}
