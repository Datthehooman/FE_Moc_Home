import { _ as _sfc_main$i } from './Container-DDIbJE-W.mjs';
import { defineComponent, withCtx, unref, createVNode, createBlock, openBlock, Fragment, renderList, createTextVNode, ref, useSlots, computed, mergeProps, renderSlot, createCommentVNode, toDisplayString, isRef, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderSlot, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import useEmblaCarousel from 'embla-carousel-vue';
import { Primitive, useForwardProps, useForwardPropsEmits, TabsRoot, TabsList, TabsIndicator, TabsTrigger, TabsContent } from 'reka-ui';
import { reactivePick, useVModel } from '@vueuse/core';
import { c as __nuxt_component_1$1, b as _sfc_main$e$1, _ as _sfc_main$8$1, g as _export_sfc, a as useAppConfig, d as useFieldGroup, e as useComponentIcons, t as tv, f as _sfc_main$b$1, j as useCustomFetch, u as useLocale, h as get, i as useFormField, l as looseToNumber } from './server.mjs';
import { _ as _sfc_main$j } from './Tooltip-BoWgIaI5.mjs';
import { p as publicAssetsURL } from '../nitro/nitro.mjs';
import { _ as __nuxt_component_1$2 } from './BlogCard-jIFTVrTi.mjs';
import 'pinia';
import 'vue-router';
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

const theme$3 = {
  "slots": {
    "root": "relative focus:outline-none",
    "viewport": "overflow-hidden",
    "container": "flex items-start",
    "item": "min-w-0 shrink-0 basis-full",
    "controls": "",
    "arrows": "",
    "prev": "absolute rounded-full",
    "next": "absolute rounded-full",
    "dots": "absolute inset-x-0 -bottom-7 flex flex-wrap items-center justify-center gap-3",
    "dot": [
      "cursor-pointer size-3 bg-accented rounded-full",
      "transition"
    ]
  },
  "variants": {
    "orientation": {
      "vertical": {
        "container": "flex-col -mt-4",
        "item": "pt-4",
        "prev": "top-4 sm:-top-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90",
        "next": "bottom-4 sm:-bottom-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90"
      },
      "horizontal": {
        "container": "flex-row -ms-4",
        "item": "ps-4",
        "prev": "start-4 sm:-start-12 top-1/2 -translate-y-1/2",
        "next": "end-4 sm:-end-12 top-1/2 -translate-y-1/2"
      }
    },
    "active": {
      "true": {
        "dot": "data-[state=active]:bg-inverted"
      }
    }
  }
};
const _sfc_main$h = {
  __name: "UCarousel",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    prev: { type: Object, required: false },
    prevIcon: { type: [String, Object], required: false },
    next: { type: Object, required: false },
    nextIcon: { type: [String, Object], required: false },
    arrows: { type: Boolean, required: false, default: false },
    dots: { type: Boolean, required: false, default: false },
    orientation: { type: null, required: false, default: "horizontal" },
    items: { type: Array, required: false },
    autoplay: { type: [Boolean, Object], required: false, default: false },
    autoScroll: { type: [Boolean, Object], required: false, default: false },
    autoHeight: { type: [Boolean, Object], required: false, default: false },
    classNames: { type: [Boolean, Object], required: false, default: false },
    fade: { type: [Boolean, Object], required: false, default: false },
    wheelGestures: { type: [Boolean, Object], required: false, default: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    align: { type: [String, Function], required: false, default: "center" },
    containScroll: { type: [Boolean, String], required: false, default: "trimSnaps" },
    slidesToScroll: { type: [String, Number], required: false, default: 1 },
    dragFree: { type: Boolean, required: false, default: false },
    dragThreshold: { type: Number, required: false, default: 10 },
    inViewThreshold: { type: null, required: false, default: 0 },
    loop: { type: Boolean, required: false, default: false },
    skipSnaps: { type: Boolean, required: false, default: false },
    duration: { type: Number, required: false, default: 25 },
    startIndex: { type: Number, required: false, default: 0 },
    watchDrag: { type: [Boolean, Function], required: false, default: true },
    watchResize: { type: [Boolean, Function], required: false, default: true },
    watchSlides: { type: [Boolean, Function], required: false, default: true },
    watchFocus: { type: [Boolean, Function], required: false, default: true },
    active: { type: Boolean, required: false, default: true },
    breakpoints: { type: Object, required: false, default: () => ({}) }
  },
  emits: ["select"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const { dir, t } = useLocale();
    const appConfig = useAppConfig();
    const rootProps = useForwardProps(reactivePick(props, "active", "align", "breakpoints", "containScroll", "dragFree", "dragThreshold", "duration", "inViewThreshold", "loop", "skipSnaps", "slidesToScroll", "startIndex", "watchDrag", "watchResize", "watchSlides", "watchFocus"));
    const prevIcon = computed(() => props.prevIcon || (dir.value === "rtl" ? appConfig.ui.icons.arrowRight : appConfig.ui.icons.arrowLeft));
    const nextIcon = computed(() => props.nextIcon || (dir.value === "rtl" ? appConfig.ui.icons.arrowLeft : appConfig.ui.icons.arrowRight));
    const ui = computed(() => tv({ extend: tv(theme$3), ...appConfig.ui?.carousel || {} })({
      orientation: props.orientation
    }));
    const options = computed(() => ({
      ...props.fade ? { align: "center", containScroll: false } : {},
      ...rootProps.value,
      axis: props.orientation === "horizontal" ? "x" : "y",
      direction: dir.value === "rtl" ? "rtl" : "ltr"
    }));
    const plugins = ref([]);
    async function loadPlugins() {
      const emblaPlugins = [];
      if (props.autoplay) {
        const AutoplayPlugin = await import('embla-carousel-autoplay').then((r) => r.default);
        emblaPlugins.push(AutoplayPlugin(typeof props.autoplay === "boolean" ? {} : props.autoplay));
      }
      if (props.autoScroll) {
        const AutoScrollPlugin = await import('embla-carousel-auto-scroll').then((r) => r.default);
        emblaPlugins.push(AutoScrollPlugin(typeof props.autoScroll === "boolean" ? {} : props.autoScroll));
      }
      if (props.autoHeight) {
        const AutoHeightPlugin = await import('embla-carousel-auto-height').then((r) => r.default);
        emblaPlugins.push(AutoHeightPlugin(typeof props.autoHeight === "boolean" ? {} : props.autoHeight));
      }
      if (props.classNames) {
        const ClassNamesPlugin = await import('embla-carousel-class-names').then((r) => r.default);
        emblaPlugins.push(ClassNamesPlugin(typeof props.classNames === "boolean" ? {} : props.classNames));
      }
      if (props.fade) {
        const FadePlugin = await import('embla-carousel-fade').then((r) => r.default);
        emblaPlugins.push(FadePlugin(typeof props.fade === "boolean" ? {} : props.fade));
      }
      if (props.wheelGestures) {
        const { WheelGesturesPlugin } = await import('../_/embla-carousel-wheel-gestures.esm.mjs');
        emblaPlugins.push(WheelGesturesPlugin(typeof props.wheelGestures === "boolean" ? {} : props.wheelGestures));
      }
      plugins.value = emblaPlugins;
    }
    watch(() => [props.autoplay, props.autoScroll, props.autoHeight, props.classNames, props.fade, props.wheelGestures], async () => {
      await loadPlugins();
      emblaApi.value?.reInit(options.value, plugins.value);
    }, { immediate: true });
    const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
    watch(options, () => {
      emblaApi.value?.reInit(options.value, plugins.value);
    }, { flush: "post" });
    function scrollPrev() {
      emblaApi.value?.scrollPrev();
    }
    function scrollNext() {
      emblaApi.value?.scrollNext();
    }
    function scrollTo(index) {
      emblaApi.value?.scrollTo(index);
    }
    function onKeyDown(event) {
      let prevKey;
      let nextKey;
      if (props.orientation === "horizontal") {
        prevKey = dir.value === "ltr" ? "ArrowLeft" : "ArrowRight";
        nextKey = dir.value === "ltr" ? "ArrowRight" : "ArrowLeft";
      } else {
        prevKey = "ArrowUp";
        nextKey = "ArrowDown";
      }
      if (event.key === prevKey) {
        event.preventDefault();
        scrollPrev();
        return;
      }
      if (event.key === nextKey) {
        event.preventDefault();
        scrollNext();
      }
    }
    const canScrollNext = ref(false);
    const canScrollPrev = ref(false);
    const selectedIndex = ref(0);
    const scrollSnaps = ref([]);
    function isCarouselItem(item) {
      return typeof item === "object" && item !== null;
    }
    __expose({
      emblaRef,
      emblaApi
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        role: "region",
        "aria-roledescription": "carousel",
        "data-orientation": __props.orientation,
        tabindex: "0",
        class: ui.value.root({ class: [props.ui?.root, props.class] }),
        onKeydown: onKeyDown
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(ui.value.viewport({ class: props.ui?.viewport }))}"${_scopeId}><div class="${ssrRenderClass(ui.value.container({ class: props.ui?.container }))}"${_scopeId}><!--[-->`);
            ssrRenderList(__props.items, (item, index) => {
              _push2(`<div${ssrRenderAttrs(mergeProps({ key: index }, { ref_for: true }, __props.dots ? { role: "tabpanel" } : { "role": "group", "aria-roledescription": "slide" }, {
                class: ui.value.item({ class: [props.ui?.item, isCarouselItem(item) && item.ui?.item, isCarouselItem(item) && item.class] })
              }))}${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "default", {
                item,
                index
              }, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
            if (__props.arrows || __props.dots) {
              _push2(`<div class="${ssrRenderClass(ui.value.controls({ class: props.ui?.controls }))}"${_scopeId}>`);
              if (__props.arrows) {
                _push2(`<div class="${ssrRenderClass(ui.value.arrows({ class: props.ui?.arrows }))}"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$8$1, mergeProps({
                  disabled: !canScrollPrev.value,
                  icon: prevIcon.value,
                  color: "neutral",
                  variant: "outline",
                  "aria-label": unref(t)("carousel.prev")
                }, typeof __props.prev === "object" ? __props.prev : void 0, {
                  class: ui.value.prev({ class: props.ui?.prev }),
                  onClick: scrollPrev
                }), null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$8$1, mergeProps({
                  disabled: !canScrollNext.value,
                  icon: nextIcon.value,
                  color: "neutral",
                  variant: "outline",
                  "aria-label": unref(t)("carousel.next")
                }, typeof __props.next === "object" ? __props.next : void 0, {
                  class: ui.value.next({ class: props.ui?.next }),
                  onClick: scrollNext
                }), null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.dots) {
                _push2(`<div role="tablist"${ssrRenderAttr("aria-label", unref(t)("carousel.dots"))} class="${ssrRenderClass(ui.value.dots({ class: props.ui?.dots }))}"${_scopeId}><!--[-->`);
                ssrRenderList(scrollSnaps.value, (_2, index) => {
                  _push2(`<button type="button" role="tab"${ssrRenderAttr("aria-label", unref(t)("carousel.goto", { slide: index + 1 }))}${ssrRenderAttr("aria-selected", selectedIndex.value === index)} class="${ssrRenderClass(ui.value.dot({ class: props.ui?.dot, active: selectedIndex.value === index }))}"${ssrRenderAttr("data-state", selectedIndex.value === index ? "active" : void 0)}${_scopeId}></button>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", {
                ref_key: "emblaRef",
                ref: emblaRef,
                class: ui.value.viewport({ class: props.ui?.viewport })
              }, [
                createVNode("div", {
                  class: ui.value.container({ class: props.ui?.container })
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item, index) => {
                    return openBlock(), createBlock("div", mergeProps({ key: index }, { ref_for: true }, __props.dots ? { role: "tabpanel" } : { "role": "group", "aria-roledescription": "slide" }, {
                      class: ui.value.item({ class: [props.ui?.item, isCarouselItem(item) && item.ui?.item, isCarouselItem(item) && item.class] })
                    }), [
                      renderSlot(_ctx.$slots, "default", {
                        item,
                        index
                      })
                    ], 16);
                  }), 128))
                ], 2)
              ], 2),
              __props.arrows || __props.dots ? (openBlock(), createBlock("div", {
                key: 0,
                class: ui.value.controls({ class: props.ui?.controls })
              }, [
                __props.arrows ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: ui.value.arrows({ class: props.ui?.arrows })
                }, [
                  createVNode(_sfc_main$8$1, mergeProps({
                    disabled: !canScrollPrev.value,
                    icon: prevIcon.value,
                    color: "neutral",
                    variant: "outline",
                    "aria-label": unref(t)("carousel.prev")
                  }, typeof __props.prev === "object" ? __props.prev : void 0, {
                    class: ui.value.prev({ class: props.ui?.prev }),
                    onClick: scrollPrev
                  }), null, 16, ["disabled", "icon", "aria-label", "class"]),
                  createVNode(_sfc_main$8$1, mergeProps({
                    disabled: !canScrollNext.value,
                    icon: nextIcon.value,
                    color: "neutral",
                    variant: "outline",
                    "aria-label": unref(t)("carousel.next")
                  }, typeof __props.next === "object" ? __props.next : void 0, {
                    class: ui.value.next({ class: props.ui?.next }),
                    onClick: scrollNext
                  }), null, 16, ["disabled", "icon", "aria-label", "class"])
                ], 2)) : createCommentVNode("", true),
                __props.dots ? (openBlock(), createBlock("div", {
                  key: 1,
                  role: "tablist",
                  "aria-label": unref(t)("carousel.dots"),
                  class: ui.value.dots({ class: props.ui?.dots })
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(scrollSnaps.value, (_2, index) => {
                    return openBlock(), createBlock("button", {
                      key: index,
                      type: "button",
                      role: "tab",
                      "aria-label": unref(t)("carousel.goto", { slide: index + 1 }),
                      "aria-selected": selectedIndex.value === index,
                      class: ui.value.dot({ class: props.ui?.dot, active: selectedIndex.value === index }),
                      "data-state": selectedIndex.value === index ? "active" : void 0,
                      onClick: ($event) => scrollTo(index)
                    }, null, 10, ["aria-label", "aria-selected", "data-state", "onClick"]);
                  }), 128))
                ], 10, ["aria-label"])) : createCommentVNode("", true)
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Carousel.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _imports_0$2 = publicAssetsURL("/Banner 1.png");
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "Banner1",
  __ssrInlineRender: true,
  setup(__props) {
    const items = [
      { title: "Slide 1", description: "First slide content" },
      { title: "Slide 2", description: "Second slide content" },
      { title: "Slide 3", description: "Third slide content" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCarousel = _sfc_main$h;
      const _component_UTooltip = _sfc_main$j;
      const _component_UIcon = _sfc_main$e$1;
      const _component_NuxtImg = __nuxt_component_1$1;
      const _component_UButton = _sfc_main$8$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-[476px]" }, _attrs))}><img${ssrRenderAttr("src", _imports_0$2)} class="w-full" alt="Banner 1">`);
      _push(ssrRenderComponent(_component_UCarousel, {
        items,
        dots: "",
        loop: "",
        arrows: "",
        class: "absolute inset-0 top-[28px]",
        autoplay: { delay: 2e3 },
        prev: {
          color: "primary",
          icon: "i-lucide-chevron-left",
          variant: "soft",
          ui: {
            base: "bg-white hover:bg-primary text-primary hover:text-white"
          }
        },
        next: {
          color: "primary",
          icon: "i-lucide-chevron-right",
          variant: "soft",
          ui: {
            base: "bg-white hover:bg-primary text-primary hover:text-white"
          }
        },
        ui: {
          viewport: "mx-[65px]",
          dot: [
            "bg-white",
            "size-2",
            "data-[state=active]:w-5",
            "data-[state=active]:h-2",
            "data-[state=active]:bg-white"
          ],
          dots: "bottom-7",
          arrows: "absolute right-20 z-10",
          // Add padding to arrows container
          prev: "z-20",
          next: " z-20"
        }
      }, {
        default: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-transparent grid grid-cols-2 relative"${_scopeId}><div class="absolute top-30 right-95"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UTooltip, {
              "delay-duration": 0,
              content: { side: "bottom", sideOffset: 45, align: "start" },
              ui: {
                content: "ring-0 p-0"
              }
            }, {
              content: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center rounded-3xl bg-white p-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtImg, {
                    src: "/image 10.png",
                    class: "size-[81px] mr-3"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}><p class="font-bold text-[16px] mb-1"${_scopeId2}>Ghế sofa mini</p><p class="text-[16px]"${_scopeId2}> Giá: <span class="text-[#FF0000] font-semibold text-[13px]"${_scopeId2}>180.000 đ</span></p></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center rounded-3xl bg-white p-3" }, [
                      createVNode(_component_NuxtImg, {
                        src: "/image 10.png",
                        class: "size-[81px] mr-3"
                      }),
                      createVNode("div", null, [
                        createVNode("p", { class: "font-bold text-[16px] mb-1" }, "Ghế sofa mini"),
                        createVNode("p", { class: "text-[16px]" }, [
                          createTextVNode(" Giá: "),
                          createVNode("span", { class: "text-[#FF0000] font-semibold text-[13px]" }, "180.000 đ")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="relative inline-flex"${_scopeId2}><div class="absolute inset-0 size-[40px] rounded-full bg-white animate-ping opacity-75"${_scopeId2}></div><div class="relative size-[40px] rounded-full bg-white text-primary flex justify-center items-center text-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-plus",
                    class: "text-2xl"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "relative inline-flex" }, [
                      createVNode("div", { class: "absolute inset-0 size-[40px] rounded-full bg-white animate-ping opacity-75" }),
                      createVNode("div", { class: "relative size-[40px] rounded-full bg-white text-primary flex justify-center items-center text-center" }, [
                        createVNode(_component_UIcon, {
                          name: "i-lucide-plus",
                          class: "text-2xl"
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div><div class="pt-[65px]"${_scopeId}><div class="h-[33px] w-fit [clip-path:polygon(0_0,100%_0,calc(100%-16px)_50%,100%_100%,0_100%)] rounded-l-full uppercase bg-info font-bold flex items-center pl-4 pr-8.5 mb-5.5"${_scopeId}> CHÀO MỪNG ĐẾN VỚI MỘC HOME! </div><div class="text-[42px] font-bold text-white mb-4"${_scopeId}><p${_scopeId}>Nội thất <span class="text-info"${_scopeId}>hiện đại</span></p><p${_scopeId}>Nâng tầm không gian sống</p></div><p class="text-white leading-7 mb-[29px]"${_scopeId}> Thiết kế tinh tế, chất lượng bền bỉ, mang đến sự tiện nghi và phong cách cho ngôi nhà của bạn. </p><div class="flex items-center gap-4.5"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              size: "xl",
              variant: "solid",
              class: "relative bg-info rounded-md text-black overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit"
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"${_scopeId2}></span><span class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"${_scopeId2}><span${_scopeId2}>Mua ngay</span>`);
                  _push3(ssrRenderComponent(_component_UIcon, { name: "i-lucide-arrow-right" }, null, _parent3, _scopeId2));
                  _push3(`</span>`);
                } else {
                  return [
                    createVNode("span", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32" }),
                    createVNode("span", { class: "relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500" }, [
                      createVNode("span", null, "Mua ngay"),
                      createVNode(_component_UIcon, { name: "i-lucide-arrow-right" })
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              size: "xl",
              variant: "solid",
              class: "relative bg-white/20 text-white rounded-md overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit"
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"${_scopeId2}></span><span class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"${_scopeId2}><span${_scopeId2}>Mua ngay</span>`);
                  _push3(ssrRenderComponent(_component_UIcon, { name: "i-lucide-arrow-right" }, null, _parent3, _scopeId2));
                  _push3(`</span>`);
                } else {
                  return [
                    createVNode("span", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32" }),
                    createVNode("span", { class: "relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500" }, [
                      createVNode("span", null, "Mua ngay"),
                      createVNode(_component_UIcon, { name: "i-lucide-arrow-right" })
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="h-full pl-[164px]"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: "/image 10.png",
              alt: "blue arm chair",
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "bg-transparent grid grid-cols-2 relative" }, [
                createVNode("div", { class: "absolute top-30 right-95" }, [
                  createVNode(_component_UTooltip, {
                    "delay-duration": 0,
                    content: { side: "bottom", sideOffset: 45, align: "start" },
                    ui: {
                      content: "ring-0 p-0"
                    }
                  }, {
                    content: withCtx(() => [
                      createVNode("div", { class: "flex items-center rounded-3xl bg-white p-3" }, [
                        createVNode(_component_NuxtImg, {
                          src: "/image 10.png",
                          class: "size-[81px] mr-3"
                        }),
                        createVNode("div", null, [
                          createVNode("p", { class: "font-bold text-[16px] mb-1" }, "Ghế sofa mini"),
                          createVNode("p", { class: "text-[16px]" }, [
                            createTextVNode(" Giá: "),
                            createVNode("span", { class: "text-[#FF0000] font-semibold text-[13px]" }, "180.000 đ")
                          ])
                        ])
                      ])
                    ]),
                    default: withCtx(() => [
                      createVNode("div", { class: "relative inline-flex" }, [
                        createVNode("div", { class: "absolute inset-0 size-[40px] rounded-full bg-white animate-ping opacity-75" }),
                        createVNode("div", { class: "relative size-[40px] rounded-full bg-white text-primary flex justify-center items-center text-center" }, [
                          createVNode(_component_UIcon, {
                            name: "i-lucide-plus",
                            class: "text-2xl"
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "pt-[65px]" }, [
                  createVNode("div", { class: "h-[33px] w-fit [clip-path:polygon(0_0,100%_0,calc(100%-16px)_50%,100%_100%,0_100%)] rounded-l-full uppercase bg-info font-bold flex items-center pl-4 pr-8.5 mb-5.5" }, " CHÀO MỪNG ĐẾN VỚI MỘC HOME! "),
                  createVNode("div", { class: "text-[42px] font-bold text-white mb-4" }, [
                    createVNode("p", null, [
                      createTextVNode("Nội thất "),
                      createVNode("span", { class: "text-info" }, "hiện đại")
                    ]),
                    createVNode("p", null, "Nâng tầm không gian sống")
                  ]),
                  createVNode("p", { class: "text-white leading-7 mb-[29px]" }, " Thiết kế tinh tế, chất lượng bền bỉ, mang đến sự tiện nghi và phong cách cho ngôi nhà của bạn. "),
                  createVNode("div", { class: "flex items-center gap-4.5" }, [
                    createVNode(_component_UButton, {
                      size: "xl",
                      variant: "solid",
                      class: "relative bg-info rounded-md text-black overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32" }),
                        createVNode("span", { class: "relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500" }, [
                          createVNode("span", null, "Mua ngay"),
                          createVNode(_component_UIcon, { name: "i-lucide-arrow-right" })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UButton, {
                      size: "xl",
                      variant: "solid",
                      class: "relative bg-white/20 text-white rounded-md overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit"
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32" }),
                        createVNode("span", { class: "relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500" }, [
                          createVNode("span", null, "Mua ngay"),
                          createVNode(_component_UIcon, { name: "i-lucide-arrow-right" })
                        ])
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode("div", { class: "h-full pl-[164px]" }, [
                  createVNode(_component_NuxtImg, {
                    src: "/image 10.png",
                    alt: "blue arm chair",
                    class: "w-full"
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Home/Banner1.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$g, { __name: "ModulesHomeBanner1" });
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "Title",
  __ssrInlineRender: true,
  props: {
    title: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8$1;
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
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Home/Title.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$f, { __name: "ModulesHomeTitle" });
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "CateCard",
  __ssrInlineRender: true,
  props: {
    image: {},
    title: {},
    quantity: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-col items-center text-center w-[190px] h-[260px] border border-success rounded-4xl justify-center cursor-pointer hover:border-primary transition-colors duration-300 ease-out group"><div class="bg-success w-[165px] h-[165px] flex items-center justify-center rounded-full overflow-hidden">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: _ctx.image || "/image 17.png",
        class: "w-[70px] h-[70px] object-contain transition-transform duration-300 ease-out group-hover:scale-125",
        alt: _ctx.title || "Phòng ngủ"
      }, null, _parent));
      _push(`</div><p class="font-bold transition-colors duration-300 ease-out group-hover:text-primary">${ssrInterpolate(_ctx.title || "Phòng ngủ")}</p><p class="text-sm text-dimmed">${ssrInterpolate(_ctx.quantity || 30)} sản phẩm</p></div></div>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Home/CateCard.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$e, { __name: "ModulesHomeCateCard" });
const theme$2 = {
  "slots": {
    "base": "font-medium inline-flex items-center",
    "label": "truncate",
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailingIcon": "shrink-0"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": ""
    },
    "size": {
      "xs": {
        "base": "text-[8px]/3 px-1 py-0.5 gap-1 rounded-sm",
        "leadingIcon": "size-3",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-3"
      },
      "sm": {
        "base": "text-[10px]/3 px-1.5 py-1 gap-1 rounded-sm",
        "leadingIcon": "size-3",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-3"
      },
      "md": {
        "base": "text-xs px-2 py-1 gap-1 rounded-md",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "lg": {
        "base": "text-sm px-2 py-1 gap-1.5 rounded-md",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "text-base px-2.5 py-1 gap-1.5 rounded-md",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-6"
      }
    },
    "square": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": "bg-primary text-inverted"
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": "bg-secondary text-inverted"
    },
    {
      "color": "success",
      "variant": "solid",
      "class": "bg-success text-inverted"
    },
    {
      "color": "info",
      "variant": "solid",
      "class": "bg-info text-inverted"
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": "bg-warning text-inverted"
    },
    {
      "color": "error",
      "variant": "solid",
      "class": "bg-error text-inverted"
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": "text-primary ring ring-inset ring-primary/50"
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": "text-secondary ring ring-inset ring-secondary/50"
    },
    {
      "color": "success",
      "variant": "outline",
      "class": "text-success ring ring-inset ring-success/50"
    },
    {
      "color": "info",
      "variant": "outline",
      "class": "text-info ring ring-inset ring-info/50"
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": "text-warning ring ring-inset ring-warning/50"
    },
    {
      "color": "error",
      "variant": "outline",
      "class": "text-error ring ring-inset ring-error/50"
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": "bg-primary/10 text-primary"
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": "bg-secondary/10 text-secondary"
    },
    {
      "color": "success",
      "variant": "soft",
      "class": "bg-success/10 text-success"
    },
    {
      "color": "info",
      "variant": "soft",
      "class": "bg-info/10 text-info"
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": "bg-warning/10 text-warning"
    },
    {
      "color": "error",
      "variant": "soft",
      "class": "bg-error/10 text-error"
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": "bg-primary/10 text-primary ring ring-inset ring-primary/25"
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": "bg-secondary/10 text-secondary ring ring-inset ring-secondary/25"
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": "bg-success/10 text-success ring ring-inset ring-success/25"
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": "bg-info/10 text-info ring ring-inset ring-info/25"
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": "bg-warning/10 text-warning ring ring-inset ring-warning/25"
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": "bg-error/10 text-error ring ring-inset ring-error/25"
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": "text-inverted bg-inverted"
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": "ring ring-inset ring-accented text-default bg-default"
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": "text-default bg-elevated"
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": "ring ring-inset ring-accented text-default bg-elevated"
    },
    {
      "size": "xs",
      "square": true,
      "class": "p-0.5"
    },
    {
      "size": "sm",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "md",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "lg",
      "square": true,
      "class": "p-1"
    },
    {
      "size": "xl",
      "square": true,
      "class": "p-1"
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "solid",
    "size": "md"
  }
};
const _sfc_main$d = {
  __name: "UBadge",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "span" },
    label: { type: [String, Number], required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    square: { type: Boolean, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    icon: { type: [String, Object], required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: [String, Object], required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: [String, Object], required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const { orientation, size: fieldGroupSize } = useFieldGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const ui = computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.badge || {} })({
      color: props.color,
      variant: props.variant,
      size: fieldGroupSize.value || props.size,
      square: props.square || !slots.default && !props.label,
      fieldGroup: orientation.value
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        class: ui.value.base({ class: [props.ui?.base, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "leading", {}, () => {
              if (unref(isLeading) && unref(leadingIconName)) {
                _push2(ssrRenderComponent(_sfc_main$e$1, {
                  name: unref(leadingIconName),
                  class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                }, null, _parent2, _scopeId));
              } else if (!!__props.avatar) {
                _push2(ssrRenderComponent(_sfc_main$b$1, mergeProps({
                  size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                }, __props.avatar, {
                  class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar })
                }), null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              if (__props.label !== void 0 && __props.label !== null) {
                _push2(`<span class="${ssrRenderClass(ui.value.label({ class: props.ui?.label }))}"${_scopeId}>${ssrInterpolate(__props.label)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "trailing", {}, () => {
              if (unref(isTrailing) && unref(trailingIconName)) {
                _push2(ssrRenderComponent(_sfc_main$e$1, {
                  name: unref(trailingIconName),
                  class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "leading", {}, () => [
                unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$e$1, {
                  key: 0,
                  name: unref(leadingIconName),
                  class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$b$1, mergeProps({
                  key: 1,
                  size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                }, __props.avatar, {
                  class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar })
                }), null, 16, ["size", "class"])) : createCommentVNode("", true)
              ]),
              renderSlot(_ctx.$slots, "default", {}, () => [
                __props.label !== void 0 && __props.label !== null ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: ui.value.label({ class: props.ui?.label })
                }, toDisplayString(__props.label), 3)) : createCommentVNode("", true)
              ]),
              renderSlot(_ctx.$slots, "trailing", {}, () => [
                unref(isTrailing) && unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$e$1, {
                  key: 0,
                  name: unref(trailingIconName),
                  class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                }, null, 8, ["name", "class"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Badge.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    big: { type: Boolean },
    title: {},
    image: {},
    badge: {},
    stars: {},
    price: {},
    salePrice: {},
    badgeColor: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBadge = _sfc_main$d;
      const _component_UTooltip = _sfc_main$j;
      const _component_UIcon = _sfc_main$e$1;
      const _component_NuxtImg = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["h-[367px] p-5 relative group", _ctx.big ? "w-[419px]" : "w-[247px]"]
      }, _attrs))}><div class="absolute bg-accented w-full h-[235px] bottom-0 left-0 rounded-2xl transition-all duration-500 ease-out group-hover:h-full"></div>`);
      _push(ssrRenderComponent(_component_UBadge, {
        variant: "soft",
        class: "absolute text-white bg-red-500 font-bold top-4 right-6 z-20 w-20 h-6 flex justify-center text-center items-center rounded-4xl",
        label: _ctx.badge || "mới"
      }, null, _parent));
      _push(`<div class="absolute left-1/2 top-1/2 -translate-x-1/2 z-20 flex gap-2">`);
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
            _push2(`<div class="bg-primary size-10 flex justify-center items-center rounded-full cursor-pointer translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              class: "size-[19px] text-white",
              name: "i-heroicons-eye-solid"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "bg-primary size-10 flex justify-center items-center rounded-full cursor-pointer translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" }, [
                createVNode(_component_UIcon, {
                  class: "size-[19px] text-white",
                  name: "i-heroicons-eye-solid"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UTooltip, {
        "delay-duration": 0,
        text: "Thêm yêu thích",
        content: { side: "top", sideOffset: 1 },
        arrow: "",
        ui: {
          content: "bg-primary text-white text-[10px] font-semibold rounded-xl ring-primary shadow-none py-0",
          arrow: "fill-primary"
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-primary size-10 flex justify-center items-center rounded-full cursor-pointer translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              class: "size-[19px] text-white",
              name: "i-heroicons-heart"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "bg-primary size-10 flex justify-center items-center rounded-full cursor-pointer translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" }, [
                createVNode(_component_UIcon, {
                  class: "size-[19px] text-white",
                  name: "i-heroicons-heart"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UTooltip, {
        "delay-duration": 0,
        text: "Thêm giỏ hàng",
        content: { side: "top", sideOffset: 1 },
        arrow: "",
        ui: {
          content: "bg-primary text-white text-[10px] font-semibold rounded-xl ring-primary shadow-none py-0",
          arrow: "fill-primary"
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="absolute bg-primary size-10 flex justify-center items-center rounded-full cursor-pointer bottom-5 right-5 z-20"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              class: "size-[19px] text-white",
              name: "i-heroicons-shopping-bag-solid"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "absolute bg-primary size-10 flex justify-center items-center rounded-full cursor-pointer bottom-5 right-5 z-20" }, [
                createVNode(_component_UIcon, {
                  class: "size-[19px] text-white",
                  name: "i-heroicons-shopping-bag-solid"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="relative z-10"><div class="w-full h-[207px] mb-[13px] mx-auto flex justify-center items-center">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: _ctx.image || "/image 10.png",
        class: "w-full max-h-[207px] object-contain"
      }, null, _parent));
      _push(`</div><p class="font-semibold text-[17px] truncate">${ssrInterpolate(_ctx.title || "Ghế Denim đơn giản")}</p><div class="flex items-center gap-1 my-[9px]"><!--[-->`);
      ssrRenderList(5, (star) => {
        _push(`<!--[-->`);
        if (star <= Math.floor(_ctx.stars || 0)) {
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-star-solid",
            class: "size-4 text-yellow-400"
          }, null, _parent));
        } else if (star - 0.5 <= (_ctx.stars || 0)) {
          _push(`<div class="relative size-4">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-star",
            class: "size-4 text-yellow-400 absolute"
          }, null, _parent));
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-star-solid",
            class: "size-4 text-yellow-400 absolute",
            style: { "clip-path": "inset(0 50% 0 0)" }
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-star",
            class: "size-4 text-yellow-400"
          }, null, _parent));
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
      if (Number(_ctx.salePrice) === 0) {
        _push(`<div><p class="text-sm mb-1"> </p><p class="text-toned text-[19px] font-medium">${ssrInterpolate(_ctx.price || "190.000 ")} đ </p></div>`);
      } else {
        _push(`<div><p class="line-through text-muted text-sm mb-1">${ssrInterpolate(_ctx.price || "250.000 ")} đ  </p><p class="text-toned text-[19px] font-medium">${ssrInterpolate(_ctx.salePrice || "190.000 ")} đ </p></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/ProductCard.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$c, { __name: "SharedProductCard" });
const _sfc_main$b = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  const _component_NuxtImg = __nuxt_component_1$1;
  const _component_UButton = _sfc_main$8$1;
  const _component_UIcon = _sfc_main$e$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-[320px] relative mt-10 overflow-hidden rounded-2xl" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_NuxtImg, {
    class: "w-full h-full object-cover absolute z-0",
    src: "/banner 2.png"
  }, null, _parent));
  _push(`<div class="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white"><p class="text-2xl tracking-widest mb-5">Bộ sưu tập lớn</p><p class="text-3xl font-semibold mb-6">GIẢM GIÁ LỚN LÊN ĐẾN 40%</p><div class="flex flex-col items-center gap-1.5 mb-7"><div class="h-[1px] w-[169px] bg-white"></div><p class="text-lg">Chỉ có tại cửa hàng outlet của chúng tôi</p><div class="h-[1px] w-[169px] bg-white"></div></div>`);
  _push(ssrRenderComponent(_component_UButton, {
    size: "xl",
    variant: "solid",
    class: "relative bg-info text-black rounded-4xl overflow-hidden group transition-all duration-500 hover:rounded-md ease-out"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"${_scopeId}></span><span class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"${_scopeId}><span${_scopeId}>Mua Ngay</span>`);
        _push2(ssrRenderComponent(_component_UIcon, { name: "i-lucide-arrow-right" }, null, _parent2, _scopeId));
        _push2(`</span>`);
      } else {
        return [
          createVNode("span", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32" }),
          createVNode("span", { class: "relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500" }, [
            createVNode("span", null, "Mua Ngay"),
            createVNode(_component_UIcon, { name: "i-lucide-arrow-right" })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Home/Banner2.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$3]]), { __name: "ModulesHomeBanner2" });
const theme$1 = {
  "slots": {
    "root": "flex items-center gap-2",
    "list": "relative flex p-1 group",
    "indicator": "absolute transition-[translate,width] duration-200",
    "trigger": [
      "group relative inline-flex items-center min-w-0 data-[state=inactive]:text-muted hover:data-[state=inactive]:not-disabled:text-default font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "label": "truncate",
    "trailingBadge": "shrink-0",
    "trailingBadgeSize": "sm",
    "content": "focus:outline-none w-full"
  },
  "variants": {
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "pill": {
        "list": "bg-elevated rounded-lg",
        "trigger": "grow",
        "indicator": "rounded-md shadow-xs"
      },
      "link": {
        "list": "border-default",
        "indicator": "rounded-full",
        "trigger": "focus:outline-none"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "flex-col",
        "list": "w-full",
        "indicator": "left-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position)",
        "trigger": "justify-center"
      },
      "vertical": {
        "list": "flex-col",
        "indicator": "top-0 h-(--reka-tabs-indicator-size) translate-y-(--reka-tabs-indicator-position)"
      }
    },
    "size": {
      "xs": {
        "trigger": "px-2 py-1 text-xs gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "sm": {
        "trigger": "px-2.5 py-1.5 text-xs gap-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "md": {
        "trigger": "px-3 py-1.5 text-sm gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "lg": {
        "trigger": "px-3 py-2 text-sm gap-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "xl": {
        "trigger": "px-3 py-2 text-base gap-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "variant": "pill",
      "class": {
        "indicator": "inset-y-1"
      }
    },
    {
      "orientation": "horizontal",
      "variant": "link",
      "class": {
        "list": "border-b -mb-px",
        "indicator": "-bottom-px h-px"
      }
    },
    {
      "orientation": "vertical",
      "variant": "pill",
      "class": {
        "indicator": "inset-x-1",
        "list": "items-center"
      }
    },
    {
      "orientation": "vertical",
      "variant": "link",
      "class": {
        "list": "border-s -ms-px",
        "indicator": "-start-px w-px"
      }
    },
    {
      "color": "primary",
      "variant": "pill",
      "class": {
        "indicator": "bg-primary",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "pill",
      "class": {
        "indicator": "bg-secondary",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      }
    },
    {
      "color": "success",
      "variant": "pill",
      "class": {
        "indicator": "bg-success",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success"
      }
    },
    {
      "color": "info",
      "variant": "pill",
      "class": {
        "indicator": "bg-info",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info"
      }
    },
    {
      "color": "warning",
      "variant": "pill",
      "class": {
        "indicator": "bg-warning",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning"
      }
    },
    {
      "color": "error",
      "variant": "pill",
      "class": {
        "indicator": "bg-error",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
      }
    },
    {
      "color": "neutral",
      "variant": "pill",
      "class": {
        "indicator": "bg-inverted",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
      }
    },
    {
      "color": "primary",
      "variant": "link",
      "class": {
        "indicator": "bg-primary",
        "trigger": "data-[state=active]:text-primary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "link",
      "class": {
        "indicator": "bg-secondary",
        "trigger": "data-[state=active]:text-secondary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
      }
    },
    {
      "color": "success",
      "variant": "link",
      "class": {
        "indicator": "bg-success",
        "trigger": "data-[state=active]:text-success focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
      }
    },
    {
      "color": "info",
      "variant": "link",
      "class": {
        "indicator": "bg-info",
        "trigger": "data-[state=active]:text-info focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
      }
    },
    {
      "color": "warning",
      "variant": "link",
      "class": {
        "indicator": "bg-warning",
        "trigger": "data-[state=active]:text-warning focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
      }
    },
    {
      "color": "error",
      "variant": "link",
      "class": {
        "indicator": "bg-error",
        "trigger": "data-[state=active]:text-error focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
      }
    },
    {
      "color": "neutral",
      "variant": "link",
      "class": {
        "indicator": "bg-inverted",
        "trigger": "data-[state=active]:text-highlighted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "pill",
    "size": "md"
  }
};
const _sfc_main$a = {
  __name: "UTabs",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    items: { type: Array, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    content: { type: Boolean, required: false, default: true },
    labelKey: { type: null, required: false, default: "label" },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultValue: { type: null, required: false, default: "0" },
    modelValue: { type: null, required: false },
    activationMode: { type: String, required: false },
    unmountOnHide: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "unmountOnHide"), emits);
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.tabs || {} })({
      color: props.color,
      variant: props.variant,
      size: props.size,
      orientation: props.orientation
    }));
    const triggersRef = ref([]);
    __expose({
      triggersRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsRoot), mergeProps(unref(rootProps), {
        "model-value": __props.modelValue,
        "default-value": __props.defaultValue,
        orientation: __props.orientation,
        "activation-mode": __props.activationMode,
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TabsList), {
              class: ui.value.list({ class: props.ui?.list })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TabsIndicator), {
                    class: ui.value.indicator({ class: props.ui?.indicator })
                  }, null, _parent3, _scopeId2));
                  ssrRenderSlot(_ctx.$slots, "list-leading", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.items, (item, index) => {
                    _push3(ssrRenderComponent(unref(TabsTrigger), {
                      key: index,
                      ref_for: true,
                      ref: (el) => triggersRef.value[index] = el,
                      value: item.value ?? String(index),
                      disabled: item.disabled,
                      class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger] })
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, "leading", {
                            item,
                            index
                          }, () => {
                            if (item.icon) {
                              _push4(ssrRenderComponent(_sfc_main$e$1, {
                                name: item.icon,
                                class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })
                              }, null, _parent4, _scopeId3));
                            } else if (item.avatar) {
                              _push4(ssrRenderComponent(_sfc_main$b$1, mergeProps({
                                size: item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                              }, { ref_for: true }, item.avatar, {
                                class: ui.value.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })
                              }), null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                          if (unref(get)(item, props.labelKey) || !!slots.default) {
                            _push4(`<span class="${ssrRenderClass(ui.value.label({ class: [props.ui?.label, item.ui?.label] }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "default", {
                              item,
                              index
                            }, () => {
                              _push4(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
                            }, _push4, _parent4, _scopeId3);
                            _push4(`</span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          ssrRenderSlot(_ctx.$slots, "trailing", {
                            item,
                            index
                          }, () => {
                            if (item.badge !== void 0) {
                              _push4(ssrRenderComponent(_sfc_main$d, mergeProps({
                                color: "neutral",
                                variant: "outline",
                                size: item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                              }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                                class: ui.value.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })
                              }), null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "leading", {
                              item,
                              index
                            }, () => [
                              item.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                                key: 0,
                                name: item.icon,
                                class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })
                              }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$b$1, mergeProps({
                                key: 1,
                                size: item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                              }, { ref_for: true }, item.avatar, {
                                class: ui.value.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })
                              }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                            ]),
                            unref(get)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: ui.value.label({ class: [props.ui?.label, item.ui?.label] })
                            }, [
                              renderSlot(_ctx.$slots, "default", {
                                item,
                                index
                              }, () => [
                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                              ])
                            ], 2)) : createCommentVNode("", true),
                            renderSlot(_ctx.$slots, "trailing", {
                              item,
                              index
                            }, () => [
                              item.badge !== void 0 ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
                                key: 0,
                                color: "neutral",
                                variant: "outline",
                                size: item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                              }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                                class: ui.value.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })
                              }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                  ssrRenderSlot(_ctx.$slots, "list-trailing", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    createVNode(unref(TabsIndicator), {
                      class: ui.value.indicator({ class: props.ui?.indicator })
                    }, null, 8, ["class"]),
                    renderSlot(_ctx.$slots, "list-leading"),
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item, index) => {
                      return openBlock(), createBlock(unref(TabsTrigger), {
                        key: index,
                        ref_for: true,
                        ref: (el) => triggersRef.value[index] = el,
                        value: item.value ?? String(index),
                        disabled: item.disabled,
                        class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger] })
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "leading", {
                            item,
                            index
                          }, () => [
                            item.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                              key: 0,
                              name: item.icon,
                              class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })
                            }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$b$1, mergeProps({
                              key: 1,
                              size: item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                            }, { ref_for: true }, item.avatar, {
                              class: ui.value.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })
                            }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                          ]),
                          unref(get)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: ui.value.label({ class: [props.ui?.label, item.ui?.label] })
                          }, [
                            renderSlot(_ctx.$slots, "default", {
                              item,
                              index
                            }, () => [
                              createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                            ])
                          ], 2)) : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "trailing", {
                            item,
                            index
                          }, () => [
                            item.badge !== void 0 ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
                              key: 0,
                              color: "neutral",
                              variant: "outline",
                              size: item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                            }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                              class: ui.value.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })
                            }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["value", "disabled", "class"]);
                    }), 128)),
                    renderSlot(_ctx.$slots, "list-trailing")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            if (!!__props.content) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.items, (item, index) => {
                _push2(ssrRenderComponent(unref(TabsContent), {
                  key: index,
                  value: item.value ?? String(index),
                  class: ui.value.content({ class: [props.ui?.content, item.ui?.content, item.class] })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot(_ctx.$slots, item.slot || "content", {
                        item,
                        index
                      }, () => {
                        _push3(`${ssrInterpolate(item.content)}`);
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, item.slot || "content", {
                          item,
                          index
                        }, () => [
                          createTextVNode(toDisplayString(item.content), 1)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(TabsList), {
                class: ui.value.list({ class: props.ui?.list })
              }, {
                default: withCtx(() => [
                  createVNode(unref(TabsIndicator), {
                    class: ui.value.indicator({ class: props.ui?.indicator })
                  }, null, 8, ["class"]),
                  renderSlot(_ctx.$slots, "list-leading"),
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item, index) => {
                    return openBlock(), createBlock(unref(TabsTrigger), {
                      key: index,
                      ref_for: true,
                      ref: (el) => triggersRef.value[index] = el,
                      value: item.value ?? String(index),
                      disabled: item.disabled,
                      class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger] })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "leading", {
                          item,
                          index
                        }, () => [
                          item.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                            key: 0,
                            name: item.icon,
                            class: ui.value.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })
                          }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$b$1, mergeProps({
                            key: 1,
                            size: item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                          }, { ref_for: true }, item.avatar, {
                            class: ui.value.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })
                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                        ]),
                        unref(get)(item, props.labelKey) || !!slots.default ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: ui.value.label({ class: [props.ui?.label, item.ui?.label] })
                        }, [
                          renderSlot(_ctx.$slots, "default", {
                            item,
                            index
                          }, () => [
                            createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                          ])
                        ], 2)) : createCommentVNode("", true),
                        renderSlot(_ctx.$slots, "trailing", {
                          item,
                          index
                        }, () => [
                          item.badge !== void 0 ? (openBlock(), createBlock(_sfc_main$d, mergeProps({
                            key: 0,
                            color: "neutral",
                            variant: "outline",
                            size: item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || ui.value.trailingBadgeSize()
                          }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                            class: ui.value.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })
                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["value", "disabled", "class"]);
                  }), 128)),
                  renderSlot(_ctx.$slots, "list-trailing")
                ]),
                _: 3
              }, 8, ["class"]),
              !!__props.content ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(__props.items, (item, index) => {
                return openBlock(), createBlock(unref(TabsContent), {
                  key: index,
                  value: item.value ?? String(index),
                  class: ui.value.content({ class: [props.ui?.content, item.ui?.content, item.class] })
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, item.slot || "content", {
                      item,
                      index
                    }, () => [
                      createTextVNode(toDisplayString(item.content), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["value", "class"]);
              }), 128)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Tabs.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "PopularProducts",
  __ssrInlineRender: true,
  props: {
    products: {}
  },
  setup(__props) {
    const props = __props;
    const activeTab = ref("Tất cả");
    const items = [
      { label: "Tất cả", value: "Tất cả" },
      { label: "Phòng ngủ", value: "Phòng ngủ" },
      { label: "Trang trí", value: "Trang trí" },
      { label: "Phòng khách", value: "Phòng khách" }
    ];
    const filteredProducts = computed(() => {
      if (activeTab.value === "Tất cả") return props.products;
      const categoryMap = {
        "Phòng ngủ": [2],
        // example IDs — match your tblcategories
        "Trang trí": [5],
        "Phòng khách": [4, 11]
      };
      const targetIds = categoryMap[activeTab.value] || [];
      return props.products.filter((p) => targetIds.includes(p.category_id));
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UTabs = _sfc_main$a;
      const _component_SharedProductCard = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-between mb-[25px] relative"><div><p class="text-primary font-semibold text-[26px]">Sản phẩm phổ biến</p><div class="absolute w-10.5 h-0.5 bg-secondary bottom-0"></div></div>`);
      _push(ssrRenderComponent(_component_UTabs, {
        modelValue: unref(activeTab),
        "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null,
        items,
        content: false,
        variant: "link",
        ui: {
          trigger: "text-black font-semibold text-lg data-[state=active]:text-primary data-[state=inactive]:text-black p-0 mr-8",
          label: "hover:text-primary",
          indicator: "h-[1px] rounded-none bottom-0",
          list: "!border-0"
        }
      }, null, _parent));
      _push(`</div>`);
      if (!_ctx.products || !_ctx.products.length) {
        _push(`<div class="text-center py-10"> Không có sản phẩm nào. </div>`);
      } else {
        _push(`<div class="mt-4 grid grid-cols-5 gap-6 items-start"><!--[-->`);
        ssrRenderList(unref(filteredProducts).slice(0, 5), (product) => {
          _push(ssrRenderComponent(_component_SharedProductCard, {
            key: product.product_id,
            title: product.product_name,
            image: product.thumbnail,
            price: Number(product.price).toLocaleString("vi-VN"),
            salePrice: Number(product.price_down).toLocaleString("vi-VN"),
            stars: product.rating,
            badge: "Hot"
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Home/PopularProducts.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_7 = Object.assign(_sfc_main$9, { __name: "ModulesHomePopularProducts" });
const _imports_0$1 = publicAssetsURL("/Banner 3.png");
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Banner3",
  __ssrInlineRender: true,
  setup(__props) {
    const items = [
      { title: "Slide 1", description: "First slide content" },
      { title: "Slide 2", description: "Second slide content" },
      { title: "Slide 3", description: "Third slide content" }
    ];
    ref(new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3));
    const days = ref(0);
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCarousel = _sfc_main$h;
      const _component_UButton = _sfc_main$8$1;
      const _component_UIcon = _sfc_main$e$1;
      const _component_NuxtImg = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-[537px]" }, _attrs))}><img${ssrRenderAttr("src", _imports_0$1)} class="w-full" alt="Banner 3"><div class="absolute inset-0 flex justify-center top-[51px]">`);
      _push(ssrRenderComponent(_component_UCarousel, {
        items,
        dots: "",
        autoplay: { delay: 2e3 },
        ui: {
          dot: [
            "bg-transparent",
            "data-[state=active]:bg-secondary",
            "border-[2px]",
            "border-secondary"
          ],
          dots: "bottom-7"
        }
      }, {
        default: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-transparent mx-[109px] grid grid-cols-2 gap-25.5 relative"${_scopeId}><div class="absolute size-[115px] rounded-full bg-[#f05454] right-[450px] text-white font-bold flex justify-center items-center text-center"${_scopeId}><div${_scopeId}><p class="text-xl"${_scopeId}>Giảm</p><p class="text-4xl"${_scopeId}>45%</p></div></div><div class="min-w-[525px]"${_scopeId}><p class="text-lg font-bold text-toned uppercase mb-3.5"${_scopeId}> ƯU ĐÃI TUẦN NÀY </p><p class="font-bold text-[35px] text-black mb-3"${_scopeId}> Ưu đãi đồ nội thất sofa tốt nhất </p><p class="font-medium text-[#808080] leading-7.5 mb-6.5"${_scopeId}> Có nhiều biến thể của đoạn văn nhưng phần lớn đã bị thay đổi ở một hình thức nào đó bằng cách thêm yếu tố hài hước hoặc sử dụng các từ ngẫu nhiên trông không đáng tin chút nào. </p><div class="flex items-center gap-[15px] mb-8"${_scopeId}><div class="w-30 h-25 rounded-2xl bg-white font-bold flex justify-center items-center text-center"${_scopeId}><div${_scopeId}><p class="text-toned text-5xl"${_scopeId}>${ssrInterpolate(unref(days))}</p><p class="uppercase"${_scopeId}>ngày</p></div></div><div class="w-30 h-25 rounded-2xl bg-white text-black font-bold flex justify-center items-center text-center"${_scopeId}><div${_scopeId}><p class="text-toned text-5xl"${_scopeId}>${ssrInterpolate(unref(hours))}</p><p class="uppercase"${_scopeId}>giờ</p></div></div><div class="w-30 h-25 rounded-2xl bg-white font-bold flex justify-center items-center text-center"${_scopeId}><div${_scopeId}><p class="text-toned text-5xl"${_scopeId}>${ssrInterpolate(unref(minutes))}</p><p class="uppercase"${_scopeId}>PHÚT</p></div></div><div class="w-30 h-25 rounded-2xl bg-white font-bold flex justify-center items-center text-center"${_scopeId}><div${_scopeId}><p class="text-toned text-5xl"${_scopeId}>${ssrInterpolate(unref(seconds))}</p><p class="uppercase"${_scopeId}>GIÂY</p></div></div></div>`);
            _push2(ssrRenderComponent(_component_UButton, {
              size: "xl",
              variant: "solid",
              class: "relative bg-secondary text-white rounded-md overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit"
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"${_scopeId2}></span><span class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"${_scopeId2}><span${_scopeId2}>Mua ngay</span>`);
                  _push3(ssrRenderComponent(_component_UIcon, { name: "i-lucide-arrow-right" }, null, _parent3, _scopeId2));
                  _push3(`</span>`);
                } else {
                  return [
                    createVNode("span", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32" }),
                    createVNode("span", { class: "relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500" }, [
                      createVNode("span", null, "Mua ngay"),
                      createVNode(_component_UIcon, { name: "i-lucide-arrow-right" })
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center h-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: "/image 28.png",
              alt: "blue arm chair",
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "bg-transparent mx-[109px] grid grid-cols-2 gap-25.5 relative" }, [
                createVNode("div", { class: "absolute size-[115px] rounded-full bg-[#f05454] right-[450px] text-white font-bold flex justify-center items-center text-center" }, [
                  createVNode("div", null, [
                    createVNode("p", { class: "text-xl" }, "Giảm"),
                    createVNode("p", { class: "text-4xl" }, "45%")
                  ])
                ]),
                createVNode("div", { class: "min-w-[525px]" }, [
                  createVNode("p", { class: "text-lg font-bold text-toned uppercase mb-3.5" }, " ƯU ĐÃI TUẦN NÀY "),
                  createVNode("p", { class: "font-bold text-[35px] text-black mb-3" }, " Ưu đãi đồ nội thất sofa tốt nhất "),
                  createVNode("p", { class: "font-medium text-[#808080] leading-7.5 mb-6.5" }, " Có nhiều biến thể của đoạn văn nhưng phần lớn đã bị thay đổi ở một hình thức nào đó bằng cách thêm yếu tố hài hước hoặc sử dụng các từ ngẫu nhiên trông không đáng tin chút nào. "),
                  createVNode("div", { class: "flex items-center gap-[15px] mb-8" }, [
                    createVNode("div", { class: "w-30 h-25 rounded-2xl bg-white font-bold flex justify-center items-center text-center" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-toned text-5xl" }, toDisplayString(unref(days)), 1),
                        createVNode("p", { class: "uppercase" }, "ngày")
                      ])
                    ]),
                    createVNode("div", { class: "w-30 h-25 rounded-2xl bg-white text-black font-bold flex justify-center items-center text-center" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-toned text-5xl" }, toDisplayString(unref(hours)), 1),
                        createVNode("p", { class: "uppercase" }, "giờ")
                      ])
                    ]),
                    createVNode("div", { class: "w-30 h-25 rounded-2xl bg-white font-bold flex justify-center items-center text-center" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-toned text-5xl" }, toDisplayString(unref(minutes)), 1),
                        createVNode("p", { class: "uppercase" }, "PHÚT")
                      ])
                    ]),
                    createVNode("div", { class: "w-30 h-25 rounded-2xl bg-white font-bold flex justify-center items-center text-center" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-toned text-5xl" }, toDisplayString(unref(seconds)), 1),
                        createVNode("p", { class: "uppercase" }, "GIÂY")
                      ])
                    ])
                  ]),
                  createVNode(_component_UButton, {
                    size: "xl",
                    variant: "solid",
                    class: "relative bg-secondary text-white rounded-md overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32" }),
                      createVNode("span", { class: "relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500" }, [
                        createVNode("span", null, "Mua ngay"),
                        createVNode(_component_UIcon, { name: "i-lucide-arrow-right" })
                      ])
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "flex items-center h-full" }, [
                  createVNode(_component_NuxtImg, {
                    src: "/image 28.png",
                    alt: "blue arm chair",
                    class: "w-full"
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Home/Banner3.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_11 = Object.assign(_sfc_main$8, { __name: "ModulesHomeBanner3" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "SmallProductCard",
  __ssrInlineRender: true,
  props: {
    title: {},
    image: {},
    badge: {},
    stars: {},
    price: {},
    salePrice: {},
    badgeColor: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UTooltip = _sfc_main$j;
      const _component_UIcon = _sfc_main$e$1;
      const _component_NuxtImg = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-[140px] w-[410px] p-[11px] relative group flex items-center bg-accented rounded-2xl" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UTooltip, {
        "delay-duration": 0,
        text: "Thêm giỏ hàng",
        content: { side: "top", sideOffset: 1 },
        arrow: "",
        ui: {
          content: "bg-primary text-white text-[10px] font-semibold rounded-xl ring-primary shadow-none py-0",
          arrow: "fill-primary"
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="absolute bg-primary size-10 flex justify-center items-center rounded-full cursor-pointer -bottom-0.5 -right-0.5 border-4 border-white z-30"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              class: "size-[19px] text-white",
              name: "i-heroicons-shopping-bag-solid"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "absolute bg-primary size-10 flex justify-center items-center rounded-full cursor-pointer -bottom-0.5 -right-0.5 border-4 border-white z-30" }, [
                createVNode(_component_UIcon, {
                  class: "size-[19px] text-white",
                  name: "i-heroicons-shopping-bag-solid"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="size-30 p-2.5 bg-white rounded-2xl z-10 mr-3.5 overflow-hidden">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: _ctx.image || "/image 10.png",
        class: "w-full max-h-[207px] object-contain mb-[13px] mx-auto transition-transform duration-300 group-hover:scale-110"
      }, null, _parent));
      _push(`</div><div><p class="font-semibold text-lg">${ssrInterpolate(_ctx.title || "Ghế Denim đơn giản")}</p><div class="flex items-center gap-1 my-[9px]"><!--[-->`);
      ssrRenderList(5, (star) => {
        _push(`<!--[-->`);
        if (star <= Math.floor(_ctx.stars || 0)) {
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-star-solid",
            class: "size-4 text-yellow-400"
          }, null, _parent));
        } else if (star - 0.5 <= (_ctx.stars || 0)) {
          _push(`<div class="relative size-4">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-star",
            class: "size-4 text-yellow-400 absolute"
          }, null, _parent));
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-star-solid",
            class: "size-4 text-yellow-400 absolute",
            style: { "clip-path": "inset(0 50% 0 0)" }
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-star",
            class: "size-4 text-yellow-400"
          }, null, _parent));
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div><div class="flex items-center font-semibold text-[15px]">`);
      if (Number(_ctx.salePrice) === 0) {
        _push(`<div><p class="mr-3"> </p><p class="text-toned">${ssrInterpolate(_ctx.price || "190.000 ")} đ</p></div>`);
      } else {
        _push(`<div><p class="line-through text-[#afafaf] mr-3">${ssrInterpolate(_ctx.price || "250.000 ")} đ </p><p class="text-toned">${ssrInterpolate(_ctx.salePrice || "190.000 ")} đ</p></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Home/SmallProductCard.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_12 = Object.assign(_sfc_main$7, { __name: "ModulesHomeSmallProductCard" });
const _sfc_main$6 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_NuxtImg = __nuxt_component_1$1;
  const _component_UButton = _sfc_main$8$1;
  const _component_UIcon = _sfc_main$e$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-[306px] relative mt-10 flex justify-center items-end" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_NuxtImg, {
    class: "w-full h-full object-cover absolute z-0",
    src: "/banner 4.png"
  }, null, _parent));
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Home/Banner4.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_13 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$2]]), { __name: "ModulesHomeBanner4" });
const _imports_0 = publicAssetsURL("/Banner 5.png");
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Banner5",
  __ssrInlineRender: true,
  setup(__props) {
    const items = [
      { id: 1, title: "Card 1", content: "..." },
      { id: 2, title: "Card 2", content: "..." },
      { id: 3, title: "Card 3", content: "..." },
      { id: 4, title: "Card 4", content: "..." },
      { id: 5, title: "Card 5", content: "..." },
      { id: 6, title: "Card 6", content: "..." }
    ];
    const stars = ref(5);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCarousel = _sfc_main$h;
      const _component_UAvatar = _sfc_main$b$1;
      const _component_UIcon = _sfc_main$e$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-[555px]" }, _attrs))}><img${ssrRenderAttr("src", _imports_0)} class="w-full" alt="Banner 3"><div class="absolute top-10.5 left-1/2 -translate-x-1/2 text-center"><p class="font-bold text-primary leading-7 uppercase tracking-widest"> LỜI CHỨNG THỰC </p><p class="font-medium text-[32px]"> Những gì khách hàng của chúng tôi <span class="text-info">nói</span></p></div><div class="absolute inset-0 flex justify-center top-[159px]">`);
      _push(ssrRenderComponent(_component_UCarousel, {
        items,
        dots: "",
        "slides-to-scroll": 2,
        autoplay: { delay: 2e3 },
        ui: {
          viewport: "mx-18.5",
          dot: [
            "bg-primary",
            "size-2",
            "data-[state=active]:w-5",
            "data-[state=active]:h-2",
            "data-[state=active]:bg-primary"
          ],
          dots: "bottom-9",
          container: "gap-7.5",
          // Add gap between items
          item: "basis-[calc(25%-30px)]"
          // Adjust basis to account for gap
        }
      }, {
        default: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full h-[330px] bg-white rounded-lg p-7.5"${_scopeId}><div class="flex items-center mb-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UAvatar, {
              src: "/avatar.png",
              class: "size-[65px] mr-3"
            }, null, _parent2, _scopeId));
            _push2(`<div class="font-bold"${_scopeId}><p${_scopeId}>Lê Phùng Tiến Quân</p><p class="text-secondary text-[13px]"${_scopeId}>Khách hàng</p></div></div><p class="text-[13px] font-medium text-muted mb-5"${_scopeId}> Nội thất ở đây vừa đẹp vừa chắc chắn, thiết kế tinh tế đúng như mô tả. Giá cả hợp lý, giao hàng nhanh và đóng gói cẩn thận, rất đáng để tin tưởng và lựa chọn lâu dài. </p><div class="flex items-center gap-1"${_scopeId}><!--[-->`);
            ssrRenderList(5, (star) => {
              _push2(`<!--[-->`);
              if (star <= Math.floor(unref(stars) || 0)) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-star-solid",
                  class: "size-4 text-yellow-400"
                }, null, _parent2, _scopeId));
              } else if (star - 0.5 <= (unref(stars) || 0)) {
                _push2(`<div class="relative size-4"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-star",
                  class: "size-4 text-yellow-400 absolute"
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-star-solid",
                  class: "size-4 text-yellow-400 absolute",
                  style: { "clip-path": "inset(0 50% 0 0)" }
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-star",
                  class: "size-4 text-yellow-400"
                }, null, _parent2, _scopeId));
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full h-[330px] bg-white rounded-lg p-7.5" }, [
                createVNode("div", { class: "flex items-center mb-8" }, [
                  createVNode(_component_UAvatar, {
                    src: "/avatar.png",
                    class: "size-[65px] mr-3"
                  }),
                  createVNode("div", { class: "font-bold" }, [
                    createVNode("p", null, "Lê Phùng Tiến Quân"),
                    createVNode("p", { class: "text-secondary text-[13px]" }, "Khách hàng")
                  ])
                ]),
                createVNode("p", { class: "text-[13px] font-medium text-muted mb-5" }, " Nội thất ở đây vừa đẹp vừa chắc chắn, thiết kế tinh tế đúng như mô tả. Giá cả hợp lý, giao hàng nhanh và đóng gói cẩn thận, rất đáng để tin tưởng và lựa chọn lâu dài. "),
                createVNode("div", { class: "flex items-center gap-1" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(5, (star) => {
                    return openBlock(), createBlock(Fragment, { key: star }, [
                      star <= Math.floor(unref(stars) || 0) ? (openBlock(), createBlock(_component_UIcon, {
                        key: 0,
                        name: "i-heroicons-star-solid",
                        class: "size-4 text-yellow-400"
                      })) : star - 0.5 <= (unref(stars) || 0) ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "relative size-4"
                      }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-star",
                          class: "size-4 text-yellow-400 absolute"
                        }),
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-star-solid",
                          class: "size-4 text-yellow-400 absolute",
                          style: { "clip-path": "inset(0 50% 0 0)" }
                        })
                      ])) : (openBlock(), createBlock(_component_UIcon, {
                        key: 2,
                        name: "i-heroicons-star",
                        class: "size-4 text-yellow-400"
                      }))
                    ], 64);
                  }), 64))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Home/Banner5.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_15 = Object.assign(_sfc_main$5, { __name: "ModulesHomeBanner5" });
const _sfc_main$4 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_SharedBlogCard = __nuxt_component_1$2;
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="text-center mb-11.5"><p class="font-bold text-primary leading-7 uppercase tracking-widest"> BLOG CỦA CHÚNG TÔI </p><p class="font-medium text-[32px]"> Tin tức &amp; <span class="text-info">Blog</span> mới nhất của chúng tôi </p></div><div class="flex justify-between items-center"><!--[-->`);
  ssrRenderList(3, (blog) => {
    _push(ssrRenderComponent(_component_SharedBlogCard, null, null, _parent));
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Home/Blog.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_16 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$1]]), { __name: "ModulesHomeBlog" });
const theme = {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-md border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main$3 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UInput",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    type: { type: null, required: false, default: "text" },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    autocomplete: { type: null, required: false, default: "off" },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    disabled: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    modelValue: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelModifiers: { type: Object, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    icon: { type: [String, Object], required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: [String, Object], required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: [String, Object], required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: [String, Object], required: false }
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const modelValue = useVModel(props, "modelValue", emits, { defaultValue: props.defaultValue });
    const appConfig = useAppConfig();
    const { emitFormBlur, emitFormInput, emitFormChange, size: formGroupSize, color, id, name, highlight, disabled, emitFormFocus, ariaAttrs } = useFormField(props, {});
    const { orientation, size: fieldGroupSize } = useFieldGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const inputSize = computed(() => fieldGroupSize.value || formGroupSize.value);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.input || {} })({
      type: props.type,
      color: color.value,
      variant: props.variant,
      size: inputSize?.value,
      loading: props.loading,
      highlight: highlight.value,
      leading: isLeading.value || !!props.avatar || !!slots.leading,
      trailing: isTrailing.value || !!slots.trailing,
      fieldGroup: orientation.value
    }));
    const inputRef = ref(null);
    function updateInput(value) {
      if (props.modelModifiers?.trim) {
        value = value?.trim() ?? null;
      }
      if (props.modelModifiers?.number || props.type === "number") {
        value = looseToNumber(value);
      }
      if (props.modelModifiers?.nullable) {
        value ||= null;
      }
      if (props.modelModifiers?.optional) {
        value ||= void 0;
      }
      modelValue.value = value;
      emitFormInput();
    }
    function onInput(event) {
      if (!props.modelModifiers?.lazy) {
        updateInput(event.target.value);
      }
    }
    function onChange(event) {
      const value = event.target.value;
      if (props.modelModifiers?.lazy) {
        updateInput(value);
      }
      if (props.modelModifiers?.trim) {
        event.target.value = value.trim();
      }
      emitFormChange();
      emits("change", event);
    }
    function onBlur(event) {
      emitFormBlur();
      emits("blur", event);
    }
    __expose({
      inputRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttrs(mergeProps({
              id: unref(id),
              ref_key: "inputRef",
              ref: inputRef,
              type: __props.type,
              value: unref(modelValue),
              name: unref(name),
              placeholder: __props.placeholder,
              class: ui.value.base({ class: props.ui?.base }),
              disabled: unref(disabled),
              required: __props.required,
              autocomplete: __props.autocomplete
            }, { ..._ctx.$attrs, ...unref(ariaAttrs) }))}${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            if (unref(isLeading) || !!__props.avatar || !!slots.leading) {
              _push2(`<span class="${ssrRenderClass(ui.value.leading({ class: props.ui?.leading }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "leading", {}, () => {
                if (unref(isLeading) && unref(leadingIconName)) {
                  _push2(ssrRenderComponent(_sfc_main$e$1, {
                    name: unref(leadingIconName),
                    class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                  }, null, _parent2, _scopeId));
                } else if (!!__props.avatar) {
                  _push2(ssrRenderComponent(_sfc_main$b$1, mergeProps({
                    size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                  }, __props.avatar, {
                    class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar })
                  }), null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(isTrailing) || !!slots.trailing) {
              _push2(`<span class="${ssrRenderClass(ui.value.trailing({ class: props.ui?.trailing }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "trailing", {}, () => {
                if (unref(trailingIconName)) {
                  _push2(ssrRenderComponent(_sfc_main$e$1, {
                    name: unref(trailingIconName),
                    class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("input", mergeProps({
                id: unref(id),
                ref_key: "inputRef",
                ref: inputRef,
                type: __props.type,
                value: unref(modelValue),
                name: unref(name),
                placeholder: __props.placeholder,
                class: ui.value.base({ class: props.ui?.base }),
                disabled: unref(disabled),
                required: __props.required,
                autocomplete: __props.autocomplete
              }, { ..._ctx.$attrs, ...unref(ariaAttrs) }, {
                onInput,
                onBlur,
                onChange,
                onFocus: unref(emitFormFocus)
              }), null, 16, ["id", "type", "value", "name", "placeholder", "disabled", "required", "autocomplete", "onFocus"]),
              renderSlot(_ctx.$slots, "default"),
              unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                key: 0,
                class: ui.value.leading({ class: props.ui?.leading })
              }, [
                renderSlot(_ctx.$slots, "leading", {}, () => [
                  unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$e$1, {
                    key: 0,
                    name: unref(leadingIconName),
                    class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                  }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$b$1, mergeProps({
                    key: 1,
                    size: props.ui?.leadingAvatarSize || ui.value.leadingAvatarSize()
                  }, __props.avatar, {
                    class: ui.value.leadingAvatar({ class: props.ui?.leadingAvatar })
                  }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                ])
              ], 2)) : createCommentVNode("", true),
              unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                key: 1,
                class: ui.value.trailing({ class: props.ui?.trailing })
              }, [
                renderSlot(_ctx.$slots, "trailing", {}, () => [
                  unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$e$1, {
                    key: 0,
                    name: unref(trailingIconName),
                    class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                  }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                ])
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Input.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtImg = __nuxt_component_1$1;
  const _component_UInput = _sfc_main$3;
  const _component_UButton = _sfc_main$8$1;
  const _component_UIcon = _sfc_main$e$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-[305px] relative mt-10 overflow-hidden rounded-2xl" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_NuxtImg, {
    class: "w-full h-full object-cover absolute z-0",
    src: "/banner 6.png"
  }, null, _parent));
  _push(`<div class="absolute inset-0 bg-black/40"></div><div class="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white"><p class="text-2xl text-white mb-[13px] uppercase"> NHẬN PHIẾU GIẢM GIÁ LÊN ĐẾN <span class="text-info">20%</span></p><p class="text-[15px] text-white font-medium mb-[27px]"> Theo dõi để nhận bảng tin mới nhất </p>`);
  _push(ssrRenderComponent(_component_UInput, {
    placeholder: "Email của bạn",
    class: "w-[630px]",
    ui: { trailing: "pe-1", base: "h-[62px] rounded-full pl-[33px]" }
  }, {
    trailing: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_UButton, {
          size: "xl",
          variant: "solid",
          class: "relative bg-info text-black rounded-full overflow-hidden group transition-all duration-500 ease-out py-[14px] px-[26px]"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"${_scopeId2}></span><span class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"${_scopeId2}><span${_scopeId2}>Theo dõi</span>`);
              _push3(ssrRenderComponent(_component_UIcon, { name: "i-lucide-send" }, null, _parent3, _scopeId2));
              _push3(`</span>`);
            } else {
              return [
                createVNode("span", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32" }),
                createVNode("span", { class: "relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500" }, [
                  createVNode("span", null, "Theo dõi"),
                  createVNode(_component_UIcon, { name: "i-lucide-send" })
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_UButton, {
            size: "xl",
            variant: "solid",
            class: "relative bg-info text-black rounded-full overflow-hidden group transition-all duration-500 ease-out py-[14px] px-[26px]"
          }, {
            default: withCtx(() => [
              createVNode("span", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32" }),
              createVNode("span", { class: "relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500" }, [
                createVNode("span", null, "Theo dõi"),
                createVNode(_component_UIcon, { name: "i-lucide-send" })
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Home/Banner6.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_17 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]), { __name: "ModulesHomeBanner6" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FacebookImages",
  __ssrInlineRender: true,
  setup(__props) {
    const items = [
      "https://picsum.photos/468/468?random=1",
      "https://picsum.photos/468/468?random=2",
      "https://picsum.photos/468/468?random=3",
      "https://picsum.photos/468/468?random=4",
      "https://picsum.photos/468/468?random=5",
      "https://picsum.photos/468/468?random=6",
      "https://picsum.photos/468/468?random=1",
      "https://picsum.photos/468/468?random=2",
      "https://picsum.photos/468/468?random=3",
      "https://picsum.photos/468/468?random=4",
      "https://picsum.photos/468/468?random=5",
      "https://picsum.photos/468/468?random=6"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCarousel = _sfc_main$h;
      const _component_NuxtImg = __nuxt_component_1$1;
      const _component_UIcon = _sfc_main$e$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><p class="font-semibold text-[30px] mb-[29px] text-center"> Facebook <span class="text-primary">@MộcHome</span></p>`);
      _push(ssrRenderComponent(_component_UCarousel, {
        items,
        "slides-to-scroll": 1,
        autoplay: { delay: 2e3 },
        ui: {
          container: "gap-[10px]",
          item: "basis-[calc(20%-10px)]"
        }
      }, {
        default: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="size-[250px] rounded-xl overflow-hidden relative group"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: "/blog 1.png",
              class: "w-full h-full object-cover relative z-0"
            }, null, _parent2, _scopeId));
            _push2(`<div class="absolute inset-0 -translate-x-full bg-black/25 group-hover:translate-x-0 transition-transform duration-500 z-10"${_scopeId}></div><div class="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"${_scopeId}><div class="size-[40px] rounded-full bg-primary text-primary overflow-hidden relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-uil-facebook-f",
              class: "size-10 text-white absolute -bottom-1 left-0.5"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "size-[250px] rounded-xl overflow-hidden relative group" }, [
                createVNode(_component_NuxtImg, {
                  src: "/blog 1.png",
                  class: "w-full h-full object-cover relative z-0"
                }),
                createVNode("div", { class: "absolute inset-0 -translate-x-full bg-black/25 group-hover:translate-x-0 transition-transform duration-500 z-10" }),
                createVNode("div", { class: "absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" }, [
                  createVNode("div", { class: "size-[40px] rounded-full bg-primary text-primary overflow-hidden relative" }, [
                    createVNode(_component_UIcon, {
                      name: "i-uil-facebook-f",
                      class: "size-10 text-white absolute -bottom-1 left-0.5"
                    })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/Home/FacebookImages.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_18 = Object.assign(_sfc_main$1, { __name: "ModulesHomeFacebookImages" });
const _imports_8 = publicAssetsURL("/image 21.png");
const _imports_9 = publicAssetsURL("/image 22.png");
const _imports_10 = publicAssetsURL("/image 23.png");
const _imports_11 = publicAssetsURL("/image 25.png");
const _imports_12 = publicAssetsURL("/Group 90.png");
const _imports_13 = publicAssetsURL("/Rectangle 42.png");
const _imports_14 = publicAssetsURL("/Rectangle 44.png");
const _imports_15 = publicAssetsURL("/Rectangle 43.png");
function useRooms() {
  const rooms = ref([]);
  const isLoading = ref(true);
  const error = ref(null);
  const fetchRooms = async (page = 1) => {
    isLoading.value = true;
    error.value = null;
    try {
      const { data, error: fetchError } = await useCustomFetch(
        "/api/client/rooms",
        { method: "GET" }
      );
      if (fetchError.value) {
        console.error("Fetch error:", fetchError.value);
        if (fetchError.value.statusCode === 404) {
          rooms.value = [];
          error.value = null;
        } else {
          error.value = fetchError.value;
        }
        return;
      }
      if (data.value) {
        const response = data.value;
        rooms.value = response?.result.data || [];
        error.value = null;
      }
    } catch (err) {
      console.error("Error fetching rooms:", err);
      if (err?.statusCode === 404) {
        rooms.value = [];
        error.value = null;
      } else {
        error.value = err;
      }
    } finally {
      isLoading.value = false;
    }
  };
  fetchRooms();
  return {
    rooms,
    isLoading,
    error,
    fetchRooms
  };
}
function useProducts() {
  const products = ref([]);
  const pagination = ref(null);
  const isLoading = ref(true);
  const error = ref(null);
  const fetchProducts = async (page = 1) => {
    isLoading.value = true;
    error.value = null;
    try {
      const { data, error: fetchError } = await useCustomFetch(`/client/products`, {
        method: "GET"
      });
      if (fetchError.value) {
        console.error("Fetch error:", fetchError.value);
        if (fetchError.value.statusCode === 404) {
          products.value = [];
          error.value = null;
        } else {
          error.value = fetchError.value;
        }
        return;
      }
      if (data.value) {
        const response = data.value;
        products.value = response?.result?.data || [];
        pagination.value = response?.result?.pagination || null;
        error.value = null;
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      if (err?.statusCode === 404) {
        products.value = [];
        error.value = null;
      } else {
        error.value = err;
      }
    } finally {
      isLoading.value = false;
    }
  };
  fetchProducts();
  return {
    products,
    pagination,
    isLoading,
    error,
    fetchProducts
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { rooms } = useRooms();
    const {
      products,
      isLoading: isLoadingProducts
    } = useProducts();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$i;
      const _component_ModulesHomeBanner1 = __nuxt_component_1;
      const _component_ModulesHomeTitle = __nuxt_component_2;
      const _component_ModulesHomeCateCard = __nuxt_component_3;
      const _component_SharedProductCard = __nuxt_component_4;
      const _component_ModulesHomeBanner2 = __nuxt_component_5;
      const _component_UBadge = _sfc_main$d;
      const _component_ModulesHomePopularProducts = __nuxt_component_7;
      const _component_NuxtImg = __nuxt_component_1$1;
      const _component_UIcon = _sfc_main$e$1;
      const _component_UButton = _sfc_main$8$1;
      const _component_ModulesHomeBanner3 = __nuxt_component_11;
      const _component_ModulesHomeSmallProductCard = __nuxt_component_12;
      const _component_ModulesHomeBanner4 = __nuxt_component_13;
      const _component_UTooltip = _sfc_main$j;
      const _component_ModulesHomeBanner5 = __nuxt_component_15;
      const _component_ModulesHomeBlog = __nuxt_component_16;
      const _component_ModulesHomeBanner6 = __nuxt_component_17;
      const _component_ModulesHomeFacebookImages = __nuxt_component_18;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_UContainer, { class: "lg:px-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ModulesHomeBanner1, { class: "mb-[55px]" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ModulesHomeTitle, { title: "Danh mục hàng đầu" }, null, _parent2, _scopeId));
            _push2(`<div class="flex justify-between flex-wrap gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(unref(rooms), (room) => {
              _push2(ssrRenderComponent(_component_ModulesHomeCateCard, {
                key: room.id,
                image: room.full_image_url,
                title: room.room_name,
                quantity: 30
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
            _push2(ssrRenderComponent(_component_ModulesHomeTitle, { title: "Sản phẩm thịnh hành" }, null, _parent2, _scopeId));
            if (unref(isLoadingProducts)) {
              _push2(`<div class="text-center py-10"${_scopeId}> Đang tải sản phẩm... </div>`);
            } else {
              _push2(`<div class="flex flex-wrap justify-between items-center"${_scopeId}><!--[-->`);
              ssrRenderList(unref(products).slice(0, 5), (product) => {
                _push2(ssrRenderComponent(_component_SharedProductCard, {
                  key: product.product_id,
                  title: product.product_name,
                  image: product.thumbnail,
                  price: Number(product.price).toLocaleString("vi-VN"),
                  salePrice: Number(product.price_down).toLocaleString("vi-VN"),
                  stars: product.rating,
                  badge: product.badge || "Hot"
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            }
            _push2(ssrRenderComponent(_component_ModulesHomeBanner2, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ModulesHomeTitle, { title: "Sản phẩm nổi bật" }, null, _parent2, _scopeId));
            if (unref(isLoadingProducts)) {
              _push2(`<div class="text-center py-10"${_scopeId}>Đang tải...</div>`);
            } else {
              _push2(`<div class="flex justify-between flex-wrap mb-20"${_scopeId}><!--[-->`);
              ssrRenderList(unref(products).slice(5, 8), (product) => {
                _push2(ssrRenderComponent(_component_SharedProductCard, {
                  key: product.product_id,
                  big: true,
                  title: product.product_name,
                  image: product.thumbnail,
                  price: Number(product.price).toLocaleString("vi-VN"),
                  salePrice: Number(product.price_down).toLocaleString("vi-VN"),
                  stars: product.rating,
                  badge: product.badge || "Nổi bật"
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`<div class="flex justify-between items-center pt-10.5 pb-9.5 pl-[72px] pr-16 border border-success rounded-2xl mb-[55px]"${_scopeId}><div class="flex justify-center items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              class: "text-white bg-secondary rounded-full size-[65px] justify-center",
              ui: { leadingIcon: "size-10" },
              icon: "i-lucide-truck"
            }, null, _parent2, _scopeId));
            _push2(`<div class="border-r border-success pr-3 pl-3.5"${_scopeId}><p class="font-bold text-lg mb-3"${_scopeId}>Giao hàng miễn phí</p><p class="text-sm"${_scopeId}>Đơn hàng trên 5 triệu</p></div></div><div class="flex justify-center items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              class: "text-white bg-secondary rounded-full size-[65px] justify-center",
              ui: { leadingIcon: "size-10" },
              icon: "i-lucide-truck"
            }, null, _parent2, _scopeId));
            _push2(`<div class="border-r border-success pr-3 pl-3.5"${_scopeId}><p class="font-bold text-lg mb-3"${_scopeId}>Giao hàng miễn phí</p><p class="text-sm"${_scopeId}>Đơn hàng trên 5 triệu</p></div></div><div class="flex justify-center items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              class: "text-white bg-secondary rounded-full size-[65px] justify-center",
              ui: { leadingIcon: "size-10" },
              icon: "i-lucide-truck"
            }, null, _parent2, _scopeId));
            _push2(`<div class="border-r border-success pr-3 pl-3.5"${_scopeId}><p class="font-bold text-lg mb-3"${_scopeId}>Giao hàng miễn phí</p><p class="text-sm"${_scopeId}>Đơn hàng trên 5 triệu</p></div></div><div class="flex justify-center items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              class: "text-white bg-secondary rounded-full size-[65px] justify-center",
              ui: { leadingIcon: "size-10" },
              icon: "i-lucide-truck"
            }, null, _parent2, _scopeId));
            _push2(`<div class="pr-3 pl-3.5"${_scopeId}><p class="font-bold text-lg mb-3"${_scopeId}>Giao hàng miễn phí</p><p class="text-sm"${_scopeId}>Đơn hàng trên 5 triệu</p></div></div></div>`);
            _push2(ssrRenderComponent(_component_ModulesHomePopularProducts, {
              products: unref(products),
              class: "mb-[86px]"
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex justify-between items-center mb-[37px]"${_scopeId}><div class="w-[410px]"${_scopeId}><p class="font-bold text-secondary uppercase"${_scopeId}> TẠI SAO NÊN CHỌN CHÚNG TÔI </p><p class="font-bold text-3xl pt-4"${_scopeId}> Chúng tôi cung cấp đồ nội thất chất lượng cao cho bạn </p></div><p class="font-medium leading-[28px] w-[410px]"${_scopeId}> Có nhiều nơi bán nội thất, nhưng chúng tôi tạo nên sản phẩm độc đáo ngay từ đầu, pha chút vui nhộn, thêm chút ngẫu hứng và quan trọng là luôn đáng tin cậy để bạn yên tâm lựa chọn. </p>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: "/Rectangle 41.png",
              class: "w-[410px]"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex justify-between gap-8 mb-[63px]"${_scopeId}><div class="flex items-start gap-6 w-1/3"${_scopeId}><div class="size-20 bg-[#FFE2B3] rounded-full flex items-center justify-center shrink-0"${_scopeId}><img${ssrRenderAttr("src", _imports_8)} alt="Warranty icon" class="size-[55px]"${_scopeId}></div><div class="flex-1"${_scopeId}><p class="font-semibold text-xl mb-2"${_scopeId}>Bảo hành 3 năm</p><p class="text-gray-600 leading-relaxed"${_scopeId}> Tất cả sản phẩm đều được bảo hành 3 năm – cam kết chất lượng, an tâm sử dụng lâu dài. </p></div></div><div class="flex items-start gap-6 w-1/3"${_scopeId}><div class="size-20 bg-[#FFE2B3] rounded-full flex items-center justify-center shrink-0"${_scopeId}><img${ssrRenderAttr("src", _imports_9)} alt="Price icon" class="size-[55px]"${_scopeId}></div><div class="flex-1"${_scopeId}><p class="font-semibold text-xl mb-2"${_scopeId}>Giá cả phải chăng</p><p class="text-gray-600 leading-relaxed"${_scopeId}> Sản phẩm chất lượng với mức giá phải chăng, phù hợp mọi nhu cầu và ngân sách. </p></div></div><div class="flex items-start gap-6 w-1/3"${_scopeId}><div class="size-20 bg-[#FFE2B3] rounded-full flex items-center justify-center shrink-0"${_scopeId}><img${ssrRenderAttr("src", _imports_10)} alt="Delivery icon" class="size-[55px]"${_scopeId}></div><div class="flex-1"${_scopeId}><p class="font-semibold text-xl mb-2"${_scopeId}>Bảo hành 3 năm</p><p class="text-gray-600 leading-relaxed"${_scopeId}> Miễn phí vận chuyển, giao hàng nhanh chóng chống tận nơi để bạn yên tâm mua sắm. </p></div></div></div><div class="grid grid-cols-2 gap-[49px] relative mb-16.5"${_scopeId}><div class="relative h-[538px] min-w-[630px]"${_scopeId}><div class="absolute top-[66px] left-4 z-30 rounded-lg flex justify-center items-center bg-white w-[191px] h-[88px]"${_scopeId}><div class="bg-success size-[70px] flex justify-center items-center rounded-full mr-1.5"${_scopeId}><img${ssrRenderAttr("src", _imports_11)} alt="experience" class="size-12.5"${_scopeId}></div><p class="font-semibold w-[97px]"${_scopeId}>30 năm<br${_scopeId}>Kinh nghiệm</p></div><img class="absolute top-1 -left-13.5 z-0 w-[152px] h-[137px]"${ssrRenderAttr("src", _imports_12)}${_scopeId}><img${ssrRenderAttr("src", _imports_13)} alt="Blue armchair" class="absolute top-[43px]"${_scopeId}><img${ssrRenderAttr("src", _imports_14)} alt="white shelf" class="absolute top-0 right-0"${_scopeId}><img${ssrRenderAttr("src", _imports_15)} alt="white box" class="absolute bottom-0 right-0"${_scopeId}></div><div class="flex flex-col"${_scopeId}><p class="font-bold text-primary text- uppercase mb-4"${_scopeId}> VỀ CHÚNG TÔI </p><h2 class="text-3xl font-bold mb-4 text-black"${_scopeId}> Chúng tôi mang đến nội thất <span class="text-info"${_scopeId}>chất lượng, tốt nhất</span> cho bạn. </h2><p class="text-black mb-6"${_scopeId}> Chúng tôi là văn bản chuẩn mực kể từ khi một thợ in vô danh lấy một galley chữ và xáo trộn nó để tạo ra một cuốn sách mẫu chữ. Nó đã tồn tại không chỉ năm năm mà còn qua nhiều bước nhảy vọt vào điện tử mà về cơ bản vẫn giữ nguyên được sự hài hước được tiềm vào. </p><div class="grid grid-cols-2 gap-4 mb-8 text-black"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="size-[35px] flex justify-center items-center bg-success rounded-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, { name: "i-lucide-check-check" }, null, _parent2, _scopeId));
            _push2(`</div><span class="font-bold max-w-[253px]"${_scopeId}>Trải nghiệm vận chuyển hợp lý</span></div><div class="flex items-center gap-2"${_scopeId}><div class="size-[35px] flex justify-center items-center bg-success rounded-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, { name: "i-lucide-check-check" }, null, _parent2, _scopeId));
            _push2(`</div><span class="font-bold max-w-[253px]"${_scopeId}>Giá cả cạnh tranh &amp; Dễ dàng mua sắm</span></div><div class="flex items-center gap-2"${_scopeId}><div class="size-[35px] flex justify-center items-center bg-success rounded-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, { name: "i-lucide-check-check" }, null, _parent2, _scopeId));
            _push2(`</div><span class="font-bold max-w-[253px]"${_scopeId}>Thiết kế hiện đại, giá cả phải chăng</span></div><div class="flex items-center gap-2"${_scopeId}><div class="size-[35px] flex justify-center items-center bg-success rounded-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, { name: "i-lucide-check-check" }, null, _parent2, _scopeId));
            _push2(`</div><span class="font-bold max-w-[253px]"${_scopeId}>Chúng tôi tạo ra những sản phẩm tuyệt vời</span></div></div>`);
            _push2(ssrRenderComponent(_component_UButton, {
              size: "xl",
              variant: "solid",
              class: "relative bg-success text-black rounded-md overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"${_scopeId2}></span><span class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"${_scopeId2}><span${_scopeId2}>Khám phá thêm</span>`);
                  _push3(ssrRenderComponent(_component_UIcon, { name: "i-lucide-arrow-right" }, null, _parent3, _scopeId2));
                  _push3(`</span>`);
                } else {
                  return [
                    createVNode("span", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32" }),
                    createVNode("span", { class: "relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500" }, [
                      createVNode("span", null, "Khám phá thêm"),
                      createVNode(_component_UIcon, { name: "i-lucide-arrow-right" })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(_component_ModulesHomeBanner1, { class: "mb-[55px]" }),
              createVNode(_component_ModulesHomeTitle, { title: "Danh mục hàng đầu" }),
              createVNode("div", { class: "flex justify-between flex-wrap gap-4" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(rooms), (room) => {
                  return openBlock(), createBlock(_component_ModulesHomeCateCard, {
                    key: room.id,
                    image: room.full_image_url,
                    title: room.room_name,
                    quantity: 30
                  }, null, 8, ["image", "title"]);
                }), 128))
              ]),
              createVNode(_component_ModulesHomeTitle, { title: "Sản phẩm thịnh hành" }),
              unref(isLoadingProducts) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-center py-10"
              }, " Đang tải sản phẩm... ")) : (openBlock(), createBlock("div", {
                key: 1,
                class: "flex flex-wrap justify-between items-center"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(products).slice(0, 5), (product) => {
                  return openBlock(), createBlock(_component_SharedProductCard, {
                    key: product.product_id,
                    title: product.product_name,
                    image: product.thumbnail,
                    price: Number(product.price).toLocaleString("vi-VN"),
                    salePrice: Number(product.price_down).toLocaleString("vi-VN"),
                    stars: product.rating,
                    badge: product.badge || "Hot"
                  }, null, 8, ["title", "image", "price", "salePrice", "stars", "badge"]);
                }), 128))
              ])),
              createVNode(_component_ModulesHomeBanner2),
              createVNode(_component_ModulesHomeTitle, { title: "Sản phẩm nổi bật" }),
              unref(isLoadingProducts) ? (openBlock(), createBlock("div", {
                key: 2,
                class: "text-center py-10"
              }, "Đang tải...")) : (openBlock(), createBlock("div", {
                key: 3,
                class: "flex justify-between flex-wrap mb-20"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(products).slice(5, 8), (product) => {
                  return openBlock(), createBlock(_component_SharedProductCard, {
                    key: product.product_id,
                    big: true,
                    title: product.product_name,
                    image: product.thumbnail,
                    price: Number(product.price).toLocaleString("vi-VN"),
                    salePrice: Number(product.price_down).toLocaleString("vi-VN"),
                    stars: product.rating,
                    badge: product.badge || "Nổi bật"
                  }, null, 8, ["title", "image", "price", "salePrice", "stars", "badge"]);
                }), 128))
              ])),
              createVNode("div", { class: "flex justify-between items-center pt-10.5 pb-9.5 pl-[72px] pr-16 border border-success rounded-2xl mb-[55px]" }, [
                createVNode("div", { class: "flex justify-center items-center" }, [
                  createVNode(_component_UBadge, {
                    class: "text-white bg-secondary rounded-full size-[65px] justify-center",
                    ui: { leadingIcon: "size-10" },
                    icon: "i-lucide-truck"
                  }),
                  createVNode("div", { class: "border-r border-success pr-3 pl-3.5" }, [
                    createVNode("p", { class: "font-bold text-lg mb-3" }, "Giao hàng miễn phí"),
                    createVNode("p", { class: "text-sm" }, "Đơn hàng trên 5 triệu")
                  ])
                ]),
                createVNode("div", { class: "flex justify-center items-center" }, [
                  createVNode(_component_UBadge, {
                    class: "text-white bg-secondary rounded-full size-[65px] justify-center",
                    ui: { leadingIcon: "size-10" },
                    icon: "i-lucide-truck"
                  }),
                  createVNode("div", { class: "border-r border-success pr-3 pl-3.5" }, [
                    createVNode("p", { class: "font-bold text-lg mb-3" }, "Giao hàng miễn phí"),
                    createVNode("p", { class: "text-sm" }, "Đơn hàng trên 5 triệu")
                  ])
                ]),
                createVNode("div", { class: "flex justify-center items-center" }, [
                  createVNode(_component_UBadge, {
                    class: "text-white bg-secondary rounded-full size-[65px] justify-center",
                    ui: { leadingIcon: "size-10" },
                    icon: "i-lucide-truck"
                  }),
                  createVNode("div", { class: "border-r border-success pr-3 pl-3.5" }, [
                    createVNode("p", { class: "font-bold text-lg mb-3" }, "Giao hàng miễn phí"),
                    createVNode("p", { class: "text-sm" }, "Đơn hàng trên 5 triệu")
                  ])
                ]),
                createVNode("div", { class: "flex justify-center items-center" }, [
                  createVNode(_component_UBadge, {
                    class: "text-white bg-secondary rounded-full size-[65px] justify-center",
                    ui: { leadingIcon: "size-10" },
                    icon: "i-lucide-truck"
                  }),
                  createVNode("div", { class: "pr-3 pl-3.5" }, [
                    createVNode("p", { class: "font-bold text-lg mb-3" }, "Giao hàng miễn phí"),
                    createVNode("p", { class: "text-sm" }, "Đơn hàng trên 5 triệu")
                  ])
                ])
              ]),
              createVNode(_component_ModulesHomePopularProducts, {
                products: unref(products),
                class: "mb-[86px]"
              }, null, 8, ["products"]),
              createVNode("div", { class: "flex justify-between items-center mb-[37px]" }, [
                createVNode("div", { class: "w-[410px]" }, [
                  createVNode("p", { class: "font-bold text-secondary uppercase" }, " TẠI SAO NÊN CHỌN CHÚNG TÔI "),
                  createVNode("p", { class: "font-bold text-3xl pt-4" }, " Chúng tôi cung cấp đồ nội thất chất lượng cao cho bạn ")
                ]),
                createVNode("p", { class: "font-medium leading-[28px] w-[410px]" }, " Có nhiều nơi bán nội thất, nhưng chúng tôi tạo nên sản phẩm độc đáo ngay từ đầu, pha chút vui nhộn, thêm chút ngẫu hứng và quan trọng là luôn đáng tin cậy để bạn yên tâm lựa chọn. "),
                createVNode(_component_NuxtImg, {
                  src: "/Rectangle 41.png",
                  class: "w-[410px]"
                })
              ]),
              createVNode("div", { class: "flex justify-between gap-8 mb-[63px]" }, [
                createVNode("div", { class: "flex items-start gap-6 w-1/3" }, [
                  createVNode("div", { class: "size-20 bg-[#FFE2B3] rounded-full flex items-center justify-center shrink-0" }, [
                    createVNode("img", {
                      src: _imports_8,
                      alt: "Warranty icon",
                      class: "size-[55px]"
                    })
                  ]),
                  createVNode("div", { class: "flex-1" }, [
                    createVNode("p", { class: "font-semibold text-xl mb-2" }, "Bảo hành 3 năm"),
                    createVNode("p", { class: "text-gray-600 leading-relaxed" }, " Tất cả sản phẩm đều được bảo hành 3 năm – cam kết chất lượng, an tâm sử dụng lâu dài. ")
                  ])
                ]),
                createVNode("div", { class: "flex items-start gap-6 w-1/3" }, [
                  createVNode("div", { class: "size-20 bg-[#FFE2B3] rounded-full flex items-center justify-center shrink-0" }, [
                    createVNode("img", {
                      src: _imports_9,
                      alt: "Price icon",
                      class: "size-[55px]"
                    })
                  ]),
                  createVNode("div", { class: "flex-1" }, [
                    createVNode("p", { class: "font-semibold text-xl mb-2" }, "Giá cả phải chăng"),
                    createVNode("p", { class: "text-gray-600 leading-relaxed" }, " Sản phẩm chất lượng với mức giá phải chăng, phù hợp mọi nhu cầu và ngân sách. ")
                  ])
                ]),
                createVNode("div", { class: "flex items-start gap-6 w-1/3" }, [
                  createVNode("div", { class: "size-20 bg-[#FFE2B3] rounded-full flex items-center justify-center shrink-0" }, [
                    createVNode("img", {
                      src: _imports_10,
                      alt: "Delivery icon",
                      class: "size-[55px]"
                    })
                  ]),
                  createVNode("div", { class: "flex-1" }, [
                    createVNode("p", { class: "font-semibold text-xl mb-2" }, "Bảo hành 3 năm"),
                    createVNode("p", { class: "text-gray-600 leading-relaxed" }, " Miễn phí vận chuyển, giao hàng nhanh chóng chống tận nơi để bạn yên tâm mua sắm. ")
                  ])
                ])
              ]),
              createVNode("div", { class: "grid grid-cols-2 gap-[49px] relative mb-16.5" }, [
                createVNode("div", { class: "relative h-[538px] min-w-[630px]" }, [
                  createVNode("div", { class: "absolute top-[66px] left-4 z-30 rounded-lg flex justify-center items-center bg-white w-[191px] h-[88px]" }, [
                    createVNode("div", { class: "bg-success size-[70px] flex justify-center items-center rounded-full mr-1.5" }, [
                      createVNode("img", {
                        src: _imports_11,
                        alt: "experience",
                        class: "size-12.5"
                      })
                    ]),
                    createVNode("p", { class: "font-semibold w-[97px]" }, [
                      createTextVNode("30 năm"),
                      createVNode("br"),
                      createTextVNode("Kinh nghiệm")
                    ])
                  ]),
                  createVNode("img", {
                    class: "absolute top-1 -left-13.5 z-0 w-[152px] h-[137px]",
                    src: _imports_12
                  }),
                  createVNode("img", {
                    src: _imports_13,
                    alt: "Blue armchair",
                    class: "absolute top-[43px]"
                  }),
                  createVNode("img", {
                    src: _imports_14,
                    alt: "white shelf",
                    class: "absolute top-0 right-0"
                  }),
                  createVNode("img", {
                    src: _imports_15,
                    alt: "white box",
                    class: "absolute bottom-0 right-0"
                  })
                ]),
                createVNode("div", { class: "flex flex-col" }, [
                  createVNode("p", { class: "font-bold text-primary text- uppercase mb-4" }, " VỀ CHÚNG TÔI "),
                  createVNode("h2", { class: "text-3xl font-bold mb-4 text-black" }, [
                    createTextVNode(" Chúng tôi mang đến nội thất "),
                    createVNode("span", { class: "text-info" }, "chất lượng, tốt nhất"),
                    createTextVNode(" cho bạn. ")
                  ]),
                  createVNode("p", { class: "text-black mb-6" }, " Chúng tôi là văn bản chuẩn mực kể từ khi một thợ in vô danh lấy một galley chữ và xáo trộn nó để tạo ra một cuốn sách mẫu chữ. Nó đã tồn tại không chỉ năm năm mà còn qua nhiều bước nhảy vọt vào điện tử mà về cơ bản vẫn giữ nguyên được sự hài hước được tiềm vào. "),
                  createVNode("div", { class: "grid grid-cols-2 gap-4 mb-8 text-black" }, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("div", { class: "size-[35px] flex justify-center items-center bg-success rounded-full" }, [
                        createVNode(_component_UIcon, { name: "i-lucide-check-check" })
                      ]),
                      createVNode("span", { class: "font-bold max-w-[253px]" }, "Trải nghiệm vận chuyển hợp lý")
                    ]),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("div", { class: "size-[35px] flex justify-center items-center bg-success rounded-full" }, [
                        createVNode(_component_UIcon, { name: "i-lucide-check-check" })
                      ]),
                      createVNode("span", { class: "font-bold max-w-[253px]" }, "Giá cả cạnh tranh & Dễ dàng mua sắm")
                    ]),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("div", { class: "size-[35px] flex justify-center items-center bg-success rounded-full" }, [
                        createVNode(_component_UIcon, { name: "i-lucide-check-check" })
                      ]),
                      createVNode("span", { class: "font-bold max-w-[253px]" }, "Thiết kế hiện đại, giá cả phải chăng")
                    ]),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("div", { class: "size-[35px] flex justify-center items-center bg-success rounded-full" }, [
                        createVNode(_component_UIcon, { name: "i-lucide-check-check" })
                      ]),
                      createVNode("span", { class: "font-bold max-w-[253px]" }, "Chúng tôi tạo ra những sản phẩm tuyệt vời")
                    ])
                  ]),
                  createVNode(_component_UButton, {
                    size: "xl",
                    variant: "solid",
                    class: "relative bg-success text-black rounded-md overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32" }),
                      createVNode("span", { class: "relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500" }, [
                        createVNode("span", null, "Khám phá thêm"),
                        createVNode(_component_UIcon, { name: "i-lucide-arrow-right" })
                      ])
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ModulesHomeBanner3, { class: "mb-[118px]" }, null, _parent));
      _push(ssrRenderComponent(_component_UContainer, { class: "lg:px-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-3 gap-[31px] text-black mb-[57px]"${_scopeId}><div${_scopeId}><div class="mb-[39px] relative h-[47px] border-b border-[#EBEBEB] border-solid"${_scopeId}><p class="font-semibold text-2xl"${_scopeId}>Đang giảm giá</p><div class="absolute w-10.5 h-0.5 bg-secondary bottom-0"${_scopeId}></div></div>`);
            if (unref(isLoadingProducts)) {
              _push2(`<div class="text-center py-6"${_scopeId}> Đang tải... </div>`);
            } else {
              _push2(`<div class="flex flex-col gap-6.5"${_scopeId}><!--[-->`);
              ssrRenderList(unref(products).slice(0, 3), (product) => {
                _push2(ssrRenderComponent(_component_ModulesHomeSmallProductCard, {
                  key: product.product_id,
                  title: product.product_name,
                  image: product.thumbnail,
                  price: Number(product.price).toLocaleString("vi-VN"),
                  salePrice: Number(product.price_down).toLocaleString("vi-VN"),
                  stars: product.rating || 4
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div><div${_scopeId}><div class="mb-[39px] relative h-[47px] border-b border-[#EBEBEB] border-solid"${_scopeId}><p class="font-semibold text-2xl"${_scopeId}>Bán chạy nhất</p><div class="absolute w-10.5 h-0.5 bg-secondary bottom-0"${_scopeId}></div></div>`);
            if (unref(isLoadingProducts)) {
              _push2(`<div class="text-center py-6"${_scopeId}> Đang tải... </div>`);
            } else {
              _push2(`<div class="flex flex-col gap-6.5"${_scopeId}><!--[-->`);
              ssrRenderList(unref(products).slice(0, 3), (product) => {
                _push2(ssrRenderComponent(_component_ModulesHomeSmallProductCard, {
                  key: product.product_id,
                  title: product.product_name,
                  image: product.thumbnail,
                  price: Number(product.price).toLocaleString("vi-VN"),
                  salePrice: Number(product.price_down).toLocaleString("vi-VN"),
                  stars: product.rating
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div><div${_scopeId}><div class="mb-[39px] relative h-[47px] border-b border-[#EBEBEB] border-solid"${_scopeId}><p class="font-semibold text-2xl"${_scopeId}>Đánh giá cao nhất</p><div class="absolute w-10.5 h-0.5 bg-secondary bottom-0"${_scopeId}></div></div>`);
            if (unref(isLoadingProducts)) {
              _push2(`<div class="text-center py-6"${_scopeId}> Đang tải... </div>`);
            } else {
              _push2(`<div class="flex flex-col gap-6.5"${_scopeId}><!--[-->`);
              ssrRenderList(unref(products).slice(0, 3), (product) => {
                _push2(ssrRenderComponent(_component_ModulesHomeSmallProductCard, {
                  key: product.product_id,
                  title: product.product_name,
                  image: product.thumbnail,
                  price: Number(product.price).toLocaleString("vi-VN"),
                  salePrice: Number(product.price_down).toLocaleString("vi-VN"),
                  stars: product.rating || 5
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-3 gap-[31px] text-black mb-[57px]" }, [
                createVNode("div", null, [
                  createVNode("div", { class: "mb-[39px] relative h-[47px] border-b border-[#EBEBEB] border-solid" }, [
                    createVNode("p", { class: "font-semibold text-2xl" }, "Đang giảm giá"),
                    createVNode("div", { class: "absolute w-10.5 h-0.5 bg-secondary bottom-0" })
                  ]),
                  unref(isLoadingProducts) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-6"
                  }, " Đang tải... ")) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "flex flex-col gap-6.5"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(products).slice(0, 3), (product) => {
                      return openBlock(), createBlock(_component_ModulesHomeSmallProductCard, {
                        key: product.product_id,
                        title: product.product_name,
                        image: product.thumbnail,
                        price: Number(product.price).toLocaleString("vi-VN"),
                        salePrice: Number(product.price_down).toLocaleString("vi-VN"),
                        stars: product.rating || 4
                      }, null, 8, ["title", "image", "price", "salePrice", "stars"]);
                    }), 128))
                  ]))
                ]),
                createVNode("div", null, [
                  createVNode("div", { class: "mb-[39px] relative h-[47px] border-b border-[#EBEBEB] border-solid" }, [
                    createVNode("p", { class: "font-semibold text-2xl" }, "Bán chạy nhất"),
                    createVNode("div", { class: "absolute w-10.5 h-0.5 bg-secondary bottom-0" })
                  ]),
                  unref(isLoadingProducts) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-6"
                  }, " Đang tải... ")) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "flex flex-col gap-6.5"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(products).slice(0, 3), (product) => {
                      return openBlock(), createBlock(_component_ModulesHomeSmallProductCard, {
                        key: product.product_id,
                        title: product.product_name,
                        image: product.thumbnail,
                        price: Number(product.price).toLocaleString("vi-VN"),
                        salePrice: Number(product.price_down).toLocaleString("vi-VN"),
                        stars: product.rating
                      }, null, 8, ["title", "image", "price", "salePrice", "stars"]);
                    }), 128))
                  ]))
                ]),
                createVNode("div", null, [
                  createVNode("div", { class: "mb-[39px] relative h-[47px] border-b border-[#EBEBEB] border-solid" }, [
                    createVNode("p", { class: "font-semibold text-2xl" }, "Đánh giá cao nhất"),
                    createVNode("div", { class: "absolute w-10.5 h-0.5 bg-secondary bottom-0" })
                  ]),
                  unref(isLoadingProducts) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-6"
                  }, " Đang tải... ")) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "flex flex-col gap-6.5"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(products).slice(0, 3), (product) => {
                      return openBlock(), createBlock(_component_ModulesHomeSmallProductCard, {
                        key: product.product_id,
                        title: product.product_name,
                        image: product.thumbnail,
                        price: Number(product.price).toLocaleString("vi-VN"),
                        salePrice: Number(product.price_down).toLocaleString("vi-VN"),
                        stars: product.rating || 5
                      }, null, 8, ["title", "image", "price", "salePrice", "stars"]);
                    }), 128))
                  ]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ModulesHomeBanner4, { class: "mb-[65px]" }, null, _parent));
      _push(ssrRenderComponent(_component_UContainer, { class: "lg:px-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center mb-11.5"${_scopeId}><p class="font-bold text-primary uppercase mb-4"${_scopeId}>THƯ VIỆN ẢNH</p><p class="text-[32px] font-semibold"${_scopeId}> Hãy cùng xem qua <span class="text-info"${_scopeId}>Thư viện ảnh</span> của chúng tôi </p></div><div class="grid grid-cols-4 gap-7.5 mb-16"${_scopeId}><div class="col-span-2 rounded-xl overflow-hidden relative"${_scopeId}><div class="absolute top-51.5 left-[49px]"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UTooltip, {
              "delay-duration": 0,
              content: { side: "bottom", sideOffset: 45, align: "start" },
              ui: {
                content: "ring-0 p-0"
              }
            }, {
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center rounded-3xl bg-white p-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtImg, {
                    src: "/image 10.png",
                    class: "size-[81px] mr-3"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}><p class="font-bold text-[16px] mb-1"${_scopeId2}>Ghế sofa mini</p><p class="text-[16px] mb-1"${_scopeId2}> Giá: <span class="text-[#FF0000] font-semibold text-[13px]"${_scopeId2}>180.000 đ</span></p>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    size: "xl",
                    variant: "solid",
                    class: "relative bg-info rounded-md text-black overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"${_scopeId3}></span><span class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"${_scopeId3}><span${_scopeId3}>Mua ngay</span>`);
                        _push4(ssrRenderComponent(_component_UIcon, { name: "i-lucide-arrow-right" }, null, _parent4, _scopeId3));
                        _push4(`</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32" }),
                          createVNode("span", { class: "relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500" }, [
                            createVNode("span", null, "Mua ngay"),
                            createVNode(_component_UIcon, { name: "i-lucide-arrow-right" })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center rounded-3xl bg-white p-3" }, [
                      createVNode(_component_NuxtImg, {
                        src: "/image 10.png",
                        class: "size-[81px] mr-3"
                      }),
                      createVNode("div", null, [
                        createVNode("p", { class: "font-bold text-[16px] mb-1" }, "Ghế sofa mini"),
                        createVNode("p", { class: "text-[16px] mb-1" }, [
                          createTextVNode(" Giá: "),
                          createVNode("span", { class: "text-[#FF0000] font-semibold text-[13px]" }, "180.000 đ")
                        ]),
                        createVNode(_component_UButton, {
                          size: "xl",
                          variant: "solid",
                          class: "relative bg-info rounded-md text-black overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32" }),
                            createVNode("span", { class: "relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500" }, [
                              createVNode("span", null, "Mua ngay"),
                              createVNode(_component_UIcon, { name: "i-lucide-arrow-right" })
                            ])
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="relative inline-flex"${_scopeId2}><div class="absolute inset-0 size-[40px] rounded-full bg-success animate-ping opacity-75"${_scopeId2}></div><div class="relative size-[40px] rounded-full bg-success text-primary flex justify-center items-center text-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-plus",
                    class: "text-2xl"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "relative inline-flex" }, [
                      createVNode("div", { class: "absolute inset-0 size-[40px] rounded-full bg-success animate-ping opacity-75" }),
                      createVNode("div", { class: "relative size-[40px] rounded-full bg-success text-primary flex justify-center items-center text-center" }, [
                        createVNode(_component_UIcon, {
                          name: "i-lucide-plus",
                          class: "text-2xl"
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="absolute top-53.5 right-31.5"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UTooltip, {
              "delay-duration": 0,
              content: { side: "bottom", sideOffset: 45, align: "start" },
              ui: {
                content: "ring-0 p-0"
              }
            }, {
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center rounded-3xl bg-white p-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtImg, {
                    src: "/image 10.png",
                    class: "size-[81px] mr-3"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}><p class="font-bold text-[16px] mb-1"${_scopeId2}>Ghế sofa mini</p><p class="text-[16px] mb-1"${_scopeId2}> Giá: <span class="text-[#FF0000] font-semibold text-[13px]"${_scopeId2}>180.000 đ</span></p>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    size: "xl",
                    variant: "solid",
                    class: "relative bg-info rounded-md text-black overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"${_scopeId3}></span><span class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"${_scopeId3}><span${_scopeId3}>Mua ngay</span>`);
                        _push4(ssrRenderComponent(_component_UIcon, { name: "i-lucide-arrow-right" }, null, _parent4, _scopeId3));
                        _push4(`</span>`);
                      } else {
                        return [
                          createVNode("span", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32" }),
                          createVNode("span", { class: "relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500" }, [
                            createVNode("span", null, "Mua ngay"),
                            createVNode(_component_UIcon, { name: "i-lucide-arrow-right" })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center rounded-3xl bg-white p-3" }, [
                      createVNode(_component_NuxtImg, {
                        src: "/image 10.png",
                        class: "size-[81px] mr-3"
                      }),
                      createVNode("div", null, [
                        createVNode("p", { class: "font-bold text-[16px] mb-1" }, "Ghế sofa mini"),
                        createVNode("p", { class: "text-[16px] mb-1" }, [
                          createTextVNode(" Giá: "),
                          createVNode("span", { class: "text-[#FF0000] font-semibold text-[13px]" }, "180.000 đ")
                        ]),
                        createVNode(_component_UButton, {
                          size: "xl",
                          variant: "solid",
                          class: "relative bg-info rounded-md text-black overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32" }),
                            createVNode("span", { class: "relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500" }, [
                              createVNode("span", null, "Mua ngay"),
                              createVNode(_component_UIcon, { name: "i-lucide-arrow-right" })
                            ])
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="relative inline-flex"${_scopeId2}><div class="absolute inset-0 size-[40px] rounded-full bg-success animate-ping opacity-75"${_scopeId2}></div><div class="relative size-[40px] rounded-full bg-success text-primary flex justify-center items-center text-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-lucide-plus",
                    class: "text-2xl"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "relative inline-flex" }, [
                      createVNode("div", { class: "absolute inset-0 size-[40px] rounded-full bg-success animate-ping opacity-75" }),
                      createVNode("div", { class: "relative size-[40px] rounded-full bg-success text-primary flex justify-center items-center text-center" }, [
                        createVNode(_component_UIcon, {
                          name: "i-lucide-plus",
                          class: "text-2xl"
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: "/Rectangle 52.png",
              class: "w-full object-cover"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-span-1 rounded-xl overflow-hidden relative group"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: "/Rectangle 52.png",
              class: "h-full object-cover relative z-0"
            }, null, _parent2, _scopeId));
            _push2(`<div class="absolute inset-0 h-[200%] -translate-y-full group-hover:translate-y-0 transition-transform duration-1000 z-10"${_scopeId}><div class="h-1/2 bg-success/50"${_scopeId}></div><div class="h-1/2 bg-success"${_scopeId}></div></div><div class="absolute inset-0 flex items-center justify-center z-20 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000"${_scopeId}><div class="size-[50px] rounded-full bg-white text-primary flex justify-center items-center text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-plus",
              class: "text-4xl text-success"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="col-span-1 rounded-xl overflow-hidden relative group"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: "/Rectangle 52.png",
              class: "h-full object-cover relative z-0"
            }, null, _parent2, _scopeId));
            _push2(`<div class="absolute inset-0 h-[200%] -translate-y-full group-hover:translate-y-0 transition-transform duration-1000 z-10"${_scopeId}><div class="h-1/2 bg-success/50"${_scopeId}></div><div class="h-1/2 bg-success"${_scopeId}></div></div><div class="absolute inset-0 flex items-center justify-center z-20 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000"${_scopeId}><div class="size-[50px] rounded-full bg-white text-primary flex justify-center items-center text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-plus",
              class: "text-4xl text-success"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="col-span-1 rounded-xl overflow-hidden relative group"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: "/Rectangle 52.png",
              class: "h-full object-cover relative z-0"
            }, null, _parent2, _scopeId));
            _push2(`<div class="absolute inset-0 h-[200%] -translate-y-full group-hover:translate-y-0 transition-transform duration-1000 z-10"${_scopeId}><div class="h-1/2 bg-success/50"${_scopeId}></div><div class="h-1/2 bg-success"${_scopeId}></div></div><div class="absolute inset-0 flex items-center justify-center z-20 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000"${_scopeId}><div class="size-[50px] rounded-full bg-white text-primary flex justify-center items-center text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-plus",
              class: "text-4xl text-success"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="col-span-1 rounded-xl overflow-hidden relative group"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: "/Rectangle 52.png",
              class: "h-full object-cover relative z-0"
            }, null, _parent2, _scopeId));
            _push2(`<div class="absolute inset-0 h-[200%] -translate-y-full group-hover:translate-y-0 transition-transform duration-1000 z-10"${_scopeId}><div class="h-1/2 bg-success/50"${_scopeId}></div><div class="h-1/2 bg-success"${_scopeId}></div></div><div class="absolute inset-0 flex items-center justify-center z-20 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000"${_scopeId}><div class="size-[50px] rounded-full bg-white text-primary flex justify-center items-center text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-plus",
              class: "text-4xl text-success"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="col-span-2 rounded-xl overflow-hidden relative group"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: "/Rectangle 52.png",
              class: "w-full relative z-0 object-cover"
            }, null, _parent2, _scopeId));
            _push2(`<div class="absolute inset-0 h-[200%] -translate-y-full group-hover:translate-y-0 transition-transform duration-1000 z-10"${_scopeId}><div class="h-1/2 bg-success/50"${_scopeId}></div><div class="h-1/2 bg-success"${_scopeId}></div></div><div class="absolute inset-0 flex items-center justify-center z-20 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000"${_scopeId}><div class="size-[50px] rounded-full bg-white text-primary flex justify-center items-center text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-plus",
              class: "text-4xl text-success"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "text-center mb-11.5" }, [
                createVNode("p", { class: "font-bold text-primary uppercase mb-4" }, "THƯ VIỆN ẢNH"),
                createVNode("p", { class: "text-[32px] font-semibold" }, [
                  createTextVNode(" Hãy cùng xem qua "),
                  createVNode("span", { class: "text-info" }, "Thư viện ảnh"),
                  createTextVNode(" của chúng tôi ")
                ])
              ]),
              createVNode("div", { class: "grid grid-cols-4 gap-7.5 mb-16" }, [
                createVNode("div", { class: "col-span-2 rounded-xl overflow-hidden relative" }, [
                  createVNode("div", { class: "absolute top-51.5 left-[49px]" }, [
                    createVNode(_component_UTooltip, {
                      "delay-duration": 0,
                      content: { side: "bottom", sideOffset: 45, align: "start" },
                      ui: {
                        content: "ring-0 p-0"
                      }
                    }, {
                      content: withCtx(() => [
                        createVNode("div", { class: "flex items-center rounded-3xl bg-white p-3" }, [
                          createVNode(_component_NuxtImg, {
                            src: "/image 10.png",
                            class: "size-[81px] mr-3"
                          }),
                          createVNode("div", null, [
                            createVNode("p", { class: "font-bold text-[16px] mb-1" }, "Ghế sofa mini"),
                            createVNode("p", { class: "text-[16px] mb-1" }, [
                              createTextVNode(" Giá: "),
                              createVNode("span", { class: "text-[#FF0000] font-semibold text-[13px]" }, "180.000 đ")
                            ]),
                            createVNode(_component_UButton, {
                              size: "xl",
                              variant: "solid",
                              class: "relative bg-info rounded-md text-black overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32" }),
                                createVNode("span", { class: "relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500" }, [
                                  createVNode("span", null, "Mua ngay"),
                                  createVNode(_component_UIcon, { name: "i-lucide-arrow-right" })
                                ])
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "relative inline-flex" }, [
                          createVNode("div", { class: "absolute inset-0 size-[40px] rounded-full bg-success animate-ping opacity-75" }),
                          createVNode("div", { class: "relative size-[40px] rounded-full bg-success text-primary flex justify-center items-center text-center" }, [
                            createVNode(_component_UIcon, {
                              name: "i-lucide-plus",
                              class: "text-2xl"
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "absolute top-53.5 right-31.5" }, [
                    createVNode(_component_UTooltip, {
                      "delay-duration": 0,
                      content: { side: "bottom", sideOffset: 45, align: "start" },
                      ui: {
                        content: "ring-0 p-0"
                      }
                    }, {
                      content: withCtx(() => [
                        createVNode("div", { class: "flex items-center rounded-3xl bg-white p-3" }, [
                          createVNode(_component_NuxtImg, {
                            src: "/image 10.png",
                            class: "size-[81px] mr-3"
                          }),
                          createVNode("div", null, [
                            createVNode("p", { class: "font-bold text-[16px] mb-1" }, "Ghế sofa mini"),
                            createVNode("p", { class: "text-[16px] mb-1" }, [
                              createTextVNode(" Giá: "),
                              createVNode("span", { class: "text-[#FF0000] font-semibold text-[13px]" }, "180.000 đ")
                            ]),
                            createVNode(_component_UButton, {
                              size: "xl",
                              variant: "solid",
                              class: "relative bg-info rounded-md text-black overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32" }),
                                createVNode("span", { class: "relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500" }, [
                                  createVNode("span", null, "Mua ngay"),
                                  createVNode(_component_UIcon, { name: "i-lucide-arrow-right" })
                                ])
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "relative inline-flex" }, [
                          createVNode("div", { class: "absolute inset-0 size-[40px] rounded-full bg-success animate-ping opacity-75" }),
                          createVNode("div", { class: "relative size-[40px] rounded-full bg-success text-primary flex justify-center items-center text-center" }, [
                            createVNode(_component_UIcon, {
                              name: "i-lucide-plus",
                              class: "text-2xl"
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_NuxtImg, {
                    src: "/Rectangle 52.png",
                    class: "w-full object-cover"
                  })
                ]),
                createVNode("div", { class: "col-span-1 rounded-xl overflow-hidden relative group" }, [
                  createVNode(_component_NuxtImg, {
                    src: "/Rectangle 52.png",
                    class: "h-full object-cover relative z-0"
                  }),
                  createVNode("div", { class: "absolute inset-0 h-[200%] -translate-y-full group-hover:translate-y-0 transition-transform duration-1000 z-10" }, [
                    createVNode("div", { class: "h-1/2 bg-success/50" }),
                    createVNode("div", { class: "h-1/2 bg-success" })
                  ]),
                  createVNode("div", { class: "absolute inset-0 flex items-center justify-center z-20 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000" }, [
                    createVNode("div", { class: "size-[50px] rounded-full bg-white text-primary flex justify-center items-center text-center" }, [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-plus",
                        class: "text-4xl text-success"
                      })
                    ])
                  ])
                ]),
                createVNode("div", { class: "col-span-1 rounded-xl overflow-hidden relative group" }, [
                  createVNode(_component_NuxtImg, {
                    src: "/Rectangle 52.png",
                    class: "h-full object-cover relative z-0"
                  }),
                  createVNode("div", { class: "absolute inset-0 h-[200%] -translate-y-full group-hover:translate-y-0 transition-transform duration-1000 z-10" }, [
                    createVNode("div", { class: "h-1/2 bg-success/50" }),
                    createVNode("div", { class: "h-1/2 bg-success" })
                  ]),
                  createVNode("div", { class: "absolute inset-0 flex items-center justify-center z-20 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000" }, [
                    createVNode("div", { class: "size-[50px] rounded-full bg-white text-primary flex justify-center items-center text-center" }, [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-plus",
                        class: "text-4xl text-success"
                      })
                    ])
                  ])
                ]),
                createVNode("div", { class: "col-span-1 rounded-xl overflow-hidden relative group" }, [
                  createVNode(_component_NuxtImg, {
                    src: "/Rectangle 52.png",
                    class: "h-full object-cover relative z-0"
                  }),
                  createVNode("div", { class: "absolute inset-0 h-[200%] -translate-y-full group-hover:translate-y-0 transition-transform duration-1000 z-10" }, [
                    createVNode("div", { class: "h-1/2 bg-success/50" }),
                    createVNode("div", { class: "h-1/2 bg-success" })
                  ]),
                  createVNode("div", { class: "absolute inset-0 flex items-center justify-center z-20 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000" }, [
                    createVNode("div", { class: "size-[50px] rounded-full bg-white text-primary flex justify-center items-center text-center" }, [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-plus",
                        class: "text-4xl text-success"
                      })
                    ])
                  ])
                ]),
                createVNode("div", { class: "col-span-1 rounded-xl overflow-hidden relative group" }, [
                  createVNode(_component_NuxtImg, {
                    src: "/Rectangle 52.png",
                    class: "h-full object-cover relative z-0"
                  }),
                  createVNode("div", { class: "absolute inset-0 h-[200%] -translate-y-full group-hover:translate-y-0 transition-transform duration-1000 z-10" }, [
                    createVNode("div", { class: "h-1/2 bg-success/50" }),
                    createVNode("div", { class: "h-1/2 bg-success" })
                  ]),
                  createVNode("div", { class: "absolute inset-0 flex items-center justify-center z-20 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000" }, [
                    createVNode("div", { class: "size-[50px] rounded-full bg-white text-primary flex justify-center items-center text-center" }, [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-plus",
                        class: "text-4xl text-success"
                      })
                    ])
                  ])
                ]),
                createVNode("div", { class: "col-span-2 rounded-xl overflow-hidden relative group" }, [
                  createVNode(_component_NuxtImg, {
                    src: "/Rectangle 52.png",
                    class: "w-full relative z-0 object-cover"
                  }),
                  createVNode("div", { class: "absolute inset-0 h-[200%] -translate-y-full group-hover:translate-y-0 transition-transform duration-1000 z-10" }, [
                    createVNode("div", { class: "h-1/2 bg-success/50" }),
                    createVNode("div", { class: "h-1/2 bg-success" })
                  ]),
                  createVNode("div", { class: "absolute inset-0 flex items-center justify-center z-20 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000" }, [
                    createVNode("div", { class: "size-[50px] rounded-full bg-white text-primary flex justify-center items-center text-center" }, [
                      createVNode(_component_UIcon, {
                        name: "i-lucide-plus",
                        class: "text-4xl text-success"
                      })
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ModulesHomeBanner5, { class: "mb-15.5" }, null, _parent));
      _push(ssrRenderComponent(_component_UContainer, { class: "lg:px-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ModulesHomeBlog, { class: "mb-17.5" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ModulesHomeBanner6, { class: "mb-14.5" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ModulesHomeFacebookImages, { class: "mb-[51px]" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ModulesHomeBlog, { class: "mb-17.5" }),
              createVNode(_component_ModulesHomeBanner6, { class: "mb-14.5" }),
              createVNode(_component_ModulesHomeFacebookImages, { class: "mb-[51px]" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BrsktXQt.mjs.map
