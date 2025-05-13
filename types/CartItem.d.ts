import { Product } from './Product';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  status: string;
  created_at: string;
  updated_at: string;
}
