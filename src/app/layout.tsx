import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import theme from '@/src/theme';
import FooterWrapper from '@/src/components/ui/Footer/FooterWrapper';
import HeaderWrapper from '../components/ui/Header/HeaderWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BCL Token Exchange',
  description: 'BCL Token Exchange System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <HeaderWrapper />
            <Box sx={{ flex: 1 }}>{children}</Box>
            <FooterWrapper />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
