import { Pagination } from '@mui/material';
import { styled } from '@mui/system';

const CustomPagination = styled(Pagination)({
  '& .MuiPaginationItem-root': {
    borderRadius: '50%',
    padding: '10px',
    margin: '0 5px',
    '&.Mui-selected': {
      backgroundColor: '#212121',
      color: '#ffffff',
    },
  },
  '& .MuiPaginationItem-icon': {
    color: '#bdbdbd',
  },
});

export default CustomPagination;
