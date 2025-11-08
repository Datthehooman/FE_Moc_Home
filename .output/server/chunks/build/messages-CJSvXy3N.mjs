import { _ as __nuxt_component_0 } from './AccountSidebar-Cy5ujxZV.mjs';
import { b as _sfc_main$e } from './server.mjs';
import { ref, watch, mergeProps, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import 'vue-router';
import './useAuth-DSQAT-MN.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'ipx';
import 'pinia';
import '@iconify/vue';
import 'tailwindcss/colors';
import 'deep-pick-omit';
import '@vue/shared';
import 'perfect-debounce';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = {
  __name: "messages",
  __ssrInlineRender: true,
  setup(__props) {
    const chats = ref([
      {
        name: "Mộc Home",
        last: "Shop ơi, sản phẩm này còn hàng...",
        time: "Bây giờ",
        messages: [
          { text: "Chào shop, cho mình hỏi bộ bàn ghế gỗ này còn hàng không ạ?", from: "me" },
          { text: "Dạ em chào anh/chị 🌸 Bộ bàn ghế gỗ hiện tại bên em còn sẵn hàng ạ. Anh/chị muốn đặt mua ngay hay cần tư vấn thêm về chất liệu, kích thước không ạ?", from: "other" },
          { text: "Mình muốn biết chất liệu gỗ là gì và có bảo hành không?", from: "me" },
          { text: "Dạ, sản phẩm được làm từ gỗ sồi tự nhiên, bền chắc và an toàn. Shop bảo hành 12 tháng cho anh/chị yên tâm sử dụng ạ.", from: "other" }
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModulesUserAccountSidebar = __nuxt_component_0;
      const _component_UIcon = _sfc_main$e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center bg-[#FFFBF8] min-h-screen py-6" }, _attrs))}><div class="flex w-full max-w-[85%]">`);
      _push(ssrRenderComponent(_component_ModulesUserAccountSidebar, null, null, _parent));
      _push(`<main class="flex-1 p-6"><section class="bg-white rounded-xl shadow p-6 flex gap-6 h-[650px]"><aside class="w-[35%] border-r border-gray-200 pr-4"><h3 class="font-semibold text-[20px] text-gray-700 mb-4">Tin nhắn</h3><div class="space-y-2 overflow-y-auto max-h-[550px] custom-scroll"><!--[-->`);
      ssrRenderList(chats.value, (chat, i) => {
        _push(`<div class="${ssrRenderClass([activeChat.value === chat ? "border-[#C5A48B] bg-[#F5ECE5]" : "border-transparent hover:bg-[#F1EBE6]", "flex items-center gap-3 cursor-pointer p-3 rounded-xl border transition bg-[#FFF7F1]"])}"><div class="w-10 h-10 rounded-full bg-[#6E4E37] flex items-center justify-center text-sm font-bold text-white">${ssrInterpolate(chat.name[0])}</div><div class="flex flex-col w-[70%]"><span class="font-medium text-sm text-gray-700">${ssrInterpolate(chat.name)}</span><span class="text-xs text-gray-500 truncate">${ssrInterpolate(chat.last)}</span></div><span class="text-xs text-gray-400 whitespace-nowrap">${ssrInterpolate(chat.time)}</span></div>`);
      });
      _push(`<!--]--></div></aside><div class="flex flex-col w-[65%]"><div class="flex items-center justify-between pb-4 border-b border-gray-200"><h3 class="font-semibold text-gray-700 text-[18px]">${ssrInterpolate(activeChat.value.name)}</h3><div class="w-10 h-10 rounded-full bg-[#6E4E37] flex items-center justify-center text-white text-sm font-bold">${ssrInterpolate(activeChat.value.name[0])}</div></div><div class="flex-1 overflow-y-auto py-4 space-y-5 custom-scroll"><!--[-->`);
      ssrRenderList(activeChat.value.messages, (msg, i) => {
        _push(`<div class="${ssrRenderClass([msg.from === "me" ? "justify-end" : "justify-start", "flex items-start gap-3"])}">`);
        if (msg.from !== "me") {
          _push(`<div class="w-10 h-10 rounded-full bg-[#6E4E37] flex items-center justify-center text-white text-sm font-bold"> S </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="${ssrRenderClass([msg.from === "me" ? "bg-[#FFF3E7] text-gray-700" : "bg-[#FFF7F1] text-gray-700", "max-w-[70%] px-4 py-3 rounded-xl text-sm leading-relaxed"])}">${ssrInterpolate(msg.text)}</div>`);
        if (msg.from === "me") {
          _push(`<div class="w-10 h-10 rounded-full bg-[#AEC8FF] flex items-center justify-center text-white text-sm font-bold"> M </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="pt-4 border-t border-gray-200"><textarea placeholder="Viết tin nhắn của bạn..." class="w-full h-[90px] resize-none border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:border-[#C5A48B]">${ssrInterpolate(newMessage.value)}</textarea><button class="relative overflow-hidden px-6 py-3 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex items-center gap-2 group transition-colors duration-500"><span class="absolute inset-0 flex justify-center items-center"><span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100"></span></span><span class="relative z-10 flex items-center gap-2 group-hover:text-white text-[15px] transition-colors duration-300"> Gửi tin nhắn `);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "heroicons:paper-airplane",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</span></button></div></div></section></main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/messages.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=messages-CJSvXy3N.mjs.map
