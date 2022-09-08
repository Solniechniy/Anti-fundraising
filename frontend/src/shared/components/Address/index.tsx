import styled from 'styled-components';

import { ReactComponent as DiagramArrow } from 'assets/images/diagram-arrow.svg';
import {
  IAddress,
  Category,
  CategoryMap,
  ChainMap,
  getChainIcon,
} from 'providers/interfaces';

import { formatCaseDate } from '../List';
import { StatusComponent } from '../Status';

const AddressWrapper = styled.div`
  padding: 16px;
  background-color: #B8B8BF1A;
  border-radius: 16px;
  margin-bottom: 8px;
`;

export const DiagramRow = styled.a`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: 9.5px;
  padding: 2px 6px;
  border-radius: 10px;
  :hover{
    background-color: #B8B8BF1A;
  }
  text-decoration: none;
`;

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

const AddressTitle = styled.h1`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;

const AdditionalInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
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

export const ReporterTitle = styled.p`
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
  margin-left: 5px;
`;

export const CategoryWrapper = styled.div`
  border: 1px solid rgba(184, 184, 191, 0.4);
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
  justify-content: flex-start;
  padding: 0 4px;
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

export const RightRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default function Address({ address }: { address: IAddress }){
  const Image = getChainIcon(address.chain);
  const date = new Date(Number(address.date));
  console.log(address);

  return (
    <AddressWrapper>
      <Row>
        <AddressTitle>{address.address}</AddressTitle>
        <RightRow>
          <StatusComponent status={address.status} />
          {address.ipfs
            && (
            <DiagramRow href={address.ipfs}>
              <DiagramLink>
                Show Diagram
                {' '}
              </DiagramLink>
              <DiagramArrow />
            </DiagramRow>
            )}
        </RightRow>
      </Row>
      <AdditionalInfo>
        <DateWrapper>
          {`Added: ${formatCaseDate(date)} UTC`}
        </DateWrapper>
        <ReporterTitle>
          {address.reporter}
        </ReporterTitle>
        <CategoryWrapper>
          <CategoryText>{CategoryMap[Category.TerroristFinancing]}</CategoryText>
        </CategoryWrapper>
        <CategoryWrapper>
          <Image />
          <CategoryText>{ChainMap[address.chain]}</CategoryText>
        </CategoryWrapper>
      </AdditionalInfo>
    </AddressWrapper>
  );
}
