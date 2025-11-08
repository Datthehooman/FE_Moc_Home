import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { u as useProduct } from './useProduct-8uDT80_O.mjs';
import { g as _export_sfc } from './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "31",
  __ssrInlineRender: true,
  setup(__props) {
    const { productDetail, loadingDetail, errorDetail } = useProduct();
    const route = useRoute();
    route.params.slug;
    const formatPrice = (price) => {
      return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen p-6 max-w-[1200px] mx-auto" }, _attrs))} data-v-c5cdef19>`);
      if (unref(loadingDetail)) {
        _push(`<div class="text-center py-20 text-gray-500" data-v-c5cdef19> Đang tải sản phẩm... </div>`);
      } else if (unref(errorDetail)) {
        _push(`<div class="text-center py-20 text-red-500" data-v-c5cdef19>${ssrInterpolate(unref(errorDetail))}</div>`);
      } else if (unref(productDetail)) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-c5cdef19><div data-v-c5cdef19><img${ssrRenderAttr("src", unref(productDetail).thumbnail)}${ssrRenderAttr("alt", unref(productDetail).product_name)} class="w-full h-auto rounded-lg shadow-md" data-v-c5cdef19><div class="mt-4 flex space-x-2" data-v-c5cdef19><!--[-->`);
        ssrRenderList(unref(productDetail).images, (img) => {
          _push(`<img${ssrRenderAttr("src", img.full_image_url)}${ssrRenderAttr("alt", img.alt_text)} class="w-20 h-20 object-cover rounded-md border" data-v-c5cdef19>`);
        });
        _push(`<!--]--></div></div><div data-v-c5cdef19><h1 class="text-2xl font-bold mb-2" data-v-c5cdef19>${ssrInterpolate(unref(productDetail).product_name)}</h1><p class="text-gray-500 mb-2" data-v-c5cdef19>${ssrInterpolate(unref(productDetail).brand)}</p><p class="text-xl text-red-600 font-semibold mb-4" data-v-c5cdef19>${ssrInterpolate(formatPrice(unref(productDetail).price_down))} `);
        if (unref(productDetail).price_down < unref(productDetail).price) {
          _push(`<span class="line-through text-gray-400 ml-2" data-v-c5cdef19>${ssrInterpolate(formatPrice(unref(productDetail).price))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p><p class="mb-2" data-v-c5cdef19><strong data-v-c5cdef19>Mô tả:</strong> ${ssrInterpolate(unref(productDetail).description)}</p><p class="mb-2" data-v-c5cdef19><strong data-v-c5cdef19>Chất liệu:</strong> ${ssrInterpolate(unref(productDetail).material)}</p><p class="mb-2" data-v-c5cdef19><strong data-v-c5cdef19>Kích thước:</strong> ${ssrInterpolate(unref(productDetail).size)}</p><p class="mb-2" data-v-c5cdef19><strong data-v-c5cdef19>Màu sắc:</strong> ${ssrInterpolate(unref(productDetail).color)}</p><p class="mb-2" data-v-c5cdef19><strong data-v-c5cdef19>Trọng lượng:</strong> ${ssrInterpolate(unref(productDetail).weight)} kg</p><p class="mb-2" data-v-c5cdef19><strong data-v-c5cdef19>Kho hàng:</strong> ${ssrInterpolate(unref(productDetail).stock_quantity)}</p><p class="mb-2" data-v-c5cdef19><strong data-v-c5cdef19>Đánh giá:</strong> ${ssrInterpolate(unref(productDetail).rating)} ⭐</p></div></div>`);
      } else {
        _push(`<div class="text-center py-20 text-gray-400" data-v-c5cdef19> Không tìm thấy sản phẩm </div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/san-pham/31.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _31 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c5cdef19"]]);

export { _31 as default };
//# sourceMappingURL=31-D8wvZYOb.mjs.map
