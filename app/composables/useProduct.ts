// ~/composables/useProduct.ts
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
  price_down: string
  quantity: number
  view: number
  slug: string
  status: number
  created_at: string
}

export interface ApiResponse<T = any> {
  success?: boolean
  message?: string
  data?: T
}

export function useProduct() {
  const getProducts = async (): Promise<ApiResponse<Product[]>> => {
    try {
      const response = await $fetch<ApiResponse<Product[]>>(
        'http://127.0.0.1:8000/api/client/products',
        { method: 'GET' }
      )
      return response
    } catch (error: any) {
      console.error('❌ Lỗi khi gọi API sản phẩm:', error)
      throw error?.data || { message: 'Lỗi kết nối server' }
    }
  }

  return { getProducts }
}
