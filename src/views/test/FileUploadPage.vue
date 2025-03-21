<template>
  <div class="wrap">
    <a-card title="文件上传测试" class="upload-page">
      <a-upload
        tip="文件大小不能超过20MB"
        :action="uploadUrl"
        :headers="headers"
        :auto-upload="false"
        ref="uploadRef"
        @change="onChange"
        multiple
      >
        <template #upload-button>
          <a-space>
            <a-button type="outline">选择文件</a-button>
            <a-button type="primary" @click="submit">上传全部</a-button>
            <a-button type="primary" @click="submitOne">上传单个</a-button>
          </a-space>
        </template>
      </a-upload>
    </a-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { getToken } from '@/utils/auth'

export default {
  name: "FileUploadPage",
  setup() {
    const uploadUrl = "http://localhost:8080/api/files/materials/upload/111"; 
    const uploadRef = ref();
    const files = ref([]);
    const headers = {
      Authorization: getToken(),
    };

    const onChange = (fileList) => {
      files.value = fileList;
    };
    const submit = (e) => {
      e.stopPropagation();
      uploadRef.value.submit();
    };
    const submitOne = (e) => {
      e.stopPropagation();
      console.log(files.value);
      uploadRef.value.submit(files.value.find((x) => x.status === 'init'));
    };

    const handleUploadSuccess = (response, file) => {
      console.log("上传成功：", response);
      // 假设返回的 response 包含文件信息
      uploadedFiles.value.push({
        id: response.id,
        name: response.fileName,
        uploadDate: new Date().toLocaleString(),
        url: response.url,
      });
    };

    const handleUploadError = (error, file) => {
      console.error("上传失败：", error);
      // 可以提示错误信息
    };

    return {
      headers,
      uploadUrl,
      uploadRef,
      onChange,
      submit,
      submitOne,
    };
  },
};
</script>

<style scoped>
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.upload-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
