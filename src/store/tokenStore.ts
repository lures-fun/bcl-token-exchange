import { create } from 'zustand';
import { fetchTokenBalance } from '@/src/utils/tokenUtil';

interface TokenState {
  tokenBalance: string | null;
  isLoading: boolean;
  fetchBalance: () => Promise<void>;
  clearTokenBalance: () => void;
}

export const useTokenStore = create<TokenState>((set, get) => ({
  tokenBalance: null,
  isLoading: false,

  fetchBalance: async () => {
    const { tokenBalance, isLoading } = get();

    if (tokenBalance !== null || isLoading) {
      return;
    }

    set({ isLoading: true });

    try {
      const balance = await fetchTokenBalance();
      set({ tokenBalance: balance });
    } catch (error) {
      console.error('Error fetching token balance:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  clearTokenBalance: () => set({ tokenBalance: null }),
}));
