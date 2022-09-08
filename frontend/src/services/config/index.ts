export default function getConfig(
  env: string | undefined = process.env.REACT_APP_NEAR_ENV,
) {
  switch (env) {
    case 'development':
    case 'testnet':
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
        contractId: 'antif.migration.testnet',
        api: 'https://research.hapilabs.one/v1/track',
        wNearAddress: 'wrap.testnet',
      };
    default:
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
        explorerUrl: 'https://explorer.mainnet.near.org',
        contractId: '',
        api: 'https://research.hapilabs.one/v1/track',
        wNearAddress: 'wrap.near',
      };
  }
}
