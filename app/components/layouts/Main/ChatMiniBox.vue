<template>
  <div v-if="authStore.isLogged" class="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2">

    <!-- MINI CHAT -->
    <transition name="mini-chat" appear>
      <div
        v-if="isOpen"
        class="absolute bottom-0 left-0 w-[320px] h-[400px] bg-[#FDF6F0] rounded-xl shadow-lg flex flex-col overflow-hidden origin-bottom-right"
      >
        <!-- HEADER -->
        <div class="flex justify-between items-center px-4 py-2 border-b border-[#D1B89C] bg-[#EAD6C4]">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-[#6E4E37] flex items-center justify-center text-white font-bold">
              M
            </div>
            <span class="font-semibold text-[#6E4E37]">Chat với Mộc Home</span>
          </div>

          <div class="flex items-center gap-2">
            <button @click="goToMainChat" class="text-[#6E4E37] hover:text-[#50392B]" title="Mở rộng chat">
              <UIcon name="i-heroicons-arrows-pointing-out" class="h-5 w-5"/>
            </button>
            <button @click="toggleOpen" class="text-[#6E4E37] hover:text-[#50392B]">✕</button>
          </div>
        </div>

        <!-- MESSAGES -->
        <div ref="messagesContainer" class="flex-1 p-2 overflow-y-auto custom-scroll">
          <div v-for="msg in messages" :key="msg.id" class="flex min-w-0 items-start mb-2"
               :class="msg.is_admin_sender ? 'justify-start' : 'justify-end'">
            <!-- AVATAR -->
            <div v-if="msg.is_admin_sender" class="mr-2 shrink-0">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold bg-[#6E4E37]">
                {{ msg.sender?.full_name?.charAt(0) || 'M' }}
              </div>
            </div>

            <!-- MESSAGE BUBBLE -->
            <div class="bubble-safe px-3 py-2 rounded-2xl text-sm flex flex-col gap-1 max-w-[70%]"
                 :class="msg.is_admin_sender ? 'bg-[#FFFFFF] text-[#50392B]' : 'bg-[#FED8B3] text-black'">
              <span class="text-xs font-semibold">
                {{ msg.is_admin_sender ? 'Mộc Home' : msg.sender.full_name }}
              </span>
              <p v-if="msg.message">{{ msg.message }}</p>

              <div v-if="(msg.images && msg.images.length) || msg.image_url" class="flex flex-wrap gap-2 mt-1">
                <img v-for="(img, index) in Array.isArray(msg.images) ? msg.images : [msg.image_url]"
                     :key="index"
                     :src="img"
                     class="w-[100px] h-[100px] object-cover rounded-lg border border-[#D1B89C] cursor-pointer"
                     @click="openPreview(img)"/>
              </div>

              <span class="text-[10px] text-gray-500 self-end">
                {{ new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
              </span>
            </div>
          </div>
        </div>

        <!-- INPUT -->
        <div class="p-2 border-t border-[#D1B89C] flex flex-col gap-2">
          <div v-if="previewImages.length" class="flex flex-wrap gap-2">
            <div v-for="(img, i) in previewImages" :key="i" class="relative">
              <img :src="img"
                   class="w-[72px] h-[72px] object-cover rounded-lg border border-[#D1B89C] cursor-pointer"
                   @click="openPreview(img)"/>
              <button @click="removeImage(i)"
                      class="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black/70 text-white text-xs flex items-center justify-center">
                ✕
              </button>
            </div>
          </div>

          <div class="flex items-center gap-2 bg-[#EAD6C4] rounded-2xl px-3 py-2 min-w-0">
            <label class="cursor-pointer shrink-0">
              <UIcon name="i-heroicons-camera-20-solid" class="size-6 text-[#6E4E37]"/>
              <input type="file" multiple accept="image/*" class="hidden" @change="handleSelectImages"/>
            </label>

            <textarea v-model="newMessage" rows="1" placeholder="Nhập tin nhắn..."
                      class="flex-1 min-w-0 bg-transparent resize-none outline-none text-sm min-h-[24px] max-h-[80px] overflow-y-auto hide-scroll bubble-safe text-[#50392B]"
                      @keydown.enter.exact.prevent="handleSendMessage"
                      @keydown.enter.shift.stop></textarea>

            <button @click="handleSendMessage" :disabled="!newMessage.trim() && !selectedImages.length"
                    class="text-[#6E4E37] disabled:text-gray-400 shrink-0 flex items-center justify-center">
              <UIcon name="i-heroicons-paper-airplane-20-solid" class="size-6 rotate-90"/>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- NÚT CHAT -->
    <transition name="chat-button">
      <button
        v-if="!isOpen"
        @click="toggleOpen"
        class="relative w-14 h-14 rounded-full bg-[#6E4E37] text-white
               flex items-center justify-center shadow-lg
               transition-transform duration-300
               hover:scale-110 hover:bg-[#5a3e2e]
               overflow-visible"
      >
        <span class="absolute inset-0 rounded-full animate-ripple"></span>
        <span class="absolute inset-0 rounded-full animate-ripple delay-1000"></span>
        <UIcon name="i-heroicons-chat-bubble-left-right" class="h-6 w-6 text-white"/>
      </button>
    </transition>

    <!-- MODAL PHÓNG TO ẢNH -->
    <div v-if="previewModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50" @click="closePreview">
      <img :src="previewModal" class="max-w-[90%] max-h-[90%] object-contain rounded-lg"/>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

const conversationId = ref<number | null>(null)
const messages = ref<any[]>([])
const newMessage = ref('')
const selectedImages = ref<File[]>([])
const previewImages = ref<string[]>([])
const isOpen = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)
const previewModal = ref<string | null>(null)

let pollingInterval: any = null

const { getConversation, getMessages, sendMessage } = useChat()

// --- INIT ---
onMounted(async () => {
  if (!authStore.isLogged) return
  const convo = await getConversation()
  if (convo?.id) {
    conversationId.value = convo.id
    await loadMessages()
  }
  startPolling()
})

onUnmounted(() => {
  stopPolling()
})

watch(messages, () => nextTick(scrollToBottom))

function toggleOpen() {
  if (!authStore.isLogged) return
  isOpen.value = !isOpen.value
  nextTick(scrollToBottom)
}

function scrollToBottom() {
  if (messagesContainer.value) messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
}

// --- LOAD MESSAGES ---
async function loadMessages() {
  if (!conversationId.value) return
  messages.value = await getMessages(conversationId.value)
  nextTick(scrollToBottom)
}

// --- POLLING ---
function startPolling() {
  pollingInterval = setInterval(async () => {
    if (!conversationId.value) return
    const newMsgs = await getMessages(conversationId.value)
    if (newMsgs.length !== messages.value.length) {
      messages.value = newMsgs
      nextTick(scrollToBottom)
    }
  }, 3000)
}

function stopPolling() {
  if (pollingInterval) clearInterval(pollingInterval)
}

// --- IMAGE ---
function handleSelectImages(e: Event) {
  const input = e.target as HTMLInputElement
  const files = Array.from(input.files || [])
  files.forEach(file => {
    selectedImages.value.push(file)
    previewImages.value.push(URL.createObjectURL(file))
  })
  if (input) input.value = ''
}

function removeImage(i: number) {
  selectedImages.value.splice(i, 1)
  previewImages.value.splice(i, 1)
}

// --- SEND MESSAGE ---
async function handleSendMessage() {
  if (!conversationId.value || (!newMessage.value.trim() && !selectedImages.value.length)) return

  await sendMessage(conversationId.value, {
    message: newMessage.value || undefined,
    images: selectedImages.value
  })

  newMessage.value = ''
  selectedImages.value = []
  previewImages.value = []
  nextTick(scrollToBottom)
}

// --- PREVIEW ---
function openPreview(img: string) { previewModal.value = img }
function closePreview() { previewModal.value = null }

// --- GO TO MAIN CHAT ---
function goToMainChat() {
  isOpen.value = false
  router.push('/user/messages')
}
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar { display: none; }
.custom-scroll { scrollbar-width: none; }
.hide-scroll::-webkit-scrollbar { display: none; }
.hide-scroll { scrollbar-width: none; }
.bubble-safe { min-width: 0; max-width: 100%; overflow-wrap: anywhere; word-break: break-word; white-space: pre-wrap; }

@keyframes ripple {
  0% { transform: scale(1); opacity: 0.35; }
  100% { transform: scale(1.8); opacity: 0; }
}
.animate-ripple { background-color: rgba(110,78,55,0.35); animation: ripple 2.5s infinite; }
.delay-1000 { animation-delay: 1.25s; }

/* MINI CHAT */
.mini-chat-enter-from, .mini-chat-leave-to { opacity: 0; transform: scale(0.8) translateY(20px); }
.mini-chat-enter-to, .mini-chat-leave-from { opacity: 1; transform: scale(1) translateY(0); }
.mini-chat-enter-active, .mini-chat-leave-active { transition: all 0.45s cubic-bezier(0.25,0.8,0.25,1); }

/* CHAT BUTTON */
.chat-button-enter-from { opacity: 0; transform: translateY(20px) scale(0.8); }
.chat-button-enter-to { opacity: 1; transform: translateY(0) scale(1); }
.chat-button-enter-active { transition: all 0.5s cubic-bezier(0.25,0.8,0.25,1); }
.chat-button-leave-from { opacity: 1; transform: translateY(0) scale(1); }
.chat-button-leave-to { opacity: 0; transform: translateY(-40px) scale(0.6); transition: all 0.5s cubic-bezier(0.25,0.8,0.25,1); }
</style>
