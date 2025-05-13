import React from 'react';
import { Box, Card, Divider, Typography, Button, alpha, Paper, useTheme } from '@mui/material';
import LoadingWithProgress from '@/src/components/ui/progressLoading';
import { CartItem } from '@/types/CartItem';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { gradientBg } from '@/src/styles/styeleConstants';
interface OrderSummaryCardProps {
  cartItems: CartItem[];
  calculateTotal: () => number;
  tokenBalance: number;
  isTokenBalanceLoading: boolean;
  isProcessing: boolean;
  onCheckout: () => void;
}

const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  cartItems,
  calculateTotal,
  tokenBalance,
  isTokenBalanceLoading,
  isProcessing,
  onCheckout,
}) => {
  // 残高が足りているかチェック
  const hasEnoughBalance = tokenBalance >= calculateTotal();
  const remainingBalance = tokenBalance - calculateTotal();

  return (
    <Card
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        backgroundColor: 'white',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: gradientBg,
        },
      }}
    >
      {/* タイトル */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <ReceiptLongOutlinedIcon
          sx={{
            color: '#426bff',
            mr: 1.5,
            fontSize: '1.5rem',
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#333',
          }}
        >
          注文概要
        </Typography>
      </Box>

      {/* カート商品一覧 */}
      <Box sx={{ mb: 3 }}>
        {cartItems.map((item) => {
          const unitPrice = item.product.priceInTokens;
          const quantity = item.quantity;
          const lineTotal = unitPrice * quantity;
          return (
            <Paper
              key={item.id}
              elevation={0}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1.5,
                p: 2,
                borderRadius: '12px',
                backgroundColor: alpha('#f5f5f5', 0.6),
                transition: 'all 0.2s ease',
                border: '1px solid rgba(0, 0, 0, 0.03)',
                '&:hover': {
                  backgroundColor: alpha('#f5f5f5', 0.9),
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              <Box sx={{ maxWidth: '70%' }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: '#333',
                    mb: 0.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {item.product.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalOfferOutlinedIcon
                    sx={{
                      color: '#426bff',
                      fontSize: '0.85rem',
                      mr: 0.5,
                      opacity: 0.8,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: alpha('#000', 0.6),
                      fontSize: '0.8rem',
                    }}
                  >
                    {unitPrice} BBT × {quantity}
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 700,
                  background: gradientBg,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {lineTotal} <span style={{ fontSize: '0.8rem' }}>BBT</span>
              </Typography>
            </Paper>
          );
        })}
      </Box>

      <Divider
        sx={{
          my: 2.5,
          borderStyle: 'dashed',
          borderColor: alpha('#000', 0.1),
        }}
      />

      {/* 合計金額 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          py: 1,
          px: 2,
          borderRadius: '12px',
          backgroundColor: alpha('#f5f5f5', 0.7),
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#333',
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
          }}
        >
          Summary BBT
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            background: gradientBg,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '1.3rem', sm: '1.5rem' },
          }}
        >
          {calculateTotal()} <span style={{ fontSize: '0.8rem' }}>BBT</span>
        </Typography>
      </Box>

      {/* トークン残高 */}
      <Box
        sx={{
          mb: 3,
          p: 2,
          borderRadius: '12px',
          backgroundColor: alpha('#f0f8ff', 0.6),
          border: '1px solid rgba(66, 107, 255, 0.1)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 2,
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              minWidth: 0,
            }}
          >
            <AccountBalanceWalletOutlinedIcon
              sx={{
                color: '#426bff',
                fontSize: '1.1rem',
                mr: 0.75,
                flexShrink: 0,
              }}
            />
            <Typography
              variant="body2"
              noWrap
              sx={{
                color: '#333',
                fontWeight: 500,
                fontSize: '0.825rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              利用可能なトークン
            </Typography>
          </Box>

          {isTokenBalanceLoading ? (
            <LoadingWithProgress />
          ) : (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#426bff',
                fontSize: '1.1rem',
              }}
            >
              {tokenBalance} <span style={{ fontSize: '0.8rem' }}>BBT</span>
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 1, borderColor: alpha('#426bff', 0.1) }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: hasEnoughBalance ? '#333' : '#ff4757',
            }}
          >
            購入後の残高
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: hasEnoughBalance ? '#2ecc71' : '#ff4757',
              fontSize: '1.2rem',
            }}
          >
            {remainingBalance} <span style={{ fontSize: '0.8rem' }}>BBT</span>
          </Typography>
        </Box>
      </Box>

      {/* 残高不足の警告 */}
      {!hasEnoughBalance && (
        <Box
          sx={{
            p: 2,
            mb: 3,
            borderRadius: '12px',
            backgroundColor: alpha('#ff4757', 0.1),
            border: `1px solid ${alpha('#ff4757', 0.2)}`,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#ff4757',
              fontWeight: 500,
              fontSize: '0.85rem',
            }}
          >
            トークン残高が不足しています。チェックアウトを続行するには、より多くのトークンが必要です。
          </Typography>
        </Box>
      )}

      {/* チェックアウトボタン */}
      <Button
        variant="contained"
        fullWidth
        startIcon={<ShoppingCartCheckoutIcon />}
        sx={{
          background: gradientBg,
          color: 'white',
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 'bold',
          borderRadius: '30px',
          boxShadow: '0 8px 16px rgba(29, 215, 208, 0.2), 0 2px 8px rgba(66, 107, 255, 0.2)',
          textTransform: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'linear-gradient(90deg, #19c2bb, #3b60e5)',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 20px rgba(29, 215, 208, 0.3), 0 3px 10px rgba(66, 107, 255, 0.25)',
          },
          '&:disabled': {
            background: 'linear-gradient(90deg, #a0e9e6, #a8b8eb)',
            color: 'white',
          },
        }}
        onClick={onCheckout}
        disabled={isProcessing || !hasEnoughBalance}
      >
        {isProcessing ? 'Processing...' : 'CheckOut'}
      </Button>
    </Card>
  );
};

export default OrderSummaryCard;
