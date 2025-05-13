'use client';
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
  alpha,
  Divider,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { gradientBg } from '@/src/styles/styeleConstants';

interface AboutDialogProps {
  open: boolean;
  onClose: () => void;
}

// スライドアップトランジション
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AboutDialog: React.FC<AboutDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
          overflow: 'hidden', // 重要: ヘッダーのグラデーションが角を超えないように
          border: 'none',
          position: 'relative',
        },
      }}
    >
      {/* グラデーションのトップアクセント */}
      <Box
        sx={{
          height: '4px',
          width: '100%',
          background: gradientBg,
        }}
      />

      {/* ヘッダー部分 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 3,
          pt: 3,
          pb: 2,
        }}
      >
        <InfoOutlinedIcon
          sx={{
            fontSize: '28px',
            mr: 1.5,
            background: gradientBg,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 3px rgba(29, 215, 208, 0.2))',
          }}
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: '#222',
            letterSpacing: '0.5px',
          }}
        >
          サイトについて
        </Typography>

        {/* 閉じるボタン（右上） */}
        <Box sx={{ flexGrow: 1 }} />
        <Button
          onClick={onClose}
          sx={{
            minWidth: 'auto',
            p: 1,
            borderRadius: '50%',
            color: '#888',
            '&:hover': {
              backgroundColor: alpha('#000', 0.04),
              color: '#555',
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </Button>
      </Box>

      <Divider sx={{ opacity: 0.6 }} />

      {/* コンテンツ部分 */}
      <DialogContent
        sx={{
          px: { xs: 2, sm: 3 },
          py: { xs: 2.5, sm: 3 },
          background: alpha('#f9f9f9', 0.3),
        }}
      >
        <Box
          sx={{
            p: { xs: 2, sm: 2.5 },
            borderRadius: '12px',
            background: '#fff',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
          }}
        >
          <DialogContentText
            component="div"
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem' },
              lineHeight: 1.8,
              color: '#333',
              mb: 0,
            }}
          >
            <Typography
              component="span"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '0.95rem', sm: '1.05rem' },
                display: 'block',
                mb: 1.5,
                color: '#222',
              }}
            >
              BBT交換所へようこそ
            </Typography>
            本サイトはBlockchain Lures が運営するBBTの交換所です。
            <br />
            獲得したトークンとお好きな特典を交換することが出来ます。
            <Box
              sx={{
                my: 2,
                py: 1.5,
                px: 2,
                borderRadius: '8px',
                backgroundColor: alpha('#e8f4fd', 0.7),
                borderLeft: `3px solid ${alpha('#1dd7d0', 0.7)}`,
              }}
            >
              <Typography component="span" sx={{ fontWeight: 600, color: '#444' }}>
                BBTとは
              </Typography>
              <Typography component="div" sx={{ mt: 0.5, color: '#555' }}>
                BCLが発行するMEMEトークンです
              </Typography>
            </Box>
            <Typography component="div" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <span style={{ fontWeight: 600, marginRight: '8px' }}>獲得方法:</span>
              <a
                href="https://bcl-whitepaper.gitbook.io/bcl-whitepaper/bbtnitsuite"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#426bff',
                  textDecoration: 'none',
                  fontWeight: 500,
                  position: 'relative',
                  display: 'inline-block',
                  paddingBottom: '2px',
                }}
                className="gradientLink"
              >
                こちらをクリック
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '1px',
                    background: gradientBg,
                    transition: 'height 0.2s ease-in-out',
                  }}
                />
              </a>
            </Typography>
            <Box
              sx={{
                mt: 2,
                py: 1.5,
                px: 2,
                borderRadius: '8px',
                backgroundColor: alpha('#fff9e6', 0.7),
                borderLeft: `3px solid ${alpha('#426bff', 0.7)}`,
                fontSize: '0.9rem',
              }}
            >
              <Typography component="div" sx={{ color: '#555' }} fontSize={14}>
                ※ 商品交換後、BBT残高の反映に少々時間がかかる場合があります
              </Typography>
            </Box>
          </DialogContentText>
        </Box>
      </DialogContent>

      {/* アクション部分 */}
      <DialogActions sx={{ justifyContent: 'center', p: 3, pt: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            background: gradientBg,
            color: '#fff',
            textTransform: 'none',
            px: 5,
            py: 1.2,
            borderRadius: '30px',
            boxShadow: '0 6px 16px rgba(29, 215, 208, 0.2), 0 2px 6px rgba(66, 107, 255, 0.15)',
            fontWeight: 'bold',
            fontSize: '1rem',
            letterSpacing: '1px',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 8px 24px rgba(29, 215, 208, 0.25), 0 4px 8px rgba(66, 107, 255, 0.2)',
              transform: 'translateY(-2px)',
            },
            '&:active': {
              transform: 'translateY(1px)',
            },
          }}
        >
          閉じる
        </Button>
      </DialogActions>

      {/* グローバルCSS（リンクのホバーエフェクト用） */}
      <style jsx global>{`
        .gradientLink:hover {
          color: #1dd7d0;
        }
        .gradientLink:hover > div {
          height: 2px;
        }
      `}</style>
    </Dialog>
  );
};

export default AboutDialog;
