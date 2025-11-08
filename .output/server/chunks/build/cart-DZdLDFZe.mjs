import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useCart } from './useCart-zVwK7fEI.mjs';
import { u as useProduct } from './useProduct-8uDT80_O.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const { cart } = useCart();
    useProduct();
    const discount = ref(0);
    const discountCode = ref("");
    const apiTotal = ref(0);
    const tax = ref(5e3);
    function formatPrice(num) {
      return Number(num).toLocaleString("vi-VN");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-[#FFF8F3] min-h-screen py-10" }, _attrs))}><div class="max-w-[85%] mx-auto flex flex-col md:flex-row gap-10"><div class="flex-1 rounded-2xl p-6"><table class="w-full text-left border-collapse"><thead><tr class="border-b border-gray-200"><th class="pb-3">HÌNH ẢNH</th><th class="pb-3">TÊN SẢN PHẨM</th><th class="pb-3">GIÁ</th><th class="pb-3">SỐ LƯỢNG</th><th class="pb-3">TỔNG</th><th class="pb-3"></th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(cart), (item, index) => {
        _push(`<tr class="border-b border-gray-100"><td class="py-4"><img${ssrRenderAttr("src", item.thumbnail || "/placeholder.png")} alt="sản phẩm" class="w-20 h-20 rounded-lg object-cover"></td><td><p class="font-semibold">${ssrInterpolate(item.product_name)}</p></td><td class="font-semibold">${ssrInterpolate(formatPrice(item.product_sale || item.product_price))} đ</td><td><div class="flex items-center gap-2"><button class="w-6 h-6 flex items-center justify-center rounded-full bg-[#FFE8D9] text-[#6E4E37] text-xl">–</button><input${ssrRenderAttr("value", item.quantity)} type="number" min="1" class="w-12 text-center border rounded"><button class="w-6 h-6 flex items-center justify-center rounded-full bg-[#FFE8D9] text-[#6E4E37] text-xl">+</button><button class="ml-2 px-2 py-1 bg-[#F7C59F] rounded text-sm text-[#6E4E37] hover:bg-[#E8B58C]">Cập nhật</button></div></td><td class="font-semibold">${ssrInterpolate(formatPrice(item.subtotal))} đ</td><td class="text-center"><button class="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-500 transition">×</button></td></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
      if (unref(cart).length === 0) {
        _push(`<div class="text-center py-4 text-gray-500 font-semibold"> Giỏ hàng trống, vui lòng thêm sản phẩm vào giỏ hàng! </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="w-full md:w-[350px] bg-[#A77A5D]/10 rounded-2xl p-6 shadow-sm h-fit md:sticky md:top-10"><h2 class="text-lg font-semibold mb-4">Hóa đơn</h2><div class="space-y-2 text-sm"><div class="flex justify-between"><span>Tạm tính:</span><span>${ssrInterpolate(formatPrice(unref(cart).length > 0 ? apiTotal.value : 0))} đ</span></div><div class="flex justify-between"><span>Giảm giá:</span><span class="text-red-500">-${ssrInterpolate(formatPrice(unref(cart).length > 0 ? discount.value : 0))} đ</span></div><div class="flex justify-between"><span>Vận chuyển:</span><span>Free</span></div><div class="flex justify-between"><span>Thuế:</span><span>${ssrInterpolate(formatPrice(unref(cart).length > 0 ? tax.value : 0))} đ</span></div><div class="border-t pt-3 flex justify-between font-semibold"><span>Tổng thanh toán:</span><span>${ssrInterpolate(formatPrice(unref(cart).length > 0 ? apiTotal.value - discount.value + tax.value : 0))} đ</span></div></div><button class="w-full bg-[#FED8B3] hover:bg-[#E8B58C] text-[#000000] font-semibold py-2 mt-5 rounded-lg transition"><a href="/checkout" class="w-full block text-center">Tiến hành thanh toán</a></button><div class="flex items-stretch mt-5 border border-gray-300 rounded-lg overflow-hidden"><input${ssrRenderAttr("value", discountCode.value)} placeholder="Nhập mã giảm giá" class="px-3 py-2 flex-1 focus:outline-none text-[14px]"><button class="bg-[#F7C59F] text-[#6E4E37] px-4 font-medium whitespace-nowrap text-[13px]">Xác nhận</button></div><a href="/cart" class="flex items-center gap-2 text-sm mt-3 text-gray-600 hover:underline">← Tiếp tục mua sắm</a></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cart-DZdLDFZe.mjs.map
