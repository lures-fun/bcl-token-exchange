import { fetchWithAuth } from '@/src/utils/fetch.util';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart } from '@/types/Cart';
import { CartItem } from '@/types/CartItem';

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateCartItem: (cartItemId: string, quantity: number) => Promise<void>;
  fetchCart: () => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      loading: false,
      error: null,

      fetchCart: async () => {
        set({ loading: true, error: null });
        try {
          const data: Cart = await fetchWithAuth<Cart>(`/token-exchange/cart`);
          set({ cart: data, loading: false });
        } catch (err: any) {
          if (err.status === 404) {
            try {
              const newCart: Cart = await fetchWithAuth<Cart>('/token-exchange/cart', {
                method: 'POST',
                body: JSON.stringify({ status: 'active' }),
              });
              set({ cart: newCart, loading: false });
            } catch (createErr: any) {
              set({ error: createErr.message || 'カートの作成に失敗しました。', loading: false });
            }
          } else {
            set({ error: err.message || 'カートの取得に失敗しました。', loading: false });
          }
        }
      },

      addToCart: async (productId: string, quantity: number) => {
        set({ loading: true, error: null });
        try {
          await fetchWithAuth<{ message: string; cartItem: CartItem }>('/token-exchange/cart/add', {
            method: 'POST',
            body: JSON.stringify({
              productId,
              quantity,
              status: 'active',
            }),
          });
          await get().fetchCart(); // カートを再取得して状態を更新
        } catch (err: any) {
          console.error('サーバー', err);
          const errorMessage = err.data.message || 'カートへの追加に失敗しました。';
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ loading: false });
        }
      },

      removeFromCart: async (cartItemId: string) => {
        set({ loading: true, error: null });
        try {
          await fetchWithAuth<void>(`/token-exchange/cart/items/${cartItemId}`, {
            method: 'DELETE',
          });
          await get().fetchCart(); // カートを再取得して状態を更新
        } catch (err: any) {
          console.error('Cart item remove error:', err);
          const errorMessage =
            err.data?.message ||
            (typeof err.data === 'string' ? err.data : null) ||
            err.message ||
            'カートアイテムの削除に失敗しました。';
          set({ error: errorMessage, loading: false });
          throw err; // エラーを上位コンポーネントに伝播
        } finally {
          set({ loading: false });
        }
      },

      updateCartItem: async (cartItemId: string, quantity: number) => {
        set({ loading: true, error: null });
        try {
          await fetchWithAuth<CartItem>(`/token-exchange/cart/items/${cartItemId}`, {
            method: 'PATCH',
            body: JSON.stringify({ quantity }),
          });
          await get().fetchCart(); // カートを再取得して状態を更新
        } catch (err: any) {
          // APIから返されたエラーメッセージを詳細に取得
          console.error('Cart item update error:', err);

          // err.dataが存在し、messageが含まれている場合はそれを使用
          const errorMessage =
            err.data?.message ||
            (typeof err.data === 'string' ? err.data : null) ||
            err.message ||
            'カートアイテムの更新に失敗しました。';

          set({ error: errorMessage, loading: false });
          throw err; // 元のエラーオブジェクトをそのまま伝播
        } finally {
          set({ loading: false });
        }
      },

      // カートをクリアするメソッド
      clearCart: () => set({ cart: null }),
    }),
    {
      name: 'cart-storage', // 一意の名前
      partialize: (state) => ({ cart: state.cart }), // 必要な部分のみを永続化
    }
  )
);
