import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { fetchWithAuth } from '@/src/utils/fetch.util';

const useProductDetails = () => {
  const params = useParams();
  const productId = params[':productId'];

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const fetchProductDetails = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchWithAuth(`/token-exchange/products/${productId}`);
      setProduct(data);
    } catch (err: any) {
      setError('Failed to fetch product details');
      console.error('Error fetching product details:', err);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId, fetchProductDetails]);

  return { product, loading, error, refetch: fetchProductDetails };
};

export default useProductDetails;
