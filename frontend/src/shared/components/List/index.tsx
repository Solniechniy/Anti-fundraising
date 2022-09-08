import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as AddIcon } from 'assets/images/add-icon.svg';
import { Primary } from 'pages/header';
import {
  Case, CategoryMap,
} from 'providers/interfaces';
import { ITEMS_PER_PAGE } from 'shared/constant';
import { EModals } from 'shared/providers/interfaces';
import { useModalStore } from 'shared/providers/ModalProvider';

import Pagination from '../Pagination';

export const ListWrapper = styled.div`
  padding: 24px;
  background-color: rgb(29, 29, 35);
  width: 699px;
  height: 959px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
`;

export const ListItemWrapper = styled.div<{ isStatic: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  border-radius: 16px;
  padding: 8px;
  cursor: pointer;
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

export const CasesWrapper = styled.div`
  margin-top: 2rem;
  flex: 1;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export const Button = styled(Primary)`
  background-color: #B7DA44;
  color: #131313;
  :hover,:active {
    opacity: 0.9;
  }

  :disabled{
    cursor: default;
    background: ${({ theme }) => theme.grayOp04};
  }
  >svg {
    width: 22px;
    margin-right: 5px;
  }
`;

export const formatCaseDate = (date: Date) => {
  try {
    return format(date, 'yyyy-mm-dd, hh:mm:ss');
  } catch (e){
    console.warn(date);
    return 0;
  }
};

export function ListItem({ singleCase, isStatic = false }: { singleCase: Case, isStatic?: boolean }){
  const navigate = useNavigate();
  return (
    <ListItemWrapper
      isStatic={isStatic}
      onClick={() => navigate(`/${Number(singleCase.id)}`)}
    >
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
            <CategoryText>{CategoryMap[singleCase.category].replace(/([A-Z])/g, ' $1').trim()}</CategoryText>
          </CategoryWrapper>
        </Row>
      </Column>
      <Column className="dateWrapperColumn" style={{ justifyContent: 'flex-end' }}>
        <Row className="dateWrapper" style={{ height: '22.5px' }}>
          <DateWrapper>
            {`Updated: ${formatCaseDate(singleCase.date)} UTC`}
          </DateWrapper>
        </Row>
      </Column>
    </ListItemWrapper>
  );
}

export default function List({ cases }:{ cases: { [key:string]: Case } }){
  const { showModal } = useModalStore();
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
      <Header>
        <Button onClick={() => showModal(EModals.CREATE_CASE_MODAL, {})}>
          <AddIcon />
          Create case
        </Button>
      </Header>
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
