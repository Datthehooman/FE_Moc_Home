<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen py-6">
    <div class="flex w-full max-w-[85%]">

      <!-- Sidebar -->
      <ModulesUserAccountSidebar />

      <!-- MAIN -->
      <main class="flex-1 p-6">

        <section class="bg-white rounded-xl shadow p-6 flex gap-6 h-[650px]">


          <!-- DANH SÁCH HỘP CHAT -->
          <aside class="w-[35%] border-r border-gray-200 pr-4">
            <h3 class="font-semibold text-[20px] text-gray-700 mb-4">Tin nhắn</h3>

            <div class="space-y-2 overflow-y-auto max-h-[550px] custom-scroll">
              <div
                v-for="(chat, i) in chats"
                :key="i"
                @click="activeChat = chat"
                class="flex items-center gap-3 cursor-pointer p-3 rounded-xl border transition bg-[#FFF7F1]"
                :class="activeChat === chat ? 'border-[#C5A48B] bg-[#F5ECE5]' : 'border-transparent hover:bg-[#F1EBE6]'"
              >
                <!-- Avatar shop -->
                <div class="w-10 h-10 rounded-full bg-[#6E4E37] flex items-center justify-center text-sm font-bold text-white">
                  {{ chat.name[0] }}
                </div>

                <div class="flex flex-col w-[70%]">
                  <span class="font-medium text-sm text-gray-700">{{ chat.name }}</span>
                  <span class="text-xs text-gray-500 truncate">{{ chat.last }}</span>
                </div>

                <span class="text-xs text-gray-400 whitespace-nowrap">{{ chat.time }}</span>
              </div>
            </div>
          </aside>

          <!-- KHUNG CHAT -->
          <div class="flex flex-col w-[65%]">

            <!-- HEADER -->
            <div class="flex items-center justify-between pb-4 border-b border-gray-200">
              <h3 class="font-semibold text-gray-700 text-[18px]">{{ activeChat.name }}</h3>

              <div class="w-10 h-10 rounded-full bg-[#6E4E37] flex items-center justify-center text-white text-sm font-bold">
                {{ activeChat.name[0] }}
              </div>
            </div>

            <!-- MESSAGES AREA -->
           <div ref="messagesContainer" class="flex-1 overflow-y-auto py-4 space-y-5 custom-scroll">


              <div v-for="(msg, i) in activeChat.messages" :key="i" class="flex items-start gap-3"
                :class="msg.from === 'me' ? 'justify-end' : 'justify-start'">

                <!-- Avatar người gửi -->
                <div v-if="msg.from !== 'me'"
                  class="w-10 h-10 rounded-full bg-[#6E4E37] flex items-center justify-center text-white text-sm font-bold">
                  S
                </div>

                <!-- Bubble -->
                <div
                  class="max-w-[70%] px-4 py-3 rounded-xl text-sm leading-relaxed"
                  :class="msg.from === 'me'
                    ? 'bg-[#FFF3E7] text-gray-700'
                    : 'bg-[#FFF7F1] text-gray-700'"
                >
                  {{ msg.text }}
                </div>

                <div v-if="msg.from === 'me'"
                  class="w-10 h-10 rounded-full bg-[#AEC8FF] flex items-center justify-center text-white text-sm font-bold">
                  M
                </div>

              </div>
            </div>

            <!-- INPUT BOX -->
            <div class="pt-4 border-t border-gray-200">
             <textarea
  v-model="newMessage"
  placeholder="Viết tin nhắn của bạn..."
  class="w-full h-[90px] resize-none border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:border-[#C5A48B]"
></textarea>


             <button
  @click="sendMessage"
  class="relative overflow-hidden px-6 py-3 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex items-center gap-2 group transition-colors duration-500"
>
  <!-- Hiệu ứng lan màu -->
  <span class="absolute inset-0 flex justify-center items-center">
    <span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100"></span>
  </span>

  <!-- Nội dung nút -->
  <span class="relative z-10 flex items-center gap-2 group-hover:text-white text-[15px] transition-colors duration-300">
    Gửi tin nhắn
    <UIcon name="heroicons:paper-airplane" class="w-5 h-5" />
  </span>
</button>

            </div>

          </div>

        </section>

      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, nextTick } from "vue";

const chats = ref([
  {
    name: "Mộc Home",
    last: "Shop ơi, sản phẩm này còn hàng...",
    time: "Bây giờ",
    messages: [
      { text: "Chào shop, cho mình hỏi bộ bàn ghế gỗ này còn hàng không ạ?", from: "me" },
      { text: "Dạ em chào anh/chị 🌸 Bộ bàn ghế gỗ hiện tại bên em còn sẵn hàng ạ. Anh/chị muốn đặt mua ngay hay cần tư vấn thêm về chất liệu, kích thước không ạ?", from: "other" },
      { text: "Mình muốn biết chất liệu gỗ là gì và có bảo hành không?", from: "me" },
      { text: "Dạ, sản phẩm được làm từ gỗ sồi tự nhiên, bền chắc và an toàn. Shop bảo hành 12 tháng cho anh/chị yên tâm sử dụng ạ.", from: "other" },
    ]
  }
]);

const activeChat = ref(chats.value[0]);
const newMessage = ref("");

const messagesContainer = ref(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

watch(activeChat, scrollToBottom, { deep: true });

const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  activeChat.value.messages.push({ text: newMessage.value, from: "me" });
  newMessage.value = "";
  scrollToBottom();
};
</script>
