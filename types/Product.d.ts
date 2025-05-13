export interface Product {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  priceInTokens: number;
  availableQuantity: number;
  priceRuleId: string;
  type: ProductType;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: string;
  limit: string;
}

export enum ProductType {
  COUPON = 'COUPON',
  PHYSICAL = 'PHYSICAL',
  DIGITAL = 'DIGITAL',
}
