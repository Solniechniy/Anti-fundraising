import { useState } from 'react';
import styled from 'styled-components';

import { useData } from 'providers/DataProvider';
import { Case } from 'providers/interfaces';
import { ListItem } from 'shared/components/List';

export const CaseWrapper = styled.div``;

export function CasePage(){
  // const [case, setCase] = useState<Case | null>(null);

  const { cases } = useData();
  if (Object.keys(cases).length === 0) return <h1>No Cases</h1>;

  return (
    <CaseWrapper>
      <ListItem singleCase={cases[0]} />
    </CaseWrapper>
  );
}
