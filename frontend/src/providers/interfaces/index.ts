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

export enum Chain {
  'BNB' = 1,
  'NEAR',
  'Ethereum',
  'Bitcoin',
}

export interface Case {
  id: string;
  description: string;
  date: Date;
  ipfsLink: string;
  addressesIds: string[];
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
