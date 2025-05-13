import { Box, Typography, Paper, alpha } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  gradientBg,
  tokenExchangePrimary,
  tokenExchangeSecondary,
} from '@/src/styles/styeleConstants';
import FeatureExchange from '@/src/components/Login/FeatureExchange';
import LoginButton from '@/src/components/Login/LoginButton';

interface LoginCardProps {
  onLogin: (email: string, pubkey: string) => Promise<void>;
  isLoading: boolean;
}

const LoginCard: React.FC<LoginCardProps> = ({ onLogin, isLoading }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: '105%',
        p: { xs: 3, sm: 4 },
        borderRadius: '24px',
        backgroundColor: alpha('#fff', 0.85),
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
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
      {/* Site description text */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: gradientBg,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          BBT交換所へようこそ
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#444',
            mb: 2,
            fontSize: '0.9rem',
            lineHeight: 1.6,
          }}
        >
          BCL Exchangeは、Blockchain Luresが運営するBBTの交換所です。
          <br />
          獲得したトークンとお好きな特典を交換することができます。
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 2,
            px: 3,
            mx: 'auto',
            maxWidth: '90%',
            borderRadius: '12px',
            backgroundColor: alpha('#f5f5f5', 0.7),
            border: '1px solid rgba(0, 0, 0, 0.05)',
            mb: 3,
          }}
        >
          <LockOutlinedIcon sx={{ mr: 1.5, color: tokenExchangeSecondary }} />
          <Typography
            variant="body2"
            fontSize={13}
            sx={{
              color: '#555',
              fontWeight: 500,
            }}
          >
            安全なログインのためにGoogleアカウントをご利用ください
          </Typography>
        </Box>
      </Box>

      <FeatureExchange />

      <LoginButton onLogin={onLogin} isLoading={isLoading} />

      <Typography
        variant="caption"
        align="center"
        sx={{
          display: 'block',
          mt: 2.5,
          color: alpha('#000', 0.5),
          px: 1,
          lineHeight: 1.5,
          fontSize: '0.65rem',
        }}
      >
        ※ ログインすることで、
        <Box
          component="a"
          href="https://www.blockchain-lures.com/kiyaku/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: tokenExchangeSecondary,
            fontWeight: 600,
            textDecoration: 'underline',
            textDecorationColor: alpha(tokenExchangeSecondary, 0.5),
            textUnderlineOffset: '2px',
            position: 'relative',
            padding: '0 1px',
            fontSize: '0.6rem',
            transition: 'all 0.3s ease',
            '&:hover': {
              color: tokenExchangePrimary,
              textDecorationColor: tokenExchangePrimary,
              backgroundColor: alpha(tokenExchangePrimary, 0.05),
            },
          }}
        >
          サービス利用規約
        </Box>
        および
        <Box
          component="a"
          href="https://www.blockchain-lures.com/privacy_policy/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: tokenExchangeSecondary,
            fontWeight: 600,
            textDecoration: 'underline',
            textDecorationColor: alpha(tokenExchangeSecondary, 0.5),
            textUnderlineOffset: '2px',
            position: 'relative',
            padding: '0 1px',
            transition: 'all 0.3s ease',
            '&:hover': {
              color: tokenExchangePrimary,
              textDecorationColor: tokenExchangePrimary,
              backgroundColor: alpha(tokenExchangePrimary, 0.05),
            },
          }}
        >
          プライバシーポリシー
        </Box>
        に同意したものとみなされます。
      </Typography>
    </Paper>
  );
};

export default LoginCard;
