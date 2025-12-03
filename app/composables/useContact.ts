export function useContact() {
  const isLoading = ref(false)
  const error = ref<any>(null)
  const success = ref<boolean | null>(null)

  const sendContact = async (payload: {
    full_name: string
    subject: string
    message: string
  }) => {
    isLoading.value = true
    error.value = null
    success.value = null

    try {
      const { data, error: fetchError } = await useFetch(
        "https://api.mocfurni.shop/api/client/contact/send",
        {
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (fetchError.value) throw fetchError.value

      success.value = true
      return data.value
    } catch (err: any) {
      error.value = err
      success.value = false
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    success,
    sendContact,
  }
}
