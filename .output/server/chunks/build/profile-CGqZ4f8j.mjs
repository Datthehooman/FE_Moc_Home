import { _ as __nuxt_component_0 } from './AccountSidebar-Cy5ujxZV.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    const form = ref({
      firstName: "Lê",
      lastName: "Quân",
      email: "quan@example.com",
      phone: "0912345678",
      address: "TP. Hồ Chí Minh"
    });
    const password = ref({
      old: "",
      newPass: "",
      confirm: ""
    });
    const profileError = ref("");
    const passwordError = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModulesUserAccountSidebar = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center bg-[#FFFBF8] min-h-screen" }, _attrs))}><div class="flex w-full max-w-[85%]">`);
      _push(ssrRenderComponent(_component_ModulesUserAccountSidebar, null, null, _parent));
      _push(`<main class="flex-1 p-6"><section class="bg-white rounded-xl p-5 shadow mb-6"><h3 class="font-semibold text-gray-700 text-[20px]">Thông tin hồ sơ</h3><hr class="border-t border-gray-200 my-4"><form class="space-y-4"><div class="grid grid-cols-2 gap-4"><input${ssrRenderAttr("value", form.value.firstName)} type="text" placeholder="Họ" class="h-[50px] px-4 border border-gray-300 rounded-[10px] outline-none"><input${ssrRenderAttr("value", form.value.lastName)} type="text" placeholder="Tên" class="h-[50px] px-4 border border-gray-300 rounded-[10px] outline-none"></div><input${ssrRenderAttr("value", form.value.email)} type="email" placeholder="Email" class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px] outline-none"><input${ssrRenderAttr("value", form.value.phone)} type="text" placeholder="Số điện thoại" class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px] outline-none"><input${ssrRenderAttr("value", form.value.address)} type="text" placeholder="Địa chỉ" class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px] outline-none"><button class="relative overflow-hidden px-6 py-3 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex justify-center items-center group transition-colors duration-500"><span class="absolute inset-0 flex justify-center items-center"><span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100"></span></span><span class="relative z-10 group-hover:text-white text-[15px] transition-colors duration-300"> Lưu thay đổi </span></button>`);
      if (profileError.value) {
        _push(`<p class="text-red-500 text-sm">${ssrInterpolate(profileError.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></section><section class="bg-white rounded-xl p-5 shadow"><h3 class="font-semibold text-gray-700 text-[20px]">Đổi mật khẩu</h3><hr class="border-t border-gray-200 my-4"><form class="space-y-4"><input${ssrRenderAttr("value", password.value.old)} type="password" placeholder="Mật khẩu cũ" class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px]"><input${ssrRenderAttr("value", password.value.newPass)} type="password" placeholder="Mật khẩu mới" class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px]"><input${ssrRenderAttr("value", password.value.confirm)} type="password" placeholder="Nhập lại mật khẩu mới" class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px]"><button class="relative overflow-hidden px-6 py-3 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex justify-center items-center group transition-colors duration-500"><span class="absolute inset-0 flex justify-center items-center"><span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100"></span></span><span class="relative z-10 group-hover:text-white text-[15px] transition-colors duration-300"> Thay đổi mật khẩu </span></button>`);
      if (passwordError.value) {
        _push(`<p class="text-red-500 text-sm">${ssrInterpolate(passwordError.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></section></main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profile-CGqZ4f8j.mjs.map
