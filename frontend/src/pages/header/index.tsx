import styled from 'styled-components';

import { ReactComponent as WalletLogo } from 'assets/icons/wallet.svg';
import { useWalletData } from 'providers/NearWalletProvider';

const Primary = styled.button<{ isActive?: boolean }>`
  cursor: pointer;
  outline: none;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 0 .5rem;

  font-weight: 600;
  font-size: 1rem;
  line-height: 1.188rem;

  max-height: 48px;
  min-height: 36px;
  color: ${({ theme, isActive }) => (isActive ? theme.pink : theme.white)};
  background-color: ${({ theme, isActive }) => (isActive ? theme.lightPink : theme.pink)};

  :hover {
    background-color: ${({ theme, isActive }) => (isActive ? theme.lightPinkHover : theme.pinkHover)};
  }
  :active {
    background-color: ${({ theme, isActive }) => (isActive ? theme.lightPinkActive : theme.pinkActive)};
  }
  :disabled{
    cursor: default;
    background-color: ${({ theme }) => theme.grayOp04};
  }
`;

const ConnectedButton = styled(Primary)<{ isSignedIn?: boolean }>`
  background-color: ${({ theme, isSignedIn }) => (isSignedIn ? theme.darkPink : theme.pink)};
  :hover {
    background-color: ${({ theme, isSignedIn }) => (isSignedIn ? theme.darkPinkHv : theme.pinkHover)};
  }
  :active {
    background-color: ${({ theme, isSignedIn }) => (isSignedIn ? theme.darkPinkActive : theme.pinkActive)};
  }
  :disabled{
    cursor: default;
    background: ${({ theme }) => theme.grayOp04};
  }
`;
const Button = styled(ConnectedButton)<{ isOpened: boolean }>`
  font-weight: 600;
  font-size: .75rem;
  line-height: .938rem;
  & > svg {
    margin-right: .5rem;
  };
  visibility: ${(({ isOpened }) => (!isOpened ? 'visible' : 'hidden'))};
`;

export const HeaderComponent = styled.div`
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: .75rem;
  line-height: .938rem;
  margin-top: 2.5rem;
  margin-bottom: 1.75rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    min-width: auto;
    max-width: 328px;
    width: 100%;
    align-self: center;
    justify-content: space-between;
  `}
`;
export const HeaderLogo = styled.p``;
export const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;
export function Header({ children, isOpened }: { children: any, isOpened:boolean }){
  const {
    requestSignIn, isSignedIn, signOut, accountId,
  } = useWalletData();

  const title = isSignedIn
    ? accountId
    : 'Connect wallet';

  const buttonAction = () => (
    isSignedIn
      ? signOut()
      : requestSignIn()
  );

  return (
    <HeaderComponent>
      <HeaderRow>
        <HeaderLogo>
          LOGO
        </HeaderLogo>
        <Button
          onClick={buttonAction}
          isSignedIn={isSignedIn}
          isOpened={isOpened}
        >
          <WalletLogo />
          {title}
        </Button>
      </HeaderRow>

      {children}
    </HeaderComponent>
  );
}
