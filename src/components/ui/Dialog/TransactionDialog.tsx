import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  alpha,
  useMediaQuery,
  Fade,
} from '@mui/material';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';

interface TransactionDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  transactionId?: string;
  totalTokens: number;
}

const TransactionDetailsDialog = ({
  open,
  onClose,
  transactionId = '',
  totalTokens,
}: TransactionDetailsDialogProps) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isExtraSmall = useMediaQuery('(max-width:400px)');
  const [txCopied, setTxCopied] = useState(false);

  const handleCopyTx = () => {
    if (transactionId) {
      navigator.clipboard.writeText(transactionId);
      setTxCopied(true);
      setTimeout(() => setTxCopied(false), 2000);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: '12px', sm: '16px' },
          p: { xs: 1.5, sm: 2 },
          background: 'linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)',
          m: { xs: 2, sm: 'auto' }, // モバイルでの余白調整
          width: { xs: 'calc(100% - 32px)', sm: '100%' }, // モバイルでの幅調整
        },
      }}
    >
      <DialogTitle sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountBalanceWalletOutlinedIcon
            sx={{
              mr: { xs: 1, sm: 1.5 },
              color: '#426bff',
              fontSize: isMobile ? '1.2rem' : '1.5rem',
            }}
          />
          <Typography
            variant={isMobile ? 'subtitle1' : 'h6'}
            fontWeight={600}
            sx={{
              fontSize: isExtraSmall ? '0.95rem' : isMobile ? '1.1rem' : '1.25rem',
            }}
          >
            トランザクション詳細
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Box
          sx={{
            mt: { xs: 0.5, sm: 1 },
            p: { xs: 1.5, sm: 2 },
            borderRadius: { xs: '10px', sm: '12px' },
            backgroundColor: alpha('#f3f4f6', 0.5),
            border: '1px solid rgba(0, 0, 0, 0.05)',
          }}
        >
          <Typography
            variant="subtitle2"
            fontWeight={500}
            color="text.secondary"
            gutterBottom
            sx={{ fontSize: isMobile ? '0.75rem' : '0.85rem' }}
          >
            トランザクションID
          </Typography>
          <Box
            sx={{
              p: { xs: 1.5, sm: 2 },
              borderRadius: { xs: '6px', sm: '8px' },
              backgroundColor: 'white',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              fontFamily: 'monospace',
              wordBreak: 'break-all',
              fontSize: isMobile ? '0.75rem' : '0.85rem',
              mb: { xs: 1.5, sm: 2 },
              overflowX: 'auto',
              whiteSpace: isExtraSmall ? 'nowrap' : 'normal',
            }}
          >
            {transactionId}
          </Box>

          <Typography
            variant="subtitle2"
            fontWeight={500}
            color="text.secondary"
            gutterBottom
            sx={{ fontSize: isMobile ? '0.75rem' : '0.85rem' }}
          >
            送金額
          </Typography>
          <Box
            sx={{
              p: { xs: 1.5, sm: 2 },
              borderRadius: { xs: '6px', sm: '8px' },
              backgroundColor: 'white',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              fontWeight: 600,
              fontSize: isMobile ? '1rem' : '1.1rem',
              color: '#426bff',
              textAlign: 'center',
            }}
          >
            {totalTokens} BBT
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: { xs: 1.5, sm: 2 }, gap: 1 }}>
        <Button
          onClick={onClose}
          size={isMobile ? 'small' : 'medium'}
          sx={{
            color: '#666',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: isMobile ? '0.8rem' : '0.875rem',
          }}
        >
          閉じる
        </Button>
        <Button
          onClick={handleCopyTx}
          startIcon={
            txCopied ? (
              <Fade in={true} timeout={200}>
                <CheckIcon />
              </Fade>
            ) : (
              <ContentCopyIcon />
            )
          }
          variant="contained"
          size={isMobile ? 'small' : 'medium'}
          sx={{
            background: txCopied ? '#2ecc71' : 'linear-gradient(90deg, #1dd7d0, #426bff)',
            color: 'white',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '30px',
            px: { xs: 2, sm: 3 },
            fontSize: isMobile ? '0.8rem' : '0.875rem',
            '&:hover': {
              background: txCopied ? '#27ae60' : 'linear-gradient(90deg, #19c2bb, #3b60e5)',
            },
          }}
        >
          {txCopied ? 'コピーしました' : 'IDをコピー'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionDetailsDialog;
