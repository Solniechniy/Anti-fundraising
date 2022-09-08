import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';

import getConfig from 'services/config';
import { CaseContract } from 'services/contracts';

import { useWalletData } from './NearWalletProvider';

export type CaseServiceContextType = {
  caseContract?: CaseContract,
  createCase: (title: string,
    description: string,
    ipfs: string,
    category: string) => Promise<void>;
  createAddress: (chain: string, ipfs: string, address: string, caseId: number) => Promise<void>;
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

  const createCase = useCallback(async (
    title: string,
    description: string,
    ipfs: string,
    category: string,
  ): Promise<void> => {
    if (!caseContract) return;
    const transaction = caseContract.createCaseAction({
      title, description, ipfs, category,
    });
    await sendTransaction(transaction);
  }, [caseContract, sendTransaction]);

  const createAddress = useCallback(async (
    chain: string,
    ipfs: string,
    address: string,
    caseId: number,
  ): Promise<void> => {
    if (!caseContract) return;
    const transaction = caseContract.createAddressAction({
      chain, ipfs, address, caseId,
    });
    await sendTransaction(transaction);
  }, [caseContract, sendTransaction]);

  const caseServiceData = useMemo(() => ({
    caseContract,
    createCase,
    createAddress,
  }), [caseContract, createAddress, createCase]);

  return (
    <CaseServiceContextHOC.Provider value={caseServiceData}>
      {children}
    </CaseServiceContextHOC.Provider>
  );
}

export const useCaseService = () => useContext(CaseServiceContextHOC);
