<template>
  <div class="bg-white shadow-md rounded-xl p-6 space-y-4">
    <h2 class="text-xl font-semibold">Liên hệ</h2>
    <p class="text-gray-600 text-sm">
      Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi câu hỏi của bạn. Liên hệ ngay để được tư vấn chi tiết.
    </p>

    <form @submit.prevent="handleSend" class="space-y-3">
      <!-- NAME -->
      <div>
        <input
          v-model="form.full_name"
          type="text"
          placeholder="Tên"
          class="w-full h-[55px] p-3 border border-black/25 rounded-lg text-[15px] focus:ring-2 focus:ring-[#C88C5D] outline-none"
        />
        <p v-if="errors.full_name" class="text-red-500 text-sm mt-1">
          {{ errors.full_name }}
        </p>
      </div>

      <!-- SUBJECT -->
      <div>
        <input
          v-model="form.subject"
          type="text"
          placeholder="Tiêu đề"
          class="w-full h-[55px] p-3 border border-black/25 rounded-lg text-[15px] focus:ring-2 focus:ring-[#C88C5D] outline-none"
        />
        <p v-if="errors.subject" class="text-red-500 text-sm mt-1">
          {{ errors.subject }}
        </p>
      </div>

      <!-- MESSAGE -->
      <div>
        <textarea
          v-model="form.message"
          placeholder="Viết tin nhắn của bạn..."
          class="w-full h-[150px] p-3 border border-black/25 rounded-lg text-[15px] focus:ring-2 focus:ring-[#C88C5D] outline-none resize-none"
        ></textarea>
        <p v-if="errors.message" class="text-red-500 text-sm mt-1">
          {{ errors.message }}
        </p>
      </div>

      <!-- BUTTON -->
      <button
        type="submit"
        class="text-[15px] rounded-[10px] hover:opacity-90 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
        style="background-color: #FED8AE; color: #4B2E05; height: 40px; width: 150px; padding: 0;"
        :disabled="loading"
      >
        {{ loading ? "Đang gửi..." : "Gửi tin nhắn" }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 3l16.5 9-16.5 9 3-9-3-9z"
          />
        </svg>
      </button>

      <!-- STATUS MESSAGE -->
      <p v-if="success === true" class="text-green-600 text-sm pt-1">
        ✓ Gửi liên hệ thành công!
      </p>

      <p v-if="success === false" class="text-red-600 text-sm pt-1">
        ✗ Có lỗi xảy ra, vui lòng thử lại.
      </p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"

const loading = ref(false)
const success = ref(null)

const form = reactive({
  full_name: "",
  subject: "",
  message: ""
})

const errors = reactive({
  full_name: "",
  subject: "",
  message: ""
})

const validate = () => {
  errors.full_name = ""
  errors.subject = ""
  errors.message = ""

  let isValid = true

  if (!form.full_name.trim()) {
    errors.full_name = "Vui lòng nhập tên."
    isValid = false
  } else if (form.full_name.length < 2) {
    errors.full_name = "Tên phải có ít nhất 2 ký tự."
    isValid = false
  }

  if (!form.subject.trim()) {
    errors.subject = "Vui lòng nhập tiêu đề."
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = "Vui lòng nhập nội dung tin nhắn."
    isValid = false
  } else if (form.message.length < 10) {
    errors.message = "Tin nhắn phải có ít nhất 10 ký tự."
    isValid = false
  }

  return isValid
}

const handleSend = async () => {
  if (!validate()) return

  loading.value = true
  success.value = null

  try {
    const res = await fetch("https://api.mocfurni.shop/api/client/contact/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: form.full_name,
        subject: form.subject,
        message: form.message
      })
    })

    if (!res.ok) throw new Error()

    success.value = true

    // Reset form
    form.full_name = ""
    form.subject = ""
    form.message = ""
  } catch (e) {
    success.value = false
  } finally {
    loading.value = false
  }
}
</script>
