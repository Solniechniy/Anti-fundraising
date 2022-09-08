import styled from 'styled-components';

import { ReactComponent as CloseIcon } from 'assets/images/close-icon.svg';

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  justify-content: space-between;
  & > p {
    margin: 0;
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.75rem;
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

const Footer = styled.div`
  display: flex;
  width: 100%;
  & > button {
    width: 100%;
    height: 100vh;
  }

  & > button:first-child {
    margin-bottom: 1rem;
  }
`;

export default {
  Header,
  Close,
  Footer,
  CloseIcon,
};
