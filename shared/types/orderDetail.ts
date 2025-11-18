
export interface Product {
  product_id: number
  category_id: number
  product_name: string
  sku: string
  brand: string
  description: string
  material: string
  size: number
  color: string
  weight: string
  price: string
  price_down: string | null
  rating: number
  badge: string | null
  quantity: number
  view: number
  stock_quantity: number
  slug: string
  status: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  thumbnail: string
  discount_percentage: number
}

export interface OrderDetail {
  id: number
  product_id: number
  order_id: number
  quantity: number
  price: string
  status: number
  subtotal: string
  created_at: string
  updated_at: string

  product: Product
}
