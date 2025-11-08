import { _ as __nuxt_component_0 } from './AccountSidebar-Cy5ujxZV.mjs';
import { b as _sfc_main$e } from './server.mjs';
import { _ as _sfc_main$1 } from './Pagination-D0PpZ6pR.mjs';
import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
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

const perPage = 7;
const _sfc_main = {
  __name: "notifications",
  __ssrInlineRender: true,
  setup(__props) {
    const currentPage = ref(1);
    const notifications = ref([
      { message: "Giảm giá 30% cho đơn hàng hôm nay!", date: "05/10/2025", read: false },
      { message: "Đơn hàng #MD1234 đã được giao thành công.", date: "04/10/2025", read: true },
      { message: "Nhận mã giảm 50k cho lần mua tiếp theo!", date: "03/10/2025", read: false },
      { message: "Chương trình ngày lễ sắp diễn ra!", date: "02/10/2025", read: true },
      { message: "Hệ thống vừa cập nhật thành công.", date: "01/10/2025", read: false },
      { message: "Mật khẩu của bạn đã được thay đổi.", date: "30/09/2025", read: true },
      { message: "Nhận quà tặng miễn phí trong hôm nay!", date: "29/09/2025", read: false },
      { message: "Điểm tích lũy của bạn đã tăng.", date: "28/09/2025", read: true },
      { message: "Chương trình Flash Sale sắp bắt đầu.", date: "27/09/2025", read: false }
    ]);
    const totalPages = computed(() => Math.ceil(notifications.value.length / perPage));
    const paginatedNotifications = computed(
      () => notifications.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
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
      _push(`<main class="flex-1 p-6"><section class="bg-white rounded-xl p-5 shadow"><div class="flex justify-between items-center mb-2"><h3 class="font-semibold text-gray-700 text-[20px]">Thông báo</h3></div><hr class="border-t border-gray-200 mb-4"><div class="grid grid-cols-4 text-[#6E4E37] font-semibold text-sm px-2 mb-3"><div>Thông báo</div><div>Ngày</div><div>Trạng thái</div><div>Hành động</div></div><div class="space-y-2"><!--[-->`);
      ssrRenderList(paginatedNotifications.value, (item, i) => {
        _push(`<div class="grid grid-cols-4 items-center bg-[#F5F7FA] min-h-[55px] rounded-[10px] px-3 text-sm hover:bg-[#ECEFF3] transition"><div class="truncate max-w-[240px]">${ssrInterpolate(item.message)}</div><div>${ssrInterpolate(item.date)}</div><div><span class="${ssrRenderClass({
          "text-blue-500 bg-blue-100 px-2 py-1 rounded": !item.read,
          "text-green-500 bg-green-100 px-2 py-1 rounded": item.read
        })}">${ssrInterpolate(item.read ? "Đã xem" : "Chưa xem")}</span></div><div><button class="h-[33px] px-3 flex items-center gap-2 border border-black/20 rounded-[5px] cursor-pointer transition hover:bg-black hover:border-black group">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: item.read ? "heroicons:eye-slash" : "heroicons:eye",
          class: "w-5 h-5 text-gray-500 group-hover:text-white transition"
        }, null, _parent));
        _push(`<span class="text-gray-600 text-sm group-hover:text-white transition">${ssrInterpolate(item.read ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc")}</span></button></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/notifications.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=notifications-pW9cMv7V.mjs.map
