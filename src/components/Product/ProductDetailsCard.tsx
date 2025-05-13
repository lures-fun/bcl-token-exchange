'use client';

import { Product } from '@/types/Product';
import { Box, Card, Typography, Button, Snackbar, Alert, alpha, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/src/store/cartStore';
import QuantityInput from '@/src/components/Product/QuantityInput';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { gradientBg } from '@/src/styles/styeleConstants';

const ProductDetailsCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const loading = useCartStore((state) => state.loading);
  const error = useCartStore((state) => state.error);

  const [quantity, setQuantity] = useState<number>(1);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [, setOpenSnackbar] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setOpenSnackbar(true);
    }
  }, [error]);

  const handleBuyNow = async () => {
    if (!product.id) {
      console.error('商品IDが存在しません。');
      return;
    }
    try {
      await addToCart(product.id, quantity);
      router.push('/cart');
    } catch (err: any) {
      console.error('カートに追加できませんでした。', err);
    }
  };

  const handleAddToCart = async () => {
    if (!product.id) {
      console.error('商品IDが存在しません。');
      return;
    }
    try {
      await addToCart(product.id, quantity);
      setSuccessMessage('商品がカートに追加されました。');
      setOpenSnackbar(true);
    } catch (err: any) {
      console.error('カートに追加できませんでした。', err);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSuccessMessage(null);
  };

  return (
    <Card
      elevation={0}
      sx={{
        padding: { xs: '20px', md: '28px' },
        mb: 4,
        borderRadius: '16px',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'visible',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0px 16px 40px rgba(0, 0, 0, 0.12)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: gradientBg,
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        },
      }}
    >
      {/* 商品名 */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 1,
          fontWeight: 700,
          fontSize: { xs: '1.75rem', md: '2rem' },
          lineHeight: 1.3,
        }}
      >
        {product.name}
      </Typography>

      {/* 売り切れバッジ（商品が売り切れの場合） */}
      {product.availableQuantity <= 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: -15,
            right: 20,
            backgroundColor: '#ff4757',
            color: 'white',
            borderRadius: '8px',
            padding: '6px 12px',
            fontWeight: 'bold',
            fontSize: '0.85rem',
            boxShadow: '0 4px 8px rgba(255, 71, 87, 0.25)',
            transform: 'rotate(0deg)',
            zIndex: 1,
          }}
        >
          売り切れ
        </Box>
      )}

      {/* 価格と在庫情報エリア */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          mb: 3,
          mt: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocalOfferOutlinedIcon
            sx={{
              mr: 1,
              color: '#426bff',
              fontSize: '1.5rem',
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: gradientBg,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.8rem', md: '2.2rem' },
            }}
          >
            {product.priceInTokens} <span style={{ fontSize: '0.75em' }}>BBT</span>
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: { xs: 1, sm: 0 },
            backgroundColor: alpha('#f5f5f5', 0.7),
            borderRadius: '8px',
            padding: '6px 12px',
          }}
        >
          {/* 残数表示したい時復活 */}
          {/* <InventoryOutlinedIcon
            sx={{
              mr: 1,
              color: product.availableQuantity > 0 ? '#4caf50' : '#ff4757',
              fontSize: '1.2rem',
            }}
          /> */}
          {/* <Typography
            variant="body2"
            sx={{
              color: product.availableQuantity > 0 ? '#2e7d32' : '#d32f2f',
              fontWeight: 500,
            }}
          >
            {product.availableQuantity > 0 ? `残り ${product.availableQuantity} 点` : '在庫なし'}
          </Typography> */}
        </Box>
      </Box>

      <Divider sx={{ my: 3, opacity: 0.6 }} />

      {/* 商品説明 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            mb: 1,
            color: '#333',
          }}
        >
          商品説明
        </Typography>
        {product.type === 'COUPON' && (
          <Typography
            variant="body1"
            sx={{
              color: alpha('#000', 0.7),
              lineHeight: 1.7,
              fontSize: '1rem',
              mb: 1,
            }}
          >
            このクーポンは各購入につき、一枚のみ利用可能となります
          </Typography>
        )}
        <Typography
          variant="body1"
          sx={{
            color: alpha('#000', 0.7),
            lineHeight: 1.7,
            fontSize: '1rem',
          }}
        >
          {product.description}
        </Typography>
      </Box>

      {/* 数量セレクター */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            mb: 2,
            color: '#333',
          }}
        >
          数量
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: alpha('#f5f5f5', 0.7),
            borderRadius: '12px',
            padding: '12px 16px',
          }}
        >
          <QuantityInput
            value={quantity}
            min={1}
            max={product.availableQuantity}
            onChange={(newValue) => setQuantity(newValue)}
          />

          <Typography
            variant="body2"
            sx={{
              ml: 2,
              color: alpha('#000', 0.6),
              fontWeight: 500,
            }}
          >
            合計:
            <Box
              component="span"
              sx={{
                fontWeight: 700,
                ml: 1,
                color: '#426bff',
              }}
            >
              {product.priceInTokens * quantity} BBT
            </Box>
          </Typography>
        </Box>
      </Box>

      {/* アクションボタン */}
      <Box sx={{ mb: 2 }}>
        {product.availableQuantity > 0 ? (
          <>
            <Button
              variant="contained"
              fullWidth
              startIcon={<ShoppingCartOutlinedIcon />}
              sx={{
                background: gradientBg,
                color: 'white',
                padding: '12px 24px',
                borderRadius: '30px',
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '1rem',
                boxShadow: '0 6px 16px rgba(29, 215, 208, 0.2), 0 2px 6px rgba(66, 107, 255, 0.15)',
                mb: 2.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(90deg, #1ac8c1, #3a5fe6)',
                  boxShadow:
                    '0 8px 24px rgba(29, 215, 208, 0.25), 0 4px 8px rgba(66, 107, 255, 0.2)',
                  transform: 'translateY(-2px)',
                },
                '&:active': {
                  transform: 'translateY(1px)',
                },
                '&:disabled': {
                  background: 'linear-gradient(90deg, #a0e9e6, #a8b8eb)',
                  color: 'white',
                },
              }}
              onClick={handleAddToCart}
              disabled={loading}
            >
              {loading ? '追加中...' : 'カートに追加する'}
            </Button>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<FlashOnOutlinedIcon />}
              sx={{
                borderColor: '#426bff',
                color: '#426bff',
                padding: '11px 24px',
                borderRadius: '30px',
                fontWeight: '600',
                textTransform: 'none',
                fontSize: '1rem',
                borderWidth: '2px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: alpha('#426bff', 0.05),
                  borderColor: '#1dd7d0',
                  color: '#1dd7d0',
                  borderWidth: '2px',
                  transform: 'translateY(-2px)',
                },
                '&:active': {
                  transform: 'translateY(1px)',
                },
              }}
              onClick={handleBuyNow}
            >
              今すぐ購入
            </Button>
          </>
        ) : (
          <Box
            sx={{
              padding: '16px',
              backgroundColor: alpha('#ff4757', 0.1),
              borderRadius: '12px',
              textAlign: 'center',
              mt: 2,
              border: `1px solid ${alpha('#ff4757', 0.2)}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#ff4757',
              }}
            >
              申し訳ありません、この商品は売り切れです
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: alpha('#000', 0.6),
                mt: 1,
              }}
            >
              また次回入荷をお待ちください
            </Typography>
          </Box>
        )}
      </Box>

      {/* Snackbar通知 */}
      <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default ProductDetailsCard;
