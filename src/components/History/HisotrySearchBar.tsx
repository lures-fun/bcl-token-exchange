import React from 'react';
import { Typography, Box, Grid, Paper, TextField, InputAdornment, alpha } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
interface HistorySearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredCount: number;
  isMobile: boolean;
  isSmallMobile: boolean;
  theme: any;
  gradientBg: string;
}

const HisotrySearchBar = ({
  searchTerm,
  setSearchTerm,
  filteredCount,
  isMobile,
  isSmallMobile,
  theme,
  gradientBg,
}: HistorySearchBarProps) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 1.5, sm: 2, md: 3 },
      mb: { xs: 2, sm: 3, md: 4 },
      borderRadius: { xs: '12px', md: '16px' },
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      backgroundColor: alpha('#fff', 0.8),
      backdropFilter: 'blur(10px)',
      position: 'relative',
      overflow: 'hidden',
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
    <Grid container spacing={isMobile ? 1.5 : 3} alignItems="center">
      <Grid item xs={12} md={8}>
        <TextField
          variant="outlined"
          placeholder="注文ID、商品名、クーポンコードで検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          size={isMobile ? 'small' : 'medium'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    color: alpha('#000', 0.6),
                    fontSize: isSmallMobile ? '1.1rem' : isMobile ? '1.3rem' : '1.5rem',
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: { xs: '8px', sm: '12px' },
              transition: 'all 0.3s ease',
              backgroundColor: alpha(theme.palette.background.paper, 0.7),
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                backgroundColor: theme.palette.background.paper,
              },
              '&.Mui-focused': {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                backgroundColor: theme.palette.background.paper,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1dd7d0',
                  borderWidth: '2px',
                },
              },
            },
            '& .MuiInputBase-input': {
              padding: isSmallMobile ? '8px 10px' : isMobile ? '10px 14px' : '14px 16px',
              fontSize: isSmallMobile ? '0.8rem' : undefined,
            },
          }}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: { xs: 0.5, sm: 0 },
          }}
        >
          <HistoryOutlinedIcon
            sx={{
              color: '#426bff',
              mr: { xs: 0.5, sm: 1, md: 1.5 },
              fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1.1rem' : '1.3rem',
            }}
          />
          <Typography
            variant={isMobile ? 'caption' : 'body2'}
            sx={{
              color: alpha('#000', 0.6),
              fontSize: isSmallMobile ? '0.7rem' : undefined,
            }}
          >
            {filteredCount === 0 ? '注文が見つかりません' : `${filteredCount} 件の注文`}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Paper>
);

export default HisotrySearchBar;
