import { Near, WalletConnection } from 'near-api-js';
import {
  Dispatch, SetStateAction,
} from 'react';

import { ReactComponent as NearIcon, ReactComponent as BinanceIcon } from 'assets/images/binance.svg';
import { ReactComponent as BitcoinIcon } from 'assets/images/bitcoin.svg';
import { ReactComponent as EthereumIcon } from 'assets/images/ethereum.svg';
import { Action } from 'services/interfaces';

export enum Status {
  Loaded = 'Loaded',
  Pending = 'Pending',
  Rejected = 'Rejected',
  Accepted = 'Accepted',
}

export const StatusMap = {
  [Status.Accepted]: 'Accepted',
  [Status.Pending]: 'Pending',
  [Status.Rejected]: 'Rejected',
  [Status.Loaded]: 'Loaded',
};

export enum Chain {
  None = '',
  BNB = 'BNB',
  NEAR = 'NEAR',
  ETH = 'ETH',
  BTC = 'BTC',
}

export const ChainMap = {
  [Chain.None]: 'None',
  [Chain.BNB]: 'BNB',
  [Chain.NEAR]: 'NEAR',
  [Chain.ETH]: 'ETH',
  [Chain.BTC]: 'BTC',
};

export const ChainMapIcon = {
  [Chain.BNB]: BinanceIcon,
  [Chain.NEAR]: NearIcon,
  [Chain.ETH]: EthereumIcon,
  [Chain.BTC]: BitcoinIcon,
};

export function getChainIcon(chain: Chain){
  switch (chain){
    case Chain.BNB: return BinanceIcon;
    case Chain.NEAR: return NearIcon;
    case Chain.ETH: return EthereumIcon;
    case Chain.BTC: return BitcoinIcon;
    default: return BinanceIcon;
  }
}

export enum Category {
  None = 'None',
  WalletService = 'WalletService',
  MerchantService = 'MerchantService',
  MiningPool = 'MiningPool',
  LowRiskExchange = 'LowRiskExchange',
  MediumRiskExchange = 'MediumRiskExchange',
  DeFi = 'DeFi',
  OTCBroker = 'OTCBroker',
  ATM = 'ATM',
  Gambling = 'Gambling',
  IllicitOrganization = 'IllicitOrganization',
  Mixer = 'Mixer',
  DarknetService = 'DarknetService',
  Scam = 'Scam',
  Ransomware = 'Ransomware',
  Theft = 'Theft',
  Counterfeit = 'Counterfeit',
  TerroristFinancing = 'TerroristFinancing',
  Sanctions = 'Sanctions',
  ChildAbuse = 'ChildAbuse',
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

export interface IAddress {
  status: Status;
  date: Date;
  reporter: string;
  address: string;
  chain: Chain;
  ipfs?: string;
}

export interface DataContextType {
  loading: boolean,
  cases: { [key: string]: Case },
  setCases: Dispatch<SetStateAction<{ [key: string]: Case }>>,
  addresses: { [key: string]: IAddress[] },
  setAddresses: Dispatch<SetStateAction<{ [key: string]: IAddress[] }>>
}

export type WalletContextType = {
  near: Near | null;
  wallet: WalletConnection | null;
  isSignedIn: boolean,
  accountId: string,
  requestSignIn: () => void,
  signOut: () => void,
  sendTransaction: (action: Action[]) => Promise<void>,
};
