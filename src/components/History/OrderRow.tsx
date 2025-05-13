import React, { useState } from 'react';
import {
  TableRow,
  TableCell,
  Box,
  IconButton,
  Typography,
  Button,
  Avatar,
  Tooltip,
  Collapse,
  alpha,
  useMediaQuery,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Divider,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import TransactionDetailsDialog from '@/src/components/ui/Dialog/TransactionDialog';
import OrderItemRow from '@/src/components/History/OrderItemRow';
import CouponItem from '@/src/components/History/CouponItem';

import { formatDate } from '@/src/utils/date.util';
import { Order } from '@/types/Order';

interface OrderRowProps {
  order: Order;
  onToggleCouponUsed: (couponId: string, isUsed: boolean) => void;
}

/**
 * 注文行コンポーネント
 */
const OrderRow = ({ order, onToggleCouponUsed }: OrderRowProps) => {
  const [open, setOpen] = useState(false);
  const [showTxDialog, setShowTxDialog] = useState(false);
  const [txCopied, setTxCopied] = useState(false);

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:900px)');
  const isExtraSmall = useMediaQuery('(max-width:400px)');

  // トランザクションIDをコピー
  const handleCopyTx = () => {
    if (order.transactionId) {
      navigator.clipboard.writeText(order.transactionId);
      setTxCopied(true);
      setTimeout(() => setTxCopied(false), 2000);
    }
  };

  // 行の展開・折りたたみ
  const handleToggleRow = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // イベントの伝播を止める
    }
    setOpen(!open);
  };

  // トランザクションダイアログを開く
  const handleOpenTxDialog = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTxDialog(true);
  };

  return (
    <React.Fragment>
      {/* 注文の基本情報行 */}
      <TableRow
        sx={{
          '& > *': { borderBottom: 'unset' },
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: alpha('#f5f5f5', 0.5),
          },
        }}
        onClick={handleToggleRow}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleToggleRow}
            sx={{
              transition: 'all 0.3s ease',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              padding: isExtraSmall ? 0.5 : undefined,
            }}
          >
            <KeyboardArrowDownIcon fontSize={isExtraSmall ? 'small' : 'medium'} />
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                width: isExtraSmall ? 20 : isMobile ? 24 : 32,
                height: isExtraSmall ? 20 : isMobile ? 24 : 32,
                bgcolor: alpha('#1dd7d0', 0.2),
                color: '#426bff',
                fontSize: isExtraSmall ? '0.65rem' : isMobile ? '0.7rem' : '0.8rem',
                fontWeight: 'bold',
                mr: isExtraSmall ? 0.5 : isMobile ? 1 : 1.5,
              }}
            >
              {order.items.length}
            </Avatar>
            <Typography
              variant={isMobile ? 'caption' : 'body2'}
              sx={{
                fontWeight: 600,
                color: '#426bff',
                fontSize: isExtraSmall ? '0.65rem' : undefined,
              }}
            >
              #{order.id.slice(-6)}
            </Typography>
          </Box>
        </TableCell>
        <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DateRangeOutlinedIcon
              sx={{
                color: '#666',
                mr: isTablet ? 0.5 : 1,
                fontSize: isTablet ? '0.9rem' : '1.1rem',
                opacity: 0.7,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: isTablet ? '0.75rem' : undefined,
              }}
            >
              {formatDate(order.orderDate)}
            </Typography>
          </Box>
        </TableCell>
        <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
          {order.transactionId && (
            <Tooltip title="トランザクション詳細を表示">
              <Button
                variant="text"
                size={isTablet ? 'small' : 'medium'}
                startIcon={<AccountBalanceWalletOutlinedIcon />}
                onClick={handleOpenTxDialog}
                sx={{
                  color: '#426bff',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: alpha('#426bff', 0.05),
                  },
                  fontSize: isTablet ? '0.75rem' : undefined,
                  px: isTablet ? 1 : undefined,
                }}
              >
                {isMobile ? 'Tx' : 'トランザクション'}
              </Button>
            </Tooltip>
          )}
        </TableCell>
        <TableCell align="right">
          <Typography
            variant={isMobile ? 'body2' : 'body1'}
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(90deg, #1dd7d0, #426bff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: isExtraSmall ? '0.75rem' : undefined,
            }}
          >
            {order.totalTokens} BBT
          </Typography>
        </TableCell>
      </TableRow>

      {/* 注文詳細行（展開時） */}
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                py: isMobile ? 2 : 3,
                px: { xs: 1, sm: 2, md: 3 },
                backgroundColor: alpha('#f8f8f8', 0.4),
              }}
            >
              {/* ヘッダー部分 */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: isMobile ? 1.5 : 2,
                  flexWrap: 'wrap',
                  gap: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: isExtraSmall ? '0.7rem' : isMobile ? '0.8rem' : '0.9rem',
                  }}
                >
                  <ReceiptLongOutlinedIcon
                    sx={{
                      mr: isExtraSmall ? 0.5 : 1,
                      fontSize: isExtraSmall ? '0.8rem' : isMobile ? '0.9rem' : '1.1rem',
                      color: '#426bff',
                    }}
                  />
                  注文詳細
                </Typography>
              </Box>

              {/* 商品リスト */}
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  borderRadius: isMobile ? '8px' : '12px',
                  mb: isMobile ? 2 : 3,
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                }}
              >
                <Table size={isMobile ? 'small' : 'medium'} aria-label="purchases">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: alpha('#f3f4f6', 0.7) }}>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: isExtraSmall ? '0.65rem' : isMobile ? '0.7rem' : '0.8rem',
                          padding: isExtraSmall ? '6px 8px' : undefined,
                        }}
                      >
                        商品
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 600,
                          fontSize: isExtraSmall ? '0.65rem' : isMobile ? '0.7rem' : '0.8rem',
                          padding: isExtraSmall ? '6px 4px' : undefined,
                        }}
                      >
                        単価
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 600,
                          fontSize: isExtraSmall ? '0.65rem' : isMobile ? '0.7rem' : '0.8rem',
                          padding: isExtraSmall ? '6px 4px' : undefined,
                        }}
                      >
                        数量
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontWeight: 600,
                          fontSize: isExtraSmall ? '0.65rem' : isMobile ? '0.7rem' : '0.8rem',
                          padding: isExtraSmall ? '6px 8px' : undefined,
                        }}
                      >
                        小計
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.items.map((item: any) => (
                      <OrderItemRow key={item.id} item={item} isMobile={isMobile} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* クーポン一覧 */}
              {order.coupons && order.coupons.length > 0 && (
                <Box sx={{ mb: isMobile ? 1.5 : 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: '#333',
                      display: 'flex',
                      alignItems: 'center',
                      mb: isMobile ? 1 : 2,
                      fontSize: isExtraSmall ? '0.7rem' : isMobile ? '0.8rem' : '0.9rem',
                    }}
                  >
                    <LoyaltyOutlinedIcon
                      sx={{
                        mr: isExtraSmall ? 0.5 : 1,
                        fontSize: isExtraSmall ? '0.8rem' : isMobile ? '0.9rem' : '1.1rem',
                        color: '#426bff',
                      }}
                    />
                    クーポン一覧
                  </Typography>

                  <Box
                    sx={{
                      p: isExtraSmall ? 1 : isMobile ? 1.5 : 2,
                      borderRadius: isMobile ? '8px' : '12px',
                      backgroundColor: alpha('#f3f4f6', 0.7),
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {order.coupons.map((coupon) => (
                      <CouponItem
                        key={coupon.id}
                        coupon={coupon}
                        onToggleUsed={(id, isUsed) => onToggleCouponUsed(id, isUsed)}
                        compact={isExtraSmall}
                      />
                    ))}

                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        color: alpha('#000', 0.5),
                        mt: isMobile ? 0.5 : 1,
                        textAlign: 'right',
                        fontSize: isExtraSmall ? '0.55rem' : isMobile ? '0.6rem' : '0.7rem',
                      }}
                    >
                      ※ クーポンを使用したら、チェックボックスをオンにしてください
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* トランザクション情報 (小さいデバイスでは非表示) 要望があればコメントアウトを外す  */}
              {/* {order.transactionId && !isMobile && (
                <Box sx={{ mt: 3 }}>
                  <Divider sx={{ mb: 2 }} />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: '#333',
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1,
                      fontSize: isTablet ? '0.8rem' : '0.9rem',
                    }}
                  >
                    <AccountBalanceWalletOutlinedIcon
                      sx={{ mr: 1, fontSize: isTablet ? '0.9rem' : '1.1rem', color: '#426bff' }}
                    />
                    トランザクション情報
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 1.5,
                      borderRadius: '8px',
                      backgroundColor: alpha('#f3f4f6', 0.7),
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'monospace',
                        fontWeight: 500,
                        color: '#333',
                        mr: 1,
                        flexGrow: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: isTablet ? '0.7rem' : '0.8rem',
                      }}
                    >
                      {order.transactionId}
                    </Typography>

                    <Tooltip title={txCopied ? 'コピーしました！' : 'トランザクションIDをコピー'}>
                      <IconButton
                        size="small"
                        onClick={handleCopyTx}
                        sx={{
                          color: txCopied ? '#2ecc71' : '#426bff',
                          backgroundColor: txCopied ? alpha('#2ecc71', 0.1) : alpha('#426bff', 0.1),
                          '&:hover': {
                            backgroundColor: txCopied
                              ? alpha('#2ecc71', 0.2)
                              : alpha('#426bff', 0.2),
                          },
                        }}
                      >
                        {txCopied ? (
                          <CheckIcon fontSize="small" />
                        ) : (
                          <ContentCopyIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              )}

              {/* モバイル用のトランザクションボタン */}
              {order.transactionId && isMobile && (
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AccountBalanceWalletOutlinedIcon />}
                    onClick={handleOpenTxDialog}
                    sx={{
                      color: '#426bff',
                      borderColor: alpha('#426bff', 0.5),
                      textTransform: 'none',
                      borderRadius: '20px',
                      fontSize: isExtraSmall ? '0.7rem' : '0.75rem',
                      '&:hover': {
                        borderColor: '#426bff',
                        backgroundColor: alpha('#426bff', 0.05),
                      },
                    }}
                  >
                    トランザクション詳細を表示
                  </Button>
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      {/* トランザクション詳細ダイアログ */}
      <TransactionDetailsDialog
        open={showTxDialog}
        onClose={() => setShowTxDialog(false)}
        transactionId={order.transactionId}
        totalTokens={order.totalTokens}
      />
    </React.Fragment>
  );
};

export default OrderRow;
