<template>
  <div class="flex justify-center bg-[#FFFBF8] min-h-screen">
    <div class="flex w-full max-w-[85%]">
      <!-- Sidebar -->
      <ModulesUserAccountSidebar />

      <!-- Main -->
      <main class="flex-1 p-6">
        <!-- BOX 1 - THÔNG TIN HỒ SƠ -->
        <section class="bg-white rounded-xl p-5 shadow mb-6">
          <h3 class="font-semibold text-gray-700 text-[20px]">
            Thông tin hồ sơ
          </h3>
          <hr class="border-t border-gray-200 my-4" />

          <form @submit.prevent="saveProfile" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <input
                v-model="form.firstName"
                type="text"
                placeholder="Họ"
                class="h-[50px] px-4 border border-gray-300 rounded-[10px] outline-none"
              />
              <input
                v-model="form.lastName"
                type="text"
                placeholder="Tên"
                class="h-[50px] px-4 border border-gray-300 rounded-[10px] outline-none"
              />
            </div>
            <input
              v-model="form.email"
              type="email"
              placeholder="Email"
              readonly
              class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px] outline-none bg-gray-100 text-gray-400 cursor-not-allowed"
            />
            <input
              v-model="form.phone"
              type="text"
              placeholder="Số điện thoại"
              class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px] outline-none"
            />

            <input
              v-model="form.address"
              type="text"
              placeholder="Địa chỉ"
              class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px] outline-none"
            />

            <button
              class="relative overflow-hidden px-6 py-3 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex justify-center items-center group transition-colors duration-500"
            >
              <span class="absolute inset-0 flex justify-center items-center">
                <span
                  class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100"
                ></span>
              </span>
              <span
                class="relative z-10 group-hover:text-white text-[15px] transition-colors duration-300"
              >
                Lưu thay đổi
              </span>
            </button>

            <p v-if="profileError" class="text-red-500 text-sm">
              {{ profileError }}
            </p>
          </form>
        </section>

        <!-- BOX 2 - ĐỔI MẬT KHẨU -->
        <section class="bg-white rounded-xl p-5 shadow">
      <h3 class="font-semibold text-gray-700 text-[20px]">Đổi mật khẩu</h3>
      <hr class="border-t border-gray-200 my-4">

      <form @submit.prevent="changePasswordHandler" class="space-y-4">
        <input v-model="password.old" type="password" placeholder="Mật khẩu cũ"
          class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px]">
       <input 
  v-model="password.newPass" 
  type="password" 
  placeholder="Mật khẩu mới"
  class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px]"
  @paste.prevent
/>

<input 
  v-model="password.confirm" 
  type="password" 
  placeholder="Nhập lại mật khẩu mới"
  class="h-[50px] w-full px-4 border border-gray-300 rounded-[10px]"
  @paste.prevent
/>


        <button
          class="relative overflow-hidden px-6 py-3 bg-[#FED8B2] rounded-[10px] text-black font-medium shadow flex justify-center items-center group transition-colors duration-500">
          <span class="absolute inset-0 flex justify-center items-center">
            <span class="w-1 h-1 bg-black rounded-full opacity-0 scale-0 transition-all duration-500 ease-out group-hover:scale-[150] group-hover:opacity-100"></span>
          </span>
          <span class="relative z-10 group-hover:text-white text-[15px] transition-colors duration-300">
            Thay đổi mật khẩu
          </span>
        </button>

        <p v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</p>
      </form>
    </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({ middleware: "auth" });
  import { ref, onMounted } from "vue";
  import { useAuth } from "@/composables/useAuth";

  const auth = useAuth();
  const toast = useToast();

  const form = ref({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const password = ref({
    old: "",
    newPass: "",
    confirm: "",
  });

  const profileError = ref("");
  const passwordError = ref("");

  // Load thông tin user lên form
  onMounted(async () => {
    const profile = await auth.fetchUserProfile();
    if (profile) {
      const nameParts = profile.full_name.split(" ");
      form.value.firstName = nameParts.slice(0, -1).join(" ");
      form.value.lastName = nameParts.slice(-1).join(" ");
      form.value.email = profile.email;
      form.value.phone = profile.phone;
      form.value.address = profile.address || "";
    }
  });

  // Lưu profile, dùng composable updateUserProfile
  const saveProfile = async () => {
    // Validate cơ bản
    if (!form.value.firstName || !form.value.lastName || !form.value.phone) {
      profileError.value = "Vui lòng nhập đầy đủ thông tin.";
      return;
    }
    if (!/^[0-9]{9,11}$/.test(form.value.phone)) {
      profileError.value = "Số điện thoại không hợp lệ.";
      return;
    }
    const phone = form.value.phone.replace(/\s|-/g, "");
    if (!/^(0|\+84)\d{9}$/.test(phone)) {
      profileError.value = "Số điện thoại không hợp lệ.";
      return;
    }

    profileError.value = "";
    // Nối firstName + lastName thành full_name
    const fullName = `${form.value.firstName.trim()} ${form.value.lastName.trim()}`;

    const payload = {
      full_name: fullName,
      phone: form.value.phone.trim(),
      address: form.value.address?.trim() || "",
    };

    try {
      const res = await auth.updateUserProfile(payload);
      if (res.success) {
        toast.add({
          title: "✅ Lưu thành công!",
          color: "success",
        });
        // Cập nhật lại form từ dữ liệu trả về
        const nameParts = res.data.full_name.split(" ");
        form.value.firstName = nameParts.slice(0, -1).join(" ");
        form.value.lastName = nameParts.slice(-1).join(" ");
        form.value.phone = res.data.phone;
        form.value.address = res.data.address || "";
      } else {
        profileError.value = res.message || "Lưu thông tin thất bại.";
      }
    } catch (err: any) {
      profileError.value = err.message || "Lưu thông tin thất bại.";
    }
  };

  // Đổi mật khẩu demo (có thể gọi API thực tế nếu backend hỗ trợ)
 const changePasswordHandler = async () => {
  if (!password.value.old || !password.value.newPass || !password.value.confirm) {
    passwordError.value = "Không được bỏ trống.";
    return;
  }
  if (password.value.newPass !== password.value.confirm) {
    passwordError.value = "Mật khẩu mới không trùng khớp.";
    return;
  }

  passwordError.value = "";

  // Call API thực tế
  const res = await auth.changePassword({
    old_password: password.value.old,
    new_password: password.value.newPass,
    new_password_confirmation: password.value.confirm,
  });

  if (res.success) {
    toast.add({
      title: "🔐 Đổi mật khẩu thành công, vui lòng đăng nhập lại!",
      color: "success",
    });

    // Xóa token cũ (logout) → redirect login
    auth.logout();

    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  } else {
    passwordError.value = res.message;
  }
};

</script>
