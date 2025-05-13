'use client';

import { useEffect, useState, useCallback } from 'react';
import { Container, Box, alpha, Fade } from '@mui/material';
import { fetchWithAuth } from '@/src/utils/fetch.util';
import { createUmi, publicKey as PublicKey } from '@metaplex-foundation/umi';
import {
  fetchAllDigitalAssetByOwner,
  type DigitalAsset,
} from '@metaplex-foundation/mpl-token-metadata';
import { useTokenStore } from '@/src/store/tokenStore';
import ErrorModal from '@/src/components/ui/Modal/ErrorModal';
import { Product, ProductListResponse } from '@/types/Product';
import AboutDialog from '@/src/components/ui/Dialog/AboutDialog';
import ShopPageHeader from '@/src/components/Shop/ShopPageHeader';
import FilterSection from '@/src/components/Shop/FilterSection';
import ShopProductsList from '@/src/components/Shop/ProductList';
import ShopPaginationSection from '@/src/components/Shop/ShopPaginationSection';
import { nokeyWalletInstance } from '@/src/config/solanaConfig';
import { tokenExchangePrimary, tokenExchangeSecondary } from '@/src/styles/styeleConstants';

// カスタムフック: Nokeyウォレット関連の処理を抽出
const useWalletConnection = () => {
  const [walletAddress] = useState('');
  const [walletType] = useState('nokey');
  const [items, setItems] = useState<DigitalAsset[]>([]);
  const { fetchBalance } = useTokenStore();
  const nokeyWallet = nokeyWalletInstance;

  useEffect(() => {
    sessionStorage.removeItem('checkoutCompleted');
    nokeyWallet.connect();
    fetchBalance();
  }, [fetchBalance]);

  useEffect(() => {
    nokeyWallet.connect();
  }, [walletType, walletAddress]);

  useEffect(() => {
    if (walletAddress !== '') {
      const umi = createUmi();
      fetchAllDigitalAssetByOwner(umi, PublicKey(walletAddress))
        .then((assets) => {
          const arr = assets.slice(0, 10);
          setItems(arr);
        })
        .catch((error) => console.error('Failed to fetch digital assets:', error));
    }
  }, [walletAddress]);

  return { walletAddress, items };
};

// カスタムフック: 商品データの取得処理を抽出
const useProducts = (currentPage: number, itemsPerPage: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data: ProductListResponse = await fetchWithAuth(
        `/token-exchange/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      setProducts(data.products);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error };
};

// カスタムフック: 検索とフィルタリング処理を抽出
const useProductFiltering = (products: Product[]) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [resultsCount, setResultsCount] = useState<number>(0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSearchClear = () => {
    if (searchTerm && !searchHistory.includes(searchTerm)) {
      setSearchHistory((prev) => [searchTerm, ...prev].slice(0, 5));
    }
    setSearchTerm('');
  };

  const handleSortChange = (e: any) => {
    setSort(e.target.value);
  };

  const filteredProducts = products
    .filter((product: Product) => product.name.toLowerCase().includes(searchTerm))
    .sort((a: Product, b: Product) => {
      if (sort === 'token_asc') return a.priceInTokens - b.priceInTokens;
      if (sort === 'token_desc') return b.priceInTokens - a.priceInTokens;
      return 0;
    });

  useEffect(() => {
    setResultsCount(filteredProducts.length);
  }, [filteredProducts.length]);

  return {
    searchTerm,
    sort,
    searchHistory,
    resultsCount,
    filteredProducts,
    handleSearchChange,
    handleSearchClear,
    handleSortChange,
  };
};

export default function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [aboutOpen, setAboutOpen] = useState(false);
  const itemsPerPage = 20;

  // ウォレット接続
  useWalletConnection();

  // 商品データの取得
  const { products, loading, error } = useProducts(currentPage, itemsPerPage);

  // 検索とフィルタリング
  const {
    searchTerm,
    sort,
    searchHistory,
    resultsCount,
    filteredProducts,
    handleSearchChange,
    handleSearchClear,
    handleSortChange,
  } = useProductFiltering(products);

  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);

  // エラー処理
  useEffect(() => {
    if (error) {
      setOpenErrorModal(true);
    }
  }, [error]);

  // About ダイアログの表示制御
  useEffect(() => {
    const hasSeenAbout = localStorage.getItem('hasSeenAbout');
    if (!hasSeenAbout) {
      setAboutOpen(true);
      localStorage.setItem('hasSeenAbout', 'true');
    }
  }, []);

  // ページネーション
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Fade in={true} timeout={800}>
      <Box
        sx={{
          py: 4,
          minHeight: 'calc(100vh - 200px)',
          background: `
            radial-gradient(circle at 80% 10%, ${alpha(tokenExchangePrimary, 0.08)} 0%, transparent 25%),
            radial-gradient(circle at 20% 80%, ${alpha(tokenExchangeSecondary, 0.08)} 0%, transparent 25%)
          `,
        }}
      >
        <Container>
          <ShopPageHeader />

          <FilterSection
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            handleSearchClear={handleSearchClear}
            searchHistory={searchHistory}
            sort={sort}
            handleSortChange={handleSortChange}
            resultsCount={resultsCount}
          />

          <ShopProductsList
            loading={loading}
            displayedProducts={displayedProducts}
            handleSearchClear={handleSearchClear}
          />

          {displayedProducts.length > 0 && (
            <ShopPaginationSection
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
            />
          )}
        </Container>

        <ErrorModal
          open={openErrorModal}
          onClose={() => setOpenErrorModal(false)}
          errorMessage={error}
        />

        <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
      </Box>
    </Fade>
  );
}
