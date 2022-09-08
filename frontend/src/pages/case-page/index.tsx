import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useData } from 'providers/DataProvider';
import { Case, IAddress } from 'providers/interfaces';
import Address from 'shared/components/Address';
import { ListItem } from 'shared/components/List';

export const CaseWrapper = styled.div`
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

export function CasePage() {
  const [singleCase, setSingleCase] = useState<Case | null>(null);

  const { id } = useParams();
  const { cases, addresses } = useData();

  useEffect(() => {
    if (id && cases[id] && (!singleCase || singleCase !== cases[id])) {
      setSingleCase(cases[id]);
    }
  }, [id, cases, singleCase]);

  if (Object.keys(cases).length === 0 || !singleCase) return <h1>No Cases</h1>;
  const addressesArray: IAddress[] = addresses[Number(id)] || [];

  return (
    <CaseWrapper>
      <ListItem singleCase={singleCase} isStatic />
      {addressesArray.map((address, index) => (
        <Address
          key={`${index + 1}: ${address.date}`}
          address={address}
        />
      ))}
    </CaseWrapper>
  );
}
