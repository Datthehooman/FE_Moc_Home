import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "QuickViewOverlay",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean },
    product: {}
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const formatPrice = (price) => price.toLocaleString("vi-VN") + "₫";
    const getImageUrl = (product) => {
      let url = product.thumbnail || product.images?.[0]?.image_url;
      if (!url) return "/placeholder.png";
      if (url.startsWith("http")) return url;
      return `http://127.0.0.1:8000/storage/${url}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (_ctx.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-black/50 z-50 flex justify-center items-center" }, _attrs))}><div class="bg-white w-[750px] rounded-[15px] relative p-4 flex max-h-[90vh] overflow-y-auto"><button class="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary hover:bg-[#F05454] flex items-center justify-center text-white text-xl font-bold transition-colors z-10" aria-label="Đóng"> × </button><div class="w-1/2 flex items-center justify-center p-4"><img${ssrRenderAttr("src", getImageUrl(_ctx.product))} alt="Ảnh sản phẩm" class="object-contain max-h-96 w-full rounded-lg"></div><div class="w-1/2 p-4 pt-10 space-y-3"><h2 class="text-2xl font-bold text-gray-800">${ssrInterpolate(_ctx.product.product_name)}</h2><div class="flex items-center space-x-2"><div class="flex"><!--[-->`);
        ssrRenderList(5, (n) => {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="${ssrRenderClass([
            n <= (_ctx.product.rating ?? 0) ? "text-yellow-400" : "text-gray-300",
            "w-5 h-5"
          ])}"><path fill-rule="evenodd" d="M10 15.27L16.18 18l-1.64-7.03L20 6.24l-7.19-.61L10 0 7.19 5.63 0 6.24l5.46 4.73L3.82 18z"></path></svg>`);
        });
        _push(`<!--]--><p class="text-gray-400 text-[16px] ml-[5px]"> (${ssrInterpolate(_ctx.product.rating || 0)} đánh giá) </p></div></div><div class="flex items-baseline space-x-2 my-4">`);
        if (_ctx.product.price_down) {
          _push(`<p class="line-through text-gray-400 text-[16px]">${ssrInterpolate(formatPrice(_ctx.product.price))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="text-3xl font-bold text-primary text-[24px]">${ssrInterpolate(formatPrice(_ctx.product.price_down || _ctx.product.price))}</p></div><div class="space-y-2 text-base"><p><span class="text-gray-500">Thương hiệu:</span><span class="font-semibold text-gray-700 ml-1">${ssrInterpolate(_ctx.product.brand || "N/A")}</span></p><p><span class="text-gray-500">Loại:</span><span class="font-bold text-gray-700 ml-1">${ssrInterpolate(_ctx.product.category?.category_name || _ctx.product.category_id || "N/A")}</span></p><p><span class="text-gray-500">Hàng có sẵn:</span><span class="${ssrRenderClass(
          _ctx.product.stock_quantity > 0 ? "text-primary font-bold ml-1" : "text-red-500 font-bold ml-1"
        )}">${ssrInterpolate(_ctx.product.stock_quantity > 0 ? "Có sẵn" : "Hết hàng")}</span></p><p><span class="text-gray-500">Mã số:</span><span class="font-semibold text-gray-700 ml-1">${ssrInterpolate(_ctx.product.sku || "N/A")}</span></p></div><button type="button" class="relative overflow-hidden px-6 py-3 bg-[#edb173] text-black font-semibold rounded-lg shadow-md group"><span class="absolute inset-0 flex justify-center items-center"><span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"></span></span><span class="relative z-10 group-hover:text-white flex items-center justify-center space-x-2 text-[16px]"><span>Thêm giỏ hàng</span></span></button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Product/QuickViewOverlay.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main, { __name: "ModulesProductQuickViewOverlay" });

export { __nuxt_component_3 as _ };
//# sourceMappingURL=QuickViewOverlay-CEOLyuIi.mjs.map
