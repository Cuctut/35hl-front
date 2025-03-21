<template>
  <a-layout :style="{ height: '100%' }">
    <ChapterSidebar/>
    <a-layout-content :id="containerId" class="main-content">
      <FileList :previewPopupOn="containerId"/>
      <NoteList noteType="exercises"/> 
    </a-layout-content>
  </a-layout>
</template>

<script>
import { onMounted, onUnmounted, computed} from "vue";
import { useBookStore } from "@/store/bookStore";
import { useFileStore } from "@/store/fileStore";
import { useNoteStore } from "@/store/noteStore2";
import { useRoute } from "vue-router";
import ChapterSidebar from "@/components/common/ChapterSidebar.vue";
import FileList from "@/components/File/FileList.vue";
import NoteList from "@/components/common/NoteList.vue";


export default {
  components: {
    ChapterSidebar,
    FileList,
    NoteList,
  },
  setup() {
    const pageType ='exercises'
    const bookStore = useBookStore();
    const fileStore = useFileStore();
    const noteStore = useNoteStore();
    const route = useRoute();

    const containerId = 'exercise'; // 设置容器ID供预览组件挂载

    onMounted(() => {
      fileStore.fileType = pageType; // 设置文件类型，关系到上传文件的路径
      noteStore.noteType = pageType; // 设置笔记类型，关系到上传笔记的路径
      bookStore.loadDirectoryData().then(
        () => {
          if (route.query.bookId) {
            bookStore.onBookSelected(route.query.bookId);
          }
        }
      );
    });

    onUnmounted(() => {
      bookStore.resetState();
      fileStore.resetState();
    });

    onUnmounted(() => {
      bookStore.resetState();
      fileStore.resetState();
      noteStore.resetState();
    });

    return {
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
