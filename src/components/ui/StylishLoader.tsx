import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

interface StylishLoaderProps {
  size?: number;
  showPercentage?: boolean;
  loadingText?: string;
}

const StylishLoader: React.FC<StylishLoaderProps> = ({
  size = 100,
  showPercentage = true,
  loadingText = 'Loading',
}) => {
  const theme = useTheme();
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  // プログレスのアニメーション
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
    }, 120);
    return () => clearInterval(timer);
  }, []);

  // ドットアニメーション
  useEffect(() => {
    const dotsTimer = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) return '';
        return prevDots + '.';
      });
    }, 500);
    return () => clearInterval(dotsTimer);
  }, []);

  // ダッシュトラックの色
  const dashedTrackColor =
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';

  // 円の周囲の長さを計算
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* プログレスサークル */}
        <svg width={size} height={size} viewBox="0 0 100 100">
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1dd7d0" />
              <stop offset="100%" stopColor="#426bff" />
            </linearGradient>
          </defs>

          {/* バックグラウンドサークル */}
          <circle cx="50" cy="50" r="45" fill="none" stroke={dashedTrackColor} strokeWidth="5" />

          {/* プログレスサークル（グラデーション） */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>

        {/* 中央のパーセンテージ表示 */}
        {showPercentage && (
          <Typography
            variant="h6"
            component="div"
            sx={{
              position: 'absolute',
              background: 'linear-gradient(90deg, #1dd7d0, #426bff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
            }}
          >
            {`${Math.round(progress)}%`}
          </Typography>
        )}
      </Box>

      {/* ローディングテキスト */}
      <Typography
        variant="body2"
        sx={{
          mt: 2,
          background: 'linear-gradient(90deg, #1dd7d0, #426bff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 500,
          letterSpacing: 1,
        }}
      >
        {loadingText}
        {dots}
      </Typography>
    </Box>
  );
};

export default StylishLoader;
