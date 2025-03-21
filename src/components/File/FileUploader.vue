<template>
  <a-upload
    tip="文件大小不能超过20MB"
    :action="uploadUrl + '/' + uploadChapterId"
    :headers="headers"
    :auto-upload="false"
    ref="uploadRef"
    @change="onChange"
    @success="handleUploadSuccess"
    multiple
    :style="{ padding: '0px 20px' }"
  >
    <template #upload-button>
      <a-space>
        <a-button type="outline" :disabled="!uploadChapterId">选择本地文件</a-button>
        <a-button type="primary" :disabled="!uploadChapterId || isFilesEmpty" @click="submit">上传全部</a-button>
        <!-- <a-button type="primary" @click="submitOne">开始上传单个</a-button> -->
      </a-space>
    </template>
  </a-upload>
</template>

<script>
import { ref, computed } from "vue";
import { getToken } from '@/utils/auth'
import { useBookStore } from "@/store/bookStore";
import { useFileStore } from "@/store/fileStore";

export default {
  name: "FileUploader",
  setup() {
    const bookStore = useBookStore();
    const fileStore = useFileStore();

    const uploadUrl = computed(() => `http://localhost:8080/api/files/upload/${fileStore.fileType}`);
    const uploadChapterId = computed(() => bookStore.selectedSubChapterId);
    const uploadRef = ref();
    const files = ref([]); // 需要上传的文件列表
    const isFilesEmpty = computed(() => {
      return !files.value.some(file => file.status === 'init');
    });
    const headers = {
      Authorization: getToken(),
    };

    const onChange = (fileList) => {
      files.value = fileList;
    }
    const submit = (e) => {
      e.stopPropagation();
      uploadRef.value.submit();
    };
    const submitOne = (e) => {
      e.stopPropagation();
      uploadRef.value.submit(files.value.find((x) => x.status === 'init'));
    };

    const handleUploadSuccess = (response) => {
      const file = response.response.data;
      fileStore.addFile(file);
    };

    return {
      headers,
      uploadUrl,
      uploadChapterId,
      uploadRef,
      isFilesEmpty,
      onChange,
      submit,
      submitOne,
      handleUploadSuccess,
    };
  },
};
</script>

<style>

</style>