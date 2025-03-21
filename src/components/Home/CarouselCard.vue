<template>
  <a-card :bordered="false">
    <a-carousel
      :auto-play='{ interval: 6000, hoverToPause: true }'
      class="carousel"
      show-arrow="never"
      direction="vertical"
      indicator-position="right"
      indicator-type="line"
    >
      <a-carousel-item v-for="(image, index) in images" :key="index" class="carousel-item">
        <img
          :src="image"
          :style="{
            width: '100%',
          }"
        />
      </a-carousel-item>
    </a-carousel>
  </a-card>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'CarouselCard',
  setup() {
    const images = ref([
      new URL('@/assets/images/carousel/0.jpg', import.meta.url).href,
      new URL('@/assets/images/carousel/1.jpg', import.meta.url).href,
      new URL('@/assets/images/carousel/2.jpg', import.meta.url).href,
      new URL('@/assets/images/carousel/3.jpg', import.meta.url).href,
    ]);

    return {
      images,
    };
  }
}

</script>

<style scoped>
.carousel {
  height: 500px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>