<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen py-6">
    <div class="flex w-full max-w-[85%] min-w-0">
      <ModulesUserAccountSidebar />

      <main class="flex-1 p-6 min-w-0">
        <section class="bg-white rounded-xl shadow p-6 flex gap-6 h-[650px] min-w-0">

          <!-- CHAT LIST -->
          <aside class="w-[35%] border-r pr-4 shrink-0">
            <h3 class="font-semibold text-[20px] mb-4">Tin nhắn</h3>
            <div class="flex items-center gap-3 p-3 rounded-xl bg-[#F5ECE5] min-w-0">
              <div
                class="w-10 h-10 rounded-full bg-[#6E4E37]
                       text-white flex items-center justify-center
                       font-bold shrink-0">
                M
              </div>
              <div class="flex flex-col min-w-0">
                <span class="font-medium text-sm">Mộc Home</span>
                <span class="text-xs text-gray-500 truncate">
                  {{ messages.length
                    ? messages[messages.length - 1]?.message || '📷 Hình ảnh'
                    : 'Chưa có tin nhắn'
                  }}
                </span>
              </div>
            </div>
          </aside>

          <!-- CHAT BOX -->
          <div class="flex flex-col w-[100%] h-full min-w-0">

            <!-- HEADER -->
            <div class="flex items-center justify-between pb-4 border-b shrink-0">
              <h3 class="font-semibold text-[18px]">Mộc Home</h3>
              <div
                class="w-10 h-10 rounded-full bg-[#6E4E37]
                       text-white flex items-center justify-center
                       font-bold">
                M
              </div>
            </div>

            <!-- MESSAGES -->
            <div
              ref="messagesContainer"
              class="flex-1 overflow-y-auto py-4 space-y-4 custom-scroll min-w-0"
            >
              <div
                v-for="msg in messages"
                :key="msg.id"
                class="flex min-w-0 items-start"
                :class="msg.is_admin_sender ? 'justify-start' : 'justify-end'"
              >
                <!-- AVATAR -->
                <div v-if="msg.is_admin_sender" class="mr-2 shrink-0">
                  <div
                    class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                    :class="msg.is_admin_sender ? 'bg-[#6E4E37]' : 'bg-gray-400'"
                  >
                    {{ msg.sender.full_name.charAt(0) }}
                  </div>
                </div>

                <!-- MESSAGE BUBBLE -->
               <!-- MESSAGE BUBBLE -->
<div
  class="bubble-safe px-3 py-2 rounded-2xl text-sm flex flex-col gap-1 max-w-[70%]"
  :class="msg.is_admin_sender ? 'bg-[#F1F1F1]' : 'bg-[#DCF8C6]'"
>
  <!-- Tên người gửi -->
  <span class="text-xs font-semibold text-gray-600">
    {{ msg.is_admin_sender ? 'Mộc Home' : msg.sender.full_name }}
  </span>

  <!-- Tin nhắn text -->
  <p v-if="msg.message" class="bubble-safe text-sm">
    {{ msg.message }}
  </p>

  <!-- Hình ảnh -->
<div v-if="msg.image_url" class="flex flex-wrap gap-2 mt-1">
  <img
    :src="msg.image_url"
    class="w-[100px] h-[100px] object-cover rounded-lg cursor-pointer"
    @click="openPreview(msg.image_url)"
  />
