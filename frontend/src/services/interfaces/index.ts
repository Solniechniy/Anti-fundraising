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
      account_id?: string,
      receiver_id?: string,

      registration_only?: boolean,
      amount?: string
      address?: {
        chain?: string,
        address?: string,
        ipfs?: string,
      }
      case?: {
        title?: string,
        description?: string,
        ipfs?: string,
        category?: string,
      }
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
  get_addresses?({ case_id }: { case_id: number }): ICase | undefined
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

export interface ICase {
  chain: string,
  date: string,
  reporter: string,
  address: string,
  ipfs: string,
  status: string,
}
