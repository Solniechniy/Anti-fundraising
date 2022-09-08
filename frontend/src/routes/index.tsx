import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

import { CasePage } from 'pages/case-page';
import { Header } from 'pages/header';
import HomePage from 'pages/home-page';

import { APP_ROUTES } from './constant';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Pages = styled.div<{ isOpened?: boolean }>`
  flex: 1;
  display: ${({ isOpened }) => (isOpened ? 'none' : 'flex')};
  flex-direction: column;
  position: relative;
  max-width: 100vw;
  z-index: 1;
`;

export default function AppRoutes(): JSX.Element {
  return (
    <Router>
      <Container>
        <Pages>
          <Header>
            <Routes>
              <Route path={APP_ROUTES.HOME} element={<HomePage />} />
              <Route path={APP_ROUTES.CASE_BY_ID} element={<CasePage />} />
              <Route path={APP_ROUTES.DEFAULT} element={<Navigate replace to={APP_ROUTES.HOME} />} />
            </Routes>
          </Header>
        </Pages>
        <ToastContainer />
      </Container>
    </Router>
  );
}
