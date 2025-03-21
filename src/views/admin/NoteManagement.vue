<template>
  <a-layout :style="{ height: '100%' }">
    <ChapterSidebar />
    <a-layout-content class="main-content">
      <NoteList noteType="materials" :key="'materials'" :manage="true"/>
      <NoteList noteType="exercises" :key="'exercises'" :manage="true"/>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { onMounted, onUnmounted } from "vue";
import ChapterSidebar from "@/components/common/ChapterSidebar.vue";
import NoteList from "@/components/common/NoteList.vue";
import { useBookStore } from "@/store/bookStore";
import { useNoteStore } from "@/store/noteStore2";

export default {
  components: {
    ChapterSidebar,
    NoteList,
  },
  setup() {
    const bookStore = useBookStore();
    const noteStore = useNoteStore();

    onMounted(() => {
      bookStore.loadDirectoryData();
    });

    onUnmounted(() => {
      bookStore.resetState();
      noteStore.resetState();
    });

    return {};
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
