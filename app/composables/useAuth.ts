export interface RegisterData {
  full_name: string
  email: string
  phone: string
  password_hash: string
  password_hash_confirmation: string
}

export interface ApiResponse<T = any> {
  success?: boolean
  message?: string
  data?: T
  errors?: Record<string, string[]>
}

export const useAuth = () => {
  // 🔹 Đăng ký
  const register = async (data: RegisterData): Promise<ApiResponse> => {
    try {
      const payload = {
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        password_hash: data.password_hash,
        password_hash_confirmation: data.password_hash_confirmation,
      }

      const response = await $fetch<ApiResponse>('http://127.0.0.1:8000/api/client/register', {
        method: 'POST',
        body: payload,
      })

      return response
    } catch (error: any) {
      if (error?.data?.errors) {
        const firstError = Object.values(error.data.errors)[0][0]
        alert(firstError)
      } else {
        alert(error?.data?.message || 'Lỗi kết nối server')
      }
      throw error.data || { message: 'Lỗi kết nối server' }
    }
  }

  // 🔹 Đăng nhập
  const login = async (data: { email: string; password_hash: string }): Promise<ApiResponse> => {
    try {
      const payload = {
        email: data.email,
        password_hash: data.password_hash,
      }

      const response = await $fetch<ApiResponse>('http://127.0.0.1:8000/api/client/login', {
        method: 'POST',
        body: payload,
      })

      return response
    } catch (error: any) {
      if (error?.data?.errors) {
        const firstError = Object.values(error.data.errors)[0][0]
        alert(firstError)
      } else {
        alert(error?.data?.message || 'Lỗi kết nối server')
      }
      throw error.data || { message: 'Lỗi kết nối server' }
    }
  }

  // 🔹 Gửi mã OTP reset mật khẩu
  const sendResetPasswordOtp = async (email: string): Promise<ApiResponse> => {
    try {
    const response = await $fetch<ApiResponse>('http://127.0.0.1:8000/api/client/sendOtp-password-v1', {
  method: 'POST',
  body: { email },
})


      return response
    } catch (error: any) {
      if (error?.data?.errors) {
        const firstError = Object.values(error.data.errors)[0][0]
        alert(firstError)
      } else {
        alert(error?.data?.message || 'Không thể gửi mã OTP')
      }
      throw error.data || { message: 'Không thể gửi mã OTP' }
    }
  }

  return { register, login, sendResetPasswordOtp }
}
