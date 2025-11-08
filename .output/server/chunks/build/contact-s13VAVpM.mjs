import { g as _export_sfc, b as _sfc_main$e } from './server.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../nitro/nitro.mjs';
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

const _sfc_main$4 = {
  __name: "ModulesContactCard",
  __ssrInlineRender: true,
  props: {
    icon: String,
    title: String,
    text: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white shadow-sm rounded-xl p-6 flex flex-col items-center text-center space-y-3 hover:scale-105 transition-transform w-full" }, _attrs))}><div class="bg-[#6E4E37] w-24 h-24 flex items-center justify-center rounded-full">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: __props.icon,
        class: "w-12 h-12 text-white"
      }, null, _parent));
      _push(`</div><h3 class="font-semibold break-words w-full">${ssrInterpolate(__props.title)}</h3><p class="text-sm text-gray-600 whitespace-pre-line break-words w-full">${ssrInterpolate(__props.text)}</p></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Contact/ModulesContactCard.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white shadow-md rounded-xl p-6 space-y-4" }, _attrs))}><h2 class="text-xl font-semibold">Liên hệ</h2><p class="text-gray-600 text-sm"> Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi câu hỏi của bạn. Liên hệ ngay để được tư vấn chi tiết. </p><form class="space-y-3"><input type="text" placeholder="Tên" class="w-full h-[55px] p-3 border border-black/25 rounded-lg text-[15px] focus:ring-2 focus:ring-[#C88C5D] outline-none"><input type="text" placeholder="Tiêu đề" class="w-full h-[55px] p-3 border border-black/25 rounded-lg text-[15px] focus:ring-2 focus:ring-[#C88C5D] outline-none"><textarea placeholder="Viết tin nhắn của bạn..." class="w-full h-[150px] p-3 border border-black/25 rounded-lg text-[15px] focus:ring-2 focus:ring-[#C88C5D] outline-none resize-none"></textarea><button type="submit" class="text-[15px] rounded-[10px] hover:opacity-90 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2" style="${ssrRenderStyle({ "background-color": "#FED8AE", "color": "#4B2E05", "height": "40px", "width": "150px", "line-height": "80px", "padding": "0" })}"> Gửi tin nhắn <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3l16.5 9-16.5 9 3-9-3-9z"></path></svg></button></form></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Contact/ModulesContactForm.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]), { __name: "ModulesContactForm" });
const _imports_0 = publicAssetsURL("/banner-contact.png");
const _sfc_main$2 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative w-full flex justify-center items-center py-5" }, _attrs))}><div class="relative max-w-[1200px] w-full rounded-2xl overflow-hidden"><img${ssrRenderAttr("src", _imports_0)} alt="sofa" class="absolute inset-0 w-full h-full object-cover opacity-90"><div class="relative bg-black/40 w-full min-h-[260px] flex flex-col items-center justify-center gap-6 text-white text-center px-6 py-10"><div><h2 class="text-2xl md:text-3xl font-semibold"> NHẬN PHIẾU GIẢM GIÁ LÊN ĐẾN 20% </h2><p class="text-sm md:text-base mt-2 opacity-90"> Theo dõi để nhận bảng tin mới nhất </p></div><div class="relative w-full max-w-[500px]"><input type="email" placeholder="Email của bạn" class="w-full h-[55px] pl-6 pr-[160px] text-[15px] text-gray-700 outline-none bg-white rounded-[25px] shadow-md"><button type="submit" class="absolute top-1/2 right-[-30px] -translate-y-1/2 bg-[#FED8AE] text-[#4B2E05] font-medium flex items-center justify-center gap-2 w-[140px] h-[50px] rounded-[25px] shadow-lg z-10 hover:shadow-xl hover:-translate-y-[55%] transition-all duration-300"> Theo dõi <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3l16.5 9-16.5 9 3-9-3-9z"></path></svg></button></div></div></div></section>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Contact/ModulesContactSubscribe.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]), { __name: "ModulesContactSubscribe" });
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full rounded-xl overflow-hidden" }, _attrs))}><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.799516830393!2d106.62525331533459!3d10.830939792279312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175298dfb65e6b1%3A0x8c6c7e2b03a59290!2zQ8O0bmcgdmnDqm4gcGjhuqduIG3hu4FtIFF1YW5nIFRydW5n!5e0!3m2!1svi!2s!4v1697890888845!5m2!1svi!2s" width="100%" height="400" allowfullscreen="" loading="lazy" class="border-0"></iframe></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Contact/ModulesContactMap.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]), { __name: "ModulesContactMap" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ModulesContactCard = _sfc_main$4;
  const _component_ModulesContactForm = __nuxt_component_1;
  const _component_ModulesContactSubscribe = __nuxt_component_2;
  const _component_ModulesContactMap = __nuxt_component_3;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-[#FFFBF8]" }, _attrs))}><div class="p-6 space-y-10 w-full overflow-visible"><div class="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8"><div class="grid grid-cols-2 gap-6">`);
  _push(ssrRenderComponent(_component_ModulesContactCard, {
    icon: "heroicons:home",
    title: "Địa chỉ văn phòng",
    text: "Công viên phần mềm Quang Trung, Quận 12, TP HCM"
  }, null, _parent));
  _push(ssrRenderComponent(_component_ModulesContactCard, {
    icon: "heroicons:phone",
    title: "Gọi cho chúng tôi",
    text: "+84 348 706 723\\n+84 348 706 723"
  }, null, _parent));
  _push(ssrRenderComponent(_component_ModulesContactCard, {
    icon: "heroicons:envelope",
    title: "Gửi email cho chúng tôi",
    text: "quanltps39861@gmail.com\\nsupport@example.com"
  }, null, _parent));
  _push(ssrRenderComponent(_component_ModulesContactCard, {
    icon: "heroicons:clock",
    title: "Giờ mở cửa",
    text: "Thứ Hai - Thứ Bảy (10:00 - 17:00)\\nChủ Nhật - Đóng cửa"
  }, null, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_ModulesContactForm, null, null, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_ModulesContactSubscribe, null, null, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_ModulesContactMap, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const contact = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { contact as default };
//# sourceMappingURL=contact-s13VAVpM.mjs.map
