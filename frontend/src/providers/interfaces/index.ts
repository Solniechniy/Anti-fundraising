import { Near, WalletConnection } from 'near-api-js';
import {
  Dispatch, SetStateAction,
} from 'react';

import { FungibleTokenContract } from 'services/contracts';

export enum Status {
  'Loaded' = 1,
  'Pending',
  'Rejected',
  'Approved',
}

export const StatusMap = {
  [Status.Approved]: 'Approved',
  [Status.Pending]: 'Pending',
  [Status.Rejected]: 'Rejected',
  [Status.Loaded]: 'Loaded',
};

export enum Chain {
  'BNB' = 1,
  'NEAR',
  'Ethereum',
  'Bitcoin',
}

export enum Category {
  'Scam' = 1,
  'DEFI',
  'Terrorism',
}

export const CategoryMap = {
  [Category.Scam]: 'Scam',
  [Category.Terrorism]: 'Terrorism',
  [Category.DEFI]: 'DEFI',
};

export interface Case {
  id: string;
  title: string;
  description: string;
  date: Date;
  ipfsLink: string;
  category: Category;
  addressesIds: string[];
  status: Status;
}

export interface Address {
  status: Status;
  date: Date;
  reporter: string;
  address: string;
  chain: Chain;
}

export interface DataContextType {
  loading: boolean,
  cases: { [key: string]: Case },
  setCases: Dispatch<SetStateAction<{ [key: string]: Case }>>,
  addresses: { [key: string]: Address },
  setAddresses: Dispatch<SetStateAction<{ [key: string]: Address }>>
}

export type WalletContextType = {
  near: Near | null;
  wallet: WalletConnection | null;
  isSignedIn: boolean,
  accountId: string,
  requestSignIn: () => void,
  signOut: (tokenBalance: string, lockedAmount: string, token: FungibleTokenContract | null) => void,
  sendTransaction: (action: any) => Promise<void>,
};
