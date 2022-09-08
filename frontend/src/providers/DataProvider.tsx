import {
  createContext, useContext, useState, useEffect, useMemo, useCallback,
} from 'react';

import { useCaseService } from './CaseContractServiceProvider';
import { Case, Address, DataContextType } from './interfaces';
import { useWalletData } from './NearWalletProvider';

export const initialDataState: DataContextType = {
  loading: false,
  cases: {},
  setCases: () => {},
  addresses: {},
  setAddresses: () => {},
};

const DataContextHOC = createContext<DataContextType>(initialDataState);

export function DataProvider({ children }:{ children: JSX.Element }) {
  const { isSignedIn, accountId, wallet } = useWalletData();
  const { caseContract } = useCaseService();

  const [loading, setLoading] = useState<boolean>(initialDataState.loading);

  const [cases, setCases] = useState<{ [key: string]: Case }>(initialDataState.cases);
  const [addresses, setAddresses] = useState<{ [key:string]: Address }>(initialDataState.addresses);

  useEffect(() => {
    const initialLoading = async () => {
      try {
        if (!wallet || !caseContract) return;
        setLoading(true);
        // const {
        //   metadataMap,
        //   balancesMap,
        //   auctionMap,
        // } = await retrieveInitialData(wallet, auctionContract, isSignedIn, accountId);

        // setTokens(metadataMap);
        // setBalances(balancesMap);
        // setAuctions(auctionMap);
      } catch (e) {
        console.warn(`Error: ${e} while initial loading`);
      } finally {
        setLoading(false);
      }
    };

    initialLoading();
  }, [accountId, isSignedIn, wallet]);

  const data = useMemo(() => ({
    cases, setCases, addresses, setAddresses, loading,
  }), [
    cases, setCases, addresses, setAddresses, loading,
  ]);

  return (
    <DataContextHOC.Provider value={data}>
      {children}
    </DataContextHOC.Provider>
  );
}

export const useData = () => useContext(DataContextHOC);
