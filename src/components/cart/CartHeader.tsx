import React from 'react';
import { Box, Typography } from '@mui/material';
import Breadcrumb from '@/src/components/ui/Breadcrumbs';

interface CartPageHeaderProps {
  title?: string;
}

const CartPageHeader = ({ title = 'Your Cart' }: CartPageHeaderProps) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Breadcrumb currentPage="Cart" />
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        {title}
      </Typography>
    </Box>
  );
};

export default CartPageHeader;
