import {
  Paper,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Typography,
  Chip,
  Select,
  MenuItem,
  alpha,
  useTheme,
  SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import SortIcon from '@mui/icons-material/Sort';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { gradientBg } from '@/src/styles/styeleConstants';
interface FilterSectionProps {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchClear: () => void;
  searchHistory: string[];
  sort: string;
  handleSortChange: (e: SelectChangeEvent) => void;
  resultsCount: number;
}

const FilterSection = ({
  searchTerm,
  handleSearchChange,
  handleSearchClear,
  searchHistory,
  sort,
  handleSortChange,
  resultsCount,
}: FilterSectionProps) => {
  const theme = useTheme();

  const searchBoxStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
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
      padding: '14px 16px',
    },
  };

  const sortBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: alpha(theme.palette.background.paper, 0.7),
    borderRadius: '12px',
    padding: '8px 16px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      backgroundColor: theme.palette.background.paper,
    },
  };

  const sortOptions = [
    { value: '', label: 'Featured' },
    { value: 'token_asc', label: 'Token: Low to High' },
    { value: 'token_desc', label: 'Token: High to Low' },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        mb: 4,
        borderRadius: '16px',
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
      <Grid container spacing={3} alignItems="center">
        {/* 検索ボックス */}
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: alpha('#000', 0.6) }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleSearchClear}
                    sx={{ color: alpha('#000', 0.5) }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={searchBoxStyle}
          />

          {/* 検索履歴チップ */}
          {searchHistory.length > 0 && !searchTerm && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {searchHistory.map((term, index) => (
                <Chip
                  key={index}
                  label={term}
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    handleSearchChange({
                      target: { value: term },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                  sx={{
                    borderColor: alpha('#1dd7d0', 0.4),
                    '&:hover': {
                      backgroundColor: alpha('#1dd7d0', 0.1),
                    },
                  }}
                />
              ))}
            </Box>
          )}
        </Grid>

        {/* ソートオプション */}
        <Grid item xs={12} md={6}>
          <Box sx={sortBoxStyle}>
            <SortIcon sx={{ color: '#426bff', mr: 1.5 }} />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                mr: 2,
                whiteSpace: 'nowrap',
              }}
            >
              Sort by:
            </Typography>
            <Select
              value={sort}
              onChange={handleSortChange}
              displayEmpty
              variant="standard"
              disableUnderline
              sx={{
                minWidth: 150,
                '& .MuiSelect-select': {
                  py: 0.5,
                  fontWeight: 500,
                },
              }}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value.includes('token') && (
                    <LocalOfferOutlinedIcon fontSize="small" sx={{ mr: 1, opacity: 0.7 }} />
                  )}
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* 検索結果カウント */}
          <Box
            sx={{
              mt: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Typography variant="body2" sx={{ color: alpha('#000', 0.6) }}>
              {resultsCount === 0
                ? 'No products found'
                : `${resultsCount} product${resultsCount !== 1 ? 's' : ''} found`}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterSection;
