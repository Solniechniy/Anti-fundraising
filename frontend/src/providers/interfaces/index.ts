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
  BNB = 1,
  NEAR,
  Ethereum,
  Bitcoin,
}

export enum Category {
  None = 0,
  WalletService,
  MerchantService,
  MiningPool,
  LowRiskExchange,
  MediumRiskExchange,
  DeFi,
  OTCBroker,
  ATM,
  Gambling,
  IllicitOrganization,
  Mixer,
  DarknetService,
  Scam,
  Ransomware,
  Theft,
  Counterfeit,
  TerroristFinancing,
  Sanctions,
  ChildAbuse,
}

export const CategoryMap = {
  [Category.None]: 'None',
  [Category.WalletService]: 'WalletService',
  [Category.MerchantService]: 'MerchantService',
  [Category.MiningPool]: 'MiningPool',
  [Category.LowRiskExchange]: 'LowRiskExchange',
  [Category.MediumRiskExchange]: 'MediumRiskExchange',
  [Category.DeFi]: 'DeFi',
  [Category.OTCBroker]: 'OTCBroker',
  [Category.ATM]: 'ATM',
  [Category.Gambling]: 'Gambling',
  [Category.IllicitOrganization]: 'IllicitOrganization',
  [Category.Mixer]: 'Mixer',
  [Category.DarknetService]: 'DarknetService',
  [Category.Scam]: 'Scam',
  [Category.Ransomware]: 'Ransomware',
  [Category.Theft]: 'Theft',
  [Category.Counterfeit]: 'Counterfeit',
  [Category.TerroristFinancing]: 'TerroristFinancing',
  [Category.Sanctions]: 'Sanctions',
  [Category.ChildAbuse]: 'ChildAbuse',
};

export interface Case {
  id: string;
  title: string;
  description: string;
  date: Date;
  ipfsLink: string | null;
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
  signOut: () => void,
  sendTransaction: (action: any) => Promise<void>,
};
