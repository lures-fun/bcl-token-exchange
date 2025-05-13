import React from 'react';
import { Box, IconButton, TextField, alpha } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface QuantityInputProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (newValue: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ value, min = 1, max, onChange }) => {
  const handleIncrease = () => {
    if (!max || value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        background: 'white',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 6px 24px rgba(0, 0, 0, 0.12)',
          transform: 'translateY(-2px)',
        },
        position: 'relative',
        width: 'fit-content',
      }}
    >
      <IconButton
        onClick={handleDecrease}
        disabled={value <= min}
        sx={{
          width: '48px',
          height: '48px',
          borderRadius: '12px 0 0 12px',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
          color: value <= min ? 'rgba(0, 0, 0, 0.26)' : '#5271FF',
          '&:hover': {
            background: 'linear-gradient(135deg, #e4e8f0 0%, #d1d7e0 100%)',
          },
          transition: 'all 0.2s ease',
          '&:active': {
            transform: 'scale(0.95)',
          },
          padding: 0,
        }}
      >
        <RemoveIcon />
      </IconButton>

      <TextField
        value={value}
        onChange={(e) => {
          const newValue = parseInt(e.target.value, 10);
          if (!isNaN(newValue)) {
            if (max !== undefined) {
              onChange(Math.min(Math.max(newValue, min), max));
            } else {
              onChange(Math.max(newValue, min));
            }
          }
        }}
        inputProps={{
          min,
          max,
          inputMode: 'numeric',
          pattern: '[0-9]*',
          style: {
            textAlign: 'center',
            padding: '14px 0',
            width: '60px',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          },
        }}
        sx={{
          '& .MuiInputBase-input': {
            textAlign: 'center',
            fontWeight: 600,
            fontSize: '1.1rem',
            color: '#3a3a3a',
          },
          '& .MuiInputBase-root': {
            height: '100%',
          },
          border: 'none',
          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
          '&:focus-within': {
            '& .MuiInputBase-input': {
              color: '#5271FF',
            },
            backgroundColor: alpha('#5271FF', 0.05),
          },
        }}
      />

      <IconButton
        onClick={handleIncrease}
        disabled={max !== undefined && value >= max}
        sx={{
          width: '48px',
          height: '48px',
          borderRadius: '0 12px 12px 0',
          background: 'linear-gradient(135deg, #23EEE3 0%, #5271FF 100%)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(135deg, #20d9cf 0%, #4a66e6 100%)',
          },
          '&:disabled': {
            background: 'linear-gradient(135deg, #c9c9c9 0%, #d6d6d6 100%)',
            color: 'rgba(255, 255, 255, 0.8)',
          },
          transition: 'all 0.2s ease',
          '&:active': {
            transform: 'scale(0.95)',
          },
          padding: 0,
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default QuantityInput;
