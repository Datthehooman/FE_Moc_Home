<template>
  <div>
    <div class="text-center mb-11.5">
      <p class="font-bold text-primary leading-7 uppercase tracking-widest">
        BLOG CỦA CHÚNG TÔI
      </p>
      <p class="font-medium text-[32px]">
        Tin tức & <span class="text-info">Blog</span> mới nhất của chúng tôi
      </p>
    </div>

    <div class="flex justify-between items-center gap-6">
      <SharedBlogCard
        v-for="article in articles.slice(0, 3)"
        :key="article.id"
        :article="article"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    articles: {
      id: number;
      title: string;
      content: string;
      slug: string;
      image: string | null;
      created_at: string;
    }[];
  }>();
</script>
