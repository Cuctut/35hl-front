<template>
  <a-layout :style="{ height: '100%' }">
    <a-layout-content class="main-content">
      <a-card class="dqmng-card" :bordered="false" :header-style="{ padding: '40px 20px' }" :body-style="{ padding: '40px 20px' }">
        <template #title>
          <div class="title">每日一题管理</div>
        </template>
        <!-- 年月选择器 上传按钮 -->
        <a-space class="filter-section">
          <a-month-picker v-model="selectedDate" @change="fetchQuestions" />
          <a-button type="primary" @click="showUploadModal">上传每日一题</a-button>
        </a-space>
        <!-- 折叠面板展示每日一题 -->
        <a-collapse v-if="questions.length" @change="handleExpand" accordion expand-icon-position="right">
          <a-collapse-item v-for="item in questions" :key="item.id">
            <template #header>
              <span class="collapse-title">{{ formatDate(item.publishDate) }} 号</span>
            </template>
            <template #extra>
              <a-tag v-if="item.viewable==0" color='gray'>未到可见时间</a-tag>
              <a-tag v-else color='green'>可见</a-tag>
            </template>
            <div v-if="imageMap[item.fileId]">
              <img :src="imageMap[item.fileId]" alt="每日一题" style="max-width: 100%; height: auto;" />
            </div>
            <p v-else>图片加载中...</p>
            <a-space class="actions">
              <a-button type="outline" status="danger" @click="confirmDelete(item)">删除</a-button>
            </a-space>
          </a-collapse-item>
        </a-collapse>
        <a-empty v-else description="暂无数据" />
      </a-card>
    </a-layout-content>
    <!-- 删除确认 -->
    <a-modal :visible="isDeleteConfirmVisible" title="确认删除" ok-text="删除" cancel-text="取消" @ok="continueDelete"
      @cancel="cancelDelete">
      <p>确定要删除 <strong>{{ questionToDelete ? formatDate(questionToDelete.publishDate) : '' }}号</strong> 的每日一题吗？</p>
    </a-modal>
    <!-- 上传弹窗 -->
    <a-modal :visible="uploadModalVisible" title="上传每日一题" @ok="handleUploadSubmit" @cancel="uploadModalVisible = false">
      <a-space direction="vertical" style="width: 100%">
        <a-date-picker v-model="uploadDate" placeholder="选择发布日期" style="width: 100%" />
        <a-upload
          :fileList="files"
          list-type="picture-card"
          image-preview
          tip="图片大小<20MB"
          :limit="1"
          :action="uploadUrl"
          :headers="headers"
          @before-upload="beforeUpload"
          @change="onChange"
          @success="handleUploadSuccess"
        />
      </a-space>
    </a-modal>
  </a-layout>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getToken } from '@/utils/auth';
import { getDailyQuestions4Admin, submitDailyQuestion, deleteDailyQuestion } from '@/api/dailyQuestion';
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
        const { data } = await getDailyQuestions4Admin(year, month);
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

    const uploadUrl = 'http://localhost:8080/api/files/upload/daily-questions/0';
    const headers = {
      Authorization: getToken(),
    };
    const uploadModalVisible = ref(false);
    const uploadDate = ref(null);
    const files = ref([]);
    const uploadedFileId = ref(null);
    const showUploadModal = () => {
      uploadModalVisible.value = true;
      uploadDate.value = null;
      files.value = [];
      uploadedFileId.value = null;
    };
    const onChange = (fileList) => {
      files.value = fileList;
    };
    const beforeUpload = (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        Message.error('只能上传图片文件');
        return false;
      }
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        Message.error('文件大小不能超过 20MB');
        return false;
      }
      return true;
    };
    const handleUploadSuccess = (response) => {
      const file = response.response.data;
      uploadedFileId.value = file.id;
      Message.success('上传成功');
    };
    const handleUploadSubmit = async () => {
      if (!uploadDate.value) {
        Message.warning('请选择发布日期');
        return;
      }
      if (!uploadedFileId.value) {
        Message.warning('请选择题目图片');
        return;
      }
      try {
        console.log("正在上传每日一题");
        const params = {
          fileId: uploadedFileId.value,
          publishDate: dayjs(uploadDate.value).format('YYYY-MM-DD HH:mm:ss')
        }
        await submitDailyQuestion(params);
        uploadModalVisible.value = false;
        fetchQuestions();
      } catch (error) {
        Message.error('上传每日一题失败');
      }
    };

    const isDeleteConfirmVisible = ref(false);
    const questionToDelete = ref(null);
    const confirmDelete = (question) => {
      isDeleteConfirmVisible.value = true;
      questionToDelete.value = question;
    };
    const cancelDelete = () => {
      isDeleteConfirmVisible.value = false;
      questionToDelete.value = null;
    };
    const continueDelete = () => {
      deleteDailyQuestion(questionToDelete.value.id);
      questions.value = questions.value.filter(q => q.id !== questionToDelete.value.id);
      isDeleteConfirmVisible.value = false;
    };

    return {
      fetchQuestions,
      formatDate,
      handleExpand,
      selectedDate,
      questions,
      imageMap,
      uploadUrl,
      headers,
      uploadModalVisible,
      uploadDate,
      files,
      uploadedFileId,
      showUploadModal,
      onChange,
      beforeUpload,
      handleUploadSuccess,
      handleUploadSubmit,
      isDeleteConfirmVisible,
      questionToDelete,
      confirmDelete,
      cancelDelete,
      continueDelete,
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