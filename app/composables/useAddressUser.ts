// ~/composables/useAddressUser.ts
import { ref, onMounted } from 'vue'
import { useCookie } from '#app'

export const useAddressUser = () => {
  const addresses = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Lấy token giống useCart
  let tokenCookie = useCookie('tokenLocal')
  if (!tokenCookie.value) {
    tokenCookie = useCookie('token', {
      path: '/',
      domain: '.mocfurni.shop',
    })
  }

  const getAuthHeader = () => ({
    Authorization: `Bearer ${tokenCookie.value}`,
  })

  const fetchAddresses = async () => {
    if (!tokenCookie.value) return null
    loading.value = true
    error.value = null
    try {
      const res: any = await $fetch(
        'https://api.mocfurni.shop/api/client/useraddress/list',
        { headers: getAuthHeader() }
      )
      addresses.value = res.result?.data || []
      return addresses.value
    } catch (err: any) {
      error.value = err?.message || 'Lỗi khi lấy địa chỉ'
      alert('❌ ' + error.value)
      return null
    } finally {
      loading.value = false
    }
  }

const removeAddress = async (id: number | string) => {
  if (!tokenCookie.value) return false
  loading.value = true
  try {
    await $fetch(`https://api.mocfurni.shop/api/client/useraddress/delete/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    })
    addresses.value = addresses.value.filter(a => a.id !== id)
    alert('✅ Đã xóa địa chỉ!')
    return true
  } catch (err: any) {
    error.value = err?.data?.message || 'Xóa địa chỉ thất bại'
    alert('❌ ' + error.value)
    return false
  } finally {
    loading.value = false
  }
}


  // Thêm địa chỉ mới
  const createAddress = async (data: {
    full_name: string
    phone: string
    ward_code: string | number
    address_line: string
    address_type: 'billing' | 'shipping'
    is_default?: 0 | 1
  }) => {
    if (!tokenCookie.value) {
      alert('⚠️ Vui lòng đăng nhập để thêm địa chỉ')
      return false
    }
    loading.value = true
    try {
      const res: any = await $fetch(
        'https://api.mocfurni.shop/api/client/useraddress/create',
        {
          method: 'POST',
          body: data,
          headers: getAuthHeader(),
        }
      )
      // Thêm vào list luôn
      addresses.value.push(res.result)
      alert('✅ Đã thêm địa chỉ mới!')
      return true
    } catch (err: any) {
      error.value = err?.data?.message || 'Thêm địa chỉ thất bại'
      alert('❌ ' + error.value)
      return false
    } finally {
      loading.value = false
    }
  }

  const updateAddress = async (id: string | number, data: {
    full_name: string
    phone: string
    province_code: string | number
    ward_code: string | number
    address_line: string
    address_type: 'billing' | 'shipping'
    is_default?: 0 | 1
  }) => {
    if (!tokenCookie.value) {
      alert('⚠️ Vui lòng đăng nhập để cập nhật địa chỉ')
      return false
    }
    loading.value = true
    try {
      const res: any = await $fetch(
        `https://api.mocfurni.shop/api/client/useraddress/update/${id}`,
        {
          method: 'POST',
          body: data,
          headers: getAuthHeader(),
        }
      )

      // Update luôn trong list addresses nếu có
      const index = addresses.value.findIndex(a => a.id === id)
      if (index !== -1) addresses.value[index] = res.result

      alert('✅ Đã cập nhật địa chỉ!')
      return true
    } catch (err: any) {
      error.value = err?.data?.message || 'Cập nhật thất bại'
      alert('❌ ' + error.value)
      return false
    } finally {
      loading.value = false
    }
  }

  const setDefaultAddress = async (id: number | string) => {
  if (!tokenCookie.value) return false
  loading.value = true
  try {
    await $fetch(`https://api.mocfurni.shop/api/client/useraddress/${id}/set-default`, {
      method: 'POST',
      headers: getAuthHeader(),
    })

    // Cập nhật trong danh sách địa chỉ
    addresses.value = addresses.value.map(a => ({
      ...a,
      is_default: a.id === id ? 1 : 0
    }))

    // Đưa địa chỉ mặc định lên đầu danh sách
    addresses.value.sort((a, b) => b.is_default - a.is_default)

    alert('✅ Đã đặt địa chỉ mặc định!')
    return true
  } catch (err: any) {
    error.value = err?.data?.message || 'Đặt mặc định thất bại'
    alert('❌ ' + error.value)
    return false
  } finally {
    loading.value = false
  }
}


  onMounted(fetchAddresses)

  return { addresses, loading, error, fetchAddresses, removeAddress, createAddress, updateAddress, setDefaultAddress }
}
