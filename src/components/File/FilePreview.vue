<template>
  <div class="file-preview" v-if="file">
      <img v-if="['GIF', 'JPG', 'PNG'].includes(file.type)" :src="file.url" alt="图片预览" class="image-preview" />
      <iframe v-else-if="file.type === 'PDF'" :src="file.url" type="application/pdf" frameborder="0" class="pdf-preview" />
      <p v-else-if="['PPT', 'PPTX', 'DOC', 'DOCX'].includes(file.type)">
        由于office文件预览不稳定，暂不支持此office文件预览，请转化为pdf上传预览。
      </p>
      <p v-else>
        暂不支持此文件类型预览。
      </p>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "FilePreview",
  props: {
    file: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    const currentFile = ref(null);

    watch(
      () => props.file,
      (newFile) => {
        currentFile.value = newFile;
      },
      { immediate: true }
    );

    return { currentFile };
  },
};
</script>

<style scoped>
.file-preview {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-preview {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.pdf-preview {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
