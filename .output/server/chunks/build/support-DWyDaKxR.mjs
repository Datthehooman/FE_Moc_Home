import { _ as __nuxt_component_0 } from './AccountSidebar-Cy5ujxZV.mjs';
import { _ as _sfc_main$1 } from './Pagination-D0PpZ6pR.mjs';
import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import './server.mjs';
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
import 'vue-router';
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
import './useAuth-DSQAT-MN.mjs';

const perPage = 7;
const _sfc_main = {
  __name: "support",
  __ssrInlineRender: true,
  setup(__props) {
    const searchQuery = ref("");
    const filterStatus = ref("");
    const currentPage = ref(1);
    const showFilter = ref(false);
    const supports = ref([
      { code: "#SP001", date: "01/10/2025", content: "Mình muốn đổi địa chỉ nhận hàng.", status: "Đang chờ phản hồi", priority: "Trung bình" },
      { code: "#SP002", date: "02/10/2025", content: "Sản phẩm bị lỗi.", status: "Đang xử lý", priority: "Cao" },
      { code: "#SP003", date: "03/10/2025", content: "Cho hỏi phương thức thanh toán.", status: "Đã phản hồi", priority: "Thấp" },
      { code: "#SP001", date: "01/10/2025", content: "Mình muốn đổi địa chỉ nhận hàng.", status: "Đang chờ phản hồi", priority: "Trung bình" },
      { code: "#SP002", date: "02/10/2025", content: "Sản phẩm bị lỗi.", status: "Đang xử lý", priority: "Cao" },
      { code: "#SP003", date: "03/10/2025", content: "Cho hỏi phương thức thanh toán.", status: "Đã phản hồi", priority: "Thấp" },
      { code: "#SP001", date: "01/10/2025", content: "Mình muốn đổi địa chỉ nhận hàng.", status: "Đang chờ phản hồi", priority: "Trung bình" },
      { code: "#SP002", date: "02/10/2025", content: "Sản phẩm bị lỗi.", status: "Đang xử lý", priority: "Cao" },
      { code: "#SP003", date: "03/10/2025", content: "Cho hỏi phương thức thanh toán.", status: "Đã phản hồi", priority: "Thấp" }
    ]);
    const filteredSupports = computed(
      () => supports.value.filter(
        (s) => s.code.toLowerCase().includes(searchQuery.value.toLowerCase()) && (filterStatus.value === "" || s.status === filterStatus.value)
      )
    );
    const totalPages = computed(() => Math.ceil(filteredSupports.value.length / perPage));
    const paginatedSupports = computed(
      () => filteredSupports.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
    );
    const pagesAround = computed(() => {
      let pages = [];
      let p = currentPage.value;
      let t = totalPages.value;
      for (let i = p - 1; i <= p + 1; i++) if (i > 1 && i < t) pages.push(i);
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
      const _component_ModulesUserPagination = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center bg-[#FFFBF8] min-h-screen" }, _attrs))}><div class="flex w-full max-w-[85%]">`);
      _push(ssrRenderComponent(_component_ModulesUserAccountSidebar, null, null, _parent));
      _push(`<main class="flex-1 p-6"><section class="bg-white rounded-xl p-5 shadow"><div class="flex justify-between items-center mb-2"><h3 class="font-semibold text-gray-700 text-[20px]">Hỗ trợ</h3><div class="flex items-center gap-3"><div class="h-[45px] px-4 flex items-center border border-gray-300 rounded-[10px] bg-transparent gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-400"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"></path></svg><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Tìm kiếm hỗ trợ..." class="flex-1 bg-transparent outline-none placeholder:text-gray-400"></div><div class="relative"><button class="h-[45px] px-4 flex items-center justify-between border border-gray-300 rounded-[10px] bg-transparent cursor-pointer w-[180px]"><span class="text-gray-600 text-sm">${ssrInterpolate(filterStatus.value || "Tất cả trạng thái")}</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"></path></svg></button>`);
      if (showFilter.value) {
        _push(`<div class="absolute top-[48px] left-0 w-full bg-white border border-gray-200 rounded-[10px] shadow-md overflow-hidden z-20"><div class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Tất cả trạng thái</div><div class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Đang chờ phản hồi</div><div class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Đang xử lý</div><div class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Đã phản hồi</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><hr class="border-t border-gray-200 mb-4"><div class="grid grid-cols-6 text-[#6E4E37] font-semibold text-sm px-2 mb-3"><div>Mã</div><div>Ngày gửi</div><div>Nội dung</div><div>Trạng thái</div><div>Ưu tiên</div><div>Hành động</div></div><div class="space-y-2"><!--[-->`);
      ssrRenderList(paginatedSupports.value, (item, i) => {
        _push(`<div class="grid grid-cols-6 items-center bg-[#F5F7FA] min-h-[55px] rounded-[10px] px-3 text-sm hover:bg-[#ECEFF3] transition"><div class="text-[#A77A5D] font-semibold cursor-pointer">${ssrInterpolate(item.code)}</div><div>${ssrInterpolate(item.date)}</div><div class="truncate max-w-[180px]">${ssrInterpolate(item.content)}</div><div><span class="${ssrRenderClass({
          "text-yellow-500 bg-yellow-100 px-2 py-1 rounded": item.status === "Đang chờ phản hồi",
          "text-blue-500 bg-blue-100 px-2 py-1 rounded": item.status === "Đang xử lý",
          "text-green-500 bg-green-100 px-2 py-1 rounded": item.status === "Đã phản hồi"
        })}">${ssrInterpolate(item.status)}</span></div><div><span class="${ssrRenderClass({
          "text-red-500 bg-red-100 px-2 py-1 rounded": item.priority === "Cao",
          "text-yellow-500 bg-yellow-100 px-2 py-1 rounded": item.priority === "Trung bình",
          "text-gray-500 bg-gray-200 px-2 py-1 rounded": item.priority === "Thấp"
        })}">${ssrInterpolate(item.priority)}</span></div><div class="w-[34px] h-[34px] flex items-center justify-center border border-black/20 rounded-[5px] cursor-pointer transition hover:bg-black hover:border-black group"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500 group-hover:text-white transition"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 8.354 7.36 5.25 12 
     5.25c4.638 0 8.574 3.103 9.963 6.433.07.162.07.353 0 .515C20.574 
     15.646 16.637 18.75 12 18.75c-4.64 0-8.577-3.103-9.964-6.428z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div></div>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_ModulesUserPagination, {
        "current-page": currentPage.value,
        "total-pages": totalPages.value,
        "pages-around": pagesAround.value,
        onPrev: prevPage,
        onNext: nextPage,
        onGo: (p) => currentPage.value = p
      }, null, _parent));
      _push(`</section></main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/support.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=support-DWyDaKxR.mjs.map
