// components/ProductsList.tsx
import { Grid, Paper, Typography, Box, Button, alpha, Fade } from '@mui/material';
import LoadingWithProgress from '@/src/components/ui/progressLoading';
import ProductCard from '@/src/components/Shop/ProductCard';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { Product } from '@/types/Product';

interface ShopProductsListProps {
  loading: boolean;
  displayedProducts: Product[];
  handleSearchClear: () => void;
}

const ShopProductsList = ({
  loading,
  displayedProducts,
  handleSearchClear,
}: ShopProductsListProps) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <LoadingWithProgress />
      </Box>
    );
  }

  if (displayedProducts.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: '16px',
          textAlign: 'center',
          backgroundColor: alpha('#fff', 0.9),
          border: '1px dashed rgba(0, 0, 0, 0.1)',
        }}
      >
        <CategoryOutlinedIcon sx={{ fontSize: 48, color: alpha('#000', 0.2), mb: 2 }} />
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          No products found
        </Typography>
        <Typography variant="body2" sx={{ color: alpha('#000', 0.6) }}>
          Try adjusting your search criteria or browse all products.
        </Typography>
        <Button
          variant="text"
          onClick={handleSearchClear}
          sx={{
            mt: 2,
            color: '#426bff',
            fontWeight: 500,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: alpha('#426bff', 0.05),
            },
          }}
        >
          Clear search
        </Button>
      </Paper>
    );
  }

  return (
    <Fade in={!loading} timeout={500}>
      <Grid container spacing={3}>
        {displayedProducts.map((product: Product, index: number) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Fade>
  );
};

export default ShopProductsList;
