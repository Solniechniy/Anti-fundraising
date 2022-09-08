import { WalletConnection, Contract } from 'near-api-js';

export enum FTTokenContractMethod {
  ftTransferCall = 'ft_transfer_call',
  depositNear = 'deposit_near',
  storageDeposit = 'storage_deposit',
}

export interface Action {
  receiverId: string;
  functionCalls: {
    gas?: string;
    amount?: string;
    methodName: string;
    args?: {
      registration_only?: boolean,
      account_id?: string,
      receiver_id?: string,
      amount?: string,
      msg?: string,
      auction_id?: number,
    };
  }[];
}

export interface ITokenMetadata {
  version: string;
  name: string;
  symbol: string;
  reference: string;
  decimals: number;
  icon: string;
}

export interface FungibleTokenContractInterface {
  wallet: WalletConnection;
  contractId: string;
}

export interface NonFungibleTokenContractInterface {
  wallet: WalletConnection;
  contractId: string;
}

export interface INFTMetadata {
  spec: string,
  name: string,
  symbol: string,
  icon: string,
  base_uri: string | null,
  reference: string | null,
  reference_hash: string | null,
}

export interface IContract {
  getAuctions: (from: number, limit: number) => Promise<void>,
  getNumberOfAuctions: (from: number, limit: number) => Promise<void>,
  getAuctionAccount: (auctionId: number, accountId: string) => Promise<void>,
  hasAccount: (accountId: string) => Promise<void>,
  getJoinFee: () => Promise<void>,
}
export interface NativeContract extends Contract {
  get_cases?({ from_index, limit }: { from_index: number, limit: number }): any | undefined
  get_num_cases?(): number | undefined
}

export enum ContractMethod {
  addCase = 'add_case',
  addAddress = 'add_address',
}

export interface IStorageBalance {
  total: string,
  available: string,
}

export interface IStorageBalanceBounds {
  min: string,
  max: string
}
