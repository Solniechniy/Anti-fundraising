import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import { CaseContractServiceProvider } from 'providers/CaseContractServiceProvider';
import { DataProvider } from 'providers/DataProvider';
import { WalletProvider } from 'providers/NearWalletProvider';
import AppRoutes from 'routes';
import { ModalProvider } from 'shared/providers/ModalProvider';
import theme from 'shared/theme';
import 'react-toastify/dist/ReactToastify.css';

import './services/translation';
import './index.css';

export default function AppWrapper() {
  return (
    <ThemeProvider theme={theme}>
      <WalletProvider>
        <CaseContractServiceProvider>
          <DataProvider>
            <ModalProvider>
              <AppRoutes />
            </ModalProvider>
          </DataProvider>
        </CaseContractServiceProvider>
      </WalletProvider>
    </ThemeProvider>
  );
}

createRoot(
  document.getElementById('root')!,
).render(<AppWrapper />);
