<template>
  <UContainer class="lg:px-0 pt-16.5 flex justify-between mb-30">
    <div class="flex-1 pr-10">
      <div v-if="isLoading" class="text-center py-20">
        <p>Đang tải bài viết...</p>
      </div>
      <div v-else-if="error" class="text-red-500 text-center py-20">
        {{ error }}
      </div>
      <div
        v-else-if="!articleDetail?.article"
        class="text-gray-500 text-center py-20"
      >
        Không tìm thấy bài viết.
      </div>
      <div v-else>
        <div
          v-if="articleDetail.article.image"
          class="w-full h-auto rounded-md mb-[23px] flex justify-center items-center"
        >
          <NuxtImg :src="articleDetail.article.image" alt="Hình ảnh bài viết" />
        </div>

        <div class="flex justify-between mb-[27px] text-sm">
          <div class="flex gap-7.5">
            <UButton
              variant="link"
              size="xs"
              color="primary"
              icon="i-lucide-calendar-days"
              :label="articleDetail.article.created_at"
              :ui="{
                base: 'hover:!text-black',
                leadingIcon: '!text-primary !size-3',
              }"
              class="text-black font-semibold"
            />
            <UButton
              variant="link"
              size="xs"
              color="primary"
              icon="i-lucide-circle-user-round"
              :label="articleDetail.article.name || 'Ẩn danh'"
              :ui="{
                base: 'hover:!text-black',
                leadingIcon: '!text-primary !size-3',
              }"
              class="text-black font-semibold"
            />
            <UButton
              v-if="articleDetail.article.category"
              variant="link"
              size="xs"
              color="primary"
              icon="i-lucide-folder"
              :label="articleDetail.article.category.name"
              :ui="{ leadingIcon: '!text-primary !size-3' }"
              class="text-black cursor-pointer font-semibold"
            />
            <UButton
              variant="link"
              size="xs"
              color="primary"
              icon="i-lucide-eye"
              :label="`${articleDetail.article.view || 0} lượt xem`"
              :ui="{ leadingIcon: '!text-primary !size-3' }"
              class="text-black cursor-pointer font-semibold"
            />
          </div>
        </div>

        <h1 class="text-[32px] font-bold mb-7">
          {{ articleDetail.article.title }}
        </h1>

        <MdPreview :id="id" :modelValue="articleDetail.article.content || ''" />
      </div>
    </div>

    <div class="w-[30%] pt-16.5 space-y-10">
      <div v-if="categories.length > 0">
        <h3 class="text-2xl font-semibold mb-6 border-b pb-3 border-gray-200">
          Danh mục Bài viết
        </h3>
        <ul class="space-y-1">
          <li v-for="category in categories" :key="category.id">
            <UButton
              :to="`/articles`"
              variant="link"
              class="justify-between w-full hover:text-primary transition-colors !px-0"
            >
              <span class="font-medium text-lg">{{ category.name }}</span>
              <UIcon name="i-lucide-arrow-right" class="text-primary" />
            </UButton>
          </li>
        </ul>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
  import { useRoute } from "vue-router";
  import { useArticle } from "~/composables/useArticle";
  import { useArticleCategory } from "~/composables/useArticleCategory";
  import { watch, ref } from "vue";
  import { MdPreview } from "md-editor-v3";
  import "md-editor-v3/lib/preview.css";

  const id = "preview-only";
  const route = useRoute();

  const { articleDetail, fetchArticleDetail, error } = useArticle();
  const { categories, fetchCategories } = useArticleCategory();

  // Use local loading state to properly track fetch status
  const isLoading = ref(true);

  // Fetch data when slug changes
  const fetchData = async () => {
    const slug = route.params.slug as string;
    if (slug) {
      isLoading.value = true;
      await Promise.all([fetchArticleDetail(slug), fetchCategories()]);
      isLoading.value = false;
    }
  };

  // Initial fetch
  fetchData();

  // Watch for slug changes (when navigating between articles)
  watch(
    () => route.params.slug,
    (newSlug, oldSlug) => {
      if (newSlug && newSlug !== oldSlug) {
        fetchData();
      }
    },
    { immediate: false }
  );
</script>
<style scoped>
  #preview-only {
    @apply bg-[#FFFBF8];
  }
</style>
