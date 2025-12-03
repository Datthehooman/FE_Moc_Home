import { ref, onMounted } from 'vue'
import { useCookie } from '#app'

export const useAddressUser = () => {
  const authStore = useAuthStore()
  const loading = ref(false)
  const error = ref<string | null>(null)

  let tokenCookie = useCookie('tokenLocal')
  if (!tokenCookie.value) {
    tokenCookie = useCookie('token', { path: '/', domain: '.mocfurni.shop' })
  }

  const getAuthHeader = () => ({ Authorization: `Bearer ${tokenCookie.value}` })

  const fetchAddresses = async () => {
    if (!tokenCookie.value) return null
    loading.value = true
    error.value = null
    try {
      const res: any = await $fetch(
        'https://api.mocfurni.shop/api/client/useraddress/list',
        { headers: getAuthHeader() }
      )
      authStore.setAddresses(res.result?.data || [])
      return authStore.addresses
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
      authStore.removeAddressFromStore(id)
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

  const createAddress = async (data: any) => {
    if (!tokenCookie.value) {
      alert('⚠️ Vui lòng đăng nhập để thêm địa chỉ')
      return false
    }
    loading.value = true
    try {
      const res: any = await $fetch(
        'https://api.mocfurni.shop/api/client/useraddress/create',
        { method: 'POST', body: data, headers: getAuthHeader() }
      )
      authStore.addAddress(res.result)
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

  const updateAddress = async (id: string | number, data: any) => {
    if (!tokenCookie.value) {
      alert('⚠️ Vui lòng đăng nhập để cập nhật địa chỉ')
      return false
    }
    loading.value = true
    try {
      const res: any = await $fetch(
        `https://api.mocfurni.shop/api/client/useraddress/update/${id}`,
        { method: 'POST', body: data, headers: getAuthHeader() }
      )
      authStore.updateAddressInStore(id, res.result)
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
      authStore.setDefaultAddressInStore(id)
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

  return { addresses: authStore.addresses, loading, error, fetchAddresses, removeAddress, createAddress, updateAddress, setDefaultAddress }
}
