import { k as __nuxt_component_0$2 } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-IWZl7zz2.mjs';
import { u as useAuth } from './useAuth-DSQAT-MN.mjs';
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
  __name: "reset-password",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const error = ref("");
    const success = ref("");
    const loading = ref(false);
    useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#FFFBF8] flex flex-col" }, _attrs))}><div class="flex-grow flex items-center justify-center p-4 mt-[50px]"><div class="w-full max-w-[500px] bg-white rounded-xl shadow-lg p-8 space-y-6"><div class="text-center"><div class="text-2xl font-bold text-[#6E4E37] mb-1 flex justify-center items-center space-x-2"><img${ssrRenderAttr("src", _imports_0)} alt="Logo" class="w-30"></div><p class="text-sm text-primary text-[16px]"> Nhập email để nhận mã OTP đặt lại mật khẩu </p><hr class="mt-4 border-gray-300"></div><form novalidate class="space-y-4"><div><label class="block text-sm text-gray-700 mb-1">Địa chỉ Email</label><input type="email"${ssrRenderAttr("value", email.value)} placeholder="Nhập email đã đăng ký" class="${ssrRenderClass([{ "border-red-500": error.value }, "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 placeholder-gray-400"])}">`);
      if (error.value) {
        _push(`<p class="text-red-500 text-sm mt-1">${ssrInterpolate(error.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (success.value) {
        _push(`<p class="text-green-600 text-sm mt-1">${ssrInterpolate(success.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="relative overflow-hidden w-full py-3 bg-[#edb173] text-black font-medium rounded-[10px] shadow flex justify-center items-center space-x-2 group disabled:opacity-70 disabled:cursor-not-allowed">`);
      if (loading.value) {
        _push(`<span class="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-black"></span>`);
      } else {
        _push(`<span class="relative group-hover:text-white flex justify-center items-center space-x-2 text-[16px]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg><span>Gửi mã OTP</span></span>`);
      }
      _push(`</button></form><div class="text-center text-sm text-gray-600"><p> Nhớ mật khẩu rồi? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-primary font-medium hover:text-secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Đăng nhập`);
          } else {
            return [
              createTextVNode("Đăng nhập")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reset-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=reset-password-CbEyQFU9.mjs.map
