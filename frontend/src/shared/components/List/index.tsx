import { format } from 'date-fns';
import styled from 'styled-components';

import {
  Case, Category, CategoryMap, Status, StatusMap,
} from 'providers/interfaces';

export const ListWrapper = styled.div`
  padding: 24px;
  background-color: rgb(29,29,35);
  width: 699px;
  height: 959px;
`;

export const ListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 30px;
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

export const StatusWrapper = styled.div<{ statusEnum: Status }>`
  background-color: ${({ statusEnum }) => (statusEnum === Status.Loaded ? '#8FD958' : '#FF5F6033')};
`;

export function StatusComponent(){
  return <StatusWrapper statusEnum={Status.Approved}>Approve</StatusWrapper>;
}

const formatCaseDate = (date: Date) => format(date, 'yyyy-mm-dd, hh:mm:ss');

export function ListItem({ singleCase }: { singleCase: Case }){
  return (
    <ListItemWrapper>
      <Column>
        <Row justify="flex-start">
          <CaseTitle>
            {singleCase.title}
          </CaseTitle>
        </Row>
        <Row>
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
        <Row>
          Show Diagram

          <StatusComponent />
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

export default function List({ cases }:{ cases: Case[] }){
  return (
    <ListWrapper>
      {cases.map((el) => <ListItem key={el.id} singleCase={el} />) }
    </ListWrapper>
  );
}
