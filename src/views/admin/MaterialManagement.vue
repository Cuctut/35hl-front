<template>
  <a-layout :style="{ height: '100%' }">
    <ChapterSidebar/>
    <a-layout-content :id="containerId" class="main-content">
      <FileList manage :previewPopupOn="containerId"/>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { onMounted, onUnmounted, computed } from "vue";
import { useBookStore } from "@/store/bookStore";
import { useFileStore } from "@/store/fileStore";
import ChapterSidebar from "@/components/common/ChapterSidebar.vue";
import FileList from "@/components/File/FileList.vue";

export default {
  components: {
    ChapterSidebar,
    FileList,
  },
  setup() {
    const bookStore = useBookStore();
    const fileStore = useFileStore();

    const containerId = 'materialManagement'; // 设置容器ID供预览组件挂载
    const files = computed(() => fileStore.files);

    onMounted(() => {
      fileStore.fileType = 'materials'; // 设置文件类型，关系到上传文件的路径
      bookStore.loadDirectoryData();
    });
    onUnmounted(() => {
      bookStore.resetState();
      fileStore.resetState();
    });

    return {
      files,
      containerId,
    };
  },
};
</script>

<style scoped>
.main-content {
  width: 100%;
  padding: 50px;
  /* 确保抽屉挂载到正确位置 */
  position: relative;
}
</style>
