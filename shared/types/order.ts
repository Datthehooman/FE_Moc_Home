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

export interface Order {
  order_id: number
  order_code: string
  voucher_id: number | null
  user_id: number
  customer_name: string
  customer_phone: string
  customer_email: string
  order_status: 'pending' | 'processing' | 'completed' | 'cancelled' | string
  order_date: string
  shipping_address: string
  total_amount: string
  payment_method_id: number
  payment_status: string
  subtotal: string
  discount_amount: string
  shipping_fee: string
  note: string
  deposit_amount: string
  remaining_amount: string
  created_at: string
  updated_at: string
  order_details: OrderDetail[]
}

export interface OrdersResponse {
  current_page: number
  data: Order[]
}
