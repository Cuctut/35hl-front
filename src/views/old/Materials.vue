<template>
  <a-layout>
    <ChapterSidebar :directory-data="directoryData" :selectedBookId="selectedBookId" @chapterSelected="loadFiles"/>
    <a-layout-content id="materials_layout_content" class="main-content">
      <FileList fileType="material" :files="files" @preview="previewFile" />
      <a-drawer
        :visible="isPreviewVisible"
        popup-container="#materials_layout_content"
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
import { useRoute } from 'vue-router';
import { ref, reactive, toRefs, onMounted } from 'vue';
import ChapterSidebar from "@/components/common/ChapterSidebar.vue";
import FileList from "@/components/File/FileList.vue";
import FilePreview from "@/components/File/FilePreview.vue";
import { fetchDirectories } from "@/api/materials"
import { listFiles, getFilePreviewURL } from '@/api/files';

export default {
  components: {
    ChapterSidebar,
    FileList,
    FilePreview,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      selectedBookId: Number(route.query.bookId),
      selectedChapter: null,
      directoryData: [],
      isPreviewVisible: false,
      files: [],
      selectedFile: null,
    })

    onMounted(()=>{
      loadDirectoryData();
    })
    const loadDirectoryData = async () => {
      const { data } = await fetchDirectories();
      state.directoryData = data;
    }
    const loadFiles = async (selectedSubChapterId) => {
      const { data } = await listFiles("materials", selectedSubChapterId);
      state.files = data;
      
      state.selectedFile = null; // 清空预览
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
    
    
    return {
      ...toRefs(state),
      loadFiles,
      previewFile,
      closePreview,
      
    };
  }
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
