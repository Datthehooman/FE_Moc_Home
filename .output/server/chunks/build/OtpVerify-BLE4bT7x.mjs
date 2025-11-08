import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-IWZl7zz2.mjs';
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

const _sfc_main = {
  __name: "OtpVerify",
  __ssrInlineRender: true,
  setup(__props) {
    const otp = ref(["", "", "", "", "", ""]);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#FFFBF8] flex flex-col" }, _attrs))}><div class="flex-grow flex items-center justify-center p-4 mt-[50px]"><div class="w-full max-w-[480px] bg-white rounded-xl shadow-lg p-8 space-y-6"><div class="text-center"><div class="text-2xl font-bold text-[#6E4E37] mb-1 flex justify-center items-center space-x-2"><img${ssrRenderAttr("src", _imports_0)} alt="Logo" class="w-30"></div><p class="text-sm text-primary text-[16px]"> Nhập mã OTP đã được gửi đến email của bạn </p><hr class="mt-4 border-gray-300"></div><form novalidate class="space-y-4"><div><label class="block text-sm text-gray-700 mb-2">Mã OTP</label><div class="flex justify-between gap-2"><!--[-->`);
      ssrRenderList(otp.value, (digit, index) => {
        _push(`<input type="text" maxlength="1" class="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"${ssrRenderAttr("value", otp.value[index])}>`);
      });
      _push(`<!--]--></div>`);
      if (error.value) {
        _push(`<p class="text-red-500 text-sm mt-2">${ssrInterpolate(error.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="submit" class="relative overflow-hidden w-full py-3 bg-[#edb173] text-black font-medium rounded-[10px] shadow flex justify-center items-center space-x-2 group"><span class="absolute inset-0 flex justify-center items-center"><span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"></span></span><span class="relative group-hover:text-white flex justify-center items-center space-x-2 text-[16px]"><svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>Xác nhận</span></span></button><div class="text-center text-sm text-gray-600 mt-3"><p> Không nhận được mã? <button class="text-primary font-medium hover:text-secondary"> Gửi lại OTP </button></p></div></form></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/OtpVerify.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=OtpVerify-BLE4bT7x.mjs.map
