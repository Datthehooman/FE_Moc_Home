<template>
  <div v-if="products.length" class="max-w-[87%] mx-auto px-4 relative mt-10">
    <ModulesProductTitle title="Sản phẩm liên quan" />

    <div class="relative" ref="containerRef">
<!-- Nút trái -->
<button
  v-if="products.length > visibleCount"
  @click="prevSlide"
  class="absolute left-[-18px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#6E4E37] text-white flex justify-center items-center hover:bg-[#8b644a] transition shadow-lg"
>
  ‹
</button>




      <!-- Khung trượt -->
      <div class="overflow-hidden">
        <div
          class="flex transition-transform duration-500 ease-in-out gap-[20px]"
          :style="{ transform: `translateX(-${relatedIndex * (itemWidth + gap)}px)` }"
        >
          <div
            v-for="item in products"
            :key="item.product_id"
            class="relative group h-[330px] flex-shrink-0"
            :style="{ width: itemWidth + 'px' }"
          >
            <!-- BOX NỀN DƯỚI -->
            <div
              class="absolute bottom-0 left-0 right-0 bg-[#FFF5EC] rounded-xl transition-all duration-500 ease-out z-0"
              :class="['h-[180px] group-hover:h-full shadow-sm group-hover:shadow-md']"
            ></div>

            <!-- NỘI DUNG -->
            <div class="relative z-10 p-4 flex flex-col">
              <div class="relative w-full flex justify-center mb-3">
                <!-- BADGE -->
                <span
                  v-if="item.badge && item.badge.trim() !== ''"
                  class="absolute top-1 right-2 w-[80px] h-[24px] flex justify-center items-center text-[14px] font-medium text-white rounded-full z-20"
                  :class="{
                    'bg-[#F05454]': item.badge === 'Mới',
                    'bg-[#00BFFF]': item.badge === 'Hot',
                    'bg-[#FBA707]': item.badge === 'Giảm 50%',
                  }"
                >
                  {{ item.badge }}
                </span>

                <!-- 🖼️ HÌNH ẢNH -->
                <img
                  :src="resolveThumbnail(item)"
                  :alt="item.product_name"
                  @click="goToDetail(item)"
                  class="w-[180px] h-[180px] object-contain relative z-10 transition-transform duration-500 ease-out cursor-pointer"
                  @error="onImageError(item)"
                />

                <!-- ICON HOVER -->
                <div
                  class="absolute left-1/2 bottom-[100px] transform -translate-x-1/2 translate-y-[120px] opacity-0 flex gap-2 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:translate-y-[90px] z-20"
                >
                  <UTooltip text="Xem sản phẩm">
                    <button
  @click="viewProduct(item)"
  class="w-[38px] h-[38px] rounded-full bg-[#6E4E37] flex justify-center items-center text-white shadow-md hover:bg-[#8b644a] transition"
>
  <UIcon name="i-heroicons-eye-solid" class="w-5 h-5 text-white" />
</button>

                  </UTooltip>

                  <UTooltip text="Thêm yêu thích">
                    <button
                      @click="handleAddToWishlist(item)"
                      class="w-[38px] h-[38px] rounded-full bg-[#6E4E37] flex justify-center items-center text-white shadow-md hover:bg-[#8b644a] transition"
                    >
                      <UIcon name="i-heroicons-heart" class="w-5 h-5 text-white" />
                    </button>
                  </UTooltip>
                </div>
              </div>

              <!-- TÊN -->
              <h3 class="text-gray-800 font-semibold text-[17px] text-left px-2 leading-snug truncate">
                {{ item.product_name }}
              </h3>

              <!-- ⭐ RATING -->
              <div class="flex mt-1 px-2 text-left">
                <UIcon
                  v-for="n in 5"
                  :key="n"
                  :name="Number(item.rating ?? 0) >= n ? 'i-heroicons-star-solid' : 'i-heroicons-star'"
                  class="w-4 h-4"
                  :class="Number(item.rating ?? 0) >= n ? 'text-yellow-400' : 'text-gray-300'"
                />
              </div>

              <!-- 💰 GIÁ -->
              <div class="mt-2 flex items-center justify-between w-full px-2">
                <div class="text-left">
                  <span v-if="item.badge === 'Giảm 50%' && item.price_down" class="line-through text-gray-400 text-[14px] block">
                    {{ formatPrice(item.price) }}
                  </span>
                  <span class="text-[#E95D5D] font-semibold text-[19px] block">
                    {{ formatPrice(item.price_down || item.price) }}
                  </span>
                </div>

                <!-- 🛒 GIỎ HÀNG -->
                <UTooltip text="Thêm giỏ hàng">
                  <button
                    @click="handleAddToCart(item)"
                    class="w-[38px] h-[38px] flex justify-center items-center rounded-full bg-[#6E4E37] text-white shadow-md hover:bg-[#8b644a] transition"
                  >
                    <UIcon name="i-heroicons-shopping-bag-solid" class="w-5 h-5 text-white" />
                  </button>
                </UTooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

