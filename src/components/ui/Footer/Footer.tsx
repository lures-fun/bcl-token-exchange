import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import FooterImage from '@/public/FooterLogo.png';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'transparent',
        textAlign: 'center',
        mt: 'auto',
        pt: 4,
        pb: 1,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Image src={FooterImage} alt="Footer" width={200} height={30} />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Copyright © 2025 Blockchain Lures Inc. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
