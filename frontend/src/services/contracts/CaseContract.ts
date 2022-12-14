import { Contract, Near, WalletConnection } from 'near-api-js';

import {
  Action,
  ICase,
  NativeContract,
} from 'services/interfaces';
import { ZERO } from 'shared/constant';

import { caseChangeMethods, caseViewMethods } from './contractMethods';

export default class CaseContract {
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
      { viewMethods: caseViewMethods, changeMethods: caseChangeMethods },
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

  async getCases(from: number, limit: number): Promise<any | undefined> {
    const contract = await this.initializeContract(this.contractId);
    return contract.get_cases?.({ from_index: from, limit });
  }

  async getNumberOfCases() {
    const contract = await this.initializeContract(this.contractId);
    return contract.get_num_cases?.();
  }

  async getAddresses(caseId: number): Promise<ICase | undefined> {
    const contract = await this.initializeContract(this.contractId);
    return contract.get_addresses?.({ case_id: caseId });
  }

  createCaseAction({
    title,
    description,
    ipfs,
    category,
  }:{
    title: string,
    description: string,
    ipfs: string,
    category: string,
  }): Action[] {
    return [
      {
        receiverId: this.contractId,
        functionCalls: [{
          methodName: 'create_case',
          args: {
            case: {
              title,
              description,
              ipfs,
              category,
            },
          },
          amount: ZERO,
        }],
      },
    ];
  }

  createAddressAction({
    chain,
    ipfs,
    address,
    caseId,
  }:{
    chain: string,
    ipfs: string,
    address: string
    caseId: number
  }): Action[] {
    return [
      {
        receiverId: this.contractId,
        functionCalls: [{
          methodName: 'create_address',
          args: {
            case_id: caseId,
            address: {
              chain,
              ipfs,
              address,
            },
          },
          amount: ZERO,
        }],
      },
    ];
  }
}
