import { _ as _sfc_main$1 } from './Tooltip-BoWgIaI5.mjs';
import { b as _sfc_main$e } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { u as useCart } from './useCart-zVwK7fEI.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CartProduct",
  __ssrInlineRender: true,
  props: {
    item: {},
    itemWidth: {}
  },
  emits: ["view"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    useRouter();
    const { addToCart } = useCart();
    const errorImage = ref(false);
    const resolvedThumbnail = computed(() => {
      if (errorImage.value) return "https://via.placeholder.com/180?text=No+Image";
      if (props.item.thumbnail?.startsWith("http")) return props.item.thumbnail;
      if (props.item.images?.length && props.item.images[0].image_url)
        return `http://127.0.0.1:8000/storage/${props.item.images[0].image_url}`;
      return "/placeholder.png";
    });
    const formatPrice = (price) => price ? price.toLocaleString("vi-VN") + "₫" : "";
    const handleAddToCart = async () => {
      if (!props.item.product_id) {
        alert("❌ Sản phẩm không hợp lệ");
        return;
      }
      try {
        const result = await addToCart(props.item.product_id, 1);
        if (result) {
          alert("✅ Đã thêm vào giỏ hàng!");
        } else {
          alert("❌ Thêm giỏ hàng thất bại. Vui lòng thử lại.");
        }
      } catch (error) {
        alert("❌ Lỗi khi thêm vào giỏ hàng: " + (error?.message || "Không rõ nguyên nhân"));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UTooltip = _sfc_main$1;
      const _component_UIcon = _sfc_main$e;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "relative group h-[330px] flex-shrink-0",
        style: { width: _ctx.itemWidth + "px" }
      }, _attrs))}><div class="${ssrRenderClass([["h-[180px] group-hover:h-full shadow-sm group-hover:shadow-md"], "absolute bottom-0 left-0 right-0 bg-[#FFF5EC] rounded-xl transition-all duration-500 ease-out z-0"])}"></div><div class="relative z-10 p-4 flex flex-col"><div class="relative w-full flex justify-center mb-3">`);
      if (_ctx.item.badge && _ctx.item.badge.trim() !== "") {
        _push(`<span class="${ssrRenderClass([{
          "bg-[#F05454]": _ctx.item.badge === "Mới",
          "bg-[#00BFFF]": _ctx.item.badge === "Hot",
          "bg-[#FBA707]": _ctx.item.badge === "Giảm 50%"
        }, "absolute top-1 right-2 w-[80px] h-[24px] flex justify-center items-center text-[14px] font-medium text-white rounded-full z-20"])}">${ssrInterpolate(_ctx.item.badge)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<img${ssrRenderAttr("src", resolvedThumbnail.value)}${ssrRenderAttr("alt", _ctx.item.product_name)} class="w-[180px] h-[180px] object-contain relative z-10 transition-transform duration-500 ease-out cursor-pointer"><div class="absolute left-1/2 bottom-[100px] transform -translate-x-1/2 translate-y-[120px] opacity-0 flex gap-2 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:translate-y-[90px] z-20">`);
      _push(ssrRenderComponent(_component_UTooltip, { text: "Xem sản phẩm" }, {
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
                onClick: ($event) => _ctx.$emit("view", _ctx.item),
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
      _push(ssrRenderComponent(_component_UTooltip, { text: "Thêm yêu thích" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="w-[38px] h-[38px] rounded-full bg-[#6E4E37] flex justify-center items-center text-white shadow-md hover:bg-[#8b644a] transition"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-heart",
              class: "w-5 h-5 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", { class: "w-[38px] h-[38px] rounded-full bg-[#6E4E37] flex justify-center items-center text-white shadow-md hover:bg-[#8b644a] transition" }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-heart",
                  class: "w-5 h-5 text-white"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><h3 class="text-gray-800 font-semibold text-[17px] text-left px-2 leading-snug truncate">${ssrInterpolate(_ctx.item.product_name)}</h3><div class="flex mt-1 px-2 text-left"><!--[-->`);
      ssrRenderList(5, (n) => {
        _push(ssrRenderComponent(_component_UIcon, {
          key: n,
          name: Number(_ctx.item.rating ?? 0) >= n ? "i-heroicons-star-solid" : "i-heroicons-star",
          class: ["w-4 h-4", Number(_ctx.item.rating ?? 0) >= n ? "text-yellow-400" : "text-gray-300"]
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="mt-2 flex items-center justify-between w-full px-2"><div class="text-left">`);
      if (_ctx.item.badge === "Giảm 50%" && _ctx.item.price_down) {
        _push(`<span class="line-through text-gray-400 text-[14px] block">${ssrInterpolate(formatPrice(_ctx.item.price))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-[#E95D5D] font-semibold text-[19px] block">${ssrInterpolate(formatPrice(_ctx.item.price_down || _ctx.item.price))}</span></div>`);
      _push(ssrRenderComponent(_component_UTooltip, { text: "Thêm giỏ hàng" }, {
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
                onClick: handleAddToCart,
                class: "w-[38px] h-[38px] flex justify-center items-center rounded-full bg-[#6E4E37] text-white shadow-md hover:bg-[#8b644a] transition"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-shopping-bag-solid",
                  class: "w-5 h-5 text-white"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Product/CartProduct.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main, { __name: "ModulesProductCartProduct" });

export { __nuxt_component_2 as _ };
//# sourceMappingURL=CartProduct-D6LsVQXZ.mjs.map
