import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const CircularProgressWithLabel = ({ value }: { value: number }) => (
  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
    <CircularProgress variant="determinate" value={value} />
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
        {`${Math.round(value)}%`}
      </Typography>
    </Box>
  </Box>
);

const LoadingWithProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return <CircularProgressWithLabel value={progress} />;
};

export default LoadingWithProgress;
