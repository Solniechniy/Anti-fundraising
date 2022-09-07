import { Contract, Near, WalletConnection } from 'near-api-js';
import { formatNearAmount } from 'near-api-js/lib/utils/format';

import {
  IAuctionOutput, NativeContract, Action, AuctionContractMethod,
} from 'services/interfaces';
import {
  GAS_JOIN, NEAR_TOKEN_ID, ONE_YOCTO_NEAR, SAMPLE_GAS, ZERO,
} from 'shared/constant';

import { auctionChangeMethods, auctionViewMethods } from './contractMethods';
import FungibleTokenContract from './FungibleToken';

export default class AuctionContract {
  readonly contractId: string;

  accountId: string;

  public constructor(accountId: string, contractId: string, near: Near | null) {
    this.contractId = contractId;
    this.accountId = accountId;
    this.near = near;
  }

  near: Near | null;

  async initializeContract(accountId: string): Promise<NativeContract> {
    if (this.near == null) {
      throw new Error('Invalid near connection.');
    }
    const account = await this.near.account(this.accountId);
    const contract = new Contract(
      account,
      accountId,
      { viewMethods: auctionViewMethods, changeMethods: auctionChangeMethods },
    );
    return contract;
  }

  withConnect(near: Near) {
    this.near = near;
    return this;
  }

  withWalletConnection(wallet: WalletConnection) {
    // eslint-disable-next-line no-underscore-dangle
    this.near = wallet._near;
    this.accountId = wallet.getAccountId();
  }

  async getAuctions(from: number, limit: number): Promise<IAuctionOutput[] | undefined> {
    const contract = await this.initializeContract(this.contractId);
    return contract.get_auctions?.({ from_index: from, limit });
  }

  async getNumberOfAuctions() {
    const contract = await this.initializeContract(this.contractId);
    return contract.get_num_auctions?.();
  }

  async getAuctionAccount(auctionId: number) {
    const contract = await this.initializeContract(this.contractId);
    return contract.get_auction_account?.({ auction_id: auctionId, account_id: this.accountId });
  }

  async getAuction(auctionId: number) {
    const contract = await this.initializeContract(this.contractId);
    return contract.get_auction?.({ auction_id: auctionId });
  }

  async hasAccount() {
    const contract = await this.initializeContract(this.contractId);
    return contract.has_account?.({ account_id: this.accountId });
  }

  async getJoinFee() {
    const contract = await this.initializeContract(this.contractId);
    return contract.get_join_fee?.();
  }

  generateJoinTransaction(joinFee: string): Action[] {
    return [{
      receiverId: this.contractId,
      functionCalls: [{
        methodName: AuctionContractMethod.join,
        args: {},
        amount: formatNearAmount(joinFee) as string,
        gas: GAS_JOIN,
      }],
    }];
  }

  // eslint-disable-next-line class-methods-use-this
  async generatePlaceBidTransaction(
    auctionId: number,
    token: FungibleTokenContract,
    amount: string,
  ): Promise<Action[]> {
    if (token.contractId === NEAR_TOKEN_ID) {
      const depositNear = token.depositNear({ amount, auctionId });
      return depositNear;
    }
    const transactions: Action[] = [];
    const sendToken = await token.transfer(
      {
        inputToken: token.contractId,
        amount,
        message: auctionId.toString(),
      },
    );
    if (sendToken.length) transactions.push(...sendToken);

    return transactions;
  }

  generateClaimNFTTransaction(auctionId: number): Action[] {
    return [{
      receiverId: this.contractId,
      functionCalls: [{
        methodName: AuctionContractMethod.claimNFT,
        args: { auction_id: auctionId },
        amount: ONE_YOCTO_NEAR,
      }],
    }];
  }

  async generateClaimRefundTransaction(
    auctionId: number,
    accountId: string,
    depositToken: FungibleTokenContract,
  ): Promise<Action[]> {
    const transactions: Action[] = [];
    const checkTokenStorageBalance = await depositToken.checkStorageBalance({ accountId });
    transactions.push(...checkTokenStorageBalance);
    transactions.push({
      receiverId: this.contractId,
      functionCalls: [{
        methodName: AuctionContractMethod.claimRefund,
        args: { auction_id: auctionId },
        amount: ZERO,
        gas: SAMPLE_GAS,
      }],
    });

    return transactions;
  }
}
