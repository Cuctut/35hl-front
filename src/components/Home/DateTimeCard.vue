<template>
  <a-card :bordered="false" class="datetime-card" @click="handleClick">
    <div class="datetime-content" :style="{ backgroundImage: backgroundStyle }">
      <div v-if="isLoading" class="loading-spinner">
        <div class="spinner"></div>
      </div>
      <div class="overlay"></div>
      <div class="weekday">{{ weekday }}</div>
      <div class="date">{{ date }}</div>
      <div class="daily-title">每日1题</div>
    </div>
  </a-card>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";

export default {
  name: 'DateTimeCard',
  setup() {
    const router = useRouter();

    const date = ref('');
    const weekday = ref('');
    const backgroundStyle = ref('');
    const bingBackgroundUrl = ref('https://bing.img.run/1366x768.php');// https://bing.ee123.net/img/rand
    const isLoading = ref(true); // 控制加载动画的显示

    const loadTime = () => {
      const now = new Date();
      date.value = `${now.getMonth() + 1} / ${now.getDate()}`;
      weekday.value = now.toLocaleDateString('zh-CN', { weekday: 'long' });
    };

    const loadBgImg = () => {
      const image = new Image();
      image.src = bingBackgroundUrl.value;
      image.onload = () => {
        backgroundStyle.value = `url(${image.src})`;
        isLoading.value = false; // 图片加载完成后隐藏加载动画
      };
      image.onerror = () => {
        console.error('图片加载失败');
        isLoading.value = false; // 图片加载失败时也隐藏加载动画
      };
    };

    const handleClick = () => {
      router.push({name: "dailyQuestion"});
    };

    onMounted(() => {
      loadBgImg();
      loadTime();
    });

    return {
      date,
      weekday,
      backgroundStyle,
      isLoading,
      handleClick,
    };
  },
};
</script>

<style scoped>
.datetime-card {
  cursor: pointer;
}

.datetime-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  position: relative;
  background-size: cover; /* 确保背景图片充满容器 */
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.5s ease-in-out;
  /* background-color: #000; */
}

.datetime-card:hover .datetime-content {
  transform: scale(1.02);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* 黑色半透明蒙版 */
  z-index: 1;
}

.weekday,
.date {
  position: absolute;
  text-align: left;
  z-index: 2; /* 保证文字在蒙版上方 */
  color: white; /* 字体颜色改为白色 */
}

.weekday {
  bottom: 120px;
  left: 30px;
  font-size: 24px;
}

.date {
  bottom: 40px;
  left: 30px;
  font-size: 48px;
  font-weight: bold;
}


.daily-title {
  position: absolute;
  text-align: right;
  right: 30px;
  bottom: 30px;
  font-size: 48px;
  font-weight: bold;
  letter-spacing: 10px;
  color: white;
  z-index: 2;
  writing-mode: vertical-rl;
}

/* 加载动画样式 */
.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3; /* 确保加载动画在最上层 */
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
