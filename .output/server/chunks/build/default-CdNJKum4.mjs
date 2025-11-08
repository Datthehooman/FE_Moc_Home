import { r as useRoute, k as __nuxt_component_0$2, c as __nuxt_component_1$1, b as _sfc_main$e, q as _sfc_main$9, a as useAppConfig, t as tv } from './server.mjs';
import { unref, defineComponent, computed, mergeProps, withCtx, createTextVNode, ref, watchEffect, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSlots, renderSlot, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { useRoute as useRoute$1, useRouter } from 'vue-router';
import { u as useAuth } from './useAuth-DSQAT-MN.mjs';
import { Primitive } from 'reka-ui';
import { _ as _sfc_main$5 } from './Container-DDIbJE-W.mjs';
import { p as publicAssetsURL } from '../nitro/nitro.mjs';
import 'pinia';
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

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuth();
    useRouter();
    const isLogged = ref(auth.isLogged.value);
    watchEffect(() => {
      isLogged.value = auth.isLogged.value;
    });
    const isScrolled = ref(false);
    const isUserDropdownOpen = ref(false);
    ref(null);
    const toggleUserDropdown = () => {
      isUserDropdownOpen.value = !isUserDropdownOpen.value;
    };
    const categories = ref([]);
    const searchQuery = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_NuxtImg = __nuxt_component_1$1;
      const _component_UIcon = _sfc_main$e;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: [
          "sticky top-0 z-50 flex items-center w-full transition-all duration-500 backdrop-blur-md",
          isScrolled.value ? "bg-[#FFF9F3]/80 h-[60px] shadow-md" : "bg-[#FFF9F3] h-[75px] shadow-sm"
        ]
      }, _attrs))}><div class="max-w-[85%] mx-auto flex justify-between items-center w-full px-6 transition-all duration-500">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-2 font-bold text-lg text-gray-800 transition-all duration-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: "/logo.png",
              alt: "MỘC HOME",
              class: isScrolled.value ? "w-16 transition-all duration-500" : "w-20 transition-all duration-500"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtImg, {
                src: "/logo.png",
                alt: "MỘC HOME",
                class: isScrolled.value ? "w-16 transition-all duration-500" : "w-20 transition-all duration-500"
              }, null, 8, ["class"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="flex items-center"><ul class="flex space-x-8 text-[16px] font-medium"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-black hover:text-[#654538]",
        "active-class": "text-[#654538]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Trang chủ`);
          } else {
            return [
              createTextVNode("Trang chủ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        class: "text-black hover:text-[#654538]",
        "active-class": "text-[#654538]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Về chúng tôi`);
          } else {
            return [
              createTextVNode("Về chúng tôi")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="relative group"><button class="flex items-center gap-1 text-black hover:text-[#654538] transition-colors"> Danh mục `);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "heroicons:chevron-down",
        class: "w-5 h-5 transform transition-transform duration-300 group-hover:rotate-180"
      }, null, _parent));
      _push(`</button><div class="absolute left-1/2 -translate-x-[35%] top-full w-[85vw] max-w-[1200px] bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-300 mt-4 p-8"><div class="grid grid-cols-6 gap-10 items-start"><div class="col-span-4 grid grid-cols-3 gap-8"><!--[-->`);
      ssrRenderList(categories.value, (cat, i) => {
        _push(`<div><h3 class="ml-4 text-[18px] font-semibold mb-3 text-[#654538]">${ssrInterpolate(cat.title)}</h3><ul class="space-y-1"><!--[-->`);
        ssrRenderList(cat.items, (item, j) => {
          _push(`<li class="group/item text-[16px] text-gray-700 hover:text-[#654538] transition-all duration-300 mb-2">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/san-pham/${item.slug}`,
            class: "inline-flex items-center gap-2 relative transition-all duration-300 group-hover/item:translate-x-[6px]"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="w-2 h-2 rounded-full bg-[#654538] opacity-0 scale-0 group-hover/item:opacity-100 group-hover/item:scale-100 transition-all duration-300"${_scopeId}></span> ${ssrInterpolate(item.name)}`);
              } else {
                return [
                  createVNode("span", { class: "w-2 h-2 rounded-full bg-[#654538] opacity-0 scale-0 group-hover/item:opacity-100 group-hover/item:scale-100 transition-all duration-300" }),
                  createTextVNode(" " + toDisplayString(item.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--></div><div class="col-span-2 flex justify-center items-center">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "https://live.themewild.com/fameo/assets/img/banner/mega-menu-banner.jpg",
        class: "rounded-lg object-cover w-[377px] h-[200px]",
        alt: "banner"
      }, null, _parent));
      _push(`</div></div></div></li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/ProductList",
        class: "text-black hover:text-[#654538]",
        "active-class": "text-[#654538]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Cửa hàng`);
          } else {
            return [
              createTextVNode("Cửa hàng")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/blog",
        class: "text-black hover:text-[#654538]",
        "active-class": "text-[#654538]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Blog`);
          } else {
            return [
              createTextVNode("Blog")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: "text-black hover:text-[#654538]",
        "active-class": "text-[#654538]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Liên hệ`);
          } else {
            return [
              createTextVNode("Liên hệ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></nav><div class="flex items-center gap-4 text-[#654538] transition-all duration-500"><div class="relative"><input type="text" placeholder="Tìm kiếm..."${ssrRenderAttr("value", searchQuery.value)} class="border border-[#A77A5D] rounded-lg px-3 py-1.5 pr-8 text-sm focus:border-[#654538] outline-none bg-transparent">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "heroicons:magnifying-glass",
        class: "w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-[#654538]"
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "heroicons:heart",
        class: "w-5 h-6 cursor-pointer hover:text-[#A77A5D]"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/cart" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "heroicons:shopping-bag",
              class: "w-5 h-5 cursor-pointer hover:text-[#A77A5D]"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "heroicons:shopping-bag",
                class: "w-5 h-5 cursor-pointer hover:text-[#A77A5D]"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="relative flex items-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "heroicons:user",
        class: "w-5 h-5 cursor-pointer hover:text-[#A77A5D]",
        onClick: toggleUserDropdown
      }, null, _parent));
      if (isUserDropdownOpen.value) {
        _push(`<div class="${ssrRenderClass([{ "opacity-100 translate-y-0": isUserDropdownOpen.value }, "absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.08)] opacity-0 translate-y-2 transition-all duration-300"])}"><div class="p-4">`);
        if (isLogged.value) {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/user/dashboard",
            class: "block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg mb-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Tài khoản của tôi `);
              } else {
                return [
                  createTextVNode(" Tài khoản của tôi ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<button class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-lg text-red-600"> Đăng xuất </button><!--]-->`);
        } else {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/login",
            class: "block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg mb-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Đăng nhập `);
              } else {
                return [
                  createTextVNode(" Đăng nhập ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/register",
            class: "block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Đăng ký `);
              } else {
                return [
                  createTextVNode(" Đăng ký ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<!--]-->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></header>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layouts/Main/Header.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$4, { __name: "LayoutsMainHeader" });
const _sfc_main$3 = {
  __name: "LayoutsMainBreadcrumb",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    const titles = {
      login: "Đăng nhập",
      register: "Đăng ký",
      about: "Giới thiệu",
      contact: "Liên hệ",
      product: "Sản phẩm",
      cart: "Giỏ hàng",
      checkout: "Thanh toán",
      ProductList: "Cửa hàng",
      OtpVerify: "Xác minh OTP",
      "reset-password": "Đặt lại mật khẩu"
    };
    const pageTitle = computed(() => {
      if (route.path.startsWith("/san-pham/")) return "Chi tiết sản phẩm";
      return titles[route.name] || "Trang";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full h-[150px] bg-[url('/banner-breadcumb.png')] bg-cover bg-center relative flex flex-col justify-center" }, _attrs))}><div class="absolute inset-0 bg-black/40"></div><div class="w-[85%] mx-auto relative z-10"><h1 class="text-white text-[24px] font-bold mb-2 capitalize">${ssrInterpolate(pageTitle.value)}</h1><div class="flex items-center space-x-2 text-white text-[18px] font-medium"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h5m10-11v10a1 1 0 01-1 1h-5"></path></svg>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "hover:text-[#ffd8ad] text-[16px] transition-all duration-300 ease-in-out"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Trang chủ`);
          } else {
            return [
              createTextVNode("Trang chủ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 5l6 7-6 7m4-14l6 7-6 7"></path></svg><span class="text-[#ffd8ad] text-[16px] capitalize">${ssrInterpolate(pageTitle.value)}</span></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layouts/Main/Breadcrumb.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "root": "",
    "top": "py-8 lg:py-12",
    "bottom": "py-8 lg:py-12",
    "container": "py-8 lg:py-4 lg:flex lg:items-center lg:justify-between lg:gap-x-3",
    "left": "flex items-center justify-center lg:justify-start lg:flex-1 gap-x-1.5 mt-3 lg:mt-0 lg:order-1",
    "center": "mt-3 lg:mt-0 lg:order-2 flex items-center justify-center",
    "right": "lg:flex-1 flex items-center justify-center lg:justify-end gap-x-1.5 lg:order-3"
  }
};
const _sfc_main$2 = {
  __name: "UFooter",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "footer" },
    class: { type: null, required: false },
    ui: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.footer || {} })());
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.top) {
              _push2(`<div class="${ssrRenderClass(ui.value.top({ class: props.ui?.top }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "top", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: ui.value.container({ class: props.ui?.container })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="${ssrRenderClass(ui.value.right({ class: props.ui?.right }))}"${_scopeId2}>`);
                  ssrRenderSlot(_ctx.$slots, "right", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`</div><div class="${ssrRenderClass(ui.value.center({ class: props.ui?.center }))}"${_scopeId2}>`);
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`</div><div class="${ssrRenderClass(ui.value.left({ class: props.ui?.left }))}"${_scopeId2}>`);
                  ssrRenderSlot(_ctx.$slots, "left", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: ui.value.right({ class: props.ui?.right })
                    }, [
                      renderSlot(_ctx.$slots, "right")
                    ], 2),
                    createVNode("div", {
                      class: ui.value.center({ class: props.ui?.center })
                    }, [
                      renderSlot(_ctx.$slots, "default")
                    ], 2),
                    createVNode("div", {
                      class: ui.value.left({ class: props.ui?.left })
                    }, [
                      renderSlot(_ctx.$slots, "left")
                    ], 2)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            if (!!slots.bottom) {
              _push2(`<div class="${ssrRenderClass(ui.value.bottom({ class: props.ui?.bottom }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !!slots.top ? (openBlock(), createBlock("div", {
                key: 0,
                class: ui.value.top({ class: props.ui?.top })
              }, [
                renderSlot(_ctx.$slots, "top")
              ], 2)) : createCommentVNode("", true),
              createVNode(_sfc_main$5, {
                class: ui.value.container({ class: props.ui?.container })
              }, {
                default: withCtx(() => [
                  createVNode("div", {
                    class: ui.value.right({ class: props.ui?.right })
                  }, [
                    renderSlot(_ctx.$slots, "right")
                  ], 2),
                  createVNode("div", {
                    class: ui.value.center({ class: props.ui?.center })
                  }, [
                    renderSlot(_ctx.$slots, "default")
                  ], 2),
                  createVNode("div", {
                    class: ui.value.left({ class: props.ui?.left })
                  }, [
                    renderSlot(_ctx.$slots, "left")
                  ], 2)
                ]),
                _: 3
              }, 8, ["class"]),
              !!slots.bottom ? (openBlock(), createBlock("div", {
                key: 1,
                class: ui.value.bottom({ class: props.ui?.bottom })
              }, [
                renderSlot(_ctx.$slots, "bottom")
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Footer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _imports_0 = publicAssetsURL("/logo2.png");
const _imports_1 = publicAssetsURL("/visa.png");
const _imports_2 = publicAssetsURL("/mcard.png");
const _imports_3 = publicAssetsURL("/am.png");
const _imports_4 = publicAssetsURL("/dnetwork.png");
const _imports_5 = publicAssetsURL("/paypal.png");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const columns = [
      {
        label: "Liên kết nhanh",
        children: [
          { label: "Giới thiệu", to: "/gioi-thieu" },
          { label: "Thông tin giao hàng", to: "/thong-tin-giao-hang" },
          { label: "Liên hệ", to: "/lien-he" },
          { label: "Cập nhật tin tức", to: "/tin-tuc" },
          { label: "Lời chứng thực", to: "/loi-chung-thuc" },
          { label: "Điều khoản dịch vụ", to: "/dieu-khoan" },
          { label: "Chính sách bảo mật", to: "/chinh-sach-bao-mat" }
        ]
      },
      {
        label: "Duyệt danh mục",
        children: [
          { label: "Phòng ngủ", to: "/phong-ngu" },
          { label: "Văn phòng", to: "/van-phong" },
          { label: "Phòng khách", to: "/phong-khach" },
          { label: "Phòng tắm", to: "/phong-tam" },
          { label: "Trang trí", to: "/trang-tri" },
          { label: "Nhà bếp", to: "/nha-bep" },
          { label: "Ghế bành", to: "/ghe-banh" }
        ]
      },
      {
        label: "Trung tâm Hỗ trợ",
        children: [
          { label: "Câu hỏi thường gặp", to: "/faq" },
          { label: "Cách mua hàng", to: "/cach-mua-hang" },
          { label: "Trung tâm Hỗ trợ", to: "/ho-tro" },
          { label: "Theo dõi đơn hàng", to: "/theo-doi-don-hang" },
          { label: "Chính sách Đổi trả", to: "/doi-tra" },
          { label: "Đối tác của chúng tôi", to: "/doi-tac" },
          { label: "Sơ đồ trang web", to: "/site-map" }
        ]
      },
      {
        label: "Các hình thức thanh toán",
        children: [
          {
            label: "Bạn có thể dễ dàng thanh toán khi đặt hàng"
          },
          { label: "Chúng tôi chấp nhận:" }
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UFooter = _sfc_main$2;
      const _component_UContainer = _sfc_main$5;
      const _component_UIcon = _sfc_main$e;
      const _component_ULink = _sfc_main$9;
      _push(ssrRenderComponent(_component_UFooter, mergeProps({
        ui: {
          container: "lg:p-0",
          root: "bg-[url(/footer.png)] bg-cover bg-center min-h-[526px] px-4 md:px-[95px] pb-[30px] pt-[60px]",
          top: "py-0 -mt-10",
          bottom: "py-0 -mt-20"
        },
        class: "text-white"
      }, _attrs), {
        top: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8"${_scopeId2}><div${_scopeId2}><div class="flex justify-center"${_scopeId2}><img${ssrRenderAttr("src", _imports_0)} alt="MỘC HOME" class="w-[117px]"${_scopeId2}></div><ul class="space-y-4 font-medium"${_scopeId2}><li class="text-sm"${_scopeId2}> Chúng tôi mang đến nội thất đẹp, bền và tinh tế, giúp không gian sống của bạn trở nên hiện đại và tiện nghi hơn. </li><li class="text-sm flex items-center gap-2.5"${_scopeId2}><div class="size-8 bg-primary rounded-full flex justify-center items-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, { name: "i-lucide-phone" }, null, _parent3, _scopeId2));
                  _push3(`</div> +84 348 706 723 </li><li class="text-sm flex items-center gap-2.5"${_scopeId2}><div class="size-8 bg-primary rounded-full flex justify-center items-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, { name: "i-lucide-map-pin" }, null, _parent3, _scopeId2));
                  _push3(`</div> Công viên Quang Trung, HCM </li><li class="text-sm flex items-center gap-2.5"${_scopeId2}><div class="size-8 bg-primary rounded-full flex justify-center items-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, { name: "i-lucide-mail" }, null, _parent3, _scopeId2));
                  _push3(`</div> mochome@gmail.com </li><li class="text-sm flex items-center gap-2.5"${_scopeId2}><div class="size-8 bg-primary rounded-full flex justify-center items-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, { name: "i-lucide-clock-3" }, null, _parent3, _scopeId2));
                  _push3(`</div> Thứ hai - bảy (7:00 am - 5:00 pm) </li></ul></div><!--[-->`);
                  ssrRenderList(columns.slice(0, -1), (column, index) => {
                    _push3(`<div class="pt-[17px]"${_scopeId2}><h3 class="text-lg font-semibold mb-[17px]"${_scopeId2}>${ssrInterpolate(column.label)}</h3><div class="flex items-center mb-6"${_scopeId2}><div class="h-[2px] w-2.5 bg-secondary mr-1"${_scopeId2}></div><div class="h-[2px] w-[27px] bg-primary"${_scopeId2}></div></div><ul class="space-y-4 font-medium"${_scopeId2}><!--[-->`);
                    ssrRenderList(column.children, (link, linkIndex) => {
                      _push3(`<li${_scopeId2}>`);
                      if (link.to) {
                        _push3(ssrRenderComponent(_component_ULink, {
                          to: link.to,
                          class: "text-sm hover:text-default transition-colors text-white"
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`${ssrInterpolate(link.label)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(link.label), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<span class="text-sm"${_scopeId2}>${ssrInterpolate(link.label)}</span>`);
                      }
                      _push3(`</li>`);
                    });
                    _push3(`<!--]--></ul></div>`);
                  });
                  _push3(`<!--]--><div class="pt-[17px]"${_scopeId2}><h3 class="text-lg font-semibold mb-[17px]"${_scopeId2}>${ssrInterpolate(columns[3]?.label || "")}</h3><div class="flex items-center mb-6"${_scopeId2}><div class="h-[2px] w-2.5 bg-secondary mr-1"${_scopeId2}></div><div class="h-[2px] w-[27px] bg-primary"${_scopeId2}></div></div><div class="space-y-4 font-medium"${_scopeId2}><p class="text-sm"${_scopeId2}>${ssrInterpolate(columns[3]?.children?.[0]?.label || "")}</p><p class="text-sm"${_scopeId2}>${ssrInterpolate(columns[3]?.children?.[1]?.label || "")}</p><div class="flex items-center gap-1.5 pt-2"${_scopeId2}><img${ssrRenderAttr("src", _imports_1)} alt="Visa" class="h-8 object-contain"${_scopeId2}><img${ssrRenderAttr("src", _imports_2)} alt="MasterCard" class="h-8 object-contain"${_scopeId2}><img${ssrRenderAttr("src", _imports_3)} alt="American Express" class="h-8 object-contain"${_scopeId2}><img${ssrRenderAttr("src", _imports_4)} alt="Discover" class="h-8 object-contain"${_scopeId2}><img${ssrRenderAttr("src", _imports_5)} alt="PayPal" class="h-8 object-contain"${_scopeId2}></div></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8" }, [
                      createVNode("div", null, [
                        createVNode("div", { class: "flex justify-center" }, [
                          createVNode("img", {
                            src: _imports_0,
                            alt: "MỘC HOME",
                            class: "w-[117px]"
                          })
                        ]),
                        createVNode("ul", { class: "space-y-4 font-medium" }, [
                          createVNode("li", { class: "text-sm" }, " Chúng tôi mang đến nội thất đẹp, bền và tinh tế, giúp không gian sống của bạn trở nên hiện đại và tiện nghi hơn. "),
                          createVNode("li", { class: "text-sm flex items-center gap-2.5" }, [
                            createVNode("div", { class: "size-8 bg-primary rounded-full flex justify-center items-center" }, [
                              createVNode(_component_UIcon, { name: "i-lucide-phone" })
                            ]),
                            createTextVNode(" +84 348 706 723 ")
                          ]),
                          createVNode("li", { class: "text-sm flex items-center gap-2.5" }, [
                            createVNode("div", { class: "size-8 bg-primary rounded-full flex justify-center items-center" }, [
                              createVNode(_component_UIcon, { name: "i-lucide-map-pin" })
                            ]),
                            createTextVNode(" Công viên Quang Trung, HCM ")
                          ]),
                          createVNode("li", { class: "text-sm flex items-center gap-2.5" }, [
                            createVNode("div", { class: "size-8 bg-primary rounded-full flex justify-center items-center" }, [
                              createVNode(_component_UIcon, { name: "i-lucide-mail" })
                            ]),
                            createTextVNode(" mochome@gmail.com ")
                          ]),
                          createVNode("li", { class: "text-sm flex items-center gap-2.5" }, [
                            createVNode("div", { class: "size-8 bg-primary rounded-full flex justify-center items-center" }, [
                              createVNode(_component_UIcon, { name: "i-lucide-clock-3" })
                            ]),
                            createTextVNode(" Thứ hai - bảy (7:00 am - 5:00 pm) ")
                          ])
                        ])
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(columns.slice(0, -1), (column, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "pt-[17px]"
                        }, [
                          createVNode("h3", { class: "text-lg font-semibold mb-[17px]" }, toDisplayString(column.label), 1),
                          createVNode("div", { class: "flex items-center mb-6" }, [
                            createVNode("div", { class: "h-[2px] w-2.5 bg-secondary mr-1" }),
                            createVNode("div", { class: "h-[2px] w-[27px] bg-primary" })
                          ]),
                          createVNode("ul", { class: "space-y-4 font-medium" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(column.children, (link, linkIndex) => {
                              return openBlock(), createBlock("li", { key: linkIndex }, [
                                link.to ? (openBlock(), createBlock(_component_ULink, {
                                  key: 0,
                                  to: link.to,
                                  class: "text-sm hover:text-default transition-colors text-white"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(link.label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["to"])) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-sm"
                                }, toDisplayString(link.label), 1))
                              ]);
                            }), 128))
                          ])
                        ]);
                      }), 128)),
                      createVNode("div", { class: "pt-[17px]" }, [
                        createVNode("h3", { class: "text-lg font-semibold mb-[17px]" }, toDisplayString(columns[3]?.label || ""), 1),
                        createVNode("div", { class: "flex items-center mb-6" }, [
                          createVNode("div", { class: "h-[2px] w-2.5 bg-secondary mr-1" }),
                          createVNode("div", { class: "h-[2px] w-[27px] bg-primary" })
                        ]),
                        createVNode("div", { class: "space-y-4 font-medium" }, [
                          createVNode("p", { class: "text-sm" }, toDisplayString(columns[3]?.children?.[0]?.label || ""), 1),
                          createVNode("p", { class: "text-sm" }, toDisplayString(columns[3]?.children?.[1]?.label || ""), 1),
                          createVNode("div", { class: "flex items-center gap-1.5 pt-2" }, [
                            createVNode("img", {
                              src: _imports_1,
                              alt: "Visa",
                              class: "h-8 object-contain"
                            }),
                            createVNode("img", {
                              src: _imports_2,
                              alt: "MasterCard",
                              class: "h-8 object-contain"
                            }),
                            createVNode("img", {
                              src: _imports_3,
                              alt: "American Express",
                              class: "h-8 object-contain"
                            }),
                            createVNode("img", {
                              src: _imports_4,
                              alt: "Discover",
                              class: "h-8 object-contain"
                            }),
                            createVNode("img", {
                              src: _imports_5,
                              alt: "PayPal",
                              class: "h-8 object-contain"
                            })
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UContainer, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "flex justify-center" }, [
                        createVNode("img", {
                          src: _imports_0,
                          alt: "MỘC HOME",
                          class: "w-[117px]"
                        })
                      ]),
                      createVNode("ul", { class: "space-y-4 font-medium" }, [
                        createVNode("li", { class: "text-sm" }, " Chúng tôi mang đến nội thất đẹp, bền và tinh tế, giúp không gian sống của bạn trở nên hiện đại và tiện nghi hơn. "),
                        createVNode("li", { class: "text-sm flex items-center gap-2.5" }, [
                          createVNode("div", { class: "size-8 bg-primary rounded-full flex justify-center items-center" }, [
                            createVNode(_component_UIcon, { name: "i-lucide-phone" })
                          ]),
                          createTextVNode(" +84 348 706 723 ")
                        ]),
                        createVNode("li", { class: "text-sm flex items-center gap-2.5" }, [
                          createVNode("div", { class: "size-8 bg-primary rounded-full flex justify-center items-center" }, [
                            createVNode(_component_UIcon, { name: "i-lucide-map-pin" })
                          ]),
                          createTextVNode(" Công viên Quang Trung, HCM ")
                        ]),
                        createVNode("li", { class: "text-sm flex items-center gap-2.5" }, [
                          createVNode("div", { class: "size-8 bg-primary rounded-full flex justify-center items-center" }, [
                            createVNode(_component_UIcon, { name: "i-lucide-mail" })
                          ]),
                          createTextVNode(" mochome@gmail.com ")
                        ]),
                        createVNode("li", { class: "text-sm flex items-center gap-2.5" }, [
                          createVNode("div", { class: "size-8 bg-primary rounded-full flex justify-center items-center" }, [
                            createVNode(_component_UIcon, { name: "i-lucide-clock-3" })
                          ]),
                          createTextVNode(" Thứ hai - bảy (7:00 am - 5:00 pm) ")
                        ])
                      ])
                    ]),
                    (openBlock(true), createBlock(Fragment, null, renderList(columns.slice(0, -1), (column, index) => {
                      return openBlock(), createBlock("div", {
                        key: index,
                        class: "pt-[17px]"
                      }, [
                        createVNode("h3", { class: "text-lg font-semibold mb-[17px]" }, toDisplayString(column.label), 1),
                        createVNode("div", { class: "flex items-center mb-6" }, [
                          createVNode("div", { class: "h-[2px] w-2.5 bg-secondary mr-1" }),
                          createVNode("div", { class: "h-[2px] w-[27px] bg-primary" })
                        ]),
                        createVNode("ul", { class: "space-y-4 font-medium" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(column.children, (link, linkIndex) => {
                            return openBlock(), createBlock("li", { key: linkIndex }, [
                              link.to ? (openBlock(), createBlock(_component_ULink, {
                                key: 0,
                                to: link.to,
                                class: "text-sm hover:text-default transition-colors text-white"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(link.label), 1)
                                ]),
                                _: 2
                              }, 1032, ["to"])) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-sm"
                              }, toDisplayString(link.label), 1))
                            ]);
                          }), 128))
                        ])
                      ]);
                    }), 128)),
                    createVNode("div", { class: "pt-[17px]" }, [
                      createVNode("h3", { class: "text-lg font-semibold mb-[17px]" }, toDisplayString(columns[3]?.label || ""), 1),
                      createVNode("div", { class: "flex items-center mb-6" }, [
                        createVNode("div", { class: "h-[2px] w-2.5 bg-secondary mr-1" }),
                        createVNode("div", { class: "h-[2px] w-[27px] bg-primary" })
                      ]),
                      createVNode("div", { class: "space-y-4 font-medium" }, [
                        createVNode("p", { class: "text-sm" }, toDisplayString(columns[3]?.children?.[0]?.label || ""), 1),
                        createVNode("p", { class: "text-sm" }, toDisplayString(columns[3]?.children?.[1]?.label || ""), 1),
                        createVNode("div", { class: "flex items-center gap-1.5 pt-2" }, [
                          createVNode("img", {
                            src: _imports_1,
                            alt: "Visa",
                            class: "h-8 object-contain"
                          }),
                          createVNode("img", {
                            src: _imports_2,
                            alt: "MasterCard",
                            class: "h-8 object-contain"
                          }),
                          createVNode("img", {
                            src: _imports_3,
                            alt: "American Express",
                            class: "h-8 object-contain"
                          }),
                          createVNode("img", {
                            src: _imports_4,
                            alt: "Discover",
                            class: "h-8 object-contain"
                          }),
                          createVNode("img", {
                            src: _imports_5,
                            alt: "PayPal",
                            class: "h-8 object-contain"
                          })
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        bottom: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="h-px bg-white/20 mb-6"${_scopeId2}></div><div class="flex flex-col md:flex-row justify-between items-center gap-4"${_scopeId2}><p class="text-sm font-medium"${_scopeId2}> © Bản quyền 2025 <span class="text-success"${_scopeId2}>Mộc Home</span></p><div class="flex items-center gap-4"${_scopeId2}><p${_scopeId2}>Theo dõi:</p>`);
                  _push3(ssrRenderComponent(_component_ULink, {
                    to: "https://facebook.com",
                    target: "_blank",
                    class: "text-white hover:text-primary transition-colors"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UIcon, {
                          name: "i-lucide-facebook",
                          class: "size-5"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UIcon, {
                            name: "i-lucide-facebook",
                            class: "size-5"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ULink, {
                    to: "https://instagram.com",
                    target: "_blank",
                    class: "text-white hover:text-primary transition-colors"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UIcon, {
                          name: "i-lucide-instagram",
                          class: "size-5"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UIcon, {
                            name: "i-lucide-instagram",
                            class: "size-5"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ULink, {
                    to: "https://twitter.com",
                    target: "_blank",
                    class: "text-white hover:text-primary transition-colors"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UIcon, {
                          name: "i-tabler-brand-tiktok",
                          class: "size-5"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UIcon, {
                            name: "i-tabler-brand-tiktok",
                            class: "size-5"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ULink, {
                    to: "https://youtube.com",
                    target: "_blank",
                    class: "text-white hover:text-primary transition-colors"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UIcon, {
                          name: "i-lucide-youtube",
                          class: "size-5"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UIcon, {
                            name: "i-lucide-youtube",
                            class: "size-5"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "h-px bg-white/20 mb-6" }),
                    createVNode("div", { class: "flex flex-col md:flex-row justify-between items-center gap-4" }, [
                      createVNode("p", { class: "text-sm font-medium" }, [
                        createTextVNode(" © Bản quyền 2025 "),
                        createVNode("span", { class: "text-success" }, "Mộc Home")
                      ]),
                      createVNode("div", { class: "flex items-center gap-4" }, [
                        createVNode("p", null, "Theo dõi:"),
                        createVNode(_component_ULink, {
                          to: "https://facebook.com",
                          target: "_blank",
                          class: "text-white hover:text-primary transition-colors"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UIcon, {
                              name: "i-lucide-facebook",
                              class: "size-5"
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ULink, {
                          to: "https://instagram.com",
                          target: "_blank",
                          class: "text-white hover:text-primary transition-colors"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UIcon, {
                              name: "i-lucide-instagram",
                              class: "size-5"
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ULink, {
                          to: "https://twitter.com",
                          target: "_blank",
                          class: "text-white hover:text-primary transition-colors"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UIcon, {
                              name: "i-tabler-brand-tiktok",
                              class: "size-5"
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ULink, {
                          to: "https://youtube.com",
                          target: "_blank",
                          class: "text-white hover:text-primary transition-colors"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UIcon, {
                              name: "i-lucide-youtube",
                              class: "size-5"
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UContainer, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "h-px bg-white/20 mb-6" }),
                  createVNode("div", { class: "flex flex-col md:flex-row justify-between items-center gap-4" }, [
                    createVNode("p", { class: "text-sm font-medium" }, [
                      createTextVNode(" © Bản quyền 2025 "),
                      createVNode("span", { class: "text-success" }, "Mộc Home")
                    ]),
                    createVNode("div", { class: "flex items-center gap-4" }, [
                      createVNode("p", null, "Theo dõi:"),
                      createVNode(_component_ULink, {
                        to: "https://facebook.com",
                        target: "_blank",
                        class: "text-white hover:text-primary transition-colors"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "i-lucide-facebook",
                            class: "size-5"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ULink, {
                        to: "https://instagram.com",
                        target: "_blank",
                        class: "text-white hover:text-primary transition-colors"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "i-lucide-instagram",
                            class: "size-5"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ULink, {
                        to: "https://twitter.com",
                        target: "_blank",
                        class: "text-white hover:text-primary transition-colors"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "i-tabler-brand-tiktok",
                            class: "size-5"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ULink, {
                        to: "https://youtube.com",
                        target: "_blank",
                        class: "text-white hover:text-primary transition-colors"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "i-lucide-youtube",
                            class: "size-5"
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layouts/Main/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "LayoutsMainFooter" });
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutsMainHeader = __nuxt_component_0;
      const _component_LayoutsMainBreadcrumb = _sfc_main$3;
      const _component_LayoutsMainFooter = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_LayoutsMainHeader, null, null, _parent));
      _push(`<div class="bg-[#f5f7fe]/50 dark:bg-[#0f172a]"><div>`);
      if (unref(route).path !== "/") {
        _push(ssrRenderComponent(_component_LayoutsMainBreadcrumb, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_LayoutsMainFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-CdNJKum4.mjs.map
