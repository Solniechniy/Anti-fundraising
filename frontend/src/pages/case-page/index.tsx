import { useState } from 'react';
import styled from 'styled-components';

import { useData } from 'providers/DataProvider';
import { Case } from 'providers/interfaces';
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

export function CasePage(){
  // const [case, setCase] = useState<Case | null>(null);

  const { cases } = useData();
  if (Object.keys(cases).length === 0) return <h1>No Cases</h1>;

  return (
    <CaseWrapper>
      <ListItem singleCase={cases[0]} isStatic />
      <Address />
    </CaseWrapper>
  );
}
