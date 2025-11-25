<template>
  <div>
    <div
      class="flex flex-col items-center text-center w-full sm:w-[190px] h-[200px] sm:h-[260px] border border-success rounded-2xl sm:rounded-4xl justify-center cursor-pointer hover:border-primary transition-colors duration-300 ease-out group"
    >
      <div
        class="bg-success w-[120px] h-[120px] sm:w-[165px] sm:h-[165px] flex items-center justify-center rounded-full overflow-hidden"
      >
        <NuxtImg
          :src="image || '/image 17.png'"
          class="w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] object-contain transition-transform duration-300 ease-out group-hover:scale-125"
          :alt="title || 'Phòng ngủ'"
        />
      </div>
      <p
        class="font-bold text-sm sm:text-base transition-colors duration-300 ease-out group-hover:text-primary mt-2"
      >
        {{ title || "Phòng ngủ" }}
      </p>
      <p class="text-xs sm:text-sm text-dimmed">
        {{ roomCount || 0 }} sản phẩm
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    id: number;
    image?: string;
    title?: string;
  }>();
  const { roomCount } = useRoomCount(props.id);
</script>
