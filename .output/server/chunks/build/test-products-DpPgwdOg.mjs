import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "test-products",
  __ssrInlineRender: true,
  setup(__props) {
    const rawData = ref("");
    const loading = ref(false);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6" }, _attrs))}><h1 class="text-2xl font-bold mb-4">🧩 Test API Products</h1>`);
      if (loading.value) {
        _push(`<div>⏳ Đang tải...</div>`);
      } else {
        _push(`<!---->`);
      }
      if (error.value) {
        _push(`<div class="text-red-500">❌ ${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (rawData.value) {
        _push(`<pre class="bg-gray-100 p-4 rounded overflow-x-auto">${ssrInterpolate(rawData.value)}
    </pre>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test-products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=test-products-DpPgwdOg.mjs.map
