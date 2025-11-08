import { _ as _sfc_main$1 } from './Container-DDIbJE-W.mjs';
import { g as _export_sfc, c as __nuxt_component_1$1, _ as _sfc_main$8 } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { MdPreview } from 'md-editor-v3';
import 'reka-ui';
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
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const id = "preview-only";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const text = ref(`Trong những năm gần đây, phong cách nội thất tối giản (minimalism) đang dần trở thành lựa chọn ưu tiên của nhiều gia đình trẻ. Không chỉ mang đến sự gọn gàng, phong cách này còn giúp tối ưu không gian, tạo cảm giác thoáng đãng và hiện đại. Theo các chuyên gia nội thất, năm 2025 sẽ tiếp tục chứng kiến sự lên ngôi của vật liệu tự nhiên như gỗ, đá, mây tre kết hợp cùng kim loại nhẹ. Đây là sự pha trộn giữa truyền thống và hiện đại, vừa gần gũi, vừa bền vững.

Ngoài ra, xu hướng "nội thất xanh" cũng được dự đoán phát triển mạnh. Việc sử dụng vật liệu thân thiện môi trường, kết hợp cùng cây xanh trong nhà không chỉ nâng cao tính thẩm mỹ mà còn mang lại sự cân bằng, thư giãn cho gia chủ. Nhiều thương hiệu nội thất lớn cũng đã bắt đầu chú trọng hơn đến yếu tố tái chế và giảm thiểu rác thải trong sản xuất.

> "Thiết kế nội thất không chỉ tạo nên một ngôi nhà đẹp, mà còn xây dựng nên lối sống và giá trị của con người."  
> **— Steve Jobs**

Một điểm đáng chú ý khác là sự phát triển của nội thất thông minh. Từ bàn làm việc tích hợp sạc không dây, tủ quần áo cảm biến đèn, đến ghế sofa có thể tùy chỉnh tư thế... tất cả đều hướng đến mục tiêu nâng cao trải nghiệm sống, đáp ứng nhu cầu tiện nghi ngày càng cao của người tiêu dùng.

| ![Phòng khách hiện đại](/Blog%201.png) | ![Phòng khách hiện đại](/Blog%201.png) |
|:---:|:---:|

Với sự thay đổi này, ngành nội thất không chỉ dừng lại ở chức năng cơ bản, mà còn trở thành yếu tố thể hiện phong cách sống và cá tính riêng của mỗi người. Đầu tư cho nội thất giờ đây không đơn thuần là trang trí, mà còn là cách tạo dựng một không gian sống cân bằng, tiện nghi và bền vững.
`);
    ref("html");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$1;
      const _component_NuxtImg = __nuxt_component_1$1;
      const _component_UButton = _sfc_main$8;
      _push(ssrRenderComponent(_component_UContainer, mergeProps({ class: "lg:px-0 pt-16.5 flex justify-between" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex-1" data-v-4ca41a94${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: "/Blog 2.png",
              class: "w-full h-auto rounded-md mb-[23px]"
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex justify-between mb-[27px]" data-v-4ca41a94${_scopeId}><div class="flex gap-7.5" data-v-4ca41a94${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "link",
              size: "xs",
              color: "primary",
              icon: "i-lucide-circle-user-round",
              label: "Lê Phùng Tiến Quân",
              ui: {
                base: "hover:!text-black",
                leadingIcon: "!text-primary !size-3"
              },
              class: "text-black font-semibold"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "link",
              size: "xs",
              color: "primary",
              icon: "i-lucide-messages-square",
              label: "3.2k Bình luận",
              ui: {
                leadingIcon: "!text-primary !size-3"
                // Force icon color (use !important with !)
              },
              class: "text-black cursor-pointer font-semibold"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "link",
              size: "xs",
              color: "primary",
              icon: "i-lucide-thumbs-up",
              label: "1.4k thích",
              ui: {
                leadingIcon: "!text-primary !size-3"
                // Force icon color (use !important with !)
              },
              class: "text-black cursor-pointer font-semibold"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "link",
              size: "xs",
              color: "primary",
              icon: "i-lucide-share-2",
              label: "Chia sẻ",
              ui: {
                leadingIcon: "!size-3"
                // Force icon color (use !important with !)
              },
              class: "text-black cursor-pointer font-semibold"
            }, null, _parent2, _scopeId));
            _push2(`</div><h1 class="font-semibold text-[32px]" data-v-4ca41a94${_scopeId}> Xu hướng nội thất 2025: Tối giản nhưng vẫn tinh tế </h1>`);
            _push2(ssrRenderComponent(unref(MdPreview), {
              id,
              modelValue: unref(text)
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="w-[410px]" data-v-4ca41a94${_scopeId}></div>`);
          } else {
            return [
              createVNode("div", { class: "flex-1" }, [
                createVNode(_component_NuxtImg, {
                  src: "/Blog 2.png",
                  class: "w-full h-auto rounded-md mb-[23px]"
                }),
                createVNode("div", { class: "flex justify-between mb-[27px]" }, [
                  createVNode("div", { class: "flex gap-7.5" }, [
                    createVNode(_component_UButton, {
                      variant: "link",
                      size: "xs",
                      color: "primary",
                      icon: "i-lucide-circle-user-round",
                      label: "Lê Phùng Tiến Quân",
                      ui: {
                        base: "hover:!text-black",
                        leadingIcon: "!text-primary !size-3"
                      },
                      class: "text-black font-semibold"
                    }),
                    createVNode(_component_UButton, {
                      variant: "link",
                      size: "xs",
                      color: "primary",
                      icon: "i-lucide-messages-square",
                      label: "3.2k Bình luận",
                      ui: {
                        leadingIcon: "!text-primary !size-3"
                        // Force icon color (use !important with !)
                      },
                      class: "text-black cursor-pointer font-semibold"
                    }),
                    createVNode(_component_UButton, {
                      variant: "link",
                      size: "xs",
                      color: "primary",
                      icon: "i-lucide-thumbs-up",
                      label: "1.4k thích",
                      ui: {
                        leadingIcon: "!text-primary !size-3"
                        // Force icon color (use !important with !)
                      },
                      class: "text-black cursor-pointer font-semibold"
                    })
                  ]),
                  createVNode(_component_UButton, {
                    variant: "link",
                    size: "xs",
                    color: "primary",
                    icon: "i-lucide-share-2",
                    label: "Chia sẻ",
                    ui: {
                      leadingIcon: "!size-3"
                      // Force icon color (use !important with !)
                    },
                    class: "text-black cursor-pointer font-semibold"
                  })
                ]),
                createVNode("h1", { class: "font-semibold text-[32px]" }, " Xu hướng nội thất 2025: Tối giản nhưng vẫn tinh tế "),
                createVNode(unref(MdPreview), {
                  id,
                  modelValue: unref(text)
                }, null, 8, ["modelValue"])
              ]),
              createVNode("div", { class: "w-[410px]" })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4ca41a94"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-C9YTy0BM.mjs.map
