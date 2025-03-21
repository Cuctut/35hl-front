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
        <a-button type="primary" :disabled="!uploadChapterId" @click="submit">上传全部</a-button>
        <!-- <a-button type="primary" @click="submitOne">开始上传单个</a-button> -->
      </a-space>
    </template>
  </a-upload>
</template>

<script>
import { ref, watch } from "vue";
import { getToken } from '@/utils/auth'

export default {
  name: "FileUploader",
  props: {
    chapterId: {
      type: Number,
      required: false,
    },
    fileType: {
      type: String,
      required: true,
      default: "materials",
    },
  },
  setup(props, { emit }) {
    const uploadUrl = `http://localhost:8080/api/files/upload/${props.fileType}`; 
    const uploadChapterId = ref(null);
    const uploadRef = ref();
    const files = ref([]);
    const headers = {
      Authorization: getToken(),
    };

    watch(
      () => props.chapterId,
      (newChapterId) => {
        uploadChapterId.value = newChapterId;
      }
    );

    const onChange = (fileList) => {
      files.value = fileList;
    };
    const submit = (e) => {
      e.stopPropagation();
      const response = uploadRef.value.submit();

    };
    const submitOne = (e) => {
      e.stopPropagation();
      console.log(files.value);
      uploadRef.value.submit(files.value.find((x) => x.status === 'init'));
    };

    const handleUploadSuccess = (response) => {
      const file = response.response.data;
      console.log("上传成功：", file);
      emit("uploadSuccess", file);
    };

    const handleUploadError = (error, file) => {
      console.error("上传失败：", error);
      // 可以提示错误信息
    };

    return {
      headers,
      uploadUrl,
      uploadChapterId,
      uploadRef,
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