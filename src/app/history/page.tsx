'use client';

import React, { useState, useEffect } from 'react';
import { Container, Box, alpha, useTheme, useMediaQuery } from '@mui/material';
import Breadcrumb from '@/src/components/ui/Breadcrumbs';
import StylishLoader from '@/src/components/ui/StylishLoader';
import ErrorModal from '@/src/components/ui/Modal/ErrorModal';
import { fetchWithAuth } from '@/src/utils/fetch.util';
import { Order } from '@/types/Order';

import HistoryOrdersTable from '@/src/components/History/HistoryOrdersTable';
import EmptyOrdersMessage from '@/src/components/History/EmptyOrderMessage';
import HistoryPagination from '@/src/components/History/HistoryPagination';
import HisotrySearchBar from '@/src/components/History/HisotrySearchBar';
import HistoryPageHeader from '@/src/components/History/HistoryPageHeader';
import {
  gradientBg,
  tokenExchangePrimary,
  tokenExchangeSecondary,
} from '@/src/styles/styeleConstants';

export default function PurchaseHistoryPage() {
  const theme = useTheme();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  // レスポンシブデザイン用のブレークポイント
  const isMobile = useMediaQuery('(max-width:600px)');
  const isSmallMobile = useMediaQuery('(max-width:400px)');
  const isLargeScreen = useMediaQuery('(min-width:1200px)');

  // モバイルでのページごとの表示数を調整
  const itemsPerPage = 10;

  // クーポンの使用状態を切り替え
  const handleToggleCouponUsed = (couponId: string, isUsed: boolean) => {
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        const updatedCoupons = order.coupons.map((coupon) => {
          if (coupon.id === couponId) {
            return { ...coupon, isUsed };
          }
          return coupon;
        });

        return {
          ...order,
          coupons: updatedCoupons,
        };
      });
    });

    fetchWithAuth(`/token-exchange/coupons/${couponId}`, {
      method: 'PATCH',
      body: JSON.stringify({ isUsed }),
    });
  };

  // 注文履歴を取得
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = (await fetchWithAuth('/token-exchange/orders/history')) as {
          orders: Order[];
        };

        setOrders(response.orders || []);
        setFilteredOrders(response.orders || []);
        setTotalPages(Math.ceil((response.orders || []).length / itemsPerPage));
      } catch (err: any) {
        console.error('Failed to fetch orders:', err);
        setError(err.message || '購入履歴の取得に失敗しました。');
        setOpenErrorModal(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [itemsPerPage]);

  // 検索機能
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.items.some((item) =>
            item.productName.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          order.coupons.some(
            (coupon) =>
              coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
              coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setFilteredOrders(filtered);
    }
    setPage(1);
    setTotalPages(Math.ceil(filteredOrders.length / itemsPerPage));
  }, [searchTerm, orders, itemsPerPage]);

  // ページに表示する注文を取得
  const displayedOrders = filteredOrders.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handlePrevPage = () => {
    if (page > 1) {
      handlePageChange(null, page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      handlePageChange(null, page + 1);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: `
            radial-gradient(circle at 90% 10%, ${alpha(tokenExchangePrimary, 0.03)} 0%, transparent 20%),
            radial-gradient(circle at 10% 90%, ${alpha(tokenExchangeSecondary, 0.03)} 0%, transparent 20%)
          `,
        }}
      >
        <StylishLoader size={isMobile ? 100 : 150} />
      </Box>
    );
  }

  return (
    <Container maxWidth={isLargeScreen ? 'lg' : 'md'} sx={{ px: { xs: 1.5, sm: 2, md: 3 } }}>
      <Box
        sx={{
          mt: { xs: 2, sm: 3, md: 4 },
          mb: { xs: 4, sm: 5, md: 6 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -100,
            right: -400,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: alpha(tokenExchangePrimary, 0.03),
            zIndex: -1,
            display: { xs: 'none', md: 'block' },
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -200,
            left: -300,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: alpha(tokenExchangeSecondary, 0.03),
            zIndex: -1,
            display: { xs: 'none', md: 'block' },
          },
        }}
      >
        <Box sx={{ mb: { xs: 1, sm: 2 } }}>
          <Breadcrumb currentPage="購入履歴" />
        </Box>

        <HistoryPageHeader
          isMobile={isMobile}
          isSmallMobile={isSmallMobile}
          gradientBg={gradientBg}
        />

        {/* 検索部分 */}
        <HisotrySearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredCount={filteredOrders.length}
          isMobile={isMobile}
          isSmallMobile={isSmallMobile}
          theme={theme}
          gradientBg={gradientBg}
        />

        {/* 注文履歴テーブル */}
        {filteredOrders.length > 0 ? (
          <HistoryOrdersTable
            displayedOrders={displayedOrders}
            onToggleCouponUsed={handleToggleCouponUsed}
            isSmallMobile={isSmallMobile}
            isMobile={isMobile}
          />
        ) : (
          <EmptyOrdersMessage
            isSmallMobile={isSmallMobile}
            isMobile={isMobile}
            gradientBg={gradientBg}
          />
        )}

        {/* ページネーション - モバイル最適化 */}
        {filteredOrders.length > itemsPerPage && (
          <HistoryPagination
            page={page}
            totalPages={totalPages}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            handlePageChange={handlePageChange}
            isMobile={isMobile}
            isSmallMobile={isSmallMobile}
            gradientBg={gradientBg}
          />
        )}
      </Box>

      <ErrorModal
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
        errorMessage={error}
      />
    </Container>
  );
}
