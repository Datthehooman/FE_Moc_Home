import { k as __nuxt_component_0$2 } from './server.mjs';
import { defineComponent, ref, reactive, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
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
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const fullName = ref("");
    const phone = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const loading = ref(false);
    const errors = reactive({
      fullName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#FFFBF8] flex flex-col" }, _attrs))}><div class="flex-grow flex items-center justify-center p-4 mt-[50px]"><div class="w-full max-w-[540px] bg-white rounded-xl shadow-lg p-8 space-y-6"><div class="text-center"><div class="text-2xl font-bold text-[#6E4E37] mb-1 flex justify-center items-center space-x-2"><img${ssrRenderAttr("src", _imports_0)} alt="Logo" class="w-30"></div><p class="text-sm text-primary text-[16px]"> Tạo tài khoản Mộc Home để mua sắm dễ dàng hơn </p><hr class="mt-4 border-gray-300"></div><form novalidate class="space-y-4"><div><label class="block text-sm text-gray-700 mb-1">Họ và tên</label><input type="text"${ssrRenderAttr("value", fullName.value)} placeholder="Nhập họ và tên" class="${ssrRenderClass([{ "border-red-500": unref(errors).fullName }, "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 placeholder-gray-400"])}">`);
      if (unref(errors).fullName) {
        _push(`<p class="text-red-500 text-sm mt-1">${ssrInterpolate(unref(errors).fullName)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-sm text-gray-700 mb-1">Số điện thoại</label><input type="tel"${ssrRenderAttr("value", phone.value)} placeholder="Nhập số điện thoại" class="${ssrRenderClass([{ "border-red-500": unref(errors).phone }, "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 placeholder-gray-400"])}">`);
      if (unref(errors).phone) {
        _push(`<p class="text-red-500 text-sm mt-1">${ssrInterpolate(unref(errors).phone)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-sm text-gray-700 mb-1">Địa chỉ Email</label><input type="email"${ssrRenderAttr("value", email.value)} placeholder="Email" class="${ssrRenderClass([{ "border-red-500": unref(errors).email }, "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 placeholder-gray-400"])}">`);
      if (unref(errors).email) {
        _push(`<p class="text-red-500 text-sm mt-1">${ssrInterpolate(unref(errors).email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-sm text-gray-700 mb-1">Mật khẩu</label><input type="password"${ssrRenderAttr("value", password.value)} placeholder="Nhập mật khẩu" class="${ssrRenderClass([{ "border-red-500": unref(errors).password }, "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 placeholder-gray-400"])}">`);
      if (unref(errors).password) {
        _push(`<p class="text-red-500 text-sm mt-1">${ssrInterpolate(unref(errors).password)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-sm text-gray-700 mb-1">Nhập lại mật khẩu</label><input type="password"${ssrRenderAttr("value", confirmPassword.value)} placeholder="Nhập lại mật khẩu" class="${ssrRenderClass([{ "border-red-500": unref(errors).confirmPassword }, "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300 placeholder-gray-400"])}">`);
      if (unref(errors).confirmPassword) {
        _push(`<p class="text-red-500 text-sm mt-1">${ssrInterpolate(unref(errors).confirmPassword)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="relative overflow-hidden w-full py-3 bg-[#edb173] text-black font-medium rounded-[10px] shadow flex justify-center items-center space-x-2 group disabled:opacity-70 disabled:cursor-not-allowed">`);
      if (loading.value) {
        _push(`<span class="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-black"></span>`);
      } else {
        _push(`<span class="relative group-hover:text-white flex justify-center items-center space-x-2 text-[16px]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20h9M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z"></path></svg><span>Đăng ký</span></span>`);
      }
      _push(`</button></form><div class="text-center text-sm text-gray-600"><p> Bạn đã có tài khoản? `);
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
      _push(`</p><div class="relative my-4"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-300"></div></div><div class="relative flex justify-center"><span class="bg-white px-2 text-gray-500">Hoặc</span></div></div></div><div class="flex space-x-3"><button class="w-full py-2 border border-blue-600 text-blue-600 rounded-md flex justify-center items-center space-x-2 hover:bg-blue-50 transition">Facebook</button><button class="w-full py-2 border border-red-500 text-red-500 rounded-md flex justify-center items-center space-x-2 hover:bg-red-50 transition">Google</button></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-BxgUGc22.mjs.map
