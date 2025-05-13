'use client';
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  useScrollTrigger,
  Slide,
  alpha,
} from '@mui/material';
import Image from 'next/image';
import { Menu as MenuIcon } from '@mui/icons-material';
import Link from 'next/link';
import HeaderLogo from '@/public/HeaderLogo.png';
import { useTokenStore } from '@/src/store/tokenStore';
import { Page } from '@/types/Header';
import CartBadgeLink from '../CartBadgeLink';
import AboutDialog from '@/src/components/ui/Dialog/AboutDialog';
import NavMenu from '@/src/components/ui/Header/NavMenu';
import { gradientBg } from '@/src/styles/styeleConstants';

// ナビゲーションページ
const pages: Page[] = [
  { name: 'Products', url: '/shop' },
  { name: 'History', url: '/history' },
  { name: 'BCL APP', url: 'https://bcl-wallet.com/' },
  { name: 'BCL Shop', url: 'https://blockchainlures.myshopify.com/' },
  {
    name: 'Contact',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSfpmbEKCZMCEoSyv9IXpOGqGBvoi295IyJkH7CJZ4MnBAKycQ/viewform',
  },
];

// スクロール時にヘッダーを隠す機能
function HideOnScroll(props: { children: React.ReactElement }) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function ResponsiveHeader() {
  const { tokenBalance, isLoading } = useTokenStore();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // スクロール検出
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleOpenAbout = () => {
    setAboutOpen(true);
  };

  const handleCloseAbout = () => {
    setAboutOpen(false);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElNav(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);

  // バッジスタイル
  const badgeStyle = {
    background: 'linear-gradient(90deg, #1dd7d0, #426bff)',
    color: 'white',
    borderRadius: '8px',
    padding: '5px 12px',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    boxShadow: '0 2px 8px rgba(29, 215, 208, 0.3)',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.5px',
  };

  // メニューアイテムスタイル
  const menuItemStyle = {
    position: 'relative',
    fontWeight: 500,
    fontSize: '1rem',
    color: 'black',
    padding: '6px 12px',
    margin: '0 8px',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#426bff',
      transform: 'translateY(-2px)',
      '&::after': {
        width: '100%',
        opacity: 1,
      },
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '0%',
      height: '2px',
      background: gradientBg,
      transition: 'all 0.3s ease',
      opacity: 0,
    },
  };

  // トークン表示スタイル
  const tokenBoxStyle = {
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
    mr: 2,
    padding: '8px 16px',
    borderRadius: '12px',
    background: '#ffffff',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
      transform: 'translateY(-2px)',
    },
  };

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          sx={{
            bgcolor: 'white',
            boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
            transition: 'all 0.3s ease',
            borderBottom: scrolled ? 'none' : '1px solid rgba(0, 0, 0, 0.05)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '3px',
              background: gradientBg,
            },
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{
                minHeight: scrolled ? '70px' : '80px',
                transition: 'min-height 0.3s ease',
              }}
            >
              {/* ロゴ */}
              <Link href="/shop" passHref>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <Image
                    src={HeaderLogo}
                    alt="BCL Token Exchange"
                    property="Logo"
                    style={{
                      height: scrolled ? '90px' : '110px',
                      width: 'auto',
                      objectFit: 'contain',
                      transition: 'height 0.3s ease',
                    }}
                  />
                </Box>
              </Link>

              {/* ハンバーガーメニュー */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'flex', md: 'none' },
                  justifyContent: 'flex-end',
                  ml: 'auto',
                }}
              >
                <IconButton
                  size="large"
                  onClick={handleOpenNavMenu}
                  sx={{
                    color: 'black',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'rotate(180deg)',
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <NavMenu
                  anchorEl={anchorElNav}
                  handleClose={handleCloseNavMenu}
                  open={Boolean(anchorElNav)}
                  items={pages}
                  tokenBalance={isLoading || tokenBalance === undefined ? null : tokenBalance}
                  handleOpenAbout={handleOpenAbout}
                />
              </Box>

              {/* PC版ヘッダーメニュー */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  ml: 4,
                }}
              >
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{
                      color: 'black',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {page.url.startsWith('http') ? (
                      <Typography
                        component="a"
                        href={page.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={menuItemStyle}
                      >
                        {page.name}
                      </Typography>
                    ) : (
                      <Link href={page.url} passHref legacyBehavior>
                        <Typography sx={menuItemStyle}>{page.name}</Typography>
                      </Link>
                    )}
                  </Button>
                ))}
                {/* PC版でサイトについてボタン */}
                <Button
                  onClick={handleOpenAbout}
                  sx={{
                    color: 'black',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <Typography sx={menuItemStyle}>About BCL EXCHANGE</Typography>
                </Button>
              </Box>

              {/* Token 表示エリア */}
              <Box sx={tokenBoxStyle}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: '600',
                    color: '#333',
                    fontSize: '1rem',
                    mr: 1.5,
                  }}
                >
                  Your Tokens:
                </Typography>
                <Box sx={badgeStyle}>
                  {isLoading ? (
                    <span>Loading...</span>
                  ) : (
                    <span>
                      {tokenBalance} <strong>BBT</strong>
                    </span>
                  )}
                </Box>
              </Box>

              <CartBadgeLink />
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      <Toolbar
        sx={{
          minHeight: '110px',
          '@media (min-width: 600px)': {
            minHeight: '110px',
          },
        }}
      />

      {/* 追加のマージン */}
      <Box sx={{ height: '5px' }} />

      {/* サイト説明ダイアログ */}
      <AboutDialog open={aboutOpen} onClose={handleCloseAbout} />
    </>
  );
}

export default ResponsiveHeader;
