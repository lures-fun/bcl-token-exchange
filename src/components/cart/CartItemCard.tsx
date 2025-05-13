import React, { useState, useEffect } from 'react';
import {
  Card,
  Grid,
  Box,
  Typography,
  IconButton,
  alpha,
  ButtonGroup,
  Button,
  CircularProgress,
} from '@mui/material';
import Image from 'next/image';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CartItem } from '@/types/CartItem';
import { gradientBg } from '@/src/styles/styeleConstants';

interface CartItemCardProps {
  item: CartItem;
  tempQuantity: number;
  onQuantityInputChange: (itemId: string, value: string) => void;
  onQuantityBlur: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  isUpdating?: boolean;
  onDirectIncrement?: (itemId: string) => void;
  onDirectDecrement?: (itemId: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  tempQuantity,
  onQuantityInputChange,
  onQuantityBlur,
  onRemove,
  isUpdating = false,
  onDirectIncrement,
  onDirectDecrement,
}) => {
  const [localQuantity, setLocalQuantity] = useState(tempQuantity);

  // tempQuantityが変更されたらlocalQuantityも更新
  useEffect(() => {
    setLocalQuantity(tempQuantity);
  }, [tempQuantity]);

  const incrementQuantity = () => {
    if (isUpdating) return;

    if (onDirectIncrement) {
      onDirectIncrement(item.id);
    } else {
      const newValue = (tempQuantity + 1).toString();
      onQuantityInputChange(item.id, newValue);
      onQuantityBlur(item.id);
    }
  };

  const decrementQuantity = () => {
    if (isUpdating || tempQuantity <= 1) return; 

    if (onDirectDecrement) {
      // 親コンポーネントから提供された直接APIを呼び出す関数を使用
      onDirectDecrement(item.id);
    } else {
      // 従来の方法（フォールバック）
      const newValue = (tempQuantity - 1).toString();
      onQuantityInputChange(item.id, newValue);
      onQuantityBlur(item.id);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        mb: 2.5,
        p: { xs: 1.5, sm: 2.5 },
        borderRadius: '16px',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        position: 'relative',
        '&:hover': {
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      {/* モバイル用レイアウト */}
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <Grid container spacing={1}>
          {/* 商品情報（画像と名前） */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  position: 'relative',
                  width: 60,
                  height: 60,
                  minWidth: 60,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                }}
              >
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  fill
                  sizes="60px"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <Box sx={{ ml: 2, flex: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    color: '#333',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: 1.3,
                  }}
                >
                  {item.product.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: '#555',
                    mt: 0.5,
                  }}
                >
                  {item.product.priceInTokens}
                  <Typography
                    component="span"
                    sx={{
                      fontSize: '0.7rem',
                      ml: 0.5,
                      fontWeight: 500,
                      color: '#777',
                    }}
                  >
                    BBT
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* 数量セレクターと小計 */}
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.75rem',
                    color: '#666',
                    mr: 1,
                  }}
                >
                  数量:
                </Typography>
                <ButtonGroup
                  variant="outlined"
                  size="small"
                  sx={{
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
                    borderRadius: '6px',
                    '& .MuiButtonGroup-grouped': {
                      borderColor: alpha('#1dd7d0', 0.3),
                      '&:hover': {
                        borderColor: alpha('#1dd7d0', 0.5),
                      },
                    },
                  }}
                >
                  <Button
                    onClick={decrementQuantity}
                    disabled={tempQuantity <= 1 || isUpdating}
                    sx={{
                      minWidth: '28px',
                      height: '28px',
                      p: 0,
                      border: `1px solid ${alpha('#1dd7d0', 0.3)}`,
                      color: '#555',
                      '&:hover': {
                        backgroundColor: alpha('#1dd7d0', 0.05),
                      },
                      '&.Mui-disabled': {
                        color: alpha('#000', 0.2),
                      },
                    }}
                  >
                    <RemoveIcon sx={{ fontSize: '0.85rem' }} />
                  </Button>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '32px',
                      height: '28px',
                      borderTop: `1px solid ${alpha('#1dd7d0', 0.3)}`,
                      borderBottom: `1px solid ${alpha('#1dd7d0', 0.3)}`,
                      backgroundColor: alpha('#f5f5f5', 0.5),
                      color: '#333',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                    }}
                  >
                    {isUpdating ? (
                      <CircularProgress size={16} sx={{ color: '#426bff' }} />
                    ) : (
                      tempQuantity
                    )}
                  </Box>
                  <Button
                    onClick={incrementQuantity}
                    disabled={isUpdating}
                    sx={{
                      minWidth: '28px',
                      height: '28px',
                      p: 0,
                      border: `1px solid ${alpha('#1dd7d0', 0.3)}`,
                      color: '#555',
                      '&:hover': {
                        backgroundColor: alpha('#1dd7d0', 0.05),
                      },
                    }}
                  >
                    <AddIcon sx={{ fontSize: '0.85rem' }} />
                  </Button>
                </ButtonGroup>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    background: gradientBg,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mr: 1.5,
                  }}
                >
                  {item.product.priceInTokens * item.quantity}
                  <Typography
                    component="span"
                    sx={{
                      fontSize: '0.7rem',
                      ml: 0.5,
                      fontWeight: 500,
                      background: gradientBg,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    BBT
                  </Typography>
                </Typography>

                <IconButton
                  size="small"
                  onClick={() => onRemove(item.id)}
                  sx={{
                    color: '#ff4757',
                    backgroundColor: alpha('#ff4757', 0.05),
                    border: `1px solid ${alpha('#ff4757', 0.2)}`,
                    width: '28px',
                    height: '28px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: alpha('#ff4757', 0.1),
                    },
                  }}
                >
                  <DeleteOutlineIcon sx={{ fontSize: '1rem' }} />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* デスクトップ用レイアウト */}
      <Grid
        container
        alignItems="center"
        spacing={1}
        sx={{
          minHeight: '90px',
          display: { xs: 'none', sm: 'flex' },
        }}
      >
        {/* 商品情報（画像と名前） */}
        <Grid item sm={4}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                position: 'relative',
                width: 80,
                height: 80,
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Image
                src={item.product.imageUrl}
                alt={item.product.name}
                fill
                sizes="80px"
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Box sx={{ ml: 2, flex: 1, minWidth: 0 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  color: '#333',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  lineHeight: 1.3,
                }}
              >
                {item.product.name}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* 価格 */}
        <Grid item sm={2}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: '0.95rem',
                color: '#555',
              }}
            >
              {item.product.priceInTokens}
              <Typography
                component="span"
                sx={{
                  fontSize: '0.75rem',
                  ml: 0.5,
                  fontWeight: 500,
                  color: '#777',
                }}
              >
                BBT
              </Typography>
            </Typography>
          </Box>
        </Grid>

        {/* 数量セレクター */}
        <Grid item sm={3}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <ButtonGroup
              variant="outlined"
              size="small"
              sx={{
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
                borderRadius: '8px',
                '& .MuiButtonGroup-grouped': {
                  borderColor: alpha('#1dd7d0', 0.3),
                  '&:hover': {
                    borderColor: alpha('#1dd7d0', 0.5),
                  },
                },
              }}
            >
              <Button
                onClick={decrementQuantity}
                disabled={tempQuantity <= 1 || isUpdating}
                sx={{
                  minWidth: '36px',
                  height: '36px',
                  border: `1px solid ${alpha('#1dd7d0', 0.3)}`,
                  color: '#555',
                  '&:hover': {
                    backgroundColor: alpha('#1dd7d0', 0.05),
                  },
                  '&.Mui-disabled': {
                    color: alpha('#000', 0.2),
                  },
                }}
              >
                <RemoveIcon fontSize="small" />
              </Button>

              {/* 数値入力フィールド（モバイル向けタッチ操作のため） */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '36px',
                  borderTop: `1px solid ${alpha('#1dd7d0', 0.3)}`,
                  borderBottom: `1px solid ${alpha('#1dd7d0', 0.3)}`,
                  backgroundColor: alpha('#f5f5f5', 0.5),
                  position: 'relative',
                }}
              >
                {isUpdating ? (
                  <CircularProgress size={20} sx={{ color: '#426bff' }} />
                ) : (
                  <input
                    type="number"
                    value={localQuantity}
                    min="1"
                    onChange={(e) => {
                      const value = e.target.value;
                      setLocalQuantity(parseInt(value) || 1);
                    }}
                    onBlur={(e) => {
                      // 入力値をカートに反映
                      if (localQuantity !== tempQuantity) {
                        onQuantityInputChange(item.id, localQuantity.toString());
                        onQuantityBlur(item.id);
                      }
                    }}
                    style={{
                      width: '40px',
                      height: '36px',
                      textAlign: 'center',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: '#333',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      outline: 'none',
                      padding: 0,
                      appearance: 'textfield',
                      WebkitAppearance: 'none',
                      MozAppearance: 'textfield',
                    }}
                  />
                )}
              </Box>

              <Button
                onClick={incrementQuantity}
                disabled={isUpdating}
                sx={{
                  minWidth: '36px',
                  height: '36px',
                  border: `1px solid ${alpha('#1dd7d0', 0.3)}`,
                  color: '#555',
                  '&:hover': {
                    backgroundColor: alpha('#1dd7d0', 0.05),
                  },
                }}
              >
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </Box>
        </Grid>

        {/* 小計と削除ボタン */}
        <Grid item sm={3}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              height: '100%',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                mr: 1.5,
                fontWeight: 700,
                fontSize: '1rem',
                background: gradientBg,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {item.product.priceInTokens * item.quantity}
              <Typography
                component="span"
                sx={{
                  fontSize: '0.75rem',
                  ml: 0.5,
                  fontWeight: 500,
                  background: gradientBg,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                BBT
              </Typography>
            </Typography>
            <IconButton
              size="small"
              onClick={() => onRemove(item.id)}
              sx={{
                color: '#ff4757',
                backgroundColor: alpha('#ff4757', 0.05),
                border: `1px solid ${alpha('#ff4757', 0.2)}`,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: alpha('#ff4757', 0.1),
                },
              }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartItemCard;
