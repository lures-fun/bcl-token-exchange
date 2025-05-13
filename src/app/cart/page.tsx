'use client';

import React, { useEffect, useState } from 'react';
import { Grid, Snackbar, Alert, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import ErrorModal from '@/src/components/ui/Modal/ErrorModal';
import { fetchWithAuth } from '@/src/utils/fetch.util';
import CartTableHeader from '@/src/components/cart/CartTableHeader';
import CartItemCard from '@/src/components/cart/CartItemCard';
import OrderSummaryCard from '@/src/components/cart/OrderSummaryCard';
import { useCartStore } from '@/src/store/cartStore';
import { useTokenStore } from '@/src/store/tokenStore';
import { sendTokenNokey } from '@/src/utils/tokenUtil';
import ConfirmPaymentDialog from '@/src/components/ui/Dialog/ConfirmPaymentDialog';
import StylishLoader from '@/src/components/ui/StylishLoader';
import CartPageHeader from '@/src/components/cart/CartHeader';
import EmptyCart from '@/src/components/cart/EmptyCart';
import { nokeyWalletInstance, SolanaConfig } from '@/src/config/solanaConfig';

const SOLANA_RPC_URL = SolanaConfig.RPC_URL;
const nokeyWallet = nokeyWalletInstance;
const mintAddress = SolanaConfig.TOKEN_ADDRESS;
const decimals = SolanaConfig.TOKEN_DECIMALS;
const feePayerPubkey = SolanaConfig.FEE_PAYER_PUBKEY;

export default function CartPage() {
  const router = useRouter();
  const { cart, fetchCart, updateCartItem, removeFromCart, clearCart } = useCartStore();
  const { tokenBalance, isLoading: tokenLoading, fetchBalance } = useTokenStore();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [tempQuantities, setTempQuantities] = useState<{ [key: string]: number }>({});
  const [updatingItems, setUpdatingItems] = useState<{ [key: string]: boolean }>({});

  const cartItems = cart?.cartItems ?? [];

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const handleQuantityInputChange = (itemId: string, value: string) => {
    const parsed = parseInt(value, 10);
    const validated = isNaN(parsed) || parsed < 1 ? 1 : parsed;
    setTempQuantities((prev) => ({ ...prev, [itemId]: validated }));
  };

  const handleQuantityBlur = async (itemId: string) => {
    const newQuantity = tempQuantities[itemId];
    const currentItem = cartItems.find((item) => item.id === itemId);
    if (newQuantity !== undefined && currentItem && newQuantity !== currentItem.quantity) {
      await handleQuantityChange(itemId, newQuantity);
    }
  };

  // 数量を直接増加させる関数
  const handleDirectIncrement = async (itemId: string) => {
    const currentItem = cartItems.find((item) => item.id === itemId);
    if (currentItem) {
      try {
        const newQuantity = currentItem.quantity + 1;
        await handleQuantityChange(itemId, newQuantity);
      } catch (error) {
        // handleQuantityChange内でエラー処理されるので、ここでは何もしない
        console.error('Increment quantity failed:', error);
      }
    }
  };

  // 数量を直接減少させる関数
  const handleDirectDecrement = async (itemId: string) => {
    const currentItem = cartItems.find((item) => item.id === itemId);
    if (currentItem && currentItem.quantity > 1) {
      try {
        const newQuantity = currentItem.quantity - 1;
        await handleQuantityChange(itemId, newQuantity);
      } catch (error) {
        // handleQuantityChange内でエラー処理されるので、ここでは何もしない
        console.error('Decrement quantity failed:', error);
      }
    }
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      setErrorMessage('数量は1以上にしてください。');
      setOpenErrorModal(true);
      return;
    }

    // 更新中フラグを設定
    setUpdatingItems((prev) => ({ ...prev, [itemId]: true }));

    try {
      await updateCartItem(itemId, newQuantity);
      setSuccessMessage('数量を更新しました。');
      setOpenSnackbar(true);
      setTempQuantities((prev) => {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      });
    } catch (error: any) {
      console.error('Failed to update quantity:', error);
      // APIから返されたエラーメッセージを取得して表示
      const errorMsg = error.data?.message || '数量の更新に失敗しました。';
      setErrorMessage(errorMsg);
      setOpenErrorModal(true);
      throw error;
    } finally {
      // 更新中フラグを解除
      setUpdatingItems((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
      setSuccessMessage('商品をカートから削除しました。');
      setOpenSnackbar(true);
    } catch (error: any) {
      console.error('Failed to remove item:', error);
      // APIから返されたエラーメッセージを取得して表示
      const errorMsg = error.data?.message || '商品の削除に失敗しました。';
      setErrorMessage(errorMsg);
      setOpenErrorModal(true);
    }
  };

  const handleExchangeButtonClick = async () => {
    await setOpenConfirmDialog(true);
  };

  const handleConfirmPayment = async () => {
    setOpenConfirmDialog(false);
    await handleCheckout();
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const orderData = await fetchWithAuth<{ id: string }>('/token-exchange/orders', {
        method: 'POST',
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });
      const { id: orderId } = orderData;

      const totalTokens = cartItems.reduce(
        (total, item) => total + item.product.priceInTokens * item.quantity,
        0
      );

      const offlineTransaction = await sendTokenNokey(
        SOLANA_RPC_URL,
        nokeyWallet,
        mintAddress,
        feePayerPubkey,
        feePayerPubkey,
        decimals,
        totalTokens
      );

      const transactionId = offlineTransaction.message;

      const checkoutData = await fetchWithAuth<{ totalTokens: number; productName: string }>(
        '/token-exchange/checkout',
        {
          method: 'POST',
          body: JSON.stringify({
            orderId,
            tokenAmount: totalTokens,
            solanaTransactionId: transactionId,
            offlineTransaction: offlineTransaction,
          }),
        }
      );

      sessionStorage.setItem('checkoutCompleted', 'true');
      clearCart();
      await router.push(`/cart/complete?totalTokens=${checkoutData.totalTokens}`);
    } catch (error: any) {
      let message = '予期しないエラーが発生しました。';
      if (error.data && error.data.message) {
        message = error.data.message;
      } else if (error.message) {
        message = error.message;
      }
      setErrorMessage(message);
      setOpenErrorModal(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTotal = (): number => {
    return cartItems.reduce((total, item) => total + item.product.priceInTokens * item.quantity, 0);
  };

  if (!cart) {
    return <StylishLoader />;
  }

  if (cartItems.length === 0) {
    return (
      <Container>
        <CartPageHeader />
        <EmptyCart />
      </Container>
    );
  }

  return (
    <>
      <Container>
        <CartPageHeader />
        <Grid container spacing={4}>
          {/* カートアイテム一覧 */}
          <Grid item xs={12} md={8}>
            <CartTableHeader />
            {cartItems.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                tempQuantity={
                  tempQuantities[item.id] !== undefined ? tempQuantities[item.id] : item.quantity
                }
                onQuantityInputChange={handleQuantityInputChange}
                onQuantityBlur={handleQuantityBlur}
                onRemove={handleRemoveItem}
                isUpdating={updatingItems[item.id] || false}
                onDirectIncrement={handleDirectIncrement}
                onDirectDecrement={handleDirectDecrement}
              />
            ))}
          </Grid>
          {/* 注文サマリー */}
          <Grid item xs={12} md={4}>
            <OrderSummaryCard
              cartItems={cartItems}
              calculateTotal={calculateTotal}
              tokenBalance={Number(tokenBalance)}
              isTokenBalanceLoading={tokenLoading}
              isProcessing={isProcessing}
              onCheckout={handleExchangeButtonClick}
            />
          </Grid>
        </Grid>
      </Container>
      <ErrorModal
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
        errorMessage={errorMessage}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
      {/* 確認ダイアログ */}
      <ConfirmPaymentDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={handleConfirmPayment}
        sendAmount={`${calculateTotal()} BBT`}
      />
    </>
  );
}
