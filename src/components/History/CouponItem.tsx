import {
  useMediaQuery,
  Box,
  alpha,
  Typography,
  Tooltip,
  IconButton,
  Checkbox,
  Fade,
} from '@mui/material';
import { useState } from 'react';

import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Coupon } from '@/types/Order';

interface CouponItemProps {
  coupon: Coupon;
  onToggleUsed: (id: string, isUsed: boolean) => void;
  compact?: boolean; // コンパクト表示モードのオプション
}

/**
 * クーポンアイテムコンポーネント - レスポンシブ対応
 */
const CouponItem = ({ coupon, onToggleUsed, compact = false }: CouponItemProps) => {
  const [copied, setCopied] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isExtraSmall = useMediaQuery('(max-width:400px)');

  // コピー処理
  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 実際に適用されるサイズと余白
  const getPadding = () => {
    if (isExtraSmall || compact) return 0.75;
    if (isMobile) return 1;
    return 1.5;
  };

  const getIconSize = () => {
    if (isExtraSmall || compact) return '0.85rem';
    if (isMobile) return '1rem';
    return '1.2rem';
  };

  const getCheckboxPadding = () => {
    if (isExtraSmall || compact) return 0.25;
    if (isMobile) return 0.5;
    return 1;
  };

  return (
    <Box
      sx={{
        mb: isExtraSmall ? 1 : 1.5,
        p: getPadding(),
        backgroundColor: alpha('#fff', 0.9),
        borderRadius: '10px',
        border: '1px dashed rgba(0, 0, 0, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: isExtraSmall ? '3px' : '4px',
          background: 'linear-gradient(180deg, #1dd7d0, #426bff)',
          borderTopLeftRadius: '10px',
          borderBottomLeftRadius: '10px',
        },
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: alpha('#fff', 1),
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: isExtraSmall ? 'calc(100% - 40px)' : 'calc(100% - 50px)',
        }}
      >
        <LoyaltyOutlinedIcon
          sx={{
            color: coupon.isUsed ? alpha('#426bff', 0.5) : '#426bff',
            mr: isExtraSmall ? 0.75 : 1.5,
            fontSize: getIconSize(),
            transition: 'all 0.2s ease',
            flexShrink: 0,
          }}
        />
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant={isMobile || compact ? 'caption' : 'body2'}
              sx={{
                fontFamily: 'monospace',
                fontWeight: 600,
                mr: 0.5,
                color: coupon.isUsed ? alpha('#000', 0.5) : '#333',
                textDecoration: coupon.isUsed ? 'line-through' : 'none',
                transition: 'all 0.2s ease',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontSize: isExtraSmall || compact ? '0.65rem' : isMobile ? '0.7rem' : '0.8rem',
              }}
            >
              {coupon.code}
            </Typography>

            <Tooltip title={copied ? 'コピーしました！' : 'クリップボードにコピー'}>
              <IconButton
                size="small"
                onClick={handleCopy}
                sx={{
                  p: isExtraSmall ? 0.25 : 0.5,
                  color: copied ? '#2ecc71' : alpha('#000', 0.5),
                  '&:hover': {
                    backgroundColor: alpha('#f5f5f5', 0.8),
                  },
                  flexShrink: 0,
                }}
              >
                {copied ? (
                  <Fade in={true} timeout={200}>
                    <CheckIcon
                      fontSize={isExtraSmall ? 'inherit' : 'small'}
                      sx={{ fontSize: isExtraSmall ? '0.7rem' : '1rem' }}
                    />
                  </Fade>
                ) : (
                  <ContentCopyIcon
                    fontSize={isExtraSmall ? 'inherit' : 'small'}
                    sx={{ fontSize: isExtraSmall ? '0.7rem' : '1rem' }}
                  />
                )}
              </IconButton>
            </Tooltip>
          </Box>

          <Typography
            variant="caption"
            sx={{
              color: alpha('#000', 0.6),
              transition: 'all 0.2s ease',
              opacity: coupon.isUsed ? 0.6 : 1,
              display: '-webkit-box',
              WebkitLineClamp: isExtraSmall ? 1 : 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: isExtraSmall || compact ? '0.6rem' : isMobile ? '0.65rem' : '0.75rem',
              mt: isExtraSmall ? 0 : 0.25,
              lineHeight: isExtraSmall ? 1.2 : 1.4,
            }}
          >
            {coupon.description}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <Tooltip title={coupon.isUsed ? '未使用に戻す' : '使用済みにする'}>
          <Checkbox
            checked={coupon.isUsed}
            onChange={(e) => onToggleUsed(coupon.id, e.target.checked)}
            sx={{
              color: alpha('#426bff', 0.5),
              '&.Mui-checked': {
                color: '#426bff',
              },
              padding: getCheckboxPadding(),
              '& .MuiSvgIcon-root': {
                fontSize: isExtraSmall || compact ? '1rem' : isMobile ? '1.2rem' : '1.4rem',
              },
            }}
          />
        </Tooltip>
      </Box>
    </Box>
  );
};

export default CouponItem;
