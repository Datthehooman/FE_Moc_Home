import { b as _sfc_main$e } from './server.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { u as useAuth } from './useAuth-DSQAT-MN.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AccountSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    useAuth();
    const menuItems = [
      { name: "Thống kê", path: "/user/dashboard", icon: "heroicons:chart-bar" },
      { name: "Hồ sơ của tôi", path: "/user/profile", icon: "heroicons:user" },
      { name: "Danh sách đơn hàng", path: "/user/orders", icon: "heroicons:list-bullet" },
      { name: "Danh sách yêu thích", path: "/user/wishlist", icon: "heroicons:heart" },
      { name: "Danh sách địa chỉ", path: "/user/address", icon: "heroicons:map-pin" },
      { name: "Hỗ trợ", path: "/user/support", icon: "heroicons:lifebuoy" },
      { name: "Theo dõi đơn hàng", path: "/user/track-order", icon: "heroicons:truck" },
      { name: "Phương thức thanh toán", path: "/user/payment", icon: "heroicons:credit-card" },
      { name: "Thông báo", path: "/user/notifications", icon: "heroicons:bell" },
      { name: "Tin nhắn", path: "/user/messages", icon: "heroicons:chat-bubble-left-right" },
      { name: "Cài đặt", path: "/user/settings", icon: "heroicons:cog-6-tooth" },
      { name: "Đăng xuất", path: "/logout", icon: "heroicons:arrow-right-on-rectangle" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$e;
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "w-64 bg-white shadow-md rounded-r-xl p-4 flex flex-col mt-6 mb-6" }, _attrs))}><div class="flex flex-col items-center mb-4 relative"><div class="relative"><img src="https://live.themewild.com/fameo/assets/img/account/02.jpg" alt="Avatar" class="w-20 h-20 rounded-full border-2 border-gray-200"></div><h2 class="mt-2 font-semibold text-gray-800">Lê Phùng Tiến Quân</h2><p class="text-sm text-gray-400">quanlptps39861@gmail.com</p></div><hr class="border-t border-gray-200 mb-4"><nav class="flex-1"><ul class="space-y-2"><!--[-->`);
      ssrRenderList(menuItems, (item, index) => {
        _push(`<li class="rounded-[10px] cursor-pointer"><div class="${ssrRenderClass([unref(route).path === item.path ? "bg-[#6E4E37] text-white" : "bg-white text-gray-700 hover:bg-[#6E4E37] hover:text-white", "flex items-center gap-3 px-3 py-2 rounded-[10px] transition-colors duration-200"])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: item.icon,
          class: "w-5 h-5"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(item.name)}</span></div></li>`);
      });
      _push(`<!--]--></ul></nav></aside>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modules/User/AccountSidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "ModulesUserAccountSidebar" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=AccountSidebar-Cy5ujxZV.mjs.map
