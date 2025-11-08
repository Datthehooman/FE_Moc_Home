import { _ as __nuxt_component_0 } from './AccountSidebar-Cy5ujxZV.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { onClickOutside } from '@vueuse/core';
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
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import './useAuth-DSQAT-MN.mjs';

const _sfc_main = {
  __name: "settings",
  __ssrInlineRender: true,
  setup(__props) {
    const selectedReason = ref("");
    const showReason = ref(false);
    const error = ref("");
    const reasonDropdownRef = ref(null);
    onClickOutside(reasonDropdownRef, () => showReason.value = false);
    const reasons = [
      { label: "Không sử dụng nữa", value: "khong-su-dung" },
      { label: "Lo ngại về bảo mật", value: "bao-mat" },
      { label: "Khác", value: "khac" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModulesUserAccountSidebar = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center bg-[#FFFBF8] min-h-screen" }, _attrs))}><div class="flex w-full max-w-[85%]">`);
      _push(ssrRenderComponent(_component_ModulesUserAccountSidebar, null, null, _parent));
      _push(`<main class="flex-1 p-6"><section class="bg-white rounded-xl p-5 shadow"><h3 class="font-semibold text-gray-700 text-[20px]">Xóa tài khoản</h3><hr class="border-t border-gray-200 my-4"><form class="space-y-4"><div class="relative"><button type="button" class="h-[50px] w-full px-4 flex items-center justify-between border border-gray-300 rounded-[10px] bg-white cursor-pointer shadow-sm hover:shadow transition-all duration-200"><span class="text-gray-700">${ssrInterpolate(selectedReason.value || "Chọn lý do xóa tài khoản")}</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass([showReason.value ? "rotate-180" : "", "w-5 h-5 text-gray-500 transition-transform duration-300"])}"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"></path></svg></button>`);
      if (showReason.value) {
        _push(`<div class="absolute top-[53px] left-0 w-full bg-white border border-gray-200 rounded-[12px] shadow-[0_4px_15px_rgba(0,0,0,0.08)] overflow-hidden z-20"><!--[-->`);
        ssrRenderList(reasons, (item) => {
          _push(`<div class="px-4 py-3 hover:bg-gray-100 cursor-pointer">${ssrInterpolate(item.label)}</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="relative overflow-hidden px-6 py-3 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex justify-center items-center group transition-colors duration-500"><span class="absolute inset-0 flex justify-center items-center"><span class="w-1 h-1 bg-red-600 rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100"></span></span><span class="relative z-10 group-hover:text-white text-[15px] transition-colors duration-300"> Xóa tài khoản </span></button>`);
      if (error.value) {
        _push(`<p class="text-red-500 text-sm">${ssrInterpolate(error.value)}</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=settings-DTH2yWo6.mjs.map
