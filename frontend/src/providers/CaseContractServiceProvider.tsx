import {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';

import getConfig from 'services/config';
import { CaseContract } from 'services/contracts';

import { useWalletData } from './NearWalletProvider';

export type CaseServiceContextType = {
  caseContract?: CaseContract,
};

const config = getConfig();

const CaseServiceContextHOC = createContext<CaseServiceContextType>({} as CaseServiceContextType);

export function AuctionServiceProvider({ children }:{ children: JSX.Element }) {
  const [caseContract, setAuctionContract] = useState<CaseContract | undefined>();

  const {
    wallet, near, accountId,
  } = useWalletData();

  useEffect(() => {
    if (!near || !wallet) return;
    const createInstance = async () => {
      const instance = new CaseContract(accountId, config.contractId, near);
      const connectedToNearInstance = instance.withConnect(near);

      if (wallet && accountId) connectedToNearInstance.withWalletConnection(wallet);

      setAuctionContract(connectedToNearInstance);
    };

    createInstance();
  }, [accountId, near, wallet]);

  const caseServiceData = useMemo(() => ({
    caseContract,
  }), [caseContract]);

  return (
    <CaseServiceContextHOC.Provider value={caseServiceData}>
      {children}
    </CaseServiceContextHOC.Provider>
  );
}

export const useCaseService = () => useContext(CaseServiceContextHOC);
