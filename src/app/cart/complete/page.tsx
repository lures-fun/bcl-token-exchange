'use client';

import { Typography, Box, Button, Container, Card, Grid, alpha, Paper, Fade } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { gradientBg } from '@/src/styles/styeleConstants';

interface PurchaseCompletePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function PurchaseCompletePage({ searchParams }: PurchaseCompletePageProps) {
  // クエリパラメータから totalTokens を取得してパース
  const totalTokens = parseInt(searchParams.totalTokens as string, 10) || 0;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 紙吹雪エフェクト
    const createConfetti = () => {
      const confettiContainer = document.getElementById('confetti-container');
      if (!confettiContainer) return;

      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        // ランダムな色
        const colors = ['#1dd7d0', '#426bff', '#ffcd3c', '#ff6b6b', '#9775fa'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // ランダムな位置と大きさ
        const left = Math.random() * 100;
        const size = Math.random() * 10 + 5;
        const duration = Math.random() * 3 + 3;
        const delay = Math.random() * 2;

        confetti.style.backgroundColor = randomColor;
        confetti.style.left = `${left}%`;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.animationDuration = `${duration}s`;
        confetti.style.animationDelay = `${delay}s`;

        confettiContainer.appendChild(confetti);
      }
    };

    // ページがマウントされたら紙吹雉を開始
    setTimeout(createConfetti, 300);

    // クリーンアップ
    return () => {
      const confettiContainer = document.getElementById('confetti-container');
      if (confettiContainer) {
        confettiContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <Fade in={mounted} timeout={800}>
      <Container maxWidth="md" sx={{ position: 'relative', overflow: 'hidden', py: 8 }}>
        {/* 紙吹雪コンテナ */}
        <Box
          id="confetti-container"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
            overflow: 'hidden',
          }}
        />

        <Box
          sx={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
            px: { xs: 2, sm: 4 },
          }}
        >
          {/* 成功アイコンと波紋エフェクト */}
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
              mb: 4,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: alpha('#1dd7d0', 0.1),
                animation: 'ripple 2s infinite ease-in-out',
                '@keyframes ripple': {
                  '0%': {
                    transform: 'translate(-50%, -50%) scale(0.8)',
                    opacity: 1,
                  },
                  '100%': {
                    transform: 'translate(-50%, -50%) scale(1.5)',
                    opacity: 0,
                  },
                },
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: alpha('#426bff', 0.1),
                animation: 'ripple 2s infinite 0.3s ease-in-out',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: gradientBg,
                boxShadow: '0 8px 32px rgba(29, 215, 208, 0.25)',
                position: 'relative',
              }}
            >
              <CheckCircleOutlineIcon
                sx={{
                  fontSize: 60,
                  color: 'white',
                  animation: 'checkmark 0.8s ease-in-out forwards',
                  '@keyframes checkmark': {
                    '0%': {
                      opacity: 0,
                      transform: 'scale(0.5)',
                    },
                    '50%': {
                      opacity: 1,
                      transform: 'scale(1.2)',
                    },
                    '100%': {
                      opacity: 1,
                      transform: 'scale(1)',
                    },
                  },
                }}
              />
            </Box>
          </Box>

          {/* メインコンテンツ */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 5,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.5rem' },
                background: gradientBg,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ご購入ありがとうございます！
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                fontSize: '1.1rem',
                color: alpha('#000', 0.6),
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              ご注文内容は登録メールアドレスにお送りしました。
              <br />
              しばらくしてメールが届かない場合は、HISTORY のページから購入内容を確認するか、
              <br />
              お問い合わせフォームよりお問い合わせください。
            </Typography>

            {/* 注文概要カード */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4 },
                mb: 5,
                borderRadius: '24px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                maxWidth: 600,
                mx: 'auto',
                backgroundColor: alpha('#fff', 0.9),
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: gradientBg,
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <ShoppingBagOutlinedIcon
                  sx={{
                    color: '#426bff',
                    mr: 2,
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
                  ご注文概要
                </Typography>
              </Box>

              <Fade in={true} timeout={1000}>
                <Box
                  sx={{
                    p: 3,
                    backgroundColor: alpha('#f5f5f5', 0.6),
                    borderRadius: '16px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: alpha('#f5f5f5', 0.9),
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color: '#555',
                      }}
                    >
                      合計トークン
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        background: gradientBg,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {Math.round(totalTokens)}
                      <Typography
                        component="span"
                        sx={{
                          ml: 1,
                          fontSize: '1rem',
                          background: gradientBg,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        BBT
                      </Typography>
                    </Typography>
                  </Grid>
                </Box>
              </Fade>
            </Paper>

            {/* アクションボタン */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Link href="/shop" passHref>
                <Button
                  variant="contained"
                  startIcon={<HomeOutlinedIcon />}
                  sx={{
                    background: gradientBg,
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '30px',
                    boxShadow:
                      '0 8px 16px rgba(29, 215, 208, 0.2), 0 2px 8px rgba(66, 107, 255, 0.2)',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #19c2bb, #3358e5)',
                      boxShadow:
                        '0 10px 20px rgba(29, 215, 208, 0.3), 0 3px 10px rgba(66, 107, 255, 0.25)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  ショップに戻る
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>

        <style jsx global>{`
          .confetti {
            position: absolute;
            top: -10px;
            border-radius: 0;
            animation: confetti-fall linear forwards;
            z-index: 0;
          }
          
          @keyframes confetti-fall {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(1000px) rotate(720deg);
              opacity: 0;
            }
          }
        `}</style>
      </Container>
    </Fade>
  );
}
