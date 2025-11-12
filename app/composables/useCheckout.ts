import { useCheckoutStore } from '@/stores/checkout'
import { useCookie } from '#app'

export function useCheckout() {
  const checkoutStore = useCheckoutStore()
  const tokenCookie = useCookie('token') // token từ cookie

  const getAuthHeader = () => ({
    Authorization: `Bearer ${tokenCookie.value}`
  })

  // ✅ Lưu sản phẩm MUA NGAY
  const setBuyNowItem = (item: any) => {
    console.log('💾 Lưu mua ngay:', item)
    checkoutStore.setBuyNowItem(item)
  }

  // ✅ Lưu toàn bộ giỏ hàng để thanh toán
  const setCartItems = (items: any[]) => {
    console.log('💾 Lưu giỏ hàng trước khi checkout:', items)
    checkoutStore.setCartItems(items)
  }

  // 🔥 Thanh toán khi có đăng nhập
const buyNow = async (data: {
  product_id: number
  quantity: number
  shipping_address: string
  note?: string
  payment_method_id: number
}) => {
  if (!tokenCookie.value) throw new Error('Vui lòng đăng nhập để thanh toán')

  // lấy user_id từ store/token nếu muốn
  const user_id = checkoutStore.user?.id || null;

  const payload = {
    ...data,
    user_id
  }

  const res = await $fetch('http://127.0.0.1:8000/api/client/buy-now', {
    method: 'POST',
    headers: {
      ...getAuthHeader(),
      'Content-Type': 'application/json'
    },
    body: payload,
  })
  return res
}


  // 🔥 Thanh toán cho KHÁCH (Không đăng nhập)
  const buyNowGuest = async (data: {
    product_id: number
    quantity: number
    customer_name: string
    customer_phone: string
    customer_email: string
    shipping_address: string
    note?: string
    payment_method_id: number
  }) => {
    console.log('🚀 Thanh toán guest:', data)
    try {
      const res = await $fetch('http://127.0.0.1:8000/api/client/buy-now/guest', {
        method: 'POST',
        body: data,
      })
      console.log('✅ Response server (guest):', res)
      return res
    } catch (error: any) {
      console.error('❌ Lỗi server guest:', error.data || error)
      throw new Error('Lỗi server')
    }
  }

  // 💳 Thanh toán online qua VNPAY (đảm bảo đúng định dạng)
const payWithVNPAY = async (amount: number, orderInfo: string, orderType: string) => {
  if (!amount || amount <= 0) return alert('Số tiền thanh toán không hợp lệ');

  try {
    // ✅ Log dữ liệu trước khi gửi
    console.log('🔥 Dữ liệu gửi VNPAY:', {
      amount,
      order_info: orderInfo,
      order_type: orderType
    });

    const res: any = await $fetch('http://127.0.0.1:8000/api/client/vnpay-payment', {
      method: 'POST',
      body: { amount, order_info: orderInfo, order_type: orderType },
    });

    console.log('✅ Phản hồi từ server VNPAY:', res);

    if (res?.data) {
      window.location.href = res.data; // redirect sang VNPAY
    } else {
      alert('Không nhận được link thanh toán từ server');
    }
  } catch (err: any) {
    console.error('❌ Lỗi VNPAY:', err?.data || err);
    alert('Thanh toán VNPAY thất bại!');
  }
};






  return { setBuyNowItem, setCartItems, buyNow, buyNowGuest, payWithVNPAY }
}
