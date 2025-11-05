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
    <div class="flex justify-between items-center">
      <SharedBlogCard v-for="blog in 3" />
    </div>
  </div>
</template>
<script lang="ts" setup></script>
