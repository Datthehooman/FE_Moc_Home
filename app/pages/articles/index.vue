<template>
  <UContainer class="lg:px-0 pt-[87px]">
    <div class="text-center mb-11.5">
      <p class="font-bold text-primary leading-7 uppercase tracking-widest">
        BLOG CỦA CHÚNG TÔI
      </p>
      <p class="font-medium text-[32px]">
        Tin tức & <span class="text-info">Blog</span> mới nhất của chúng tôi
      </p>
    </div>

    <div class="flex flex-wrap gap-3 mb-8 justify-center">
      <UButton
        label="Tất cả"
        :color="!selectedCategorySlug ? 'primary' : 'neutral'"
        :variant="!selectedCategorySlug ? 'solid' : 'ghost'"
        class="rounded-xl"
        @click="selectCategory(null)"
        :disabled="loading"
      />
      <UButton
        v-for="category in categories"
        :key="category.id"
        :label="category.name"
        :color="selectedCategorySlug === category.slug ? 'primary' : 'neutral'"
        :variant="selectedCategorySlug === category.slug ? 'solid' : 'ghost'"
        class="rounded-xl"
        @click="selectCategory(category.slug)"
        :disabled="loading"
      />
    </div>

    <div v-if="loading" class="text-center py-10">
      <p>Đang tải bài viết...</p>
    </div>
    <div v-else-if="error" class="text-center py-10 text-red-500">
      Lỗi khi tải dữ liệu: {{ error }}
    </div>
    <div v-else-if="!articles.length" class="text-center py-10 text-gray-500">
      Không tìm thấy bài viết nào.
    </div>

    <div v-else class="grid grid-cols-3 gap-6 mb-15">
      <SharedBlogCard 
        v-for="article in articles" 
        :key="article.id" 
        :article="article" 
      />
      
      </div>

    <div class="flex justify-center mb-17">
      <UPagination
        v-model:page="page"
        :total="totalArticles"
        :page-count="perPage"
        :ui="{ list: 'gap-2.5' }"
        @update:page="fetchData"
        :disabled="loading"
      >
        <template #first>
          <UButton
            icon="i-lucide-chevrons-left"
            class="text-white! bg-black! hover:bg-primary! size-10 justify-center rounded-xl cursor-pointer"
            color="neutral"
            variant="ghost"
            square
          />
        </template>
        <template #prev>
          <UButton
            icon="i-lucide-chevron-left"
            class="text-white! bg-black! hover:bg-primary! size-10 justify-center rounded-xl cursor-pointer"
            color="neutral"
            variant="ghost"
            square
          />
        </template>
        <template #item="{ item, page: currentPage }">
          <UButton
            v-if="item.type === 'page'"
            :label="String(item.value)"
            :color="item.value === currentPage ? 'primary' : 'neutral'"
            :variant="item.value === currentPage ? 'solid' : 'ghost'"
            class="text-white! bg-black! hover:bg-primary! size-10 justify-center rounded-xl cursor-pointer"
            :class="{ 'bg-primary!': item.value === currentPage }"
          />
        </template>
        <template #next>
          <UButton
            icon="i-lucide-chevron-right"
            class="text-white! bg-black! hover:bg-primary! size-10 justify-center rounded-xl cursor-pointer"
            color="neutral"
            variant="ghost"
            square
          />
        </template>
        <template #last>
          <UButton
            icon="i-lucide-chevrons-right"
            class="text-white! bg-black! hover:bg-primary! size-10 justify-center rounded-xl cursor-pointer"
            color="neutral"
            variant="ghost"
            square
          />
        </template>
      </UPagination>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  
  // 🔥 LƯU Ý: VUI LÒNG CHỈNH SỬA ĐƯỜNG DẪN IMPORT NÀY NẾU CẦN
  import { useArticle } from "~/composables/useArticle";
  import { useArticleCategory } from "~/composables/useArticleCategory";

  // Lấy các biến reactive TỪ HOOKS để đảm bảo đồng bộ trạng thái
  // Mặc dù bạn không dùng fetchArticles, nhưng vẫn cần articles, loading, error từ hook.
  const { articles, loading, error } = useArticle(); 
  const { categories, fetchCategories } = useArticleCategory();

  // Biến local cho Phân trang
  const page = ref(1);
  const perPage = 10; 
  const totalArticles = ref(0); // GIÁ TRỊ NÀY SẼ ĐƯỢC CẬP NHẬT TỪ API

  // Biến cho Lọc theo Danh mục
  const selectedCategorySlug = ref<string | null>(null);

  /**
   * Hàm chính để fetch dữ liệu, dựa trên danh mục đã chọn và trang hiện tại.
   */
  const fetchData = async () => {
    loading.value = true;
    error.value = null;
    articles.value = []; // Reset danh sách trước khi fetch

    const params = {
      page: page.value,
      per_page: perPage,
    };

    try {
      if (selectedCategorySlug.value) {
        // Fetch theo danh mục
        const res: any = await $fetch(
          `https://api.mocfurni.shop/api/client/articles/category/${selectedCategorySlug.value}`,
          { params }
        );
        
        // 🛠️ SỬA LỖI TRUY CẬP DATA & PAGINATION 
        articles.value = (res?.result?.data ?? []).map((a: any) => ({
          ...a,
          created_at: a.created_at
            ? new Date(a.created_at).toLocaleDateString("vi-VN")
            : "",
        }));
        totalArticles.value = res?.result?.pagination?.total ?? 0;
        
      } else {
        // Fetch tất cả bài viết
        const res: any = await $fetch(
          "https://api.mocfurni.shop/api/client/articles",
          { params }
        );
        
        // 🛠️ SỬA LỖI TRUY CẬP DATA & PAGINATION
        articles.value = (res?.result?.data ?? []).map((a: any) => ({
          ...a,
          created_at: a.created_at
            ? new Date(a.created_at).toLocaleDateString("vi-VN")
            : "",
        }));
        totalArticles.value = res?.result?.pagination?.total ?? 0;
      }
      
      // LOG ĐỂ DEBUG (nếu bạn cần kiểm tra lại trên Console)
      console.log(`[DEBUG] Số lượng bài viết đã gán: ${articles.value.length}`);
      console.log(`[DEBUG] Tổng số bài viết: ${totalArticles.value}`);
      
    } catch (err: any) {
      error.value = err?.data?.message || "Không thể tải bài viết";
      articles.value = [];
      totalArticles.value = 0;
      console.error("Lỗi khi fetch:", err);
    } finally {
      loading.value = false;
    }
  };


  /**
   * Xử lý khi chọn danh mục
   */
  const selectCategory = (slug: string | null) => {
    if (selectedCategorySlug.value === slug) return; 

    selectedCategorySlug.value = slug;
    page.value = 1; // Reset trang về 1 khi đổi danh mục
    fetchData(); // Tải lại dữ liệu
  };

  // 1. Tải danh sách danh mục và bài viết khi component được mount
  onMounted(async () => {
    // Lấy danh sách danh mục (dùng hook)
    await fetchCategories();
    
    // Lấy bài viết (dùng logic custom đã sửa để lấy pagination)
    await fetchData(); 
  });
</script>