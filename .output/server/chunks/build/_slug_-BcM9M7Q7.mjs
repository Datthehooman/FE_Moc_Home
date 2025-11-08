import { defineComponent, ref, watch, mergeProps, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { u as useProduct } from './useProduct-8uDT80_O.mjs';
import { u as useCart } from './useCart-zVwK7fEI.mjs';
import { g as _export_sfc } from './server.mjs';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ProductImages",
  __ssrInlineRender: true,
  setup(__props) {
    const { productDetail } = useProduct();
    const route = useRoute();
    route.params.slug;
    const images = ref([]);
    watch(
      () => productDetail.value,
      (val) => {
        if (!val) return;
        const arr = [];
        if (val.thumbnail) arr.push(val.thumbnail);
        if (val.images?.length) arr.push(...val.images.map((img) => img.full_image_url));
        images.value = arr;
        currentIndex.value = 0;
      },
      { immediate: true }
    );
    const currentIndex = ref(0);
    const nextIndex = ref(null);
    const animating = ref(false);
    const direction = ref("left");
    const incomingAtCenter = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))}><div class="relative w-[520px] h-[473px] border border-black/50 rounded-xl flex justify-center items-center overflow-hidden group">`);
      if (animating.value) {
        _push(`<img${ssrRenderAttr("src", images.value[currentIndex.value])} alt="leaving" class="${ssrRenderClass([{
          "translate-x-0": !incomingAtCenter.value,
          "-translate-x-full opacity-0": direction.value === "left" && incomingAtCenter.value,
          "translate-x-full opacity-0": direction.value === "right" && incomingAtCenter.value
        }, "absolute w-[400px] h-[400px] object-contain transition-transform duration-500 ease-[cubic-bezier(0.55,0.08,0.68,0.53)]"])}">`);
      } else {
        _push(`<!---->`);
      }
      if (nextIndex.value !== null) {
        _push(`<img${ssrRenderAttr("src", images.value[nextIndex.value])} alt="incoming" class="${ssrRenderClass([{
          "translate-x-full opacity-0": direction.value === "left" && !incomingAtCenter.value,
          "-translate-x-full opacity-0": direction.value === "right" && !incomingAtCenter.value,
          "translate-x-0 opacity-100": incomingAtCenter.value
        }, "absolute w-[400px] h-[400px] object-contain transition-transform duration-500 ease-[cubic-bezier(0.45,0,0.55,1)]"])}">`);
      } else {
        _push(`<!---->`);
      }
      if (!animating.value && nextIndex.value === null) {
        _push(`<img${ssrRenderAttr("src", images.value[currentIndex.value])} alt="current" class="absolute w-[400px] h-[400px] object-contain transition-transform duration-500 translate-x-0 opacity-100">`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="absolute left-3 bg-primary/90 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition duration-200 hover:bg-primary" aria-label="previous"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button><button class="absolute right-3 bg-primary/90 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition duration-200 hover:bg-primary" aria-label="next"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div><div class="flex justify-start mt-4 space-x-3 w-[520px]"><!--[-->`);
      ssrRenderList(images.value, (img, i) => {
        _push(`<div class="${ssrRenderClass([
          "w-[118px] h-[118px] border rounded-lg flex justify-center items-center cursor-pointer transition-all duration-200",
          currentIndex.value === i ? "border-[#6E4E37]" : "border-black/50 hover:border-[#edb173]"
        ])}"><img${ssrRenderAttr("src", img)} class="w-[90px] h-[90px] object-contain"></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Product/ProductImages.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$3, { __name: "ModulesProductImages" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProductInfo",
  __ssrInlineRender: true,
  setup(__props) {
    useCart();
    const { productDetail, loadingDetail, errorDetail } = useProduct();
    const route = useRoute();
    route.params.slug;
    const quantity = ref(1);
    const colors = ["#6E4E37", "#C68642", "#EAD2AC", "#A98467"];
    const selectedColor = ref(colors[0]);
    const formatPrice = (price) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
    const discountPercent = computed(() => {
      if (!productDetail.value) return 0;
      return Math.round(100 - productDetail.value.price_down / productDetail.value.price * 100);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex-1 flex flex-col h-[591px]" }, _attrs))}>`);
      if (unref(loadingDetail)) {
        _push(`<div class="text-center py-10 text-gray-500"> Đang tải sản phẩm... </div>`);
      } else if (unref(errorDetail)) {
        _push(`<div class="text-center py-10 text-red-500">${ssrInterpolate(unref(errorDetail))}</div>`);
      } else if (unref(productDetail)) {
        _push(`<div><h1 class="text-2xl font-bold text-gray-800">${ssrInterpolate(unref(productDetail).product_name)}</h1><div class="flex items-center space-x-2 mt-2"><div class="flex items-center space-x-1 mt-2"><div class="flex items-center"><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<span class="${ssrRenderClass([i <= Math.round(unref(productDetail).rating || 0) ? "text-yellow-500" : "text-gray-300", "text-lg"])}"> ★ </span>`);
        });
        _push(`<!--]--></div><span class="text-sm text-gray-500 ml-2"> (${ssrInterpolate(unref(productDetail).rating || 0)} ⭐) </span></div></div><div class="mt-3">`);
        if (unref(productDetail).price_down < unref(productDetail).price) {
          _push(`<span class="text-gray-400 line-through text-lg">${ssrInterpolate(formatPrice(unref(productDetail).price))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="text-primary font-bold text-2xl ml-2">${ssrInterpolate(formatPrice(unref(productDetail).price_down))}</span>`);
        if (unref(productDetail).price_down < unref(productDetail).price) {
          _push(`<span class="text-red-500 text-sm ml-2"> Giảm ${ssrInterpolate(discountPercent.value)}% </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="text-gray-600 mt-3 leading-relaxed text-[15px]">${ssrInterpolate(unref(productDetail).description)}</p><hr class="my-5 border-gray-300"><div class="flex items-center space-x-8 mb-6"><div><label class="block text-sm mb-1 text-gray-700 text-[15px]">Số lượng</label><div class="flex items-center space-x-3"><button class="w-8 h-8 flex justify-center items-center rounded-full bg-[#F7EEE9] text-[#6E4E37] font-bold"> - </button><span class="text-lg font-medium w-6 text-center">${ssrInterpolate(quantity.value)}</span><button class="w-8 h-8 flex justify-center items-center rounded-full bg-[#F7EEE9] text-[#6E4E37] font-bold"> + </button></div></div>`);
        if (unref(productDetail).color) {
          _push(`<div><label class="block text-sm mb-1 text-[15px] text-gray-700">Màu sắc</label><div class="flex space-x-2"><!--[-->`);
          ssrRenderList(colors, (color, i) => {
            _push(`<div class="relative w-6 h-6 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110" style="${ssrRenderStyle({ backgroundColor: color })}">`);
            if (selectedColor.value === color) {
              _push(`<svg xmlns="http://www.w3.org/2000/svg" class="absolute inset-0 w-4 h-4 m-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><ul class="text-sm text-gray-600 space-y-3 text-[15px]"><li><b>Tình trạng hàng:</b> ${ssrInterpolate(unref(productDetail).stock_quantity > 0 ? "Sẵn sàng giao" : "Hết hàng")}</li><li><b>Mã sản phẩm:</b> ${ssrInterpolate(unref(productDetail).sku || "Không có")}</li><li><b>Danh mục:</b> ${ssrInterpolate(unref(productDetail).category_name)}</li><li><b>Thương hiệu:</b> ${ssrInterpolate(unref(productDetail).brand)}</li></ul><hr class="my-5 border-gray-300"><div class="flex space-x-3 mt-6"><button class="relative overflow-hidden px-5 py-3 bg-[#ffd8ad] rounded-lg text-black font-medium shadow flex justify-center items-center group transition-colors duration-500"><span class="absolute inset-0 flex justify-center items-center"><span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"></span></span><span class="relative z-10 group-hover:text-white text-[16px] transition-colors duration-300"> Thêm giỏ hàng </span></button><button class="relative overflow-hidden px-5 py-3 bg-[#EDB173] text-black rounded-lg font-medium shadow flex justify-center items-center group transition-colors duration-500"><span class="absolute inset-0 flex justify-center items-center"><span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"></span></span><span class="relative z-10 group-hover:text-white text-[16px] transition-colors duration-300"><a href="/checkout"> Mua ngay</a></span></button><button class="relative overflow-hidden w-[50px] h-[50px] bg-primary rounded-lg text-white shadow flex justify-center items-center group transition-colors duration-500"><span class="absolute inset-0 flex justify-center items-center"><span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"></span></span><svg class="relative z-10 w-5 h-4 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-8.682a4.5 4.5 0 010-6.364z"></path></svg></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Product/ProductInfo.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$2, { __name: "ModulesProductInfo" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProductReview",
  __ssrInlineRender: true,
  setup(__props) {
    const tab = ref("mota");
    const reviews = ref([
      {
        name: "Lê Phùng Tiến Quân",
        date: "20 tháng 8, 2025",
        rating: 3,
        comment: "Mình rất hài lòng với sản phẩm này. Thiết kế đơn giản nhưng tinh tế, chất liệu denim ngồi thoải mái và dễ vệ sinh.",
        avatar: "https://live.themewild.com/fameo/assets/img/blog/com-2.jpg"
      },
      {
        name: "Nguyễn Minh Thảo",
        date: "18 tháng 8, 2025",
        rating: 5,
        comment: "Ghế rất êm, màu sắc đẹp, giao đúng như mô tả.",
        avatar: "https://live.themewild.com/fameo/assets/img/blog/com-1.jpg"
      }
    ]);
    const userRating = ref(0);
    const userComment = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-[#FFFBF8] flex justify-center mb-10" }, _attrs))}><div class="max-w-[85%] w-full"><div class="flex border-b border-gray-300 space-x-8"><button class="${ssrRenderClass([
        "pb-3 text-lg font-semibold transition-all duration-300",
        tab.value === "mota" ? "text-[#6E4E37] border-b-2 border-[#6E4E37]" : "text-gray-500 hover:text-[#6E4E37]"
      ])}"> Mô tả </button><button class="${ssrRenderClass([
        "pb-3 text-lg font-semibold transition-all duration-300",
        tab.value === "danhgia" ? "text-[#6E4E37] border-b-2 border-[#6E4E37]" : "text-gray-500 hover:text-[#6E4E37]"
      ])}"> Đánh giá (${ssrInterpolate(reviews.value.length.toString().padStart(2, "0"))}) </button></div><div class="mt-6 text-gray-700 leading-relaxed">`);
      if (tab.value === "mota") {
        _push(`<div><p class="mb-5"> Ghế Denim đơn giản mang phong cách tối giản nhưng vẫn hiện đại, dễ dàng hòa hợp với nhiều không gian nội thất khác nhau. Với chất liệu <b>denim cao cấp</b>, sản phẩm đảm bảo độ bền, thoáng khí và dễ dàng vệ sinh 🤡 </p><div class="grid grid-cols-1 md:grid-cols-2 gap-10"><div><h3 class="font-bold text-lg mb-3 text-[#6E4E37]"> Đặc điểm nổi bật </h3><ul class="list-disc pl-5 space-y-2"><li>Phong cách Art Deco hiện đại, tối giản và sang trọng</li><li>Chất liệu denim bền, thoáng khí và dễ làm sạch</li><li>Tựa lưng êm ái giúp thoải mái khi sử dụng lâu</li><li>Khung sắt sơn tĩnh điện chống gỉ sét</li><li>Phù hợp với nhiều phong cách nội thất</li></ul></div><div><h3 class="font-bold text-lg mb-3 text-[#6E4E37]"> Thông số kỹ thuật </h3><ul class="list-disc pl-5 space-y-2"><li>Kích thước: Rộng 1.2m x Cao 2.1m</li><li>Chất liệu: Denim + Khung sắt</li><li>Năm sản xuất: 2024</li><li>Thương hiệu: Novak</li><li>Xuất xứ: Việt Nam</li></ul></div></div></div>`);
      } else {
        _push(`<div><div class="space-y-6 mt-6"><!--[-->`);
        ssrRenderList(reviews.value, (review, i) => {
          _push(`<div class="relative flex flex-col md:flex-row gap-4 p-4 border border-black/25 rounded-xl bg-transparent backdrop-blur-sm"><img${ssrRenderAttr("src", review.avatar)} class="w-16 h-16 rounded-full object-cover"><div class="flex-1 relative"><div class="absolute top-3 right-3 flex space-x-1"><!--[-->`);
          ssrRenderList(5, (n) => {
            _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="${ssrRenderClass([n <= review.rating ? "fill-yellow-400 stroke-yellow-500" : "fill-transparent stroke-yellow-400/80", "w-4 h-4 transition-all duration-200"])}" stroke-width="1.3"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>`);
          });
          _push(`<!--]--></div><h3 class="font-semibold text-gray-800">${ssrInterpolate(review.name)}</h3><p class="text-sm text-gray-500 mt-1 flex items-center gap-1">${ssrInterpolate(review.date)}</p><p class="mt-2 text-gray-700 text-[15px] leading-relaxed">${ssrInterpolate(review.comment)}</p></div></div>`);
        });
        _push(`<!--]--></div><div class="mt-10 bg-[#FAF7F3] p-6 rounded-xl"><h3 class="text-lg font-semibold text-gray-800 mb-3"> Để lại bình luận &amp; đánh giá của bạn </h3><div class="flex items-center mb-3 space-x-1"><!--[-->`);
        ssrRenderList(5, (n) => {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="${ssrRenderClass([n <= userRating.value ? "fill-yellow-400 stroke-[#FBA707] scale-110" : "fill-transparent stroke-[#FBA707] hover:fill-yellow-100 hover:scale-110", "w-6 h-6 cursor-pointer transition-all duration-300 ease-in-out"])}" stroke-width="1.5"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>`);
        });
        _push(`<!--]--></div><textarea placeholder="Nhập bình luận..." class="w-full p-2 border rounded mb-3">${ssrInterpolate(userComment.value)}</textarea><button class="bg-[#6E4E37] text-white px-4 py-2 rounded hover:bg-[#5a3e2b]"> Gửi bình luận </button></div></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Product/ProductReview.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "ModulesProductReview" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ModulesProductImages = __nuxt_component_0;
  const _component_ModulesProductInfo = __nuxt_component_1;
  const _component_ModulesProductReview = __nuxt_component_2;
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="bg-[#FFFBF8] min-h-screen py-10 px-4 flex justify-center"><div class="max-w-[85%] w-full flex flex-col md:flex-row gap-10">`);
  _push(ssrRenderComponent(_component_ModulesProductImages, null, null, _parent));
  _push(ssrRenderComponent(_component_ModulesProductInfo, null, null, _parent));
  _push(`</div></div>`);
  _push(ssrRenderComponent(_component_ModulesProductReview, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/san-pham/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-BcM9M7Q7.mjs.map
