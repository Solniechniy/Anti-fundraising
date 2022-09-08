import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as AddIcon } from 'assets/images/add-icon.svg';
import { ReactComponent as BackIcon } from 'assets/images/back.svg';
import { Primary } from 'pages/header';
import { useData } from 'providers/DataProvider';
import { Case, IAddress } from 'providers/interfaces';
import { APP_ROUTES } from 'routes/constant';
import Address from 'shared/components/Address';
import { ListItem } from 'shared/components/List';
import { EModals } from 'shared/providers/interfaces';
import { useModalStore } from 'shared/providers/ModalProvider';

export const CaseWrapper = styled.div`
  padding: 24px;
  background-color: rgb(29, 29, 35);
  width: 699px;
  height: 959px;
  align-self: center;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
`;

export const Button = styled(Primary)`
  background-color: #B7DA44;
  color: #131313;
  :hover {
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

const Back = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #B8B8BF;
  cursor: pointer;
  width: 680px;
  align-self: center;
  margin-bottom: 26px;
  & >svg {
    margin-right: 7px;
  }
`;

export function CasePage() {
  const { showModal } = useModalStore();
  const [singleCase, setSingleCase] = useState<Case | null>(null);

  const navigate = useNavigate();
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
    <>
      <Back onClick={() => navigate(APP_ROUTES.HOME)}>
        <BackIcon />
        Back
      </Back>
      <CaseWrapper>
        <Button
          onClick={() => showModal(
            EModals.CREATE_ADDRESS_MODAL,
            {
              caseId: Number(singleCase.id),
            },
          )}
        >
          <AddIcon />
          Create address
        </Button>
        <ListItem singleCase={singleCase} isStatic />
        <div>
          {addressesArray.map((address, index) => (
            <Address
              key={`${index + 1}: ${address.date}`}
              address={address}
            />
          ))}
        </div>
      </CaseWrapper>

    </>
  );
}
