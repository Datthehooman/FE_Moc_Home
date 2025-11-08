import { ref, reactive, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = {
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const selectedProvince = ref("");
    const selectedDistrict = ref("");
    const selectedWard = ref("");
    const districts = ref([]);
    const wards = ref([]);
    const provinces = ref([
      { name: "TP Hồ Chí Minh", districts: [{ name: "Quận 1", wards: ["Bến Nghé", "Bến Thành", "Phạm Ngũ Lão"] }, { name: "Quận 3", wards: ["Phường 1", "Phường 2", "Phường 3"] }, { name: "Bình Thạnh", wards: ["Phường 11", "Phường 12", "Phường 13"] }] },
      { name: "Cần Thơ", districts: [{ name: "Ninh Kiều", wards: ["An Bình", "An Khánh", "Xuân Khánh"] }, { name: "Bình Thủy", wards: ["Long Hòa", "Trà An", "Thới An Đông"] }] },
      { name: "Đồng Nai", districts: [{ name: "Biên Hòa", wards: ["Tân Mai", "Tân Phong", "Hiệp Hòa"] }, { name: "Long Thành", wards: ["An Phước", "Lộc An", "Phước Bình"] }] },
      { name: "Bình Dương", districts: [{ name: "Thủ Dầu Một", wards: ["Phú Hòa", "Hiệp Thành", "Chánh Nghĩa"] }, { name: "Dĩ An", wards: ["Dĩ An", "Tân Đông Hiệp", "Bình An"] }] },
      { name: "Bà Rịa - Vũng Tàu", districts: [{ name: "Vũng Tàu", wards: ["Thắng Nhất", "Thắng Nhì", "Thắng Tam"] }, { name: "Bà Rịa", wards: ["Phước Hiệp", "Phước Nguyên", "Long Hương"] }] }
    ]);
    const selectedShipping = ref("");
    const paymentMethod = ref("");
    const selectedBank = ref("");
    const shippingMethods = [
      { name: "Tiêu chuẩn", desc: "6–7 ngày", price: "Miễn phí" },
      { name: "Nhanh", desc: "3–4 ngày", price: "30.000 đ" },
      { name: "Hỏa tốc", desc: "1–2 ngày", price: "200.000 đ" },
      { name: "Tại cửa hàng", desc: "Lấy trực tiếp", price: "Free" }
    ];
    const banks = [
      { name: "Vietcombank", logo: "/vietcombank.png" },
      { name: "Techcombank", logo: "/techcombank.png" },
      { name: "MB Bank", logo: "/mbbank.png" },
      { name: "ACB", logo: "/acb.png" },
      { name: "VPBank", logo: "/vpbank.png" },
      { name: "BIDV", logo: "/bidv.png" }
    ];
    const form = reactive({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      addressDetail: "",
      note: ""
    });
    const errors = reactive({});
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-[#FFFBF8] min-h-screen py-10 px-4" }, _attrs))}><div class="max-w-[90%] mx-auto flex flex-col lg:flex-row gap-8 justify-between"><div class="flex-[2.3] bg-white rounded-2xl border border-gray-200 p-6 shadow-sm w-full"><h2 class="text-xl font-semibold text-[#6E4E37] mb-6"> Địa chỉ thanh toán của bạn </h2><form class="space-y-6 text-[14px]"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block font-medium mb-1 text-[#6E4E37]">Họ</label><input type="text"${ssrRenderAttr("value", form.firstName)} placeholder="Nhập họ của bạn" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#A77A5D]">`);
      if (errors.firstName) {
        _push(`<p class="text-red-500 text-xs mt-1">${ssrInterpolate(errors.firstName)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block font-medium mb-1 text-[#6E4E37]">Tên</label><input type="text"${ssrRenderAttr("value", form.lastName)} placeholder="Nhập tên của bạn" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#A77A5D]">`);
      if (errors.lastName) {
        _push(`<p class="text-red-500 text-xs mt-1">${ssrInterpolate(errors.lastName)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block font-medium mb-1 text-[#6E4E37]">Email</label><input type="email"${ssrRenderAttr("value", form.email)} placeholder="Nhập email" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#A77A5D]">`);
      if (errors.email) {
        _push(`<p class="text-red-500 text-xs mt-1">${ssrInterpolate(errors.email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block font-medium mb-1 text-[#6E4E37]">Số điện thoại</label><input type="text"${ssrRenderAttr("value", form.phone)} placeholder="Nhập số điện thoại" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#A77A5D]">`);
      if (errors.phone) {
        _push(`<p class="text-red-500 text-xs mt-1">${ssrInterpolate(errors.phone)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><label class="block font-medium mb-1 text-[#6E4E37]">Địa chỉ</label><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><select class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#A77A5D]"><option disabled value=""${ssrIncludeBooleanAttr(Array.isArray(selectedProvince.value) ? ssrLooseContain(selectedProvince.value, "") : ssrLooseEqual(selectedProvince.value, "")) ? " selected" : ""}>Tỉnh / Thành phố</option><!--[-->`);
      ssrRenderList(provinces.value, (p) => {
        _push(`<option${ssrRenderAttr("value", p.name)}${ssrIncludeBooleanAttr(Array.isArray(selectedProvince.value) ? ssrLooseContain(selectedProvince.value, p.name) : ssrLooseEqual(selectedProvince.value, p.name)) ? " selected" : ""}>${ssrInterpolate(p.name)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (errors.province) {
        _push(`<p class="text-red-500 text-xs mt-1">${ssrInterpolate(errors.province)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<select class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#A77A5D]"><option disabled value=""${ssrIncludeBooleanAttr(Array.isArray(selectedDistrict.value) ? ssrLooseContain(selectedDistrict.value, "") : ssrLooseEqual(selectedDistrict.value, "")) ? " selected" : ""}>Quận / Huyện</option><!--[-->`);
      ssrRenderList(districts.value, (d) => {
        _push(`<option${ssrRenderAttr("value", d.name)}${ssrIncludeBooleanAttr(Array.isArray(selectedDistrict.value) ? ssrLooseContain(selectedDistrict.value, d.name) : ssrLooseEqual(selectedDistrict.value, d.name)) ? " selected" : ""}>${ssrInterpolate(d.name)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (errors.district) {
        _push(`<p class="text-red-500 text-xs mt-1">${ssrInterpolate(errors.district)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3"><select class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#A77A5D]"><option disabled value=""${ssrIncludeBooleanAttr(Array.isArray(selectedWard.value) ? ssrLooseContain(selectedWard.value, "") : ssrLooseEqual(selectedWard.value, "")) ? " selected" : ""}>Xã / Phường</option><!--[-->`);
      ssrRenderList(wards.value, (w) => {
        _push(`<option${ssrRenderAttr("value", w)}${ssrIncludeBooleanAttr(Array.isArray(selectedWard.value) ? ssrLooseContain(selectedWard.value, w) : ssrLooseEqual(selectedWard.value, w)) ? " selected" : ""}>${ssrInterpolate(w)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (errors.ward) {
        _push(`<p class="text-red-500 text-xs mt-1">${ssrInterpolate(errors.ward)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input type="text"${ssrRenderAttr("value", form.addressDetail)} placeholder="Địa chỉ cụ thể" class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#A77A5D]">`);
      if (errors.addressDetail) {
        _push(`<p class="text-red-500 text-xs mt-1">${ssrInterpolate(errors.addressDetail)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><label class="block font-medium mb-1 text-[#6E4E37]">Ghi chú</label><textarea rows="4" placeholder="Nhập ghi chú (nếu có)" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-[#A77A5D]">${ssrInterpolate(form.note)}</textarea></div><div><h3 class="font-medium text-[#6E4E37] mb-3">Hình thức vận chuyển</h3><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><!--[-->`);
      ssrRenderList(shippingMethods, (ship, i) => {
        _push(`<label class="${ssrRenderClass([selectedShipping.value === ship.name ? "border-[#A77A5D] bg-[#A77A5D]/10" : "", "relative border border-gray-300 rounded-xl p-4 cursor-pointer hover:border-[#A77A5D] transition flex flex-col gap-1 items-start"])}"><input type="radio" name="shipping"${ssrRenderAttr("value", ship.name)}${ssrIncludeBooleanAttr(ssrLooseEqual(selectedShipping.value, ship.name)) ? " checked" : ""} class="absolute top-3 right-3 w-4 h-4 accent-[#A77A5D]"><strong>${ssrInterpolate(ship.name)}</strong><p class="text-xs text-gray-600">${ssrInterpolate(ship.desc)}</p><span class="text-sm font-medium text-[#A77A5D]">${ssrInterpolate(ship.price)}</span></label>`);
      });
      _push(`<!--]--></div>`);
      if (errors.shipping) {
        _push(`<p class="text-red-500 text-xs mt-1">${ssrInterpolate(errors.shipping)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><h3 class="font-medium text-[#6E4E37] mb-3">Phương thức thanh toán</h3><div class="flex flex-col gap-3"><label class="flex items-center gap-3 cursor-pointer"><input type="radio" name="payment" value="online"${ssrIncludeBooleanAttr(ssrLooseEqual(paymentMethod.value, "online")) ? " checked" : ""} class="accent-[#A77A5D] w-5 h-5"><span>Thanh toán Online</span></label><label class="flex items-center gap-3 cursor-pointer"><input type="radio" name="payment" value="offline"${ssrIncludeBooleanAttr(ssrLooseEqual(paymentMethod.value, "offline")) ? " checked" : ""} class="accent-[#A77A5D] w-5 h-5"><span>Thanh toán khi nhận hàng (Cọc 50%)</span></label></div>`);
      if (errors.paymentMethod) {
        _push(`<p class="text-red-500 text-xs mt-1">${ssrInterpolate(errors.paymentMethod)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (paymentMethod.value === "online") {
        _push(`<div class="mt-4"><h4 class="text-sm font-medium mb-2">Chọn ngân hàng</h4><div class="grid grid-cols-3 gap-4"><!--[-->`);
        ssrRenderList(banks, (bank, i) => {
          _push(`<label class="${ssrRenderClass([selectedBank.value === bank.name ? "border-[#A77A5D] bg-[#A77A5D]/10" : "", "relative border border-gray-300 rounded-lg p-2 flex justify-center items-center cursor-pointer hover:border-[#A77A5D] transition"])}"><input type="radio" name="bank"${ssrRenderAttr("value", bank.name)}${ssrIncludeBooleanAttr(ssrLooseEqual(selectedBank.value, bank.name)) ? " checked" : ""} class="absolute opacity-0"><img${ssrRenderAttr("src", bank.logo || "/placeholder.png")}${ssrRenderAttr("alt", bank.name)} class="w-14 h-10 object-contain">`);
          if (selectedBank.value === bank.name) {
            _push(`<div class="absolute top-2 right-2 w-4 h-4 bg-[#A77A5D] rounded-full flex items-center justify-center text-white text-xs">✓</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</label>`);
        });
        _push(`<!--]--></div>`);
        if (errors.selectedBank) {
          _push(`<p class="text-red-500 text-xs mt-1">${ssrInterpolate(errors.selectedBank)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (paymentMethod.value === "offline") {
        _push(`<div class="mt-4 text-sm text-gray-600"> Bạn cần <span class="text-[#A77A5D] font-semibold">cọc 50%</span> giá trị đơn hàng trước khi giao. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="w-full bg-[#A77A5D] hover:bg-[#8B6145] text-white font-semibold py-2 mt-5 rounded-lg transition"> Tiến hành thanh toán </button></form></div><div class="flex-[1] w-full max-w-[360px] bg-[#A77A5D]/10 rounded-2xl p-6 shadow-sm h-fit md:sticky md:top-10"><h2 class="text-lg font-semibold mb-4 text-[#6E4E37]">Hóa đơn</h2><div class="space-y-2 text-sm"><div class="flex justify-between"><span>Tạm tính:</span><span>450.000 đ</span></div><div class="flex justify-between"><span>Giảm giá:</span><span class="text-red-500">-50.000 đ</span></div><div class="flex justify-between"><span>Vận chuyển:</span><span>Free</span></div><div class="flex justify-between"><span>Thuế:</span><span>5.000 đ</span></div><div class="border-t pt-3 flex justify-between font-semibold"><span>Tổng tiền:</span><span>405.000 đ</span></div></div><button class="w-full bg-[#FED8B3] hover:bg-[#8B6145] text-black font-semibold py-2 mt-5 rounded-lg transition"> Tiến hành thanh toán </button>`);
      if (errors.general) {
        _push(`<p class="text-red-500 text-sm mt-2">${ssrInterpolate(errors.general)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<a href="/cart" class="flex items-center gap-2 text-sm mt-3 text-gray-600 hover:underline"> ← Quay lại giỏ hàng </a></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=checkout-U3bQXAa2.mjs.map
