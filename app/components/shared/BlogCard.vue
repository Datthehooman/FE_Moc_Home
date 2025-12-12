<template>
  <div class="w-[411px] h-135">
    <div class="w-full h-70 rounded-xl overflow-hidden relative mb-[9px]">
      <NuxtImg
        :key="article.thumbnail"
        :src="article.thumbnail ? article.thumbnail + `?v=${article.id}` : ''"
        class="w-full h-full object-cover z-0"
        alt="Blog Image"
      />
      <div
        class="h-[43px] bg-info rounded-tl-4xl rounded-br-xl absolute bottom-0 right-0 z-20 items-center flex justify-center text-center text-sm font-medium pl-[15px] pr-[5px]"
      >
        <UIcon name="i-lucide-calendar-days" /> {{ article.created_at }}
      </div>
    </div>

    <div class="flex items-center leading-[27px] text-[15px] mb-[15px]">
      <div class="flex items-center mr-6">
        <UIcon
          class="text-primary size-[17px] mr-2"
          name="i-lucide-circle-user-round"
        />
        Bởi Tiến Quân
      </div>
      <div class="flex items-center">
        <UIcon
          class="text-primary size-[17px] mr-2"
          name="i-lucide-messages-square"
        />
        3.5k Bình luận
      </div>
    </div>

    <div class="h-[1px] bg-[#ebebeb] mb-3"></div>

    <NuxtLink
      :to="`/articles/${article.slug}`"
      class="block hover:text-primary transition-colors duration-300"
    >
      <p class="text-xl font-medium mb-[11px] line-clamp-2">
        {{ article.title }}
      </p>
      <p class="font-medium mb-3 text-muted line-clamp-3">
        {{ contentSnippet }}
      </p>
    </NuxtLink>

    <UButton
      :to="`/articles/${article.slug}`"
      size="xl"
      variant="solid"
      class="relative bg-info text-black rounded-md overflow-hidden group transition-all duration-500 hover:rounded-md ease-out w-fit h-12 mb-7"
    >
      <span
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500 ease-out w-32 h-32"
      ></span>
      <span
        class="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500"
      >
        <span>Xem thêm</span>
        <UIcon name="i-lucide-arrow-right"></UIcon>
      </span>
    </UButton>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";

  // Định nghĩa props để nhận đối tượng bài viết
  const props = defineProps<{
    article?: {
      id: number;
      title: string;
      content: string;
      slug: string;
      thumbnail: string | null;
      created_at: string; // Đã được format từ index.vue
      // ... các trường khác
    };
  }>();

  // Default article object
  const defaultArticle = {
    id: 0,
    title: "Chưa có tiêu đề",
    content: "Chưa có nội dung",
    slug: "#",
    image: null,
    created_at: new Date().toISOString(),
  };

  const article = computed(() => props.article || defaultArticle);

  /**
   * Computed property để cắt ngắn nội dung cho phần tóm tắt (snippet)
   * Đồng thời loại bỏ các thẻ HTML nếu có trong nội dung.
   */
  const contentSnippet = computed(() => {
    // Độ dài tối đa cho phần tóm tắt
    const maxLength = 120;

    // Loại bỏ thẻ HTML trước
    const cleanContent = (article.value.content || "")
      .replace(/<[^>]*>/g, "")
      .trim();

    if (cleanContent.length <= maxLength) {
      return cleanContent;
    }

    // Cắt chuỗi
    let truncated = cleanContent.substring(0, maxLength);

    // Tìm vị trí của dấu cách cuối cùng trước khi cắt để tránh cắt giữa từ
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace !== -1) {
      truncated = truncated.substring(0, lastSpace);
    }

    return truncated.trim() + "...";
  });
</script>