<!-- Nút phải -->
<button
  v-if="products.length > visibleCount"
  @click="nextSlide"
  class="absolute right-[-25px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#6E4E37] text-white flex justify-center items-center hover:bg-[#8b644a] transition"
>
  ›
</button>
    </div>

    <ModulesProductQuickViewOverlay
      :show="showOverlay"
      :product="currentProduct"
      @close="showOverlay = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface ProductItem {
  product_id: number
  product_name: string
  thumbnail?: string
  images?: { image_url: string }[]
  price: number
  price_down?: number
  badge?: string
  rating?: number
  slug?: string
  category?: { slug?: string }
}

// Slider
const relatedIndex = ref(0)
const containerRef = ref<HTMLElement | null>(null)
const itemWidth = ref(0)
const visibleCount = ref(5)
const gap = 20

const products = ref<ProductItem[]>([])
const route = useRoute()
const router = useRouter()
const slug = ref(route.params.slug as string)
const { fetchProductDetail, productDetail } = useProduct()
const { addToCart } = useCart()
const { postWishlist } = useWishlist()

const updateItemWidth = () => {
  if (!containerRef.value) return
  const containerWidth = containerRef.value.clientWidth

  if (containerWidth < 640) visibleCount.value = 1
  else if (containerWidth < 1024) visibleCount.value = 3
  else visibleCount.value = 5

  // Nếu sản phẩm ít hơn visibleCount
  const count = Math.min(products.value.length, visibleCount.value)
  itemWidth.value = (containerWidth - (count - 1) * gap) / count
}


const nextSlide = () => {
  relatedIndex.value = Math.min(relatedIndex.value + 1, Math.max(0, products.value.length - visibleCount.value))
}
const prevSlide = () => {
  relatedIndex.value = Math.max(relatedIndex.value - 1, 0)
}

// Overlay xem nhanh
const showOverlay = ref(false)
const currentProduct = ref<ProductItem>({
  product_id: 0,
  product_name: '',
  thumbnail: '',
  price: 0,
  rating: 0
})
const viewProduct = (product: ProductItem) => {
  currentProduct.value = { ...product }
  showOverlay.value = true
}

// Helpers
const resolveThumbnail = (item: ProductItem) => {
  if (item.thumbnail?.startsWith('http')) return item.thumbnail
  if (item.images?.length && item.images[0].image_url)
    return `https://api.mocfurni.shop/storage/${item.images[0].image_url}`
  return '/placeholder.png'
}
const formatPrice = (price: number | undefined) => (price ? price.toLocaleString('vi-VN') + '₫' : '')

const onImageError = (item: ProductItem) => {
  item.thumbnail = '/placeholder.png'
}

const goToDetail = (item: ProductItem) => {
  router.push(`/san-pham/${item.slug}`)
}

const handleAddToCart = async (item: ProductItem) => {
  if (!item.product_id) return alert('❌ Sản phẩm không hợp lệ')
  try {
    const result = await addToCart(item.product_id, 1)
    alert(result ? '✅ Đã thêm vào giỏ hàng!' : '❌ Thêm giỏ hàng thất bại')
  } catch (error: any) {
    alert('❌ Lỗi khi thêm vào giỏ hàng: ' + (error?.message || 'Không rõ nguyên nhân'))
  }
}

const handleAddToWishlist = async (item: ProductItem) => {
  if (!item.product_id) return alert('❌ Sản phẩm không hợp lệ')
  try {
    const success = await postWishlist(item.product_id)
    alert(success ? '✅ Đã thêm sản phẩm vào yêu thích!' : '❌ Không thể thêm vào yêu thích!')
  } catch (error: any) {
    alert('❌ Lỗi khi thêm vào yêu thích: ' + (error?.message || 'Không rõ nguyên nhân'))
  }
}

// Fetch sản phẩm liên quan
const { categories } = useCategories()

const fetchRelatedProducts = async () => {
  if (!productDetail.value?.category?.slug) {
  console.warn('❌ Category slug chưa có trong productDetail:', productDetail.value)
  products.value = [] // fallback
  return
  }

  try {
  const url = `https://api.mocfurni.shop/api/client/category-by-product?slug=${productDetail.value.category.slug}`
  console.log('➡️ Fetching related products from:', url)


  const res = await fetch(url)
  const json = await res.json()
  console.log('📦 API response:', json)

  const data = json?.result?.data
  if (!data || !data.length) {
    console.warn('⚠️ API trả về rỗng hoặc không hợp lệ:', data)
    products.value = []
    return
  }

  // Mapping sản phẩm
  products.value = data.map((p: any) => {
    const category = categories.value.find(c => c.id === p.category_id)
    return {
      product_id: p.product_id,
      product_name: p.product_name,
      slug: p.slug,
      thumbnail: p.thumbnail,
      images: p.images,
      price: Number(p.price),
      price_down: Number(p.price_down || p.price),
      badge: p.badge,
      rating: Number(p.rating || 0),
      brand: p.brand,
      sku: p.sku,
      stock_quantity: p.stock_quantity,
      category: { category_name: category?.category_name || 'N/A' }
    }
  })

  console.log('✅ Related products mapped:', products.value)

  relatedIndex.value = 0
  await nextTick()
  updateItemWidth()


  } catch (err) {
  console.error('❌ Lỗi fetch sản phẩm liên quan:', err)
  products.value = []
  }
}

// Fallback test nếu API rỗng
// Uncomment để test slider hiển thị
// products.value = [
//   { product_id: 1, product_name: 'Test 1', price: 10000, slug: 'test-1', rating: 4, thumbnail: '' },
//   { product_id: 2, product_name: 'Test 2', price: 20000, slug: 'test-2', rating: 5, thumbnail: '' }
// ]


const loadProducts = async () => {
  // 1) Lấy chi tiết sản phẩm theo slug
  await fetchProductDetail(slug.value)

  // 2) 🔥 FIX: map category.slug từ category_id của productDetail
  try {
    const category = categories.value.find(
      c => Number(c.id) === Number(productDetail.value.category_id)
    )

    if (category) {
      // Gắn category vào productDetail để fetch liên quan
      productDetail.value.category = {
        category_name: category.category_name,
        slug: category.slug
      }
    } else {
      console.warn(
        "❌ Không tìm thấy category theo category_id:",
        productDetail.value.category_id
      )
    }
  } catch (err) {
    console.error("❌ Lỗi khi map category cho productDetail:", err)
  }

  // 3) Tải sản phẩm liên quan
  await fetchRelatedProducts()
}


onMounted(async () => {
  await nextTick()

  // 🔥 CHỜ categories load xong
  if (categories.value.length === 0) {
    const { fetchCategories } = useCategories()
    await fetchCategories() 
  }

  await loadProducts()

  window.addEventListener('resize', updateItemWidth)
})

onBeforeUnmount(() => window.removeEventListener('resize', updateItemWidth))
watch(
  () => categories.value,
  async (list) => {
    if (list.length > 0) {
      await loadProducts()
      updateItemWidth()
    }
  },
  { immediate: true }
)

</script>
