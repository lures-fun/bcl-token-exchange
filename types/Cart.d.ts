import { CartItem } from './CartItem';

export interface Cart {
  id: string;
  userId: string;
  status: string;
  cartItems: CartItem[];
}
