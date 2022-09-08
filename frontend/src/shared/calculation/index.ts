import Big from 'big.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { FungibleTokenContract } from 'services/contracts';
import { MICRO_SECOND } from 'shared/constant';
import { parseTokenAmount } from 'shared/utils';

dayjs.extend(duration);

const ORDER_TERRA_GAS = 12;
const BASE = 10;

export const toTGas = (gas: string) => Big(gas).times(Big(BASE).pow(ORDER_TERRA_GAS)).toFixed(0);

export const checkInvalidAmount = (
  balance: string,
  token: FungibleTokenContract | null,
  amount: string,
  currentUserBid: string,
) => {
  if (amount === '') return true;
  if (!token) return false;
  const bidAmountWithDecimals = parseTokenAmount(amount, token?.metadata?.decimals);
  const balanceWithLocked = Big(balance).add(currentUserBid);
  return Big(bidAmountWithDecimals).gt(balanceWithLocked);
};

export const nanosecondsToMilliSeconds = (date: number): number => date / MICRO_SECOND;
