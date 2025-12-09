<template>
  <UContainer class="lg:px-0 pt-16.5 flex justify-between">
    <div class="flex-1 pr-10">
      <div v-if="pending || loading" class="text-center py-20">
        <p>Đang tải bài viết...</p>
      </div>
      <div v-else-if="error" class="text-red-500 text-center py-20">
        {{ error }}
      </div>
      <div v-else-if="!article" class="text-gray-500 text-center py-20">
        Không tìm thấy bài viết.
      </div>
      <div v-else>
        <NuxtImg
          :src="article.image || '/Blog 2.png'"
          class="w-full h-auto rounded-md mb-[23px] object-cover"
          alt="Hình ảnh bài viết"
        />

        <div class="flex justify-between mb-[27px] text-sm">
          <div class="flex gap-7.5">
            <UButton
              variant="link"
              size="xs"
              color="primary"
              icon="i-lucide-calendar-days"
              :label="article.created_at"
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
              label="Lê Phùng Tiến Quân"
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
              icon="i-lucide-messages-square"
              label="3.2k Bình luận"
              :ui="{ leadingIcon: '!text-primary !size-3' }"
              class="text-black cursor-pointer font-semibold"
            />
            <UButton
              variant="link"
              size="xs"
              color="primary"
              icon="i-lucide-thumbs-up"
              label="1.4k thích"
              :ui="{ leadingIcon: '!text-primary !size-3' }"
              class="text-black cursor-pointer font-semibold"
            />
          </div>
        </div>

        <h1 class="text-[32px] font-bold mb-7">{{ article.title }}</h1>

        <div
          class="article-content prose max-w-none mb-5.5 text-lg font-medium"
          v-html="article.content"
        ></div>
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

      <div v-if="relatedArticles.length > 0">
        <h3 class="text-2xl font-semibold mb-6 border-b pb-3 border-gray-200">
          Bài viết gần đây
        </h3>
        <div class="space-y-6">
          <NuxtLink
            v-for="relArticle in relatedArticles"
            :key="relArticle.id"
            :to="`/articles/${relArticle.slug}`"
            class="flex gap-3 pb-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition p-2 rounded-md"
          >
            <div class="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
              <NuxtImg
                :src="relArticle.image || '/blog 1.png'"
                class="w-full h-full object-cover"
                alt="Hình ảnh bài viết liên quan"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="text-base font-medium line-clamp-2 hover:text-primary">
                {{ relArticle.title }}
              </h4>
              <p class="text-sm text-gray-500 line-clamp-2 mt-1">
                {{ truncateContent(relArticle.content, 50) }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div v-else class="text-gray-500">Không có bài viết gần đây.</div>


      </div>
  </UContainer>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useArticle } from "~/composables/useArticle";
import { useArticleCategory } from "~/composables/useArticleCategory";
import { computed } from "vue";
import { useAsyncData } from "#app";

const route = useRoute();
const articleSlug = route.params.slug as string;

const { articleDetail, fetchArticleDetail, loading, error } = useArticle();
const { categories, fetchCategories } = useArticleCategory();


const { pending } = useAsyncData(
  `article-detail-${articleSlug}`,
  async () => {
    await fetchArticleDetail(articleSlug);
    await fetchCategories();
  },
  {
    server: false,
    lazy: true,
  }
);

const article = computed(() => articleDetail.value?.article);
const relatedArticles = computed(
  () => articleDetail.value?.related_articles ?? []
);

/**
 * Hàm cắt ngắn nội dung (content) và loại bỏ thẻ HTML để hiển thị tóm tắt.
 */
const truncateContent = (content: string, maxLength: number = 120) => {
  const cleanContent = (content || "").replace(/<[^>]*>/g, "").trim();

  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  let truncated = cleanContent.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace !== -1) {
    truncated = truncated.substring(0, lastSpace);
  }

  return truncated.trim() + "...";
};
</script>