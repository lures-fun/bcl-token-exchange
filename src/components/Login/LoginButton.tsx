import { useState } from 'react';
import { Box } from '@mui/material';
import {
  GoogleWalletFounder,
  GoogleRestoreWallet,
  GoogleRestoreResponse,
} from '@nokey-wallet/adapter';
import StylishLoader from '../ui/StylishLoader';

interface LoginButtonProps {
  onLogin: (email: string, pubkey: string) => Promise<void>;
  isLoading: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onLogin, isLoading }) => {
  const [isEnable] = useState(false);

  const handleOk = (ok: GoogleRestoreResponse) => {
    const email = ok.userInfo.email;
    const pubkey = ok.pubkey;

    onLogin(email, pubkey).catch((err) => {
      console.error('Error in onLogin callback:', err);
    });
  };

  const handleError = (err: Error) => {
    console.error('Login error:', err);
    onLogin('', '').catch((err) => console.error('Error in onLogin callback:', err));
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: '16px',
        backgroundColor: 'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        transform: 'scale(1.1)',
        my: 1,
        position: 'relative',
        zIndex: 1,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.12)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
        },
        // ローディング中は操作を無効化
        pointerEvents: isLoading ? 'none' : 'auto',
        opacity: isLoading ? 0.7 : 1,
      }}
    >
      {isLoading ? (
        <StylishLoader size={36} />
      ) : (
        <GoogleWalletFounder clientId={process.env.NEXT_PUBLIC_CLIENT_ID!}>
          <GoogleRestoreWallet
            onOk={handleOk}
            onErr={handleError}
            useOneTap={isEnable}
            shape="pill"
            auto_select
          />
        </GoogleWalletFounder>
      )}
    </Box>
  );
};

export default LoginButton;
