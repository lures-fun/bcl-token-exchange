import React from 'react';
import { Menu, MenuItem, Typography, Box, Divider, alpha } from '@mui/material';
import Link from 'next/link';
import { Page } from '@/types/Header';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import TokenOutlinedIcon from '@mui/icons-material/TokenOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { gradientBg } from '@/src/styles/styeleConstants';

interface NavMenuProps {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  open: boolean;
  items: Page[];
  tokenBalance: string | null;
  isLoading?: boolean;
  handleOpenAbout: () => void;
}

const getIconForItem = (name: string) => {
  switch (name.toLowerCase()) {
    case 'products':
      return <StorefrontOutlinedIcon fontSize="small" />;
    case 'bcl app':
      return <AccountBalanceWalletOutlinedIcon fontSize="small" />;
    case 'bcl shop':
      return <ShoppingCartOutlinedIcon fontSize="small" />;
    case 'contact':
      return <ContactMailOutlinedIcon fontSize="small" />;
    case 'history':
      return <HistoryOutlinedIcon fontSize="small" />;
    default:
      return null;
  }
};

const NavMenu: React.FC<NavMenuProps> = ({
  anchorEl,
  handleClose,
  open,
  items,
  tokenBalance,
  isLoading,
  handleOpenAbout,
}) => {
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={handleClose}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiPaper-root': {
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          mt: 1.5,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: gradientBg,
          },
        },
      }}
    >
      {/* グラデーションのトップアクセント */}
      <Box
        sx={{
          py: 1.5,
          px: 2,
          background: alpha('#f5f5f5', 0.5),
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '0.9rem',
            color: '#444',
          }}
        >
          MENU
        </Typography>
      </Box>

      {items.map((item) => (
        <MenuItem
          key={item.name}
          onClick={handleClose}
          sx={{
            py: 1.5,
            px: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 1.5,
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: alpha('#f5f5f5', 0.5),
              transform: 'translateX(5px)',
            },
          }}
        >
          {getIconForItem(item.name)}

          {item.url.startsWith('http') ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                width: '100%',
              }}
            >
              <Typography>{item.name}</Typography>
            </a>
          ) : (
            <Link href={item.url} passHref legacyBehavior style={{ width: '100%' }}>
              <Typography>{item.name}</Typography>
            </Link>
          )}
        </MenuItem>
      ))}

      <Divider sx={{ my: 1, opacity: 0.6 }} />

      {/* サイトについて */}
      <MenuItem
        onClick={() => {
          handleClose();
          handleOpenAbout();
        }}
        sx={{
          py: 1.5,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: alpha('#f5f5f5', 0.5),
            transform: 'translateX(5px)',
          },
        }}
      >
        <InfoOutlinedIcon fontSize="small" />
        <Typography>ABOUT BCL EXCHANGE</Typography>
      </MenuItem>

      <Divider sx={{ my: 1, opacity: 0.6 }} />

      {/* トークン情報 */}
      <MenuItem
        onClick={handleClose}
        sx={{
          py: 2,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          backgroundColor: alpha('#f5f5f5', 0.3),
        }}
      >
        <TokenOutlinedIcon
          fontSize="small"
          sx={{
            color: '#426bff',
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '0.8rem',
              color: '#666',
              mb: 0.5,
            }}
          >
            Your Tokens
          </Typography>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '1.1rem',
              color: '#333',
            }}
          >
            {isLoading ? (
              'Loading...'
            ) : (
              <Box component="span">
                {tokenBalance}
                <Box
                  component="span"
                  sx={{
                    background: gradientBg,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 700,
                    ml: 0.5,
                  }}
                >
                  BBT
                </Box>
              </Box>
            )}
          </Typography>
        </Box>
      </MenuItem>
    </Menu>
  );
};

export default NavMenu;
