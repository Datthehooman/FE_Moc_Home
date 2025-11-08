import { _ as __nuxt_component_0 } from './AccountSidebar-Cy5ujxZV.mjs';
import { _ as _sfc_main$3 } from './Tooltip-BoWgIaI5.mjs';
import { b as _sfc_main$e } from './server.mjs';
import { ref, computed, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _sfc_main$2 } from './Pagination-D0PpZ6pR.mjs';
import { _ as __nuxt_component_3 } from './QuickViewOverlay-CEOLyuIi.mjs';
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
import 'reka-ui';
import '@vueuse/core';
import 'pinia';
import '@iconify/vue';
import 'tailwindcss/colors';
import 'deep-pick-omit';
import '@vue/shared';
import 'perfect-debounce';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main$1 = {
  __name: "ModulesUserCartWishlist",
  __ssrInlineRender: true,
  props: {
    data: { type: Object, required: true },
    selectMode: { type: Boolean, default: false },
    selected: { type: Boolean, default: false }
  },
  emits: ["view", "remove", "add-to-cart", "toggle"],
  setup(__props, { emit: __emit }) {
    const formatPrice = (price) => {
      return price.toLocaleString("vi-VN") + "₫";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UTooltip = _sfc_main$3;
      const _component_UIcon = _sfc_main$e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative group h-[330px] w-full flex-shrink-0" }, _attrs))}>`);
      if (__props.selectMode) {
        _push(`<div class="absolute top-3 left-3 z-30"><input type="checkbox" class="w-5 h-5 cursor-pointer"${ssrIncludeBooleanAttr(__props.selected) ? " checked" : ""}></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="absolute bottom-0 left-0 right-0 bg-[#FFF5EC] rounded-xl transition-all duration-500 ease-out z-0 h-[180px] group-hover:h-full"></div>`);
      if (!__props.selectMode) {
        _push(`<div class="absolute left-1/2 bottom-[250px] transform -translate-x-1/2 translate-y-[120px] opacity-0 flex gap-2 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:translate-y-[90px] z-20">`);
        _push(ssrRenderComponent(_component_UTooltip, {
          "delay-duration": 0,
          text: "Xem sản phẩm",
          content: { side: "top", sideOffset: 1 },
          arrow: "",
          ui: {
            content: "bg-primary text-white text-[10px] font-semibold rounded-xl ring-primary shadow-none py-0",
            arrow: "fill-primary"
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="w-[38px] h-[38px] rounded-full bg-[#6E4E37] flex justify-center items-center text-white shadow-md hover:bg-[#8b644a] transition"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-eye-solid",
                class: "w-5 h-5 text-white"
              }, null, _parent2, _scopeId));
              _push2(`</button>`);
            } else {
              return [
                createVNode("button", {
                  onClick: ($event) => _ctx.$emit("view", __props.data),
                  class: "w-[38px] h-[38px] rounded-full bg-[#6E4E37] flex justify-center items-center text-white shadow-md hover:bg-[#8b644a] transition"
                }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-eye-solid",
                    class: "w-5 h-5 text-white"
                  })
                ], 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UTooltip, {
          "delay-duration": 0,
          text: "Bỏ khỏi yêu thích",
          content: { side: "top", sideOffset: 1 },
          arrow: "",
          ui: {
            content: "bg-primary text-white text-[10px] font-semibold rounded-xl ring-primary shadow-none py-0",
            arrow: "fill-primary"
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="w-[38px] h-[38px] rounded-full bg-[#6E4E37] flex justify-center items-center text-white shadow-md hover:bg-[#8b644a] transition"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-x-mark",
                class: "w-5 h-5 text-white"
              }, null, _parent2, _scopeId));
              _push2(`</button>`);
            } else {
              return [
                createVNode("button", {
                  onClick: ($event) => _ctx.$emit("remove", __props.data),
                  class: "w-[38px] h-[38px] rounded-full bg-[#6E4E37] flex justify-center items-center text-white shadow-md hover:bg-[#8b644a] transition"
                }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-x-mark",
                    class: "w-5 h-5 text-white"
                  })
                ], 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative z-10 p-4 flex flex-col"><div class="relative w-full flex justify-center mb-3">`);
      if (__props.data.badge) {
        _push(`<span class="${ssrRenderClass([{
          "bg-[#F05454]": __props.data.badge === "Mới",
          "bg-[#00BFFF]": __props.data.badge === "Hot",
          "bg-[#FBA707]": __props.data.badge === "Giảm 50%"
        }, "absolute top-1 right-2 w-[80px] h-[24px] flex justify-center items-center text-[14px] font-medium text-white rounded-full z-20"])}">${ssrInterpolate(__props.data.badge)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<img${ssrRenderAttr("src", __props.data.thumbnail)} class="w-[180px] h-[180px] object-contain z-10 transition-transform duration-500 ease-out cursor-pointer"></div><h3 class="text-gray-800 font-semibold text-[17px] text-left px-2 leading-snug truncate">${ssrInterpolate(__props.data.product_name)}</h3><div class="flex mt-1 px-2 text-left"><!--[-->`);
      ssrRenderList(5, (n) => {
        _push(ssrRenderComponent(_component_UIcon, {
          key: n,
          name: __props.data.rating >= n ? "i-heroicons-star-solid" : "i-heroicons-star",
          class: ["w-4 h-4", __props.data.rating >= n ? "text-yellow-400" : "text-gray-300"]
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="mt-2 flex items-center justify-between w-full px-2"><div class="text-left">`);
      if (__props.data.price_old) {
        _push(`<span class="line-through text-gray-400 text-[14px] block">${ssrInterpolate(formatPrice(__props.data.price_old))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-[#E95D5D] font-semibold text-[19px] block">${ssrInterpolate(formatPrice(__props.data.price))}</span></div>`);
      if (!__props.selectMode) {
        _push(ssrRenderComponent(_component_UTooltip, {
          "delay-duration": 0,
          text: "Thêm vào giỏ hàng",
          content: { side: "top", sideOffset: 1 },
          arrow: "",
          ui: {
            content: "bg-primary text-white text-[10px] font-semibold rounded-xl ring-primary shadow-none py-0",
            arrow: "fill-primary"
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="w-[38px] h-[38px] flex justify-center items-center rounded-full bg-[#6E4E37] text-white shadow-md hover:bg-[#8b644a] transition"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-shopping-bag-solid",
                class: "w-5 h-5 text-white"
              }, null, _parent2, _scopeId));
              _push2(`</button>`);
            } else {
              return [
                createVNode("button", {
                  onClick: ($event) => _ctx.$emit("add-to-cart", __props.data),
                  class: "w-[38px] h-[38px] flex justify-center items-center rounded-full bg-[#6E4E37] text-white shadow-md hover:bg-[#8b644a] transition"
                }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-shopping-bag-solid",
                    class: "w-5 h-5 text-white"
                  })
                ], 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/User/CartWishlist.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const perPage = 6;
const _sfc_main = {
  __name: "wishlist",
  __ssrInlineRender: true,
  setup(__props) {
    const currentPage = ref(1);
    const favoriteProducts = ref([
      { product_name: "Bình gốm nghệ thuật", price: 35e4, price_old: 45e4, badge: "Mới", rating: 4, thumbnail: "https://live.themewild.com/fameo/assets/img/product/01.png", stock_quantity: 10 },
      { product_name: "Ghế gỗ tự nhiên", price: 125e4, rating: 5, badge: "Hot", thumbnail: "https://live.themewild.com/fameo/assets/img/product/02.png", stock_quantity: 5 },
      { product_name: "Bộ ly thủy tinh cao cấp", price: 22e4, price_old: 35e4, rating: 4, thumbnail: "https://live.themewild.com/fameo/assets/img/product/03.png", stock_quantity: 30 },
      { product_name: "Tranh treo tường phong cách Nhật", price: 78e4, rating: 5, thumbnail: "https://live.themewild.com/fameo/assets/img/product/04.png", stock_quantity: 8 },
      { product_name: "Kệ gỗ decor", price: 45e4, rating: 4, thumbnail: "https://live.themewild.com/fameo/assets/img/product/05.png", stock_quantity: 12 },
      { product_name: "Chậu cây mini", price: 15e4, rating: 4, thumbnail: "https://live.themewild.com/fameo/assets/img/product/06.png", stock_quantity: 14 },
      { product_name: "Đèn ngủ gốm", price: 56e4, rating: 5, thumbnail: "https://live.themewild.com/fameo/assets/img/product/07.png", stock_quantity: 6 }
    ]);
    const totalPages = computed(() => Math.ceil(favoriteProducts.value.length / perPage));
    const paginatedFavorites = computed(
      () => favoriteProducts.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
    );
    const pagesAround = computed(() => {
      let arr = [];
      let p = currentPage.value;
      let t = totalPages.value;
      for (let i = p - 1; i <= p + 1; i++) {
        if (i > 1 && i < t) arr.push(i);
      }
      return arr;
    });
    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };
    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };
    const showOverview = ref(false);
    const selectedProduct = ref(null);
    const openOverview = (product) => {
      selectedProduct.value = product;
      showOverview.value = true;
    };
    const closeOverview = () => {
      showOverview.value = false;
    };
    const isSelecting = ref(false);
    const selectedList = ref([]);
    const toggleSelect = (product) => {
      if (selectedList.value.includes(product)) {
        selectedList.value = selectedList.value.filter((p) => p !== product);
      } else {
        selectedList.value.push(product);
      }
    };
    const removeOne = (product) => {
      favoriteProducts.value = favoriteProducts.value.filter((p) => p !== product);
      selectedList.value = selectedList.value.filter((p) => p !== product);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModulesUserAccountSidebar = __nuxt_component_0;
      const _component_ModulesUserCartWishlist = _sfc_main$1;
      const _component_ModulesUserPagination = _sfc_main$2;
      const _component_ModulesProductQuickViewOverlay = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center bg-[#FFFBF8] min-h-screen" }, _attrs))}><div class="flex w-full max-w-[85%]">`);
      _push(ssrRenderComponent(_component_ModulesUserAccountSidebar, null, null, _parent));
      _push(`<main class="flex-1 p-6"><section class="bg-white rounded-xl p-5 shadow mb-6"><div class="flex justify-between items-center mb-2"><h3 class="font-semibold text-gray-700 text-[20px]">Danh sách sản phẩm yêu thích</h3><div class="flex items-center gap-3">`);
      if (isSelecting.value && selectedList.value.length) {
        _push(`<button class="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"> Xóa khỏi yêu thích </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="relative overflow-hidden px-5 py-2 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex justify-center items-center group transition-colors duration-500"><span class="relative z-10 text-[15px] transition-colors duration-300">${ssrInterpolate(isSelecting.value ? "Hủy chọn" : "Chọn sản phẩm")}</span></button></div></div><hr class="border-t border-gray-200 mb-4"><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(paginatedFavorites.value, (item, index) => {
        _push(ssrRenderComponent(_component_ModulesUserCartWishlist, {
          key: index,
          data: item,
          "select-mode": isSelecting.value,
          selected: selectedList.value.includes(item),
          onToggle: ($event) => toggleSelect(item),
          onView: openOverview,
          "+": "",
          onRemove: ($event) => removeOne(item)
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_ModulesUserPagination, {
        "current-page": currentPage.value,
        "total-pages": totalPages.value,
        "pages-around": pagesAround.value,
        onPrev: prevPage,
        onNext: nextPage,
        onGo: (p) => currentPage.value = p
      }, null, _parent));
      _push(`</section>`);
      _push(ssrRenderComponent(_component_ModulesProductQuickViewOverlay, {
        show: showOverview.value,
        product: selectedProduct.value,
        onClose: closeOverview
      }, null, _parent));
      _push(`</main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/wishlist.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=wishlist-CXE_z3lk.mjs.map
