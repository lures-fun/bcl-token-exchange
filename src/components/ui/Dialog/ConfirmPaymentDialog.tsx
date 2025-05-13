import React from 'react';
import {
  Dialog,
  Box,
  Typography,
  Button,
  IconButton,
  Slide,
  alpha,
  Paper,
  Fade,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Image from 'next/image';
import HeaderLogo from '@/public/HeaderLogo.png';
import { gradientBg } from '@/src/styles/styeleConstants';

interface ConfirmPaymentDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sendAmount: string;
  estimatedChangesTitle?: string;
  logoSrc?: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmPaymentDialog: React.FC<ConfirmPaymentDialogProps> = ({
  open,
  onClose,
  onConfirm,
  sendAmount,
  estimatedChangesTitle = 'Estimated Changes',
  logoSrc = HeaderLogo,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: '20px',
          backgroundColor: '#fff',
          p: 0,
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          position: 'relative',
        },
      }}
    >
      {/* グラデーションヘッダー */}
      <Box
        sx={{
          background: gradientBg,
          py: 3,
          px: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 装飾的な背景要素 */}
        <Box
          sx={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-30%',
            left: '-10%',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            zIndex: 0,
          }}
        />

        {/* 閉じるボタン */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'white',
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(4px)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.3)',
            },
            zIndex: 2,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* ロゴとタイトル */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {logoSrc && (
            <Box
              sx={{
                position: 'relative',
                width: 60,
                height: 60,
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                background: 'white',
                p: 0.5,
              }}
            >
              <Image
                src={logoSrc}
                alt="Service Logo"
                fill
                style={{
                  objectFit: 'contain',
                }}
              />
            </Box>
          )}

          <Box sx={{ ml: 2 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.85)',
                fontWeight: 500,
                display: 'block',
                mb: 0.5,
              }}
            >
              BCL EXCHANGE
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'white',
                whiteSpace: 'nowrap',
                fontSize: { xs: '1.25rem', sm: '1.4rem' },
              }}
            >
              Confirm Transaction
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* コンテンツエリア */}
      <Box sx={{ px: 3, py: 4 }}>
        <Fade in={open} timeout={800}>
          <Box>
            {/* 送金額 */}
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1.5,
                }}
              >
                <SendIcon
                  sx={{
                    color: '#ff4757',
                    mr: 1,
                    fontSize: '1.2rem',
                  }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: '#333',
                    fontWeight: 600,
                  }}
                >
                  {estimatedChangesTitle}
                </Typography>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: '16px',
                  backgroundColor: alpha('#fff0f0', 0.6),
                  border: `1px solid ${alpha('#ff4757', 0.2)}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: '#ff4757',
                    mb: 0.5,
                  }}
                >
                  {sendAmount.split(' ')[0]}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: alpha('#ff4757', 0.8),
                    fontWeight: 500,
                  }}
                >
                  BBT
                </Typography>
              </Paper>
            </Box>

            {/* ネットワーク手数料 */}
            <Box sx={{ mb: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1.5,
                }}
              >
                <LocalAtmOutlinedIcon
                  sx={{
                    color: '#2ecc71',
                    mr: 1,
                    fontSize: '1.2rem',
                  }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: '#333',
                    fontWeight: 600,
                  }}
                >
                  Network Fee
                </Typography>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: '16px',
                  backgroundColor: alpha('#f0fff4', 0.6),
                  border: `1px solid ${alpha('#2ecc71', 0.2)}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#2ecc71',
                  }}
                >
                  0 SOL
                </Typography>
              </Paper>
            </Box>

            {/* 注意書き */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                mt: 3,
                mb: 2,
                mx: 1,
              }}
            >
              <ReceiptLongOutlinedIcon
                sx={{
                  color: alpha('#000', 0.4),
                  mr: 1,
                  fontSize: '1rem',
                  mt: 0.2,
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: alpha('#000', 0.6),
                  lineHeight: 1.4,
                }}
              >
                確認ボタンをクリックすると、上記の金額がウォレットから引き落とされます。一度実行した取引は取り消せません。
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Box>

      {/* アクションボタン */}
      <Box
        sx={{
          px: 3,
          pb: 3,
          pt: 1,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: alpha('#000', 0.2),
            color: '#666',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            borderRadius: '30px',
            px: 3,
            '&:hover': {
              borderColor: alpha('#000', 0.4),
              backgroundColor: alpha('#000', 0.03),
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          startIcon={<CheckCircleOutlineIcon />}
          sx={{
            background: gradientBg,
            color: '#fff',
            textTransform: 'none',
            borderRadius: '30px',
            fontWeight: 'bold',
            fontSize: '0.95rem',
            boxShadow: '0 4px 12px rgba(29, 215, 208, 0.25), 0 2px 6px rgba(66, 107, 255, 0.2)',
            px: 3,
            py: 1,
            '&:hover': {
              background: 'linear-gradient(90deg, #19c2bb, #3b60e5)',
              boxShadow: '0 6px 14px rgba(29, 215, 208, 0.3), 0 3px 8px rgba(66, 107, 255, 0.25)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          確認する
        </Button>
      </Box>
    </Dialog>
  );
};

export default ConfirmPaymentDialog;
