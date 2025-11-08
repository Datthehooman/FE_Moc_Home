import { defineComponent, ref, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-DSQAT-MN.mjs';
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
  __name: "TestLogin",
  __ssrInlineRender: true,
  setup(__props) {
    const { tokenCookie } = useAuth();
    const email = ref("quanlptps39861@gmail.com");
    const password = ref("tienquan1234");
    const tokenValue = ref(tokenCookie.value);
    watch(tokenCookie, (newVal) => {
      tokenValue.value = newVal;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-5 max-w-md mx-auto" }, _attrs))} data-v-7501cc37><h2 class="text-lg font-bold mb-3" data-v-7501cc37>Demo Login &amp; Show Token</h2><div class="mb-3" data-v-7501cc37><label class="block mb-1" data-v-7501cc37>Email:</label><input${ssrRenderAttr("value", email.value)} type="text" class="border px-2 py-1 w-full" data-v-7501cc37></div><div class="mb-3" data-v-7501cc37><label class="block mb-1" data-v-7501cc37>Password:</label><input${ssrRenderAttr("value", password.value)} type="password" class="border px-2 py-1 w-full" data-v-7501cc37></div><button class="px-4 py-2 bg-blue-500 text-white rounded" data-v-7501cc37> Login </button><div class="mt-5" data-v-7501cc37><h3 class="font-semibold mb-1" data-v-7501cc37>Token hiện tại:</h3><pre data-v-7501cc37>${ssrInterpolate(tokenValue.value || "Chưa có token")}</pre></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/TestLogin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const TestLogin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7501cc37"]]);

export { TestLogin as default };
//# sourceMappingURL=TestLogin-Bgyo8Fgv.mjs.map
