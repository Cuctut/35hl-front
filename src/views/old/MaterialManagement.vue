<template>
  <a-layout :style="{ height: '100%' }">
    <ChapterSidebar :directory-data="directoryData" @chapterSelected="loadFiles" />
    <a-layout-content id="materialManagement_layout_content" class="main-content">
      <FileList fileType="material" :files="files" role="ADMIN" @preview="previewFile" />
      <FileUploader fileType="materials" :chapterId="selectedChapterId" @uploadSuccess="handleUploadSuccess" />
      <a-drawer
        :visible="isPreviewVisible"
        popup-container="#materialManagement_layout_content"
        title="文件预览"
        :width="'100%'"
        placement="right"
        :footer="null"
        @cancel="closePreview"
      >
        <FilePreview v-if="selectedFile" :file="selectedFile" />
      </a-drawer>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from "vue";
import { fetchDirectories } from "@/api/materials";
import ChapterSidebar from "@/components/common/ChapterSidebar.vue";
import FileList from "@/components/File/FileList.vue";
import FileUploader from "@/components/File/FileUploader.vue";
import FilePreview from "@/components/File/FilePreview.vue";
import { listFiles, getFilePreviewURL } from '@/api/files';


export default {
  components: {
    ChapterSidebar,
    FileList,
    FileUploader,
    FilePreview,
  },
  setup() {
    const state = reactive({
      selectedChapterId: null,
      directoryData: [],
      isPreviewVisible: false,
      files: [],
      selectedFile: null,
    });

    onMounted(() => {
      loadDirectoryData();
    });
    const loadDirectoryData = async () => {
      const { data } = await fetchDirectories();
      state.directoryData = data;
    };
    const loadFiles = async (selectedSubChapterId) => {
      const { data } = await listFiles("materials", selectedSubChapterId);
      state.files = data;
      state.selectedChapterId = selectedSubChapterId;
    };

    const previewFile = async (file) => {
      const { data } = await getFilePreviewURL(file.id);
      file.url = data;
      state.selectedFile = file;
      state.isPreviewVisible = true;
    };
    const closePreview = () => {
      console.log('closePreview');
      
      state.isPreviewVisible = false;
      state.selectedFile = null;
    };

    const handleUploadSuccess = (file) => {
      state.files.unshift(file);
    };

    return {
      ...toRefs(state),
      loadFiles,
      previewFile,
      closePreview,
      handleUploadSuccess,
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
