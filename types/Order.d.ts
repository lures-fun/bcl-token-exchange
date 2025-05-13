export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  imageUrl: string;
  quantity: number;
  priceInTokens: number;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  isUsed: boolean;
  orderId: string;
}

export interface Order {
  id: string;
  orderDate: string;
  totalTokens: number;
  items: OrderItem[];
  transactionId?: string; // Solana 取引 ID
  coupons: Coupon[];
}
