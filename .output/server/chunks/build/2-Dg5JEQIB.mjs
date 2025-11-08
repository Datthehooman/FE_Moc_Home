import { _ as _sfc_main$8 } from './server.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { _ as __nuxt_component_2 } from './CartProduct-D6LsVQXZ.mjs';
import { _ as __nuxt_component_3 } from './QuickViewOverlay-CEOLyuIi.mjs';
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
import './Tooltip-BoWgIaI5.mjs';
import './useCart-zVwK7fEI.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Title",
  __ssrInlineRender: true,
  props: {
    title: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-between mb-[25px]" }, _attrs))}><div><p class="text-primary font-semibold text-[26px]">${ssrInterpolate(_ctx.title || "Danh mục hàng đầu")}</p><div class="absolute w-10.5 h-0.5 bg-secondary"></div></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "link",
        label: "xem thêm",
        "trailing-icon": "i-lucide-chevrons-right",
        class: "text-accent text-info cursor-pointer"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Product/Title.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "ModulesProductTitle" });
const gap = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "2",
  __ssrInlineRender: true,
  setup(__props) {
    ref(0);
    ref(null);
    ref(false);
    ref("left");
    ref(false);
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
    const products = ref([
      { name: "Ghế Denim đơn giản", image: "https://live.themewild.com/fameo/assets/img/product/01.png", oldPrice: "250.000 đ", price: "190.000 đ", badge: "Mới", star: 5 },
      { name: "Ghế gỗ cao cấp", image: "https://live.themewild.com/fameo/assets/img/product/02.png", oldPrice: "310.000 đ", price: "250.000 đ", badge: "Hot", star: 4 },
      { name: "Ghế sofa mini", image: "https://live.themewild.com/fameo/assets/img/product/03.png", oldPrice: "270.000 đ", price: "210.000 đ", badge: "Hot", star: 3 },
      { name: "Ghế đọc sách", image: "https://live.themewild.com/fameo/assets/img/product/04.png", oldPrice: "290.000 đ", price: "220.000 đ", badge: "Giảm 50%", star: 2 },
      { name: "Ghế thư giãn", image: "https://live.themewild.com/fameo/assets/img/product/05.png", oldPrice: "260.000 đ", price: "200.000 đ", badge: "Mới", star: 1 },
      { name: "Ghế phòng khách", image: "https://live.themewild.com/fameo/assets/img/product/06.png", oldPrice: "300.000 đ", price: "240.000 đ", badge: "Hot", star: 5 },
      { name: "Ghế bọc da sang trọng", image: "https://live.themewild.com/fameo/assets/img/product/07.png", oldPrice: "350.000 đ", price: "290.000 đ", badge: "Mới", star: 5 }
    ]);
    const relatedIndex = ref(0);
    ref(null);
    const itemWidth = ref(0);
    ref(5);
    const showOverlay = ref(false);
    const currentProduct = ref({
      image: "",
      name: "",
      oldPrice: "",
      price: "",
      star: 0,
      badge: ""
    });
    const viewProduct = (product) => {
      currentProduct.value = { ...product };
      showOverlay.value = true;
    };
    const tab = ref("mota");
    const quantity = ref(1);
    const colors = ["#6E4E37", "#C68642", "#EAD2AC", "#A98467"];
    const selectedColor = ref(colors[0]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModulesProductProductImages = resolveComponent("ModulesProductProductImages");
      const _component_ModulesProductTitle = __nuxt_component_0;
      const _component_ModulesProductCartProduct = __nuxt_component_2;
      const _component_ModulesProductQuickViewOverlay = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-[#FFFBF8] min-h-screen py-10 px-4 flex justify-center" }, _attrs))}><div class="max-w-[85%] w-full"><div class="flex flex-col md:flex-row gap-10 items-start">`);
      _push(ssrRenderComponent(_component_ModulesProductProductImages, null, null, _parent));
      _push(`<div class="flex-1 flex flex-col h-[591px]"><div><h1 class="text-2xl font-bold text-gray-800">Ghế Denim đơn giản</h1><div class="flex items-center space-x-2 mt-2"><p class="text-yellow-500 text-lg">★★★★★</p><span class="text-sm text-gray-500">(4 người đánh giá)</span></div><div class="mt-3"><span class="text-gray-400 line-through text-lg">600.000 đ</span><span class="text-primary font-bold text-2xl ml-2">480.000 đ</span><span class="text-red-500 text-sm ml-2">Giảm 20%</span></div><p class="text-gray-600 mt-3 leading-relaxed text-[15px]"> Ghế Denim đơn giản với thiết kế gọn gàng, chất liệu vải denim bền chắc, mang lại cảm giác thoải mái và phong cách trẻ trung cho không gian sống. </p><hr class="my-5 border-gray-300"><div class="flex items-center space-x-8 mb-6"><div><label class="block text-sm mb-1 text-gray-700 text-[15px]">Số lượng</label><div class="flex items-center space-x-3"><button class="w-8 h-8 flex justify-center items-center rounded-full bg-[#F7EEE9] text-[#6E4E37] font-bold"> - </button><span class="text-lg font-medium w-6 text-center">${ssrInterpolate(quantity.value)}</span><button class="w-8 h-8 flex justify-center items-center rounded-full bg-[#F7EEE9] text-[#6E4E37] font-bold"> + </button></div></div><div><label class="block text-sm mb-1 text-[15px] text-gray-700">Màu sắc</label><div class="flex space-x-2"><!--[-->`);
      ssrRenderList(colors, (color, i) => {
        _push(`<div class="relative w-6 h-6 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110" style="${ssrRenderStyle({ backgroundColor: color })}">`);
        if (selectedColor.value === color) {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" class="absolute inset-0 w-4 h-4 m-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div><ul class="text-sm text-gray-600 space-y-3 text-[15px]"><li><b>Tình trạng hàng:</b> Sẵn sàng giao</li><li><b>Mã sản phẩm:</b> 656TYTR</li><li><b>Danh mục:</b> Phòng khách</li><li><b>Thương hiệu:</b> Novak</li><li><b>Thẻ:</b> Ghế</li></ul><hr class="my-5 border-gray-300"><div class="flex space-x-3 mt-6"><button class="relative overflow-hidden px-5 py-3 bg-[#ffd8ad] rounded-lg text-black font-medium shadow flex justify-center items-center group transition-colors duration-500"><span class="absolute inset-0 flex justify-center items-center"><span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"></span></span><span class="relative z-10 group-hover:text-white text-[16px] transition-colors duration-300">Thêm giỏ hàng</span></button><button class="relative overflow-hidden px-5 py-3 bg-[#EDB173] text-black rounded-lg font-medium shadow flex justify-center items-center group transition-colors duration-500"><span class="absolute inset-0 flex justify-center items-center"><span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"></span></span><span class="relative z-10 group-hover:text-white text-[16px] transition-colors duration-300">Mua ngay</span></button><button class="relative overflow-hidden w-[50px] h-[50px] bg-primary rounded-lg text-white shadow flex justify-center items-center group transition-colors duration-500"><span class="absolute inset-0 flex justify-center items-center"><span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"></span></span><svg class="relative z-10 w-5 h-4 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-8.682a4.5 4.5 0 010-6.364z"></path></svg></button></div></div></div></div><div class="mt-10"><div class="flex border-b border-gray-300 space-x-8"><button class="${ssrRenderClass([
        "pb-3 text-lg font-semibold transition-all duration-300",
        tab.value === "mota" ? "text-[#6E4E37] border-b-2 border-[#6E4E37]" : "text-gray-500 hover:text-[#6E4E37]"
      ])}"> Mô tả </button><button class="${ssrRenderClass([
        "pb-3 text-lg font-semibold transition-all duration-300",
        tab.value === "danhgia" ? "text-[#6E4E37] border-b-2 border-[#6E4E37]" : "text-gray-500 hover:text-[#6E4E37]"
      ])}"> Đánh giá (${ssrInterpolate(reviews.value.length.toString().padStart(2, "0"))}) </button></div><div class="mt-6 text-gray-700 leading-relaxed">`);
      if (tab.value === "mota") {
        _push(`<div><p class="mb-5"> Ghế Denim đơn giản mang phong cách tối giản nhưng vẫn hiện đại, dễ dàng hòa hợp với nhiều không gian nội thất khác nhau. Với chất liệu <b>denim cao cấp</b>, sản phẩm đảm bảo độ bền, thoáng khí và dễ dàng vệ sinh 🤡 </p><div class="grid grid-cols-1 md:grid-cols-2 gap-10"><div><h3 class="font-bold text-lg mb-3 text-[#6E4E37]"> Đặc điểm nổi bật </h3><ul class="list-disc pl-5 space-y-2"><li> Phong cách Art Deco hiện đại, tối giản và sang trọng </li><li>Chất liệu denim bền, thoáng khí và dễ làm sạch</li><li>Tựa lưng êm ái giúp thoải mái khi sử dụng lâu</li><li>Khung sắt sơn tĩnh điện chống gỉ sét</li><li>Phù hợp với nhiều phong cách nội thất</li></ul></div><div><h3 class="font-bold text-lg mb-3 text-[#6E4E37]"> Thông số kỹ thuật </h3><ul class="list-disc pl-5 space-y-2"><li>Kích thước: Rộng 1.2m x Cao 2.1m</li><li>Chất liệu: Denim + Khung sắt</li><li>Năm sản xuất: 2024</li><li>Thương hiệu: Novak</li><li>Xuất xứ: Việt Nam</li></ul></div></div></div>`);
      } else {
        _push(`<div><div class="space-y-6 mt-6"><!--[-->`);
        ssrRenderList(reviews.value, (review, i) => {
          _push(`<div class="relative flex flex-col md:flex-row gap-4 p-4 border border-black/25 rounded-xl bg-transparent backdrop-blur-sm"><img${ssrRenderAttr("src", review.avatar)} class="w-16 h-16 rounded-full object-cover"><div class="flex-1 relative"><div class="absolute top-3 right-3 flex space-x-1"><!--[-->`);
          ssrRenderList(5, (n) => {
            _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="${ssrRenderClass([n <= review.rating ? "fill-yellow-400 stroke-yellow-500" : "fill-transparent stroke-yellow-400/80", "w-4 h-4 transition-all duration-200"])}" stroke-width="1.3"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>`);
          });
          _push(`<!--]--></div><h3 class="font-semibold text-gray-800">${ssrInterpolate(review.name)}</h3><p class="text-sm text-gray-500 mt-1 flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-400"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${ssrInterpolate(review.date)}</p><p class="mt-2 text-gray-700 text-[15px] leading-relaxed">${ssrInterpolate(review.comment)}</p><button class="text-[#6E4E37] mt-3 flex items-center gap-1 text-sm hover:underline"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h11M3 6h11M3 14h7m8-2v8m0 0l3-3m-3 3l-3-3"></path></svg> Trả lời </button></div></div>`);
        });
        _push(`<!--]--></div><div class="mt-10 bg-[#FAF7F3] p-6 rounded-xl"><h3 class="text-lg font-semibold text-gray-800 mb-3"> Để lại bình luận &amp; đánh giá của bạn </h3><div class="flex items-center mb-3 space-x-1"><!--[-->`);
        ssrRenderList(5, (n) => {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="${ssrRenderClass([n <= userRating.value ? "fill-yellow-400 stroke-y[#FBA707] scale-110" : "fill-transparent stroke-[#FBA707] hover:fill-yellow-100 hover:scale-110", "w-6 h-6 cursor-pointer transition-all duration-300 ease-in-out"])}" stroke-width="1.5"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>`);
        });
        _push(`<!--]--></div><textarea class="w-full h-32 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#EDB173] focus:outline-none resize-none text-[15px]" placeholder="Bình luận*">${ssrInterpolate(userComment.value)}</textarea><button type="button" class="relative overflow-hidden px-6 py-2.5 bg-[#edb173] text-black font-medium rounded-xl shadow-md flex justify-center items-center gap-2 group transition-all duration-300"><span class="absolute inset-0 flex justify-center items-center"><span class="w-1 h-1 bg-[#000000] rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100 origin-center"></span></span><span class="relative z-10 flex items-center gap-2 text-[15px] group-hover:text-white"><span>Đăng bình luận</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10.5l18-7.5-7.5 18-2.25-6.75L3 10.5z"></path></svg></span></button></div></div>`);
      }
      _push(`</div></div><div class="max-w-[100%] mx-auto px-4 relative mt-10">`);
      _push(ssrRenderComponent(_component_ModulesProductTitle, { title: "Sản phẩm liên quan" }, null, _parent));
      _push(`<div class="relative"><button class="absolute left-[-18px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#6E4E37] text-white flex justify-center items-center hover:bg-[#8b644a] transition shadow-lg"> ‹ </button><div class="overflow-hidden"><div class="flex transition-transform duration-500 ease-in-out gap-[20px]" style="${ssrRenderStyle({
        transform: `translateX(-${relatedIndex.value * (itemWidth.value + gap)}px)`
      })}"><!--[-->`);
      ssrRenderList(products.value, (product, i) => {
        _push(ssrRenderComponent(_component_ModulesProductCartProduct, {
          key: i,
          product,
          itemWidth: itemWidth.value,
          onView: viewProduct
        }, null, _parent));
      });
      _push(`<!--]--></div></div><button class="absolute right-[-25px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#6E4E37] text-white flex justify-center items-center hover:bg-[#8b644a] transition"> › </button></div></div>`);
      _push(ssrRenderComponent(_component_ModulesProductQuickViewOverlay, {
        show: showOverlay.value,
        product: currentProduct.value,
        onClose: ($event) => showOverlay.value = false
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/san-pham/2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=2-Dg5JEQIB.mjs.map
