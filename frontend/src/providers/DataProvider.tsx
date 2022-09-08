import {
  createContext, useContext, useState, useEffect, useMemo,
} from 'react';

import { CaseContract } from 'services/contracts';

import { useCaseService } from './CaseContractServiceProvider';
import assertFulfilled from './helpers';
import {
  Case, Address, DataContextType, CategoryMap, StatusMap,
} from './interfaces';
import { useWalletData } from './NearWalletProvider';

export const initialDataState: DataContextType = {
  loading: false,
  cases: {},
  setCases: () => {},
  addresses: {},
  setAddresses: () => {},
};

const DataContextHOC = createContext<DataContextType>(initialDataState);
const DEFAULT_PAGE_LIMIT = 100;

export async function retrieveCaseResult(pages: number, contract: CaseContract) {
  const allCategories = Object.entries(CategoryMap);
  const allStatuses = Object.entries(StatusMap);

  return (await Promise.allSettled(
    [...Array(pages)]
      .map((_, i) => contract.getCases(i * DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_LIMIT)),
  )).filter(assertFulfilled)
    .map(({ value }) => value)
    .flat()
    .map(([id, element]) => {
      const newDate = new Date(Number(element.date));
      const categoryNumber = allCategories.find(([index, value]) => value === element.category) || [0];

      return {
        id, ...element, category: categoryNumber[0], date: newDate,
      };
    });
}

export const toMap = (array: any[]) => array.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

export function DataProvider({ children }:{ children: JSX.Element }) {
  const { wallet } = useWalletData();
  const { caseContract } = useCaseService();

  const [loading, setLoading] = useState<boolean>(initialDataState.loading);

  const [cases, setCases] = useState<{ [key: string]: Case }>(initialDataState.cases);
  const [addresses, setAddresses] = useState<{ [key:string]: Address }>(initialDataState.addresses);

  useEffect(() => {
    const initialLoading = async () => {
      try {
        if (!wallet || !caseContract) return;
        setLoading(true);
        const casesCount = await caseContract.getNumberOfCases();
        const pages = casesCount ? Math.ceil(casesCount / DEFAULT_PAGE_LIMIT) : 0;
        const pagesResults = await retrieveCaseResult(pages, caseContract);
        console.log(pagesResults, 'pagesResults');
        const casesMap = toMap(pagesResults);
        setCases(casesMap);
      } catch (e) {
        console.warn(`Error: ${e} while initial loading`);
      } finally {
        setLoading(false);
      }
    };

    initialLoading();
  }, [caseContract, wallet]);

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
