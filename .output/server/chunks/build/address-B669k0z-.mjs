import { _ as __nuxt_component_0 } from './AccountSidebar-Cy5ujxZV.mjs';
import { b as _sfc_main$e } from './server.mjs';
import { _ as _sfc_main$1 } from './Pagination-D0PpZ6pR.mjs';
import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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

const perPage = 5;
const _sfc_main = {
  __name: "address",
  __ssrInlineRender: true,
  setup(__props) {
    const addresses = ref([
      { name: "Nguyễn Văn A", address: "123 Nguyễn Trãi, Q.1, TP.HCM", email: "a@gmail.com", phone: "0987654321" },
      { name: "Trần Thị B", address: "56 Lê Lợi, Q.3, TP.HCM", email: "b@yahoo.com", phone: "0931123123" },
      { name: "Phạm Minh C", address: "88 Võ Văn Tần, Q.10, TP.HCM", email: "c@outlook.com", phone: "0944556677" },
      { name: "Lê Thanh D", address: "10 Cách Mạng, Q. Tân Bình, TP.HCM", email: "d@gmail.com", phone: "0912345678" },
      { name: "Vũ Minh E", address: "35 Hai Bà Trưng, Q.1, TP.HCM", email: "e@gmail.com", phone: "0988899988" },
      { name: "Trịnh Tân F", address: "98 Nguyễn Du, Q.5, TP.HCM", email: "f@gmail.com", phone: "0902223344" },
      { name: "Lâm K", address: "01 Nguyễn Huệ, Q.1, TP.HCM", email: "k@gmail.com", phone: "0974445566" }
    ]);
    const currentPage = ref(1);
    const totalPages = computed(() => Math.ceil(addresses.value.length / perPage));
    const paginatedAddresses = computed(
      () => addresses.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
    );
    const pagesAround = computed(() => {
      let pages = [];
      let p = currentPage.value;
      let t = totalPages.value;
      for (let i = p - 1; i <= p + 1; i++) {
        if (i > 1 && i < t) pages.push(i);
      }
      return pages;
    });
    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };
    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModulesUserAccountSidebar = __nuxt_component_0;
      const _component_UIcon = _sfc_main$e;
      const _component_ModulesUserPagination = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center bg-[#FFFBF8] min-h-screen" }, _attrs))}><div class="flex w-full max-w-[85%]">`);
      _push(ssrRenderComponent(_component_ModulesUserAccountSidebar, null, null, _parent));
      _push(`<main class="flex-1 p-6"><section class="bg-white rounded-xl p-4 shadow"><div class="flex justify-between items-center mb-2"><h3 class="font-semibold text-gray-700 text-[20px]">Danh sách địa chỉ</h3><button class="relative overflow-hidden px-5 py-2 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex justify-center items-center group transition-colors duration-500"><span class="absolute inset-0 flex justify-center items-center"><span class="w-1 h-1 bg-[#000000] rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100"></span></span><a href="/user/add_address"><span class="relative z-10 text-[15px] group-hover:text-white transition">Thêm địa chỉ</span></a></button></div><hr class="border-t border-gray-200 mb-4"><div class="grid grid-cols-5 text-[#6E4E37] font-semibold text-sm px-2 mb-3"><div>Tên</div><div>Địa chỉ</div><div>Email</div><div>Số điện thoại</div><div>Hành động</div></div><div class="space-y-2"><!--[-->`);
      ssrRenderList(paginatedAddresses.value, (item, i) => {
        _push(`<div class="grid grid-cols-5 items-center bg-[#F5F7FA] h-[55px] rounded-[10px] px-3 text-sm hover:bg-[#ECEFF3] transition"><div class="text-[#A77A5D] font-medium">${ssrInterpolate(item.name)}</div><div>${ssrInterpolate(item.address)}</div><div>${ssrInterpolate(item.email)}</div><div>${ssrInterpolate(item.phone)}</div><div class="flex items-center gap-2"><div class="group w-[34px] h-[34px] flex items-center justify-center border border-black/20 rounded-[5px] cursor-pointer transition hover:bg-black hover:border-black">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "heroicons:pencil-square",
          class: "w-5 h-5 text-gray-500 group-hover:text-white transition"
        }, null, _parent));
        _push(`</div><div class="group w-[34px] h-[34px] flex items-center justify-center border border-red-400 rounded-[5px] cursor-pointer transition hover:bg-red-500 hover:border-red-500">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "heroicons:x-mark",
          class: "w-5 h-5 text-red-500 group-hover:text-white transition"
        }, null, _parent));
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div><div class="mt-5">`);
      _push(ssrRenderComponent(_component_ModulesUserPagination, {
        "current-page": currentPage.value,
        "total-pages": totalPages.value,
        "pages-around": pagesAround.value,
        onPrev: prevPage,
        onNext: nextPage,
        onGo: (p) => currentPage.value = p
      }, null, _parent));
      _push(`</div></section></main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/address.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=address-B669k0z-.mjs.map
