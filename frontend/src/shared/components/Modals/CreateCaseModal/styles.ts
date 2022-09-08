import styled from 'styled-components';

import { ReactComponent as CloseIcon } from 'assets/images/close-icon.svg';

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  justify-content: space-between;
  & > p {
    margin: 0;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
  }
`;

const Close = styled.div`
  width: .875rem;
  height: .875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & > svg {
    fill: black;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const CancelBtn = styled.button`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #B8B8BF;
  cursor: pointer;
  outline: none;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 .5rem;
  border: 1px solid #B8B8BF;
  border-radius: 8px;
  background-color: transparent;
  min-width: 80px;
`;

const SaveCaseBtn = styled.button`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #131313;
  cursor: pointer;
  outline: none;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #B7DA44;
  border-radius: 8px;
  min-width: 308px;
`;

const Footer = styled.div`
  display: flex;
  width: 100%;
  & > button {
    width: 100%;
    height: 40px;
  }

  & > button:first-child {
    margin-right: .75rem;
  }
`;

export default {
  Header,
  Close,
  Body,
  Footer,
  CancelBtn,
  CloseIcon,
  SaveCaseBtn,
};
