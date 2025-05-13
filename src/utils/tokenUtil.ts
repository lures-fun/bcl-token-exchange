import { NokeyWalletAdapter } from '@nokey-wallet/adapter';
import type { WalletAdapter } from '@solana/wallet-adapter-base';
import {
  Connection,
  PublicKey,
  type TransactionInstruction,
  ComputeBudgetProgram,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import {
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
} from '@solana/spl-token';
import { nokeyWalletInstance, SolanaConfig } from '../config/solanaConfig';

const COMMITMENT = 'confirmed';
const CONFIRMATION_TIMEOUT_SEC = 30000;
const PRIORITY_FEE_LAMPORTS = 110000;

export const fetchTokenBalance = async () => {
  const mintAddress = SolanaConfig.TOKEN_ADDRESS;
  await nokeyWalletInstance.connect();

  const tokenBalance =
    (await nokeyWalletInstance.wallet.getTokenBalance({
      mintAddress,
      walletAddress: nokeyWalletInstance.publicKey?.toString() ?? '',
      isTokenExtension: true,
    })) ?? '0';

  return tokenBalance;
};

export const sendTokenNokey = async (
  rpcUrl: string,
  walletAdapter: NokeyWalletAdapter,
  mintPubkey: string,
  toPubkey: string,
  feePayerPubkey: string,
  decimals: number,
  amount: number
): Promise<any> => {
  try {
    const connection = new Connection(rpcUrl, {
      commitment: COMMITMENT,
      confirmTransactionInitialTimeout: CONFIRMATION_TIMEOUT_SEC,
    });

    await walletAdapter.connect();
    const { transaction } = await prepareSendToken(
      connection,
      walletAdapter,
      mintPubkey,
      toPubkey,
      feePayerPubkey,
      decimals,
      amount
    );

    const offlineTransaction = await walletAdapter.wallet.offlineTransaction(transaction);
    return offlineTransaction;
  } catch (error) {
    console.error('Failed. sendTokenNokey', error);
    throw error;
  }
};

const prepareSendToken = async (
  connection: Connection,
  walletAdapter: WalletAdapter,
  mintPubkey: string,
  toPubkey: string,
  feePayerPubkey: string,
  decimals: number,
  amount: number
): Promise<{
  latestBlockhash: {
    blockhash: string;
    lastValidBlockHeight: number;
  };
  transaction: VersionedTransaction;
}> => {
  try {
    await walletAdapter.connect();

    if (!walletAdapter.connecting && !walletAdapter.connected) {
      throw new Error('Wallet is not connected');
    }
    const tokenMint = new PublicKey(mintPubkey);
    const toAddress = new PublicKey(toPubkey);
    const fromWallet =
      walletAdapter.publicKey ??
      (() => {
        throw new Error('Wallet publicKey not connected');
      })();
    const feePayer = new PublicKey(feePayerPubkey);

    const [fromTokenAccount, toTokenAccount] = await Promise.all([
      getAssociatedTokenAddress(
        tokenMint,
        fromWallet,
        false,
        await fetchTokenProgramId(connection, tokenMint)
      ),
      getAssociatedTokenAddress(
        tokenMint,
        toAddress,
        false,
        await fetchTokenProgramId(connection, tokenMint)
      ),
    ]);

    const [toAccountInfo, latestBlockhash] = await Promise.all([
      connection.getAccountInfo(toTokenAccount),
      connection.getLatestBlockhash(COMMITMENT),
    ]);

    let createRecipientAccountInst: TransactionInstruction | null = null;
    if (toAccountInfo === null) {
      createRecipientAccountInst = createAssociatedTokenAccountInstruction(
        feePayer,
        toTokenAccount,
        toAddress,
        tokenMint,
        await fetchTokenProgramId(connection, tokenMint)
      );
    }

    const addPriorityFeeInstruction = ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: PRIORITY_FEE_LAMPORTS,
    });

    const transferInstruction = createTransferCheckedInstruction(
      fromTokenAccount,
      tokenMint,
      toTokenAccount,
      fromWallet,
      calculateAmount(amount, decimals),
      decimals,
      [],
      await fetchTokenProgramId(connection, tokenMint)
    );

    const instructions = [addPriorityFeeInstruction];
    createRecipientAccountInst && instructions.push(createRecipientAccountInst);

    const message = new TransactionMessage({
      payerKey: feePayer,
      recentBlockhash: latestBlockhash.blockhash,
      instructions: [...instructions, transferInstruction],
    }).compileToV0Message();

    const transaction = new VersionedTransaction(message);
    return {
      transaction,
      latestBlockhash,
    };
  } catch (error) {
    throw new Error(`# [prepareSendToken] Error:  ${error}`);
  }
};

const fetchTokenProgramId = async (
  connection: Connection,
  mintAddress: PublicKey
): Promise<PublicKey> => {
  const accountInfo = await connection.getAccountInfo(mintAddress);

  if (!accountInfo) {
    throw new Error('Mint account not found');
  }

  if (accountInfo.owner.equals(TOKEN_PROGRAM_ID)) {
    return TOKEN_PROGRAM_ID;
  }
  if (accountInfo.owner.equals(TOKEN_2022_PROGRAM_ID)) {
    return TOKEN_2022_PROGRAM_ID;
  }

  throw new Error('Unknown token program');
};

const calculateAmount = (amount: number, decimals: number): number => {
  return amount * 10 ** decimals;
};
