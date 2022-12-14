import {
  connect, WalletConnection, Near, keyStores,
} from 'near-api-js';
import { Transaction } from 'near-api-js/lib/transaction';
import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';

import getConfig from 'services/config';
import { createNearTransaction } from 'services/helpers';
import { Action } from 'services/interfaces';
import { useModalStore } from 'shared/providers/ModalProvider';

import { WalletContextType } from './interfaces';

const config = getConfig();

export const initialWalletState: WalletContextType = {
  near: null,
  wallet: null,
  isSignedIn: false,
  accountId: '',
  requestSignIn: () => {},
  signOut: () => {},
  sendTransaction: async () => {},
};

const WalletContextHOC = createContext<WalletContextType>(initialWalletState);

export function WalletProvider({ children }:{ children: JSX.Element }) {
  const { showModal } = useModalStore();

  const [near, setNear] = useState<Near | null>(initialWalletState.near);
  const [wallet, setWallet] = useState<WalletConnection | null>(initialWalletState.wallet);

  useEffect(() => {
    const setupNearConnection = async () => {
      const newNear = await connect({
        ...config,
        headers: {},
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      });
      const newWallet = new WalletConnection(newNear, config.contractId);
      setNear(newNear);
      setWallet(newWallet);
    };

    setupNearConnection();
  }, []);

  const requestSignIn = useCallback(() => wallet?.requestSignIn(config.contractId), [wallet]);

  const isSignedIn = useMemo(() => wallet?.isSignedIn() ?? false, [wallet]);
  const accountId: string = useMemo(() => (isSignedIn ? wallet?.getAccountId() : ''), [isSignedIn, wallet]);

  const signOut = useCallback(() => {

  }, []);

  const sendTransaction = useCallback(async (action: Action[]) => {
    if (!wallet || !near) return;
    const nearTransactions: Transaction[] = await Promise.all(
      createNearTransaction(near, wallet, accountId, action),
    );
    wallet.requestSignTransactions({ transactions: nearTransactions });
  }, [accountId, near, wallet]);

  const walletStore = useMemo(() => ({
    near,
    wallet,
    isSignedIn,
    accountId,
    requestSignIn,
    signOut,
    sendTransaction,
  }), [accountId, isSignedIn, near, requestSignIn, sendTransaction, signOut, wallet]);

  return (
    <WalletContextHOC.Provider value={walletStore}>
      {children}
    </WalletContextHOC.Provider>
  );
}

export const useWalletData = () => useContext(WalletContextHOC);
