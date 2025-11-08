import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "ModulesUserPagination",
  __ssrInlineRender: true,
  props: {
    currentPage: Number,
    totalPages: Number,
    pagesAround: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center mt-5 gap-2" }, _attrs))}><button${ssrIncludeBooleanAttr(__props.currentPage === 1) ? " disabled" : ""} class="${ssrRenderClass([__props.currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-[#6E4E37]", "w-[40px] h-[40px] flex justify-center items-center rounded-[10px] text-white transition"])}"> ‹ </button><button class="${ssrRenderClass([__props.currentPage === 1 ? "bg-[#6E4E37]" : "bg-black hover:bg-[#6E4E37]", "w-[40px] h-[40px] flex justify-center items-center rounded-[10px] text-white transition"])}"> 1 </button>`);
      if (__props.currentPage > 3) {
        _push(`<span class="text-gray-500">...</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.pagesAround, (p) => {
        _push(`<button class="${ssrRenderClass([__props.currentPage === p ? "bg-[#6E4E37]" : "bg-black hover:bg-[#6E4E37]", "w-[40px] h-[40px] flex justify-center items-center rounded-[10px] text-white transition"])}">${ssrInterpolate(p)}</button>`);
      });
      _push(`<!--]-->`);
      if (__props.currentPage < __props.totalPages - 2) {
        _push(`<span class="text-gray-500">...</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.totalPages > 1) {
        _push(`<button class="${ssrRenderClass([__props.currentPage === __props.totalPages ? "bg-[#6E4E37]" : "bg-black hover:bg-[#6E4E37]", "w-[40px] h-[40px] flex justify-center items-center rounded-[10px] text-white transition"])}">${ssrInterpolate(__props.totalPages)}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button${ssrIncludeBooleanAttr(__props.currentPage === __props.totalPages) ? " disabled" : ""} class="${ssrRenderClass([__props.currentPage === __props.totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-[#6E4E37]", "w-[40px] h-[40px] flex justify-center items-center rounded-[10px] text-white transition"])}"> › </button></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/User/Pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Pagination-D0PpZ6pR.mjs.map
