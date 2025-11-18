
export interface Wishlist {
  product_id: number;
  category_id: number;
  product_name: string;
  sku: string;
  brand: string;
  description: string;
  material: string;
  size: number;
  color: string;
  weight: string;
  price: Number;
  price_down: Number;
  rating: number;
  badge: string | null;
  quantity: number;
  view: number;
  stock_quantity: number;
  slug: string;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  thumbnail: string;
  discount_percentage: number;	
}

export interface WishlistApiResponse {
  status: boolean;
  message: string;
  result: { data: Wishlist[] };
}