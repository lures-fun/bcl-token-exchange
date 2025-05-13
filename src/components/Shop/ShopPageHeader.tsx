import { Box, Typography, Divider, alpha } from '@mui/material';
import { gradientBg } from '@/src/styles/styeleConstants';
const ShopPageHeader = () => {
  const pageHeaderStyle = {
    fontWeight: 700,
    background: gradientBg,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    mb: 1,
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" sx={pageHeaderStyle}>
        Product Catalog
      </Typography>
      <Typography variant="body1" sx={{ color: alpha('#000', 0.6), mb: 1 }}>
        Explore our collection of exclusive items
      </Typography>
      <Divider sx={{ mt: 2, opacity: 0.6 }} />
    </Box>
  );
};

export default ShopPageHeader;
