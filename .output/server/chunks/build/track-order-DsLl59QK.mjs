import { _ as __nuxt_component_0 } from './AccountSidebar-Cy5ujxZV.mjs';
import { b as _sfc_main$e } from './server.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import 'vue-router';
import './useAuth-DSQAT-MN.mjs';
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

const _sfc_main = {
  __name: "track-order",
  __ssrInlineRender: true,
  setup(__props) {
    const currentStep = ref(3);
    const steps = [
      { title: "Đơn hàng đã xác nhận", icon: "heroicons:check-circle" },
      { title: "Đang xử lý đơn hàng", icon: "heroicons:cog-6-tooth" },
      { title: "Kiểm tra chất lượng", icon: "heroicons:clipboard-check" },
      { title: "Sản phẩm đã được gửi đi", icon: "heroicons:truck" },
      { title: "Sản phẩm đã được giao", icon: "heroicons:home" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModulesUserAccountSidebar = __nuxt_component_0;
      const _component_UIcon = _sfc_main$e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center bg-[#FFFBF8] min-h-screen" }, _attrs))}><div class="flex w-full max-w-[85%]">`);
      _push(ssrRenderComponent(_component_ModulesUserAccountSidebar, null, null, _parent));
      _push(`<main class="flex-1 p-6"><section class="bg-white rounded-xl p-6 shadow"><h3 class="text-[20px] font-semibold text-gray-700 mb-4">Theo dõi đơn hàng</h3><p class="text-gray-500 mb-6"> MÃ THEO DÕI ĐƠN HÀNG: <span class="font-bold text-[#6E4E37]">#28VR5K59</span></p><div class="flex gap-4 mb-6"><div class="px-3 py-1 bg-[#F5F5F5] rounded-full text-sm">Giao hàng: Giao hàng nhanh</div><div class="px-3 py-1 bg-[#F5F5F5] rounded-full text-sm"> Trạng thái: <span class="font-medium">Đang kiểm tra</span></div><div class="px-3 py-1 bg-[#F5F5F5] rounded-full text-sm">Dự kiến nhận: 27 tháng 8, 2025</div></div><div class="relative flex items-center justify-between"><!--[-->`);
      ssrRenderList(steps, (step, index) => {
        _push(`<!--[--><div class="flex flex-col items-center relative z-10"><div class="${ssrRenderClass([
          "flex items-center justify-center rounded-full transition-all duration-500",
          currentStep.value > index ? "w-14 h-14 bg-[#F05454]" : "w-10 h-10 bg-gray-300"
        ])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: step.icon,
          class: currentStep.value > index ? "w-5 h-5 text-white" : "w-5 h-5 text-[var(--ui-primary)]"
        }, null, _parent));
        _push(`</div><span class="mt-2 text-sm text-center">${ssrInterpolate(step.title)}</span></div>`);
        if (index < steps.length - 1) {
          _push(`<div class="${ssrRenderClass([currentStep.value > index ? "bg-[#F05454]" : "bg-gray-300", "flex-1 h-[4px] mt-7 -z-0"])}"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></section></main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/track-order.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=track-order-DsLl59QK.mjs.map
