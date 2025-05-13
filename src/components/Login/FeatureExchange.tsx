import { Box, Typography, alpha } from '@mui/material';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { tokenExchangePrimary, tokenExchangeSecondary } from '@/src/styles/styeleConstants';

const FeatureExchange = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mb: 4,
        background: alpha('#f8f9fa', 0.5),
        borderRadius: 2,
        py: 2,
        px: 3,
        border: '1px solid rgba(0, 0, 0, 0.05)',
        position: 'relative',
      }}
    >
      {/* Content */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* BBT */}
        <Box sx={{ textAlign: 'center', flex: 1 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '14px',
              mb: 1,
              background: alpha(tokenExchangePrimary, 0.15),
              border: `1px solid ${alpha(tokenExchangePrimary, 0.3)}`,
              boxShadow: '0 4px 16px rgba(29, 215, 208, 0.15)',
            }}
          >
            <AccountBalanceWalletOutlinedIcon sx={{ color: tokenExchangePrimary, fontSize: 24 }} />
          </Box>
          <Typography
            variant="caption"
            sx={{ color: '#555', display: 'block', fontWeight: 600, fontSize: '0.8rem' }}
          >
            BBT
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'relative',
            width: '100px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* 背景円 */}
          <Box
            sx={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${alpha(tokenExchangePrimary, 0.1)}, ${alpha(tokenExchangeSecondary, 0.1)})`,
              border: `1px solid ${alpha('#fff', 0.3)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 4px 12px ${alpha('#000', 0.08)}`,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* メイン交換アイコン */}
            <SwapHorizIcon
              sx={{
                color: alpha('#000', 0.7),
                fontSize: 28,
                animation: 'pulse 2s infinite ease-in-out',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.1)' },
                  '100%': { transform: 'scale(1)' },
                },
              }}
            />
          </Box>

          {/* 左から右への矢印線 */}
          <Box
            sx={{
              position: 'absolute',
              top: '35%',
              left: '0',
              right: '0',
              height: '2px',
              background: `linear-gradient(to right, ${tokenExchangePrimary}, ${tokenExchangeSecondary})`,
              zIndex: 0,
            }}
          />

          {/* 右から左への矢印線 */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '35%',
              left: '0',
              right: '0',
              height: '2px',
              background: `linear-gradient(to left, ${tokenExchangePrimary}, ${tokenExchangeSecondary})`,
              zIndex: 0,
            }}
          />

          {/* 左から右の矢印ポイント */}
          <Box
            sx={{
              position: 'absolute',
              top: '32%',
              right: '8px',
              width: 0,
              height: 0,
              borderTop: '4px solid transparent',
              borderBottom: '4px solid transparent',
              borderLeft: `8px solid ${tokenExchangeSecondary}`,
              animation: 'moveRight 2s infinite ease-in-out',
              '@keyframes moveRight': {
                '0%': { transform: 'translateX(-5px)' },
                '50%': { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(-5px)' },
              },
            }}
          />

          {/* 右から左の矢印ポイント */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '32%',
              left: '8px',
              width: 0,
              height: 0,
              borderTop: '4px solid transparent',
              borderBottom: '4px solid transparent',
              borderRight: `8px solid ${tokenExchangePrimary}`,
              animation: 'moveLeft 2s infinite ease-in-out',
              '@keyframes moveLeft': {
                '0%': { transform: 'translateX(5px)' },
                '50%': { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(5px)' },
              },
            }}
          />
        </Box>

        {/* クーポン */}
        <Box sx={{ textAlign: 'center', flex: 1 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '14px',
              mb: 1,
              background: alpha(tokenExchangeSecondary, 0.15),
              border: `1px solid ${alpha(tokenExchangeSecondary, 0.3)}`,
              boxShadow: '0 4px 16px rgba(66, 107, 255, 0.15)',
            }}
          >
            <LocalOfferOutlinedIcon sx={{ color: tokenExchangeSecondary, fontSize: 24 }} />
          </Box>
          <Typography
            variant="caption"
            sx={{ color: '#555', display: 'block', fontWeight: 600, fontSize: '0.8rem' }}
          >
            Shopifyクーポンなど
          </Typography>
        </Box>
      </Box>

      <Typography
        variant="caption"
        align="center"
        sx={{
          mt: 2,
          color: alpha('#000', 0.6),
          fontSize: '0.75rem',
          maxWidth: '90%',
          mx: 'auto',
        }}
      >
        BBTを使って様々な特典と交換できます
      </Typography>
    </Box>
  );
};

export default FeatureExchange;
