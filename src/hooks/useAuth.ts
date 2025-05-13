import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { encryptText } from '@/src/lib/crypt';
import { fetchWithAuth } from '../utils/fetch.util';
import { User } from '@/types/User';

interface UseAuthResult {
  isLoading: boolean;
  errorMessage: string | null;
  openErrorModal: boolean;
  handleLogin: (email: string, pubkey: string) => Promise<void>;
  handleCloseErrorModal: () => void;
}

/**
 * 認証関連の状態と機能を管理するカスタムフック
 */
export const useAuth = (): UseAuthResult => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openErrorModal, setOpenErrorModal] = useState(false);

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
  };

  const loginAndFetchToken = async (email: string, walletAddress: string): Promise<string> => {
    const loginResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/token-exchange-login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, walletAddress }),
      }
    );

    if (!loginResponse.ok) {
      const errorData = await loginResponse.json();
      throw new Error(errorData.message || 'ログインに失敗しました');
    }

    const loginData = await loginResponse.json();
    setCookie('au', loginData.accessToken, { maxAge: 30 * 24 * 60 * 60 });
    setCookie('flag', 'logged_in', { maxAge: 30 * 24 * 60 * 60 });

    return loginData.accessToken;
  };

  const fetchUserProfile = async (): Promise<User> => {
    const userData: User = await fetchWithAuth('/users/profile');
    if (!userData?.email) {
      throw new Error('ユーザープロファイルが無効です');
    }
    return userData;
  };

  const handleLogin = async (email: string, pubkey: string): Promise<void> => {
    if (!email || !pubkey) {
      return;
    }

    setIsLoading(true);

    try {
      const encryptedWalletAddress = await encryptText(pubkey);
      const accessToken = await loginAndFetchToken(email, encryptedWalletAddress);

      if (accessToken) {
        try {
          await fetchUserProfile();
        } catch (profileErr) {
          console.warn('プロファイル取得エラー (ログインは成功):', profileErr);
        }

        setTimeout(() => {
          router.push('/shop');
        }, 300);
      }
    } catch (err: any) {
      console.error('ログインエラー:', err);
      setErrorMessage(err.message || 'ログインに失敗しました');
      setOpenErrorModal(true);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMessage,
    openErrorModal,
    handleLogin,
    handleCloseErrorModal,
  };
};