</div>

  <!-- Thời gian -->
  <span class="text-[10px] text-gray-400 self-end">
    {{ new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
  </span>
</div>

              </div>
            </div>

            <!-- INPUT -->
            <div class="pt-3 border-t shrink-0">

              <!-- PREVIEW -->
             <div v-if="previewImages.length" class="flex flex-wrap gap-2 mb-2">
  <div v-for="(img, i) in previewImages" :key="i" class="relative">
    <img
      :src="img"
      class="w-[72px] h-[72px] object-cover rounded-lg cursor-pointer"
      @click="openPreview(img)"
    />
    <button @click="removeImage(i)" class="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black/70 text-white text-xs flex items-center justify-center">✕</button>
  </div>
</div>
<!-- Modal phóng to -->
<div
  v-if="previewModal"
  class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
  @click="closePreview"
>
  <img :src="previewModal" class="max-w-[90%] max-h-[90%] object-contain rounded-lg"/>
</div>
              <!-- INPUT ROW -->
              <div class="flex items-center gap-2 bg-[#F0F2F5] rounded-2xl px-3 py-2 min-w-0">
                <label class="cursor-pointer shrink-0">
                  <UIcon
                    name="i-heroicons-camera-20-solid"
                    class="size-6 text-gray-500"
                  />
                  <input
                    ref="fileInputRef"
                    type="file"
                    multiple
                    accept="image/*"
                    class="hidden"
                    @change="handleSelectImages"
                  />
                </label>

                <textarea
                  ref="textareaRef"
                  v-model="newMessage"
                  rows="1"
                  placeholder="Nhập tin nhắn..."
                  class="flex-1 min-w-0 bg-transparent resize-none outline-none text-sm min-h-[24px] max-h-[80px] overflow-y-auto hide-scroll bubble-safe"
                  @input="handleInput"
                  @keydown.enter.exact.prevent="handleSendMessage"
                  @keydown.enter.shift.exact.stop
                ></textarea>

                <button
                  @click="handleSendMessage"
                  :disabled="!newMessage.trim() && !selectedImages.length"
                  class="text-[#0084FF] disabled:text-gray-400 shrink-0"
                >
                  <UIcon name="i-heroicons-paper-airplane-20-solid" class="size-6 rotate-90"/>
                  
                </button>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

import { ref, onMounted, watch } from 'vue'

const { messages, getConversation, getMessages, sendMessage } = useChat()

const conversationId = ref<number | null>(null)
const newMessage = ref('')

const selectedImages = ref<File[]>([])
const previewImages = ref<string[]>([])

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)
const messagesContainer = ref<HTMLElement | null>(null)

const MAX_HEIGHT = 80

onMounted(async () => {
  const convo = await getConversation()
  if (convo?.id) {
    conversationId.value = convo.id
    await getMessages(convo.id)
    scrollToBottom()
  }
})
const previewModal = ref<string | null>(null)

function openPreview(img: string) {
  previewModal.value = img
}

function closePreview() {
  previewModal.value = null
}

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

function handleInput() {
  const el = textareaRef.value
  if (!el) return

  el.style.height = 'auto'
  const h = el.scrollHeight

  if (h <= MAX_HEIGHT) {
    el.style.height = h + 'px'
    el.style.overflowY = 'hidden'
  } else {
    el.style.height = MAX_HEIGHT + 'px'
    el.style.overflowY = 'auto'
  }
}

function handleSelectImages(e: Event) {
  const input = e.target as HTMLInputElement
  const files = Array.from(input.files || [])

  files.forEach(file => {
    selectedImages.value.push(file)
    previewImages.value.push(URL.createObjectURL(file))
  })

  if (fileInputRef.value) fileInputRef.value.value = ''
}

function removeImage(index: number) {
  selectedImages.value.splice(index, 1)
  previewImages.value.splice(index, 1)
}

async function handleSendMessage() {
  if (!conversationId.value) return
  if (!newMessage.value.trim() && !selectedImages.value.length) return

  await sendMessage(conversationId.value, {
    message: newMessage.value || undefined,
    images: selectedImages.value,
  })

  newMessage.value = ''
  selectedImages.value = []
  previewImages.value = []

  if (textareaRef.value) textareaRef.value.style.height = 'auto'

  scrollToBottom()
}

watch(messages, () => {
  scrollToBottom()
})
</script>

<style scoped>
.custom-scroll {
  scrollbar-width: none;
}
.custom-scroll::-webkit-scrollbar {
  display: none;
}
.hide-scroll {
  scrollbar-width: none;
}
.hide-scroll::-webkit-scrollbar {
  display: none;
}
.bubble-safe {
  min-width: 0;
  max-width: 100%;
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: pre-wrap;
}
</style>
