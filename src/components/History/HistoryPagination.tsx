import React from 'react';
import { Typography, Box, Button, IconButton, alpha } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface HistoryPaginationProps {
  page: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handlePageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  isMobile: boolean;
  isSmallMobile: boolean;
  gradientBg: string;
}

const HistoryPagination = ({
  page,
  totalPages,
  handlePrevPage,
  handleNextPage,
  handlePageChange,
  isMobile,
  isSmallMobile,
  gradientBg,
}: HistoryPaginationProps) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      mt: { xs: 2, sm: 3, md: 4 },
      mb: { xs: 2, sm: 0 },
    }}
  >
    {isMobile ? (
      // Mobile pagination
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: alpha('#f5f5f5', 0.5),
          borderRadius: '20px',
          p: 0.5,
        }}
      >
        <IconButton
          disabled={page === 1}
          onClick={handlePrevPage}
          size="small"
          sx={{
            color: page === 1 ? alpha('#000', 0.3) : '#426bff',
            '&:hover': {
              backgroundColor: alpha('#426bff', 0.1),
            },
          }}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>

        <Typography
          sx={{
            mx: 1,
            fontWeight: 500,
            fontSize: isSmallMobile ? '0.8rem' : '0.9rem',
          }}
        >
          {page} / {totalPages}
        </Typography>

        <IconButton
          disabled={page === totalPages}
          onClick={handleNextPage}
          size="small"
          sx={{
            color: page === totalPages ? alpha('#000', 0.3) : '#426bff',
            '&:hover': {
              backgroundColor: alpha('#426bff', 0.1),
            },
          }}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    ) : (
      // Desktop pagination
      <Box
        component="ul"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          margin: 0,
          listStyle: 'none',
        }}
      >
        {/* Prev button */}
        {page > 1 && (
          <Box component="li" sx={{ mx: 0.5 }}>
            <Button
              onClick={handlePrevPage}
              variant="text"
              sx={{
                minWidth: '40px',
                height: '40px',
                borderRadius: '8px',
                color: alpha('#000', 0.7),
              }}
            >
              <KeyboardArrowLeftIcon />
            </Button>
          </Box>
        )}

        {/* Page number buttons - max 5 */}
        {Array.from({ length: Math.min(totalPages, 5) }).map((_, idx) => {
          // Logic to display pages centered around current page
          let pageNum;
          if (totalPages <= 5) {
            pageNum = idx + 1;
          } else if (page <= 3) {
            pageNum = idx + 1;
          } else if (page >= totalPages - 2) {
            pageNum = totalPages - 4 + idx;
          } else {
            pageNum = page - 2 + idx;
          }

          return (
            <Box component="li" key={pageNum} sx={{ mx: 0.5 }}>
              <Button
                onClick={(e) => handlePageChange(e, pageNum)}
                variant={page === pageNum ? 'contained' : 'text'}
                sx={{
                  minWidth: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: page === pageNum ? gradientBg : 'transparent',
                  color: page === pageNum ? 'white' : alpha('#000', 0.7),
                  fontWeight: page === pageNum ? 'bold' : 'normal',
                  '&:hover': {
                    background:
                      page === pageNum
                        ? 'linear-gradient(90deg, #19c2bb, #3b60e5)'
                        : alpha('#f5f5f5', 0.7),
                  },
                }}
              >
                {pageNum}
              </Button>
            </Box>
          );
        })}

        {/* Next button */}
        {page < totalPages && (
          <Box component="li" sx={{ mx: 0.5 }}>
            <Button
              onClick={handleNextPage}
              variant="text"
              sx={{
                minWidth: '40px',
                height: '40px',
                borderRadius: '8px',
                color: alpha('#000', 0.7),
              }}
            >
              <KeyboardArrowRightIcon />
            </Button>
          </Box>
        )}
      </Box>
    )}
  </Box>
);

export default HistoryPagination;
