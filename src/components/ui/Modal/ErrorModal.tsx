'use client';
import React, { useEffect } from 'react';
import { Box, Typography, Button, Backdrop, Fade, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { keyframes } from '@mui/system';

interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
  errorMessage?: string | null;
}

const PRIMARY_GRADIENT = 'linear-gradient(90deg, #1dd7d0, #426bff)';

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(244, 67, 54, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(244, 67, 54, 0);
  }
`;

/**
 * エラーメッセージを解析して適切な表示用テキストを抽出する関数
 * 様々なエラーフォーマットに対応
 */
const parseErrorMessage = (message: string | null | undefined): string => {
  // メッセージがない場合はデフォルトメッセージを返す
  if (!message)
    return 'エラーが発生しました。もう一度お試しいただくか、サポートにお問い合わせください。';

  try {
    // API Errorパターンの判定 (任意のステータスコードに対応)
    const apiErrorMatch = message.match(/API Error:?\s*(\d+)?\s*(.*)/i);
    if (apiErrorMatch && apiErrorMatch[2]) {
      const potentialJson = apiErrorMatch[2].trim();

      if (potentialJson.startsWith('{') && potentialJson.endsWith('}')) {
        try {
          const errorObj = JSON.parse(potentialJson);

          const errorMessage =
            errorObj.error || errorObj.message || errorObj.errorMessage || errorObj.description;

          if (errorMessage) return errorMessage;

          // 直接のプロパティがない場合はネストされたエラーを確認
          if (errorObj.data?.error) return errorObj.data.error;
        } catch {
          // JSONパースに失敗した場合はテキスト部分をそのまま返す
          return potentialJson;
        }
      }

      // JSONではない場合、そのテキスト部分を返す
      return apiErrorMatch[2];
    }

    const generalErrorMatch = message.match(/(?:Error|エラー):?\s*(.*)/i);
    if (generalErrorMatch && generalErrorMatch[1]) {
      return generalErrorMatch[1].trim();
    }

    // その他の一般的なエラーメッセージの処理
    return message;
  } catch {
    // 何らかの例外が発生した場合はそのまま返す
    return message;
  }
};

const ErrorModal = ({ open, onClose, errorMessage }: ErrorModalProps) => {
  // エラーメッセージをパース
  const displayMessage = parseErrorMessage(errorMessage);

  // エスケープキーでモーダルを閉じる機能
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [open, onClose]);

  return (
    <Backdrop
      open={open}
      onClick={onClose}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Fade in={open} timeout={400}>
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            bgcolor: 'background.paper',
            p: 0,
            borderRadius: 3,
            boxShadow: '0 10px 35px rgba(0, 0, 0, 0.2)',
            maxWidth: 500,
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            animation: `${pulseAnimation} 2s infinite`,
          }}
        >
          {/* ヘッダー部分（グラデーション背景） */}
          <Box
            sx={{
              background: PRIMARY_GRADIENT,
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{
                color: 'white',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <ErrorOutlineIcon /> エラーが発生しました
            </Typography>
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* コンテンツ部分 */}
          <Box sx={{ p: 4, textAlign: 'left' }}>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                lineHeight: 1.6,
                color: 'text.primary',
                fontSize: '1rem',
              }}
            >
              {displayMessage}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                onClick={onClose}
                sx={{
                  background: PRIMARY_GRADIENT,
                  textTransform: 'none',
                  px: 4,
                  py: 1,
                  boxShadow: '0 4px 12px rgba(66, 107, 255, 0.3)',
                  '&:hover': {
                    background: PRIMARY_GRADIENT,
                    opacity: 0.9,
                    boxShadow: '0 6px 16px rgba(66, 107, 255, 0.4)',
                  },
                }}
              >
                Agree
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Backdrop>
  );
};

export default ErrorModal;
