export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  alt_text?: string | null;
  status: number;
  full_image_url: string;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  product_id: number;
  category_id: number;
  product_name: string;
  sku: string;
  brand: string;
  description: string;
  material: string;
  size: number | string;
  color: string;
  weight: string;
  price: string;
  price_down: string | null;
  quantity: number;
  view: number;
  stock_quantity: number;
  slug: string;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  thumbnail: string;
  discount_percentage: number;
  images: ProductImage[];
  rating: string;
  badge: string;
}

export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  prev_page_url: string | null;
  next_page_url: string | null;
}

export interface ProductApiResponse {
  status: boolean;
  message: string;
  result: { data: Product[]; pagination: Pagination };
}
