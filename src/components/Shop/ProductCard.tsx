import { Product, ProductType } from '@/types/Product';
import { Card, CardActionArea, CardContent, Typography, Box, alpha, Chip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { gradientBg } from '@/src/styles/styeleConstants';

const ProductCard = ({ product }: { product: Product }) => {
  const truncateName = (name: string) => (name.length > 19 ? `${name.substring(0, 19)}...` : name);

  // 在庫なしの判定
  const isSoldOut = product.availableQuantity <= 0;

  // タイプに基づいたアイコンと色の設定
  const getTypeConfig = (type: ProductType) => {
    switch (type) {
      case 'COUPON':
        return {
          icon: <ConfirmationNumberOutlinedIcon fontSize="small" />,
          color: '#ff6b6b',
          gradientBg: 'linear-gradient(90deg, #ff9a9e, #ff6b6b)',
        };
      case 'PHYSICAL':
        return {
          icon: <LocalShippingOutlinedIcon fontSize="small" />,
          color: '#feca57',
          gradientBg: 'linear-gradient(90deg, #ffdb7a, #feca57)',
        };
      case 'DIGITAL':
        return {
          icon: <CloudDownloadOutlinedIcon fontSize="small" />,
          color: '#5f27cd',
          gradientBg: 'linear-gradient(90deg, #a55eea, #5f27cd)',
        };
      default:
        return {
          icon: <LocalOfferOutlinedIcon fontSize="small" />,
          color: '#426bff',
          gradientBg: 'linear-gradient(90deg, #1dd7d0, #426bff)',
        };
    }
  };

  const typeConfig = getTypeConfig(product.type);

  return (
    <Link href={`/product/${product.id}`} passHref>
      <Card
        sx={{
          cursor: 'pointer',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0px 16px 30px rgba(0, 0, 0, 0.12)',
            '& .product-image': {
              transform: 'scale(1.05)',
            },
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: gradientBg,
            zIndex: 1,
          },
        }}
      >
        {/* 商品画像エリア */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            pt: '100%', // アスペクト比を保持
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: 'cover',
                borderRadius: '0px',
                transition: 'transform 0.5s ease',
              }}
              className="product-image"
            />

            {/* 売り切れバッジ */}
            {isSoldOut && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  backgroundColor: 'rgba(255, 71, 87, 0.9)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.7rem',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  zIndex: 2,
                  boxShadow: '0 2px 8px rgba(255, 71, 87, 0.4)',
                }}
              >
                売り切れ
              </Box>
            )}

            {/* グラデーションオーバーレイ */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '30%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.1), transparent)',
                zIndex: 1,
              }}
            />
          </Box>
        </Box>

        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 2,
          }}
        >
          {/* タイプバッジ - 画像の下に配置 */}
          <Box
            sx={{
              marginBottom: 1.5,
              marginTop: -0.5,
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                background: typeConfig.gradientBg,
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.7rem',
                padding: '4px 10px',
                borderRadius: '20px',
                boxShadow: `0 2px 8px ${alpha(typeConfig.color, 0.3)}`,
              }}
            >
              {typeConfig.icon}
              <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 600 }}>
                {product.type}
              </Typography>
            </Box>
          </Box>

          {/* 商品名 */}
          <Typography
            variant="h6"
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              lineHeight: 1.3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: '#333',
              mb: 1,
              minHeight: '2.6rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.name}
          </Typography>

          {/* 価格表示 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              mt: 'auto',
            }}
          >
            <LocalOfferOutlinedIcon
              sx={{
                fontSize: '1rem',
                color: isSoldOut ? alpha('#000', 0.3) : '#426bff',
                mr: 0.5,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                fontWeight: 700,
                background: isSoldOut ? 'none' : gradientBg,
                WebkitBackgroundClip: isSoldOut ? 'none' : 'text',
                WebkitTextFillColor: isSoldOut ? alpha('#000', 0.3) : 'transparent',
                transition: 'all 0.3s ease',
              }}
            >
              {product.priceInTokens}{' '}
              <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>BBT</span>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
