'use client';

import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import Breadcrumb from '@/src/components/ui/Breadcrumbs';
import ProductImageSection from '@/src/components/Product/ProductImageSection';
import ProductDetailsCard from '@/src/components/Product/ProductDetailsCard';
import useProductDetails from '@/src/hooks/useProductDetails';

import ErrorModal from '@/src/components/ui/Modal/ErrorModal';
import StylishLoader from '@/src/components/ui/StylishLoader';

export default function ProductPage() {
  const { product, loading, error } = useProductDetails();
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);

  const handleOpenErrorModal = () => {
    setOpenErrorModal(true);
  };

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
  };

  if (loading) {
    return (
      <>
        <StylishLoader />
      </>
    );
  }

  if (error) {
    handleOpenErrorModal();
    return null;
  }

  if (!product) {
    return (
      <>
        <Typography>Currently, there are no products available.</Typography>
      </>
    );
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Grid container spacing={2} padding={2}>
          <Breadcrumb currentPage={product.name} />
          <Grid item xs={12} md={6}>
            <ProductImageSection product={product} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProductDetailsCard product={product} />
          </Grid>
        </Grid>
      </Container>

      <ErrorModal open={openErrorModal} onClose={handleCloseErrorModal} errorMessage={error} />
    </>
  );
}
