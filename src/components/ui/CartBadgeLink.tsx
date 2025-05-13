'use client';
import React, { useEffect } from 'react';
import { Badge, IconButton, Box, alpha } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useCartStore } from '@/src/store/cartStore';
import { gradientBg } from '@/src/styles/styeleConstants';

const CartBadgeLink = () => {
  const { cart, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const itemCount = cart?.cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <Link href="/cart" passHref>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ml: { xs: 1, md: 2 },
          zIndex: 10,
        }}
      >
        <IconButton
          color="inherit"
          sx={{
            width: 45,
            height: 45,
            borderRadius: '12px',
            // 背景色の強化
            background: itemCount > 0 ? gradientBg : 'rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background:
                itemCount > 0 ? 'linear-gradient(90deg, #19c2bb, #3b60e5)' : 'rgba(0, 0, 0, 0.1)',
              transform: 'translateY(-2px)',
              boxShadow:
                itemCount > 0
                  ? '0 4px 10px rgba(29, 215, 208, 0.2), 0 2px 5px rgba(66, 107, 255, 0.2)'
                  : 'none',
            },
            position: 'relative',
            boxShadow:
              itemCount > 0
                ? '0 3px 8px rgba(29, 215, 208, 0.1), 0 1px 3px rgba(66, 107, 255, 0.15)'
                : 'none',
          }}
        >
          <ShoppingCartIcon
            sx={{
              fontSize: '1.6rem',
              // アイコンカラーを白に変更して視認性向上
              color: itemCount > 0 ? 'white' : '#555',
              transition: 'color 0.3s ease',
            }}
          />
          {itemCount > 0 && (
            <Badge
              badgeContent={itemCount}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#ff4757',
                  color: 'white',
                  fontWeight: 'bold',
                  minWidth: '20px',
                  height: '20px',
                  padding: '0 5px',
                  fontSize: '0.75rem',
                  top: 2,
                  right: 2,
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  border: '2px solid white',
                  borderRadius: '10px',
                },
              }}
            />
          )}
        </IconButton>

        {itemCount > 0 && (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '12px',
              background: 'transparent',
              border: '2px solid white',
              opacity: 0.8,
              animation: 'cartPulse 2s infinite',
              '@keyframes cartPulse': {
                '0%': {
                  transform: 'scale(1)',
                  opacity: 0.8,
                },
                '50%': {
                  transform: 'scale(1.1)',
                  opacity: 0.5,
                },
                '100%': {
                  transform: 'scale(1)',
                  opacity: 0.8,
                },
              },
            }}
          />
        )}
      </Box>
    </Link>
  );
};

export default CartBadgeLink;
