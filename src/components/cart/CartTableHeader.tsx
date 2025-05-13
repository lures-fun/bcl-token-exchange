import React from 'react';
import { Box, Grid, Paper, Typography, useTheme, alpha } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import { gradientBg } from '@/src/styles/styeleConstants';

const CartTableHeader: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3,
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: alpha('#f5f5f5', 0.6),
        backdropFilter: 'blur(10px)',
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
      <Grid container alignItems="center" sx={{ minHeight: '70px' }}>
        {/* デスクトップ表示 */}
        <Box sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}>
          <Grid container>
            <Grid item sm={4}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  pl: 3,
                }}
              >
                <ShoppingCartOutlinedIcon
                  sx={{
                    color: '#426bff',
                    fontSize: '1.2rem',
                    mr: 1.5,
                  }}
                />
                <Typography
                  variant="subtitle2"
                  fontWeight="600"
                  sx={{
                    color: '#333',
                    fontSize: '0.9rem',
                  }}
                >
                  商品
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={2}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <LocalOfferOutlinedIcon
                  sx={{
                    color: '#426bff',
                    fontSize: '1.2rem',
                    mr: 1,
                  }}
                />
                <Typography
                  variant="subtitle2"
                  fontWeight="600"
                  sx={{
                    color: '#333',
                    fontSize: '0.9rem',
                  }}
                >
                  価格
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={3}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <AddCircleOutlineOutlinedIcon
                  sx={{
                    color: '#426bff',
                    fontSize: '1.2rem',
                    mr: 1,
                  }}
                />
                <Typography
                  variant="subtitle2"
                  fontWeight="600"
                  sx={{
                    color: '#333',
                    fontSize: '0.9rem',
                  }}
                >
                  数量
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={3}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  height: '100%',
                  pr: 3,
                }}
              >
                <CalculateOutlinedIcon
                  sx={{
                    color: '#426bff',
                    fontSize: '1.2rem',
                    mr: 1,
                  }}
                />
                <Typography
                  variant="subtitle2"
                  fontWeight="600"
                  sx={{
                    color: '#333',
                    fontSize: '0.9rem',
                  }}
                >
                  小計
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* モバイル表示 - タイトルのみ */}
        <Box sx={{ width: '100%', display: { xs: 'flex', sm: 'none' }, px: 2, py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ShoppingCartOutlinedIcon
              sx={{
                color: '#426bff',
                fontSize: '1.2rem',
                mr: 1.5,
              }}
            />
            <Typography
              variant="subtitle1"
              fontWeight="600"
              sx={{
                color: '#333',
                fontSize: '1rem',
              }}
            >
              ショッピングカート
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Paper>
  );
};

export default CartTableHeader;
