import { defineComponent, ref, computed, watch, mergeProps, unref, mergeModels, useModel, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { g as _export_sfc } from './server.mjs';
import { _ as __nuxt_component_2 } from './CartProduct-D6LsVQXZ.mjs';
import { _ as __nuxt_component_3$1 } from './QuickViewOverlay-CEOLyuIi.mjs';
import { u as useProduct } from './useProduct-8uDT80_O.mjs';
import { useRoute, useRouter } from 'vue-router';
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
import './Tooltip-BoWgIaI5.mjs';
import './useCart-zVwK7fEI.mjs';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SearchBox",
  __ssrInlineRender: true,
  props: {
    "modelValue": {},
    "modelModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels(["update:modelValue"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const modelValue = useModel(__props, "modelValue");
    const emit = __emit;
    let timeout = null;
    watch(modelValue, (val) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        emit("update:modelValue", val);
      }, 300);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white p-4 rounded-lg shadow-sm" }, _attrs))}><h3 class="text-lg font-semibold mb-3 text-gray-700">Tìm kiếm</h3><input type="text"${ssrRenderAttr("value", modelValue.value)} placeholder="Nhập tên sản phẩm..." class="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring focus:ring-[#A77A5D]/30 focus:border-[#A77A5D] outline-none"></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Product/SearchBox.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0$1 = Object.assign(_sfc_main$4, { __name: "ModulesProductSearchBox" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Sidebar",
  __ssrInlineRender: true,
  props: {
    searchQuery: {},
    selectedCategories: {},
    selectedBrands: {}
  },
  emits: [
    "update:searchQuery",
    "update:selectedCategories",
    "update:selectedBrands"
  ],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const categories = ref([]);
    const brands = ref([
      { name: "Tovol", count: 15 },
      { name: "Sundoy", count: 23 },
      { name: "Sahoo Home", count: 35 },
      { name: "Casterly", count: 46 },
      { name: "Mainden Home", count: 39 },
      { name: "Knroll Furniture", count: 79 },
      { name: "Modern Enternity", count: 28 },
      { name: "Charisha", count: 17 },
      { name: "Audou", count: 12 }
    ]);
    const colors = ["#3B82F6", "#22C55E", "#FACC15", "#F87171", "#EF4444"];
    const sizes = ["Cực nhỏ", "Nhỏ", "Vừa", "Lớn", "Cực lớn"];
    const sales = ["Đang giảm giá", "Còn hàng", "Hết hàng", "Giảm giá"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModulesProductSearchBox = __nuxt_component_0$1;
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "w-[250px] flex-shrink-0 space-y-6" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ModulesProductSearchBox, {
        "model-value": _ctx.searchQuery,
        "onUpdate:modelValue": (val) => emit("update:searchQuery", val)
      }, null, _parent));
      _push(`<div class="bg-white p-4 rounded-lg shadow-sm"><h3 class="font-semibold mb-2">Danh mục</h3><ul class="space-y-1"><!--[-->`);
      ssrRenderList(categories.value, (cat) => {
        _push(`<li class="flex items-center gap-2"><input type="checkbox"${ssrRenderAttr("value", cat.id)}${ssrIncludeBooleanAttr(_ctx.selectedCategories.includes(String(cat.id))) ? " checked" : ""}><span class="flex-1 cursor-pointer hover:text-primary">${ssrInterpolate(cat.category_name)}</span></li>`);
      });
      _push(`<!--]--><li class="mt-2 cursor-pointer text-sm text-gray-500 hover:text-primary"> Xóa lọc danh mục </li></ul></div><div class="bg-white p-4 rounded-lg shadow-sm"><h3 class="font-semibold mb-2">Thương hiệu</h3><ul class="space-y-1"><!--[-->`);
      ssrRenderList(brands.value, (brand) => {
        _push(`<li class="flex items-center gap-2"><input type="checkbox"${ssrRenderAttr("value", brand.name)}${ssrIncludeBooleanAttr(_ctx.selectedBrands.includes(brand.name)) ? " checked" : ""}><span class="flex-1 cursor-pointer hover:text-primary">${ssrInterpolate(brand.name)}</span><span class="text-gray-400">(${ssrInterpolate(brand.count)})</span></li>`);
      });
      _push(`<!--]--><li class="mt-2 cursor-pointer text-sm text-gray-500 hover:text-primary"> Xóa lọc thương hiệu </li></ul></div><div class="bg-white p-4 rounded-lg shadow-sm"><h3 class="text-lg font-semibold mb-3">Khuyến mãi</h3><div class="space-y-2 text-gray-700"><!--[-->`);
      ssrRenderList(sales, (sale) => {
        _push(`<label class="flex items-center space-x-2"><input type="checkbox"><span>${ssrInterpolate(sale)}</span></label>`);
      });
      _push(`<!--]--></div></div><div class="bg-white p-4 rounded-lg shadow-sm"><h3 class="text-lg font-semibold mb-3">Đánh giá</h3><div class="space-y-2"><!--[-->`);
      ssrRenderList(3, (n) => {
        _push(`<div class="flex items-center space-x-2"><input type="checkbox"><div class="flex"><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="${ssrRenderClass([i <= 6 - n ? "text-yellow-400" : "text-gray-300", "w-5 h-5"])}"><path fill-rule="evenodd" d="M10 15.27L16.18 18l-1.64-7.03L20 6.24l-7.19-.61L10 0 7.19 5.63 0 6.24l5.46 4.73L3.82 18z"></path></svg>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-white p-4 rounded-lg shadow-sm"><h3 class="text-lg font-semibold mb-3">Màu sắc</h3><div class="flex space-x-3"><!--[-->`);
      ssrRenderList(colors, (color) => {
        _push(`<label class="relative cursor-pointer"><input type="checkbox" class="absolute opacity-0 peer"><span style="${ssrRenderStyle({ backgroundColor: color })}" class="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-gray-400 transition-transform peer-checked:scale-110"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white" class="w-3.5 h-3.5 opacity-0 peer-checked:opacity-100 transition"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path></svg></span></label>`);
      });
      _push(`<!--]--></div></div><div class="bg-white p-4 rounded-lg shadow-sm"><h3 class="text-lg font-semibold mb-3">Kích cỡ</h3><div class="space-y-2 text-gray-700"><!--[-->`);
      ssrRenderList(sizes, (size) => {
        _push(`<label class="flex items-center space-x-2"><input type="checkbox"><span>${ssrInterpolate(size)}</span></label>`);
      });
      _push(`<!--]--></div></div><div class="relative rounded-lg overflow-hidden h-[360px]"><img src="https://live.themewild.com/fameo/assets/img/blog/03.jpg" alt="banner" class="w-full h-full object-cover rounded-lg"><div class="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white text-center uppercase"><div class="flex items-center gap-4 mb-2"><span class="h-[2px] w-10 bg-white"></span><p class="text-[18px] font-semibold tracking-wide">GIẢM GIÁ 35%</p><span class="h-[2px] w-10 bg-white"></span></div><h3 class="text-[28px] font-bold">BỘ SƯU TẬP NỘI THẤT MỚI</h3></div></div></aside>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Product/Sidebar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$3, { __name: "ModulesProductSidebar" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Sort",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const options = [
      "Mặc định",
      "Tên A-Z",
      "Tên Z-A",
      "Giá tăng dần",
      "Giá giảm dần"
    ];
    const selected = ref(props.modelValue);
    const isOpen = ref(false);
    watch(() => props.modelValue, (val) => selected.value = val);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-4" }, _attrs))} data-v-2d0a7742><div class="flex items-center justify-start bg-white rounded-[10px] shadow-sm px-4 py-3 border border-gray-200 w-full" data-v-2d0a7742><span class="text-gray-600 mr-2 text-sm" data-v-2d0a7742>Sắp xếp theo:</span><div class="relative inline-block text-left" data-v-2d0a7742><button class="border border-gray-300 rounded-[10px] px-3 py-1.5 w-[150px] bg-white flex justify-between items-center hover:border-gray-400 transition text-sm" data-v-2d0a7742><span data-v-2d0a7742>${ssrInterpolate(selected.value)}</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${ssrRenderClass([{ "rotate-180": isOpen.value }, "w-4 h-4 ml-1 transition-transform duration-200"])}" data-v-2d0a7742><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25L12 15.75L4.5 8.25" data-v-2d0a7742></path></svg></button>`);
      if (isOpen.value) {
        _push(`<ul class="absolute left-0 mt-2 w-[150px] bg-white border border-gray-200 rounded-[10px] shadow-lg z-50 overflow-hidden" data-v-2d0a7742><!--[-->`);
        ssrRenderList(options, (option) => {
          _push(`<li class="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 transition" data-v-2d0a7742>${ssrInterpolate(option)}</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Product/Sort.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-2d0a7742"]]), { __name: "ModulesProductSort" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ModulesPagination",
  __ssrInlineRender: true,
  props: {
    currentPage: {},
    totalPages: {}
  },
  setup(__props) {
    const props = __props;
    const pagesToShow = computed(() => {
      const pages = [];
      if (props.totalPages <= 5) {
        for (let i = 1; i <= props.totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        let start = Math.max(props.currentPage - 1, 2);
        let end = Math.min(props.currentPage + 1, props.totalPages - 1);
        if (start > 2) pages.push("...");
        for (let i = start; i <= end; i++) pages.push(i);
        if (end < props.totalPages - 1) pages.push("...");
        pages.push(props.totalPages);
      }
      return pages;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center mt-6 gap-2" }, _attrs))}><button${ssrIncludeBooleanAttr(_ctx.currentPage === 1) ? " disabled" : ""} class="w-[39px] h-[39px] rounded-full flex items-center justify-center text-white bg-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button>`);
      if (_ctx.page !== "...") {
        _push(`<!--[-->`);
        ssrRenderList(pagesToShow.value, (page) => {
          _push(`<button class="${ssrRenderClass([
            "w-[39px] h-[39px] rounded-full flex items-center justify-center text-white transition-colors",
            _ctx.currentPage === page ? "bg-[#6E4E37]" : "bg-black hover:bg-gray-800"
          ])}">${ssrInterpolate(page)}</button>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.page === "...") {
        _push(`<!--[-->`);
        ssrRenderList(pagesToShow.value, (page) => {
          _push(`<span>...</span>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button${ssrIncludeBooleanAttr(_ctx.currentPage === _ctx.totalPages) ? " disabled" : ""} class="w-[39px] h-[39px] rounded-full flex items-center justify-center text-white bg-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Product/ModulesPagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$1, { __name: "ModulesProductModulesPagination" });
const itemsPerPage = 18;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductList",
  __ssrInlineRender: true,
  setup(__props) {
    const normalizeText = (str) => {
      return str?.normalize("NFD")?.replace(/[\u0300-\u036f]/g, "")?.replace(/đ/g, "d")?.replace(/Đ/g, "D")?.replace(/[^a-zA-Z0-9 ]/g, "")?.replace(/\s+/g, " ")?.trim()?.toLowerCase() || "";
    };
    const { products, loading, fetchProducts } = useProduct();
    const route = useRoute();
    useRouter();
    const searchQuery = ref(route.query.search || "");
    const selectedCategories = ref([]);
    const selectedBrands = ref([]);
    const sortOption = ref("Mặc định");
    const currentPage = ref(1);
    const parsePrice = (price) => Number(String(price).replace(/\D/g, ""));
    const filteredProducts = computed(() => {
      let result = products.value || [];
      if (searchQuery.value.trim()) {
        const keyword = normalizeText(searchQuery.value);
        result = result.filter(
          (p) => normalizeText(p.product_name).includes(keyword)
        );
      }
      if (selectedBrands.value.length) {
        result = result.filter((p) => selectedBrands.value.includes(p.brand ?? ""));
      }
      if (selectedCategories.value.length) {
        result = result.filter((p) => selectedCategories.value.includes(String(p.category_id)));
      }
      if (sortOption.value === "Tên A-Z") {
        result = [...result].sort(
          (a, b) => a.product_name.localeCompare(b.product_name, "vi", { sensitivity: "base" })
        );
      } else if (sortOption.value === "Tên Z-A") {
        result = [...result].sort(
          (a, b) => b.product_name.localeCompare(a.product_name, "vi", { sensitivity: "base" })
        );
      } else if (sortOption.value === "Giá tăng dần") {
        result = [...result].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      } else if (sortOption.value === "Giá giảm dần") {
        result = [...result].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      }
      return result;
    });
    const totalPages = computed(
      () => Math.ceil(filteredProducts.value.length / itemsPerPage)
    );
    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      return filteredProducts.value.slice(start, start + itemsPerPage);
    });
    const showQuickView = ref(false);
    const selectedProduct = ref(null);
    const openQuickView = (product) => {
      selectedProduct.value = product;
      showQuickView.value = true;
    };
    const closeQuickView = () => showQuickView.value = false;
    watch(
      () => route.query.search,
      (keyword) => {
        searchQuery.value = keyword || "";
      },
      { immediate: true }
    );
    let timeout = null;
    watch(searchQuery, (keyword) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        currentPage.value = 1;
        const normalized = normalizeText(keyword);
        if (!normalized || normalized.length < 1) {
          await fetchProducts();
          return;
        }
        loading.value = true;
        try {
          const res = await fetch(
            `http://127.0.0.1:8000/api/client/product-search?keyword=${encodeURIComponent(normalized)}`
          );
          const json = await res.json();
          const list = json?.result?.data || [];
          products.value = list.map((p) => ({
            ...p,
            price: Number(p.price),
            price_down: p.price_down ? Number(p.price_down) : void 0,
            thumbnail: p.thumbnail ? p.thumbnail : p.images?.[0]?.image_url ? `http://127.0.0.1:8000/storage/${p.images[0].image_url}` : "/placeholder.png"
          }));
        } catch (err) {
          console.error("❌ Lỗi search sản phẩm:", err);
          products.value = [];
        } finally {
          loading.value = false;
        }
      }, 300);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModulesProductSidebar = __nuxt_component_0;
      const _component_ModulesProductSort = __nuxt_component_1;
      const _component_ModulesProductCartProduct = __nuxt_component_2;
      const _component_ModulesProductModulesPagination = __nuxt_component_3;
      const _component_ModulesProductQuickViewOverlay = __nuxt_component_3$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-[#FFFBF8]" }, _attrs))}><div class="min-h-screen p-6 max-w-[85%] mx-auto"><div class="max-w-[1200px] mx-auto flex gap-6">`);
      _push(ssrRenderComponent(_component_ModulesProductSidebar, {
        searchQuery: searchQuery.value,
        "onUpdate:searchQuery": ($event) => searchQuery.value = $event,
        selectedCategories: selectedCategories.value,
        "onUpdate:selectedCategories": ($event) => selectedCategories.value = $event,
        selectedBrands: selectedBrands.value,
        "onUpdate:selectedBrands": ($event) => selectedBrands.value = $event
      }, null, _parent));
      _push(`<div class="flex-1">`);
      _push(ssrRenderComponent(_component_ModulesProductSort, {
        modelValue: sortOption.value,
        "onUpdate:modelValue": ($event) => sortOption.value = $event
      }, null, _parent));
      if (!unref(loading) && paginatedProducts.value.length) {
        _push(`<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 place-items-center items-stretch"><!--[-->`);
        ssrRenderList(paginatedProducts.value, (product) => {
          _push(ssrRenderComponent(_component_ModulesProductCartProduct, {
            key: product.product_id,
            item: product,
            class: "w-full max-w-[350px]",
            onView: ($event) => openQuickView(product)
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (unref(loading)) {
        _push(`<div class="text-center py-20 text-gray-500"> Đang tải sản phẩm... </div>`);
      } else {
        _push(`<div class="text-center py-20 text-gray-400"> Không có sản phẩm nào phù hợp </div>`);
      }
      _push(ssrRenderComponent(_component_ModulesProductModulesPagination, {
        currentPage: currentPage.value,
        totalPages: totalPages.value,
        "onUpdate:currentPage": ($event) => currentPage.value = $event
      }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_ModulesProductQuickViewOverlay, {
        show: showQuickView.value,
        product: selectedProduct.value,
        onClose: closeQuickView
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/ProductList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProductList-B5-vT4am.mjs.map
