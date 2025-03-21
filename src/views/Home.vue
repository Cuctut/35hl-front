<template>
  <a-layout>
    <WelcomeCard/>
    <a-space direction="vertical" :size="60" class="space">
      <CarouselDateTimeCard/>
      <JumpCard card-type="materials"/>
      <JumpCard card-type="exercises"/>
      <RecentUpdate/>
    </a-space>
  </a-layout>
</template>

<script>
import WelcomeCard from '@/components/Home/WelcomeCard.vue';
import CarouselDateTimeCard from '@/components/Home/CarouselDateTimeCard.vue';
import JumpCard from '@/components/Home/JumpCard.vue';
import RecentUpdate from '@/components/Home/RecentUpdate.vue';

export default {
  components: {
    WelcomeCard,
    CarouselDateTimeCard,
    JumpCard,
    RecentUpdate,
  },
  setup() {

  },
};
</script>

<style scoped>
.space {
  margin: 40px 60px;
}
</style>
