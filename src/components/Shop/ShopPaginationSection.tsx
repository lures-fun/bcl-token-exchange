// components/PaginationSection.tsx
import { Box } from '@mui/material';
import CustomPagination from '@/src/components/Shop/CustomPagination';

interface ShopPaginationSectionProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const ShopPaginationSection = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: ShopPaginationSectionProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 2 }}>
      <CustomPagination
        count={totalPages}
        page={currentPage}
        onChange={(event, newPage) => setCurrentPage(newPage)}
      />
    </Box>
  );
};

export default ShopPaginationSection;
