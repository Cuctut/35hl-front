<template>
  <a-card title="习题板块" :bordered="false" class="exercises-card" :header-style="{ padding: '40px 20px' }" :body-style="{ padding: '40px 20px' }">
    <template #title>
      <div class="title">习题板块</div>
    </template>
    <div class="exercises-grid">
      <div v-for="(exercise, index) in exercises" :key="index" class="exercise-card" @mouseover="mouseOn = index" @mouseleave="mouseOn = ''">
        <div class="exercise-header">
          <h3 class="exercise-title">{{ exercise.title }}</h3>
          <a-button type="primary" class="view-btn" v-show="mouseOn === index">查看习题</a-button>
        </div>
        <img
          v-if="exercise.image"
          :src="exercise.image"
          alt="习题图片"
          class="exercise-image"
        />
      </div>
    </div>
  </a-card>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'ExercisesCard',
  setup() {
    const mouseOn = ref('');
    const exercises = [
      { title: '必修一', image: '' },
      { title: '必修二', image: '' },
      { title: '选修一', image: '' },
      { title: '选修二', image: '' },
      { title: '选修三', image: '' },
    ];

    return {
      mouseOn,
      exercises,
    };
  },
};
</script>

<style scoped>
.exercises-card {
  width: 100%;
  margin: 0 20px;
}
.title {
  font-size: 24px;
  font-weight: bold;
}

.exercises-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 50px;
}

@media (max-width: 2560px) {
  .exercises-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 1480px) {
  .exercises-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 576px) {
  .exercises-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.exercise-card {
  /* background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%); */
  background-image: linear-gradient(-20deg, #c5d8ee 0%, #fbfcdb 100%);
  position: relative;
  height: 150px;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.exercise-card:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}

.exercise-header {
  position: absolute;
  top: 0px;
  left: 20px;
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 2px;
}

.exercise-title {
  margin-bottom: 30px;
}

.view-btn {
  position: absolute;
  left: 0;
}

.exercise-image {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 130px;
  height: 50%;
  object-fit: cover;
  border-radius: 8px;
}
</style>