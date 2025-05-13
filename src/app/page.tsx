'use client';

import { Box, Container, Fade, alpha } from '@mui/material';
import Image from 'next/image';
import LoginLogo from '@/public/LoginLogo.png';
import ErrorModal from '../components/ui/Modal/ErrorModal';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LoginCard from '../components/Login/LoginCard';
import FloatingIcon from '../components/Login/FloatingIcon';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { tokenExchangePrimary, tokenExchangeSecondary } from '@/src/styles/styeleConstants';
import { useAnimation } from '../hooks/useAnimation';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  // アニメーション関連の状態を管理
  const { mounted, animateLeft, animateRight } = useAnimation();

  // 認証関連の状態と機能を管理
  const { isLoading, errorMessage, openErrorModal, handleLogin, handleCloseErrorModal } = useAuth();

  // 浮遊アイコンのスタイル
  const walletIconStyle = {
    fontSize: { xs: 30, md: 48 },
    color: alpha(tokenExchangePrimary, 0.8),
  };

  const cartIconStyle = {
    fontSize: { xs: 30, md: 48 },
    color: alpha(tokenExchangeSecondary, 0.8),
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(/Login.gif)',
        backgroundSize: 'cover',
        backgroundPosition: { xs: 'center top', sm: 'center' },
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(2px)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '15%',
          right: '5%',
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, ${alpha(tokenExchangePrimary, 0.15)}, transparent 70%)`,
          zIndex: 0,
          opacity: 0.7,
          animation: 'pulse 8s infinite ease-in-out',
        },
      }}
    >
      {/* ローディングオーバーレイ */}
      <LoadingOverlay isLoading={isLoading} />

      {/* 左側の浮遊アイコン */}
      <FloatingIcon
        icon={<AccountBalanceWalletOutlinedIcon sx={walletIconStyle} />}
        position="left"
        animate={animateLeft}
        color={tokenExchangePrimary}
      />

      {/* 右側の浮遊アイコン */}
      <FloatingIcon
        icon={<ShoppingCartOutlinedIcon sx={cartIconStyle} />}
        position="right"
        animate={animateRight}
        color={tokenExchangeSecondary}
      />

      <Fade in={mounted} timeout={1000}>
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: { xs: '80%', sm: '450px' },
                height: { xs: '150px', sm: '180px' },
                position: 'relative',
                mb: { xs: 3, sm: 4 },
                filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.4))',
                animation: 'logoFloat 6s infinite ease-in-out',
                '@keyframes logoFloat': {
                  '0%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-10px)' },
                  '100%': { transform: 'translateY(0px)' },
                },
              }}
            >
              <Image
                src={LoginLogo}
                alt="BCL Token Exchange"
                fill
                priority
                style={{
                  objectFit: 'contain',
                }}
              />
            </Box>

            <LoginCard onLogin={handleLogin} isLoading={isLoading} />
          </Box>
        </Container>
      </Fade>

      <ErrorModal
        open={openErrorModal}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
      />
    </Box>
  );
};

export default LoginPage;
