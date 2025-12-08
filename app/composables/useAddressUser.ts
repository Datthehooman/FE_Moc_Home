// composables/useAddressUser.ts
import { ref, onMounted } from 'vue'
import { useCookie } from '#app'

export const useAddressUser = () => {
  const authStore = useAuthStore()
  const toast = useToast()

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

  const showToast = (title: string, type: 'success' | 'error' | 'warn') => {
    toast.add({
      title,
      icon: type === 'success' ? 'heroicons:check-circle' : 'heroicons:exclamation-circle',
      timeout: 3000,
      position: 'bottom-right',
      style: `color:white; font-weight:600; olor:${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#ffc107'}; box-shadow:0 4px 10px rgba(0,0,0,0.2);`,
      iconColor: '#ffffff',
    })
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
      showToast('❌ ' + error.value, 'error')
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
      showToast('Đã xóa địa chỉ!', 'success')
      return true
    } catch (err: any) {
      error.value = err?.data?.message || 'Xóa địa chỉ thất bại'
      showToast(error.value, 'error')
      return false
    } finally {
      loading.value = false
    }
  }

  const createAddress = async (data: any) => {
    if (!tokenCookie.value) { showToast('Vui lòng đăng nhập', 'warn'); return false }
    loading.value = true
    try {
      const res: any = await $fetch('https://api.mocfurni.shop/api/client/useraddress/create', {
        method: 'POST',
        body: data,
        headers: getAuthHeader()
      })
      syncAddresses([...addresses.value, res.result])
      showToast('Đã thêm địa chỉ mới!', 'success')
      return true
    } catch (err: any) {
      error.value = err?.data?.message || 'Thêm địa chỉ thất bại'
      showToast(error.value, 'error')
      return false
    } finally { loading.value = false }
  }

  const updateAddress = async (id: string | number, data: any) => {
    if (!tokenCookie.value) { showToast('Vui lòng đăng nhập', 'warn'); return false }
    loading.value = true
    try {
      const res: any = await $fetch(`https://api.mocfurni.shop/api/client/useraddress/update/${id}`, {
        method: 'POST', body: data, headers: getAuthHeader()
      })
      const updatedList = addresses.value.map(a => a.id === id ? res.result : a)
      syncAddresses(updatedList)
      showToast('Đã cập nhật địa chỉ!', 'success')
      return true
    } catch (err: any) {
      error.value = err?.data?.message || 'Cập nhật thất bại'
      showToast(error.value, 'error')
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
      showToast('Đã đặt địa chỉ mặc định!', 'success')
      return true
    } catch (err: any) {
      error.value = err?.data?.message || 'Đặt mặc định thất bại'
      showToast(error.value, 'error')
      return false
    } finally { loading.value = false }
  }

  onMounted(fetchAddresses)

  return { addresses, loading, error, fetchAddresses, removeAddress, createAddress, updateAddress, setDefaultAddress }
}
