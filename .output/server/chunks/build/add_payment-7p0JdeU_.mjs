import { _ as __nuxt_component_0 } from './AccountSidebar-Cy5ujxZV.mjs';
import { k as __nuxt_component_0$2 } from './server.mjs';
import { ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { onClickOutside } from '@vueuse/core';
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
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = {
  __name: "add_payment",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const form = ref({
      bankName: "",
      bankLogo: "",
      cardHolder: "",
      cardNumber: ""
    });
    const showBank = ref(false);
    const bankDropdownRef = ref(null);
    const banks = [
      { name: "Vietcombank", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_Vietcombank.svg" },
      { name: "Techcombank", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Techcombank_logo.svg" },
      { name: "ACB", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Asia_Commercial_Bank_logo.svg" },
      { name: "MB Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/MB_Bank_logo.svg" },
      { name: "VPBank", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5a/VPBank_logo.svg" },
      { name: "Agribank", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Agribank_logo_2021.svg" }
    ];
    onClickOutside(bankDropdownRef, () => showBank.value = false);
    const formError = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModulesUserAccountSidebar = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center bg-[#FFFBF8] min-h-screen" }, _attrs))}><div class="flex w-full max-w-[85%]">`);
      _push(ssrRenderComponent(_component_ModulesUserAccountSidebar, null, null, _parent));
      _push(`<main class="flex-1 p-6"><section class="bg-white rounded-xl p-5 shadow mb-6"><h3 class="font-semibold text-gray-700 text-[20px]">Thêm phương thức thanh toán</h3><hr class="border-t border-gray-200 my-4"><form class="space-y-4"><div class="relative"><button class="h-[50px] w-full px-4 flex items-center justify-between border border-gray-300 rounded-[10px] bg-white cursor-pointer shadow-sm hover:shadow transition-all duration-200"><span class="flex items-center gap-3 text-gray-700">`);
      if (form.value.bankLogo) {
        _push(`<img${ssrRenderAttr("src", form.value.bankLogo)} class="w-6 h-6 object-contain">`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(form.value.bankName || "Chọn ngân hàng")}</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass([showBank.value ? "rotate-180" : "", "w-5 h-5 text-gray-500 transition-transform duration-300"])}"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"></path></svg></button>`);
      if (showBank.value) {
        _push(`<div class="absolute top-[53px] left-0 w-full bg-white border border-gray-200 rounded-[12px] shadow-[0_4px_15px_rgba(0,0,0,0.08)] overflow-hidden z-20"><!--[-->`);
        ssrRenderList(banks, (bank) => {
          _push(`<div class="bank-item flex items-center gap-3"><img${ssrRenderAttr("src", bank.logo)} class="w-6 h-6 object-contain"> ${ssrInterpolate(bank.name)}</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><input${ssrRenderAttr("value", form.value.cardHolder)} type="text" placeholder="Họ và tên chủ thẻ" class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px] outline-none"><input${ssrRenderAttr("value", form.value.cardNumber)} type="text" placeholder="Số thẻ" class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px] outline-none"><div class="flex items-center gap-3 pt-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/user/payment",
        class: "px-6 py-3 bg-gray-200 rounded-[10px] text-gray-700 font-medium shadow hover:bg-gray-300 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Quay lại `);
          } else {
            return [
              createTextVNode(" Quay lại ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="relative overflow-hidden px-6 py-3 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex justify-center items-center group transition-colors duration-500"><span class="absolute inset-0 flex justify-center items-center"><span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100"></span></span><span class="relative z-10 group-hover:text-white text-[15px] transition-colors duration-300"> Lưu phương thức </span></button></div>`);
      if (formError.value) {
        _push(`<p class="text-red-500 text-sm">${ssrInterpolate(formError.value)}</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/add_payment.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=add_payment-7p0JdeU_.mjs.map
