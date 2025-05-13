import React from 'react';
import { Box, Fade, alpha, SxProps, Theme } from '@mui/material';

interface FloatingIconProps {
  icon: React.ReactNode;
  position: 'left' | 'right';
  animate: boolean;
  color: string;
  top?: string | number;
  timeout?: number;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({
  icon,
  position,
  animate,
  color,
  top = position === 'left' ? '30%' : '60%',
  timeout = 800,
}) => {
  // 位置に基づいたスタイルを設定
  const positionStyle =
    position === 'left' ? { left: { xs: '5%', md: '15%' } } : { right: { xs: '5%', md: '15%' } };

  // アニメーション名を設定
  const animationName = position === 'left' ? 'float' : 'float2';
  const animationDefinition =
    position === 'left'
      ? {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(5deg)' },
          '100%': { transform: 'translateY(0px) rotate(0deg)' },
        }
      : {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(-5deg)' },
          '100%': { transform: 'translateY(0px) rotate(0deg)' },
        };

  // 影の色を設定
  const shadowColor = position === 'left' ? 'rgba(29, 215, 208, 0.25)' : 'rgba(66, 107, 255, 0.25)';

  // アニメーション時間を設定
  const animationDuration = position === 'left' ? '8s' : '7s';

  return (
    <Fade in={animate} timeout={timeout}>
      <Box
        sx={{
          position: 'absolute',
          top,
          ...positionStyle,
          width: { xs: '60px', md: '100px' },
          height: { xs: '60px', md: '100px' },
          backgroundColor: alpha('#fff', 0.15),
          borderRadius: '20px',
          border: `1px solid ${alpha(color, 0.5)}`,
          backdropFilter: 'blur(5px)',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: `${animationName} ${animationDuration} infinite ease-in-out`,
          transform: 'translateY(0px)',
          boxShadow: `0 8px 32px ${shadowColor}`,
          [`@keyframes ${animationName}`]: animationDefinition,
        }}
      >
        {icon}
      </Box>
    </Fade>
  );
};

export default FloatingIcon;
