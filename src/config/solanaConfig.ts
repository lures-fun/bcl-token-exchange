import { NokeyWalletAdapter } from '@nokey-wallet/adapter';

export const SolanaConfig = {
  RPC_URL: process.env.NEXT_PUBLIC_SOLANA_RPC_URL!,
  ENCRYPT_KEY: process.env.NEXT_PUBLIC_ENCRYPT_KEY!,
  TOKEN_ADDRESS: process.env.NEXT_PUBLIC_TOKEN_ADDRESS!,
  TOKEN_DECIMALS: process.env.NEXT_PUBLIC_TOKEN_DECIMALS! as unknown as number,
  FEE_PAYER_PUBKEY: process.env.NEXT_PUBLIC_FEE_PAYER_PUBKEY!,
};

// NokeyWalletAdapterのインスタンスを作成
export const nokeyWalletInstance = new NokeyWalletAdapter(
  SolanaConfig.RPC_URL,
  SolanaConfig.ENCRYPT_KEY
);
