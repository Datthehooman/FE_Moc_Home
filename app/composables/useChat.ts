
export const useChat = () => {
  const toast = useToast()

  const conversation = ref<any>(null)
  const messages = ref<any[]>([])
  const unreadCount = ref(0)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // ================= TOKEN =================
  let tokenCookie = useCookie("tokenLocal")
  if (!tokenCookie.value) {
    tokenCookie = useCookie("token", {
      path: "/",
      domain: ".mocfurni.shop",
    })
  }

  const getAuthHeader = () => ({
    Authorization: `Bearer ${tokenCookie.value}`,
  })

  // ================= TOAST =================
  const showError = (msg: string) => {
    toast.add({
      title: msg,
      icon: "heroicons:exclamation-circle",
      timeout: 3000,
      position: "bottom-right",
      color: "error",
    })
  }

  // ================= GET CONVERSATION =================
  const getConversation = async () => {
    if (!tokenCookie.value) return null

    try {
      const res: any = await $fetch(
        "https://api.mocfurni.shop/api/client/conversation",
        { headers: getAuthHeader() }
      )

      const data = res.result.data
      conversation.value = data.conversation
      unreadCount.value = data.unread_count

      return conversation.value
    } catch (err: any) {
      showError(err?.data?.message || "Lỗi lấy hội thoại")
      return null
    }
  }

  // ================= GET ALL MESSAGES =================
  const getMessages = async (conversationId: number) => {
    if (!tokenCookie.value || !conversationId) return null

    isLoading.value = true
    messages.value = [] // reset trước khi load

    try {
      // Lấy page 1 để biết last_page
      const resFirst: any = await $fetch(
        `https://api.mocfurni.shop/api/client/conversation/${conversationId}/message`,
        {
          query: { page: 1 },
          headers: getAuthHeader(),
        }
      )

      const firstPageData = resFirst.result.data.messages
      messages.value.push(...firstPageData.data)

      const lastPage = firstPageData.last_page

      // Nếu nhiều hơn 1 page, fetch các page còn lại
      for (let page = 2; page <= lastPage; page++) {
        const res: any = await $fetch(
          `https://api.mocfurni.shop/api/client/conversation/${conversationId}/message`,
          {
            query: { page },
            headers: getAuthHeader(),
          }
        )
        messages.value.push(...res.result.data.messages.data)
      }

      return messages.value
    } catch (err: any) {
      showError(err?.data?.message || "Lỗi lấy tin nhắn")
      return null
    } finally {
      isLoading.value = false
    }
  }

  // ================= SEND MESSAGE (TEXT / MULTI IMAGE) =================
  const sendMessage = async (
    conversationId: number,
    payload: {
      message?: string
      images?: File[]
    }
  ) => {
    if (!tokenCookie.value || !conversationId) return false

    const form = new FormData()
    if (payload.message) form.append("message", payload.message)
    if (payload.images && payload.images.length) {
      payload.images.forEach((file) => form.append("image[]", file))
    }

    try {
      const res: any = await $fetch(
        `https://api.mocfurni.shop/api/client/conversation/${conversationId}/send-message`,
        {
          method: "POST",
          body: form,
          headers: getAuthHeader(),
        }
      )

      // API trả về mảng messages → push hết
      if (res?.result?.data?.messages?.length) {
        messages.value.push(...res.result.data.messages)
      }

      return true
    } catch (err: any) {
      showError(err?.data?.message || "Gửi tin nhắn thất bại")
      return false
    }
  }

  return {
    conversation,
    messages,
    unreadCount,
    isLoading,
    error,
    getConversation,
    getMessages,
    sendMessage,
  }
}
