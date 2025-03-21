<template>
  <a-row :gutter="20">
    <a-col :span="16" class="carousel-col">
      <CarouselCard/>
    </a-col>
    <a-col :span="8" class="datetime-col">
      <DateTimeCard/>
    </a-col>
  </a-row>
</template>

<script>
import CarouselCard from '@/components/Home/CarouselCard.vue';
import DateTimeCard from '@/components/Home/DateTimeCard.vue';

export default {
  name: 'CarouselDateTimeCard',
  components: {
    CarouselCard,
    DateTimeCard,
  },
}
</script>

<style scoped>
/* 默认情况下 Carousel 占据 16 格，DateTimeCard 占据 8 格 */
.carousel-col {
  transition: flex 0.6s ease;
}
.datetime-col {
  transition: flex 0.6s ease, visibility 0.3s ease, opacity 0.3s ease;
}

/* 屏幕宽度小于 768px 时隐藏 DateTimeCard 并让 CarouselCard 占据所有空间 */
@media (max-width: 1400px) {
  .datetime-col {
    visibility: hidden; /* 元素不可见 */
    position: absolute; /* 脱离文档流 */
    opacity: 0; /* 渐隐效果 */
    height: 0; /* 防止占用空间 */
    overflow: hidden;
  }
  .carousel-col {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

/* 恢复显示 */
@media (min-width: 1401px) {
  .datetime-col {
    visibility: visible; /* 恢复可见 */
    position: static; /* 回归文档流 */
    opacity: 1; /* 渐显效果 */
    height: auto;
  }
  .carousel-col {
    flex: 0 0 66.6667%; /* 恢复为 16 列 */
    max-width: 66.6667%;
  }
}
</style>