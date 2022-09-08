import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';

import getConfig from 'services/config';
import { CaseContract } from 'services/contracts';

import { useWalletData } from './NearWalletProvider';

export type CaseServiceContextType = {
  caseContract?: CaseContract,
};

const config = getConfig();

const CaseServiceContextHOC = createContext<CaseServiceContextType>({} as CaseServiceContextType);

export function CaseContractServiceProvider({ children }:{ children: JSX.Element }) {
  const [caseContract, setCaseContract] = useState<CaseContract | undefined>();

  const {
    wallet, near, accountId, sendTransaction,
  } = useWalletData();

  useEffect(() => {
    if (!near || !wallet) return;
    const createInstance = async () => {
      const instance = new CaseContract(accountId, config.contractId, near);
      const connectedToNearInstance = instance.withConnect(near);

      if (wallet && accountId) connectedToNearInstance.withWalletConnection(wallet);
      setCaseContract(connectedToNearInstance);
    };

    createInstance();
  }, [accountId, near, wallet]);

  const createCase = useCallback(async () => {
    if (!caseContract) return;
    const transaction = caseContract.createCaseAction({
      title, description, ipfs, category,
    });
    await sendTransaction(transaction);
  }, [caseContract, sendTransaction]);

  const createAddress = useCallback(async () => {
    if (!caseContract) return;
    const transaction = caseContract.createAddressAction({ chain, ipfs });
    await sendTransaction(transaction);
  }, [caseContract, sendTransaction]);

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
