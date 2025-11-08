import { _ as __nuxt_component_0 } from './AccountSidebar-Cy5ujxZV.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "orderdetail",
  __ssrInlineRender: true,
  setup(__props) {
    const order = ref({
      code: "28VR5K59",
      address: "Công viên Quang Trung, quận 12, tp. HCM",
      subtotal: "450.000 ₫",
      discount: "-50.000 ₫",
      shipping: "Free",
      tax: "5.000 ₫",
      total: "405.000 ₫",
      products: [
        { name: "Ghế Denim đơn giản", code: "#123456", brand: "Moderno", quantity: 2, color: "Đen", total: "300.000 ₫", image: "https://via.placeholder.com/64" },
        { name: "Ghế Denim đơn giản", code: "#123456", brand: "Moderno", quantity: 2, color: "Đen", total: "300.000 ₫", image: "https://via.placeholder.com/64" },
        { name: "Ghế Denim đơn giản", code: "#123456", brand: "Moderno", quantity: 2, color: "Đen", total: "300.000 ₫", image: "https://via.placeholder.com/64" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModulesUserAccountSidebar = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center bg-[#FFFBF8] min-h-screen" }, _attrs))}><div class="flex w-full max-w-[85%]">`);
      _push(ssrRenderComponent(_component_ModulesUserAccountSidebar, null, null, _parent));
      _push(`<main class="flex-1 p-6"><section class="bg-white rounded-xl p-6 shadow"><div class="flex justify-between items-center mb-4"><h3 class="text-[20px] font-semibold text-gray-700"> Đơn hàng (#${ssrInterpolate(order.value.code)}) </h3><button class="px-4 py-2 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow hover:bg-[#FECB96] transition"> ← Danh sách đơn hàng </button></div><hr class="border-t border-gray-200 mb-6"><div class="space-y-3"><!--[-->`);
      ssrRenderList(order.value.products, (product, i) => {
        _push(`<div class="flex items-center justify-between bg-[#F5F7FA] rounded-xl p-4 transition hover:bg-[#ECEFF3]"><div class="flex items-center gap-4"><img${ssrRenderAttr("src", product.image)} alt="product" class="w-16 h-16 rounded-lg object-cover"><div><p class="font-semibold text-gray-700">${ssrInterpolate(product.name)}</p><p class="text-gray-500 text-sm">Mã số: ${ssrInterpolate(product.code)}</p></div></div><div class="text-gray-600">${ssrInterpolate(product.brand)}</div><div class="text-gray-600">${ssrInterpolate(product.quantity)}</div><div class="text-gray-600">${ssrInterpolate(product.color)}</div><div class="text-gray-700 font-semibold">${ssrInterpolate(product.total)}</div></div>`);
      });
      _push(`<!--]--></div><div class="flex flex-col md:flex-row gap-6 mt-6"><div class="flex-1 bg-[#F5F7FA] rounded-xl p-4"><h4 class="text-gray-700 font-semibold mb-2">Địa chỉ nhận hàng</h4><p class="text-gray-500 text-sm">${ssrInterpolate(order.value.address)}</p></div><div class="flex-1 bg-[#F5F7FA] rounded-xl p-4"><h4 class="text-gray-700 font-semibold mb-2">Hóa đơn</h4><div class="text-gray-600 text-sm space-y-1"><div class="flex justify-between"><span>Tạm tính:</span><span>${ssrInterpolate(order.value.subtotal)}</span></div><div class="flex justify-between"><span>Giảm giá:</span><span>${ssrInterpolate(order.value.discount)}</span></div><div class="flex justify-between"><span>Vận chuyển:</span><span>${ssrInterpolate(order.value.shipping)}</span></div><div class="flex justify-between"><span>Thuế:</span><span>${ssrInterpolate(order.value.tax)}</span></div><div class="flex justify-between font-semibold mt-2 border-t border-gray-300 pt-2"><span>Tổng tiền:</span><span>${ssrInterpolate(order.value.total)}</span></div><p class="text-gray-500 text-sm mt-1">Thanh toán bằng thẻ tín dụng</p></div></div></div></section></main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/orderdetail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=orderdetail-jjSdQu5K.mjs.map
