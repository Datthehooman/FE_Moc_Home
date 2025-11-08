import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "TestThumbnail",
  __ssrInlineRender: true,
  setup(__props) {
    const products = ref([]);
    const loading = ref(true);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 bg-[#f9fafb] min-h-screen" }, _attrs))} data-v-67e643b9><h2 class="text-2xl font-bold mb-6" data-v-67e643b9>🧩 Test hiển thị thumbnail từ API</h2>`);
      if (loading.value) {
        _push(`<div data-v-67e643b9>Đang tải dữ liệu...</div>`);
      } else if (error.value) {
        _push(`<div class="text-red-500" data-v-67e643b9>${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-v-67e643b9><!--[-->`);
        ssrRenderList(products.value, (p, index) => {
          _push(`<div class="bg-white rounded-xl p-4 shadow flex flex-col items-center text-center" data-v-67e643b9><img${ssrRenderAttr("src", p.thumbnail)}${ssrRenderAttr("alt", p.product_name)} class="w-[120px] h-[120px] object-cover rounded-md border" data-v-67e643b9><p class="mt-2 font-semibold" data-v-67e643b9>${ssrInterpolate(p.product_name)}</p><p class="text-xs text-gray-500 break-all" data-v-67e643b9>${ssrInterpolate(p.thumbnail)}</p></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/TestThumbnail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TestThumbnail = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-67e643b9"]]);

export { TestThumbnail as default };
//# sourceMappingURL=TestThumbnail-CuWKDYBN.mjs.map
