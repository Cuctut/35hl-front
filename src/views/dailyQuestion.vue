<template>
  <a-layout :style="{ height: '100%' }">
    <a-layout-content class="main-content">
      <a-card class="dqmng-card" :bordered="false" :header-style="{ padding: '40px 20px' }" :body-style="{ padding: '40px 20px' }">
        <template #title>
          <div class="title">每日一题</div>
        </template>
        <!-- 年月选择器 上传按钮 -->
        <a-space class="filter-section">
          <a-month-picker v-model="selectedDate" @change="fetchQuestions" />
        </a-space>
        <!-- 折叠面板展示每日一题 -->
        <a-collapse v-if="questions.length" @change="handleExpand" accordion expand-icon-position="right">
          <a-collapse-item v-for="item in questions" :key="item.id">
            <template #header>
              <span class="collapse-title">{{ formatDate(item.publishDate) }} 号</span>
            </template>
            <div v-if="imageMap[item.fileId]" style="display: flex; justify-content: center; align-items: center; width: 100%;">
              <!-- <img :src="imageMap[item.fileId]" alt="每日一题" style="width: auto; max-height: 500px;" /> -->
              <a-image 
                :src="imageMap[item.fileId]" 
                show-loader
                :preview-props="{
                  actionsLayout: ['rotateRight', 'zoomIn', 'zoomOut'],
                }"
              />
            </div>
          </a-collapse-item>
        </a-collapse>
        <a-empty v-else description="暂无数据" />
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getToken } from '@/utils/auth';
import { getDailyQuestions4User, submitDailyQuestion, deleteDailyQuestion } from '@/api/dailyQuestion';
import { Message } from "@arco-design/web-vue";
import { getFilePreviewURL } from '@/api/files';
import dayjs from 'dayjs';

export default {

  setup() {
    const selectedDate = ref(dayjs()); // 默认当前年月
    const questions = ref([]);
    const imageMap = ref({});

    // 获取每日一题
    const fetchQuestions = async () => {
      if (!selectedDate.value) return;
      const date = dayjs(selectedDate.value); // 确保是 dayjs 实例
      const year = date.year();
      const month = date.month() + 1; // 月份从 0 开始，需要 +1
      try {
        const { data } = await getDailyQuestions4User(year, month);
        questions.value = data || [];
      } catch (error) {
        Message.error('获取每日一题失败');
      }
    };
    onMounted(fetchQuestions);

    const formatDate = (datetime) => {
      return dayjs(datetime).format("DD"); // 提取日（23号）
    };
    const handleExpand = async (activeKeys) => {
      for (const key of activeKeys) {
        const question = questions.value.find(q => q.id === key);
        if (question && !imageMap.value[question.fileId]) {
          try {
            const { data } = await getFilePreviewURL(question.fileId);
            imageMap.value[question.fileId] = data; // 存入图片 URL
          } catch (error) {
            Message.error('图片加载失败');
          }
        }
      }
    };

    return {
      fetchQuestions,
      formatDate,
      handleExpand,
      selectedDate,
      questions,
      imageMap,
    };
  }

}
</script>

<style scoped>
.main-content {
  padding: 50px;
  /* 确保抽屉挂载到正确位置 */
  position: relative;
}

.dqmng-card {
  width: 100%;
}
.title {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1.2px;
}
.filter-section {
  margin-bottom: 20px;
}
.collapse-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}
.upload-button {
  background-color: var(--color-fill-2);
  color: var(--color-text-1);
  border: 1px dashed var(--color-fill-4);
  height: 158px;
  width: 380px;
  border-radius: 2;
  line-height: 158px;
  text-align: center;
}
.actions {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>