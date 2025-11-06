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
    <div class="grid grid-cols-3 gap-6 mb-15">
      <SharedBlogCard v-for="blog in 6" />
    </div>
    <div class="flex justify-center mb-17">
      <UPagination v-model:page="page" :total="100" :ui="{ list: 'gap-2.5' }">
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
  const page = ref(1);
</script>
