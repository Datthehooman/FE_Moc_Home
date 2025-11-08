import { g as _export_sfc, c as __nuxt_component_1$1, b as _sfc_main$e, _ as _sfc_main$8 } from './server.mjs';
import { mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtImg = __nuxt_component_1$1;
  const _component_UIcon = _sfc_main$e;
  const _component_UButton = _sfc_main$8;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-[411px] h-135" }, _attrs))}><div class="w-full h-70 rounded-xl overflow-hidden relative mb-[9px]">`);
  _push(ssrRenderComponent(_component_NuxtImg, {
    src: "/blog 1.png",
    class: "w-full object-cover z-0"
  }, null, _parent));
  _push(`<div class="h-[43px] bg-info rounded-tl-4xl rounded-br-xl absolute bottom-0 right-0 z-20 items-center flex justify-center text-center text-sm font-medium pl-[15px] pr-[5px]">`);
  _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-calendar-days" }, null, _parent));
  _push(` Tháng 08, 2025 </div></div><div class="flex items-center leading-[27px] text-[15px] mb-[15px]"><div class="flex items-center mr-6">`);
  _push(ssrRenderComponent(_component_UIcon, {
    class: "text-primary size-[17px] mr-2",
    name: "i-lucide-circle-user-round"
  }, null, _parent));
  _push(` Bởi Tiến Quân </div><div class="flex items-center">`);
  _push(ssrRenderComponent(_component_UIcon, {
    class: "text-primary size-[17px] mr-2",
    name: "i-lucide-messages-square"
  }, null, _parent));
  _push(` 3.5k Bình luận </div></div><div class="h-[1px] bg-[#ebebeb] mb-3"></div><p class="text-xl font-medium mb-[11px]"> Xu hướng nội thất hiện đại 2025: Tối giản nhưng đầy tiện nghi </p><p class="font-medium mb-3 text-muted"> Nội thất năm 2025 chú trọng sự tối giản, tinh tế cùng vật liệu thân thiện môi trường, mang lại không gian sống thoải mái và hiện đại. </p>`);
  _push(ssrRenderComponent(_component_UButton, {
    size: "xl",
    variant: "solid",
    class: "relative bg-info text-black rounded-md overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit h-12 mb-7"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"${_scopeId}></span><span class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"${_scopeId}><span${_scopeId}>Xem thêm</span>`);
        _push2(ssrRenderComponent(_component_UIcon, { name: "i-lucide-arrow-right" }, null, _parent2, _scopeId));
        _push2(`</span>`);
      } else {
        return [
          createVNode("span", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32" }),
          createVNode("span", { class: "relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500" }, [
            createVNode("span", null, "Xem thêm"),
            createVNode(_component_UIcon, { name: "i-lucide-arrow-right" })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/BlogCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "SharedBlogCard" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=BlogCard-jIFTVrTi.mjs.map
