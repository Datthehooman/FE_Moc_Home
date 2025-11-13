// types/product.ts

export interface RoomProduct {
  product_id: number;
  category_id: number;
  product_name: string;
  brand: string | null;
  product_description: string | null;
  price: string;
  price_down: string | null;
  thumbnail: string;
  discount_percentage: number;
  status: string; // "1" for active
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface RoomOfProduct {
  id: number;
  room_name: string;
  slug: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface RoomProductItem {
  id: number;
  created_at: string;
  updated_at: string;
  product_id: number;
  room_id: number;
  product: RoomProduct;
  room: RoomOfProduct;
}

export interface RoomProductApiResult {
  data: RoomProductItem[];
}

export interface RoomProductApiResponse {
  status: boolean;
  message: string;
  result: RoomProductApiResult;
}
