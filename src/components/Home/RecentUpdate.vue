<template>
  <a-card title="最近更新" :bordered="false" class="recent-update-card" :header-style="{ padding: '40px 20px' }" :body-style="{ padding: '40px 20px' }">
    <template #title>
      <div class="title">最近更新</div>
    </template>
    <a-list v-if="files.length" class="file-list">
      <a-list-item v-for="file in files" :key="file.id" class="file-item">
        <a-space class="file-content">
          <span class="file-name">{{ file.fileName }}</span>
          <span class="file-date">{{ formatDate(file.createdAt) }}</span>
        </a-space>
      </a-list-item>
    </a-list>
    <a-empty v-else description="暂无更新" />
  </a-card>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getRecentFiles } from '@/api/files';

export default {
  name: 'RecentUpdate',
  setup() {
    const files = ref([]);

    const fetchRecentFiles = async () => {
      try {
        const { data } = await getRecentFiles(10);
        files.value = data;
      } catch (error) {
        console.error('获取最近更新失败:', error);
      }
    };

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    onMounted(fetchRecentFiles);

    return { files, formatDate };
  }
};
</script>

<style scoped>
.recent-update-card {
  width: 100%;
  margin: 0 20px;
}
.title {
  font-size: 24px;
  font-weight: bold;
}
.file-list {
  margin-top: 10px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background: #f9f9f9;
  transition: background 0.3s;
}

.file-item:hover {
  background: #f0f0f0;
}

.file-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.file-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.file-date {
  font-size: 14px;
  color: #888;
}
</style>