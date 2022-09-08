import styled from 'styled-components';

import {
  IAddress,
  Category,
  CategoryMap,
  ChainMap,
  getChainIcon,
} from 'providers/interfaces';

import { formatCaseDate } from '../List';

const AddressWrapper = styled.div`
  padding: 16px;
  background-color: #B8B8BF1A;
  border-radius: 16px;
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
  margin-bottom: 12px;
`;

const AdditionalInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

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

export default function Address({ address }: { address: IAddress }){
  const Image = getChainIcon(address.chain);
  const date = new Date(Number(address.date));
  console.log(address);

  return (
    <AddressWrapper>
      <AddressTitle>{address.address}</AddressTitle>
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
