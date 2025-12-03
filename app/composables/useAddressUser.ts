// composables/useAddressUser.ts
import { ref, onMounted } from 'vue'
import { useCookie } from '#app'

export const useAddressUser = () => {
  const authStore = useAuthStore()
  const addresses = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Lấy token
  let tokenCookie = useCookie('tokenLocal')
  if (!tokenCookie.value) {
    tokenCookie = useCookie('token', { path: '/', domain: '.mocfurni.shop' })
  }

  const getAuthHeader = () => ({ Authorization: `Bearer ${tokenCookie.value}` })

  const syncAddresses = (list: any[]) => {
    addresses.value = list
    authStore.setAddresses(list)
  }

  const fetchAddresses = async () => {
    if (!tokenCookie.value) return null
    loading.value = true
    error.value = null
    try {
      const res: any = await $fetch('https://api.mocfurni.shop/api/client/useraddress/list', {
        headers: getAuthHeader()
      })
      syncAddresses(res.result?.data || [])
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
      syncAddresses(addresses.value.filter(a => a.id !== id))
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
    if (!tokenCookie.value) { alert('⚠️ Vui lòng đăng nhập'); return false }
    loading.value = true
    try {
      const res: any = await $fetch('https://api.mocfurni.shop/api/client/useraddress/create', {
        method: 'POST',
        body: data,
        headers: getAuthHeader()
      })
      syncAddresses([...addresses.value, res.result])
      alert('✅ Đã thêm địa chỉ mới!')
      return true
    } catch (err: any) {
      error.value = err?.data?.message || 'Thêm địa chỉ thất bại'
      alert('❌ ' + error.value)
      return false
    } finally { loading.value = false }
  }

  const updateAddress = async (id: string | number, data: any) => {
    if (!tokenCookie.value) { alert('⚠️ Vui lòng đăng nhập'); return false }
    loading.value = true
    try {
      const res: any = await $fetch(`https://api.mocfurni.shop/api/client/useraddress/update/${id}`, {
        method: 'POST', body: data, headers: getAuthHeader()
      })
      const updatedList = addresses.value.map(a => a.id === id ? res.result : a)
      syncAddresses(updatedList)
      alert('✅ Đã cập nhật địa chỉ!')
      return true
    } catch (err: any) {
      error.value = err?.data?.message || 'Cập nhật thất bại'
      alert('❌ ' + error.value)
      return false
    } finally { loading.value = false }
  }

  const setDefaultAddress = async (id: string | number) => {
    if (!tokenCookie.value) return false
    loading.value = true
    try {
      await $fetch(`https://api.mocfurni.shop/api/client/useraddress/${id}/set-default`, {
        method: 'POST', headers: getAuthHeader()
      })
      const updatedList = addresses.value.map(a => ({ ...a, is_default: a.id === id ? 1 : 0 }))
      syncAddresses(updatedList.sort((a, b) => b.is_default - a.is_default))
      alert('✅ Đã đặt địa chỉ mặc định!')
      return true
    } catch (err: any) {
      error.value = err?.data?.message || 'Đặt mặc định thất bại'
      alert('❌ ' + error.value)
      return false
    } finally { loading.value = false }
  }

  onMounted(fetchAddresses)

  return { addresses, loading, error, fetchAddresses, removeAddress, createAddress, updateAddress, setDefaultAddress }
}
