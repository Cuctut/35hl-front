<template>
  <a-menu v-if="hasChapters" :style="{width:'calc(100% - 20px)'}">
    <a-sub-menu
      v-for="chapter in chapters"
      :key="chapter.id"
      :title="chapter.title"
    >
      <a-menu-item v-for="sub in chapter.subChapters" :key="sub.id" @click="handleSubChapterSelect(sub.id)">
        {{ sub.title }}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
  <div v-else class="empty-placeholder" :style="{width:'calc(100% - 20px)'}">
    <icon-folder :style="{ fontSize: '48px', color: '#a9aeb8' }" />
    <p class="empty-text">暂无章节</p>
  </div>
</template>

<script>
import { useBookStore } from "@/store/bookStore";
import { useFileStore } from "@/store/fileStore";
import { useNoteStore } from "@/store/noteStore2";
import { computed } from "vue";

export default {
  setup() {
    const bookStore = useBookStore();
    const fileStore = useFileStore();
    const noteStore = useNoteStore();

    const chapters = computed(() => bookStore.currentChapters);
    const hasChapters = computed(() => chapters.value && chapters.value.length > 0);

    const handleSubChapterSelect = (selectedSubChapterId) => {
      bookStore.selectedSubChapterId = selectedSubChapterId;
      fileStore.loadFilesList(selectedSubChapterId);
      noteStore.loadNotesList(selectedSubChapterId);
    };

    return {
      chapters,
      hasChapters,
      handleSubChapterSelect,
    };
  },
};
</script>

<style scoped>
.empty-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 0;
  text-align: center;
}

.empty-text {
  margin-top: 12px;
  font-size: 14px;
  color: #a9aeb8;
}
</style>