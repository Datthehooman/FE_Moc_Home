import { ref } from 'vue'

export interface Category {
  id: number
  category_name: string
}

export interface Product {
  product_id: number
  product_name: string
  price: number
  price_down?: number
  badge?: string | null
  brand?: string | { brand_name: string }
  images?: { image_url: string }[]
  rating?: number
  sku?: string
  stock_quantity?: number
  category_id?: number
  category?: Category
  thumbnail?: string // ✅ thêm thumbnail vào interface
}

export const useProduct = () => {
  const products = ref<Product[]>([])
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const error = ref('')

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/client/category')
      const json = await res.json()
      categories.value = json?.result?.data || []
    } catch (err) {
      console.error('❌ Lỗi fetch category:', err)
    }
  }

  const fetchProducts = async () => {
    loading.value = true
    error.value = ''

    try {
      await fetchCategories() // fetch danh mục trước

      const res = await fetch('http://127.0.0.1:8000/api/client/products')
      if (!res.ok) throw new Error('Lỗi khi load sản phẩm')
      const json = await res.json()
      const apiProducts = json?.result?.data || []

      products.value = apiProducts.map((p: any) => {
        const category = categories.value.find(c => c.id === p.category_id) || null

        // ✅ xử lý thumbnail
        const thumbnail =
          p.thumbnail
            ? p.thumbnail
            : p.images?.[0]?.image_url
            ? `http://127.0.0.1:8000/storage/${p.images[0].image_url}`
            : '/placeholder.png'

        return {
          product_id: p.product_id,
          product_name: p.product_name,
          price: Number(p.price),
          price_down: Number(p.price_down || p.price),
          badge: p.badge,
          brand: typeof p.brand === 'object' ? p.brand.brand_name : p.brand,
          images: p.images || [],
          rating: p.rating != null ? Number(p.rating) : 0,
          sku: p.sku ?? 'N/A',
          stock_quantity: p.stock_quantity ?? 0,
          category_id: p.category_id,
          category,
          thumbnail, // ✅ gán thêm thumbnail
        }
      })

      console.log('✅ Parsed products:', products.value)
      console.table(products.value.map(p => ({ id: p.product_id, thumb: p.thumbnail }))) // 👀 debug thumbnail

    } catch (err: any) {
      error.value = err.message || 'Đã xảy ra lỗi khi tải dữ liệu.'
      console.error('❌ API error:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
  }
}
