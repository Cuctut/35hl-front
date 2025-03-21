<template>
  <a-layout-sider :style="{width:'250px'}" class="sidebar" :resize-directions="['right']">
    <BookSelector :books="books" @bookSelected="onBookSelected" :style="{margin: '52px 0'}"/>
    <ChapterList :chapters="selectedChapters" @chapterSelected="onChapterSelected"/>
  </a-layout-sider>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import BookSelector from "@/components/common/BookSelector.vue";
import ChapterList from "@/components/common/ChapterList.vue";

export default {
  name: "ChapterSidebar",
  components: { BookSelector, ChapterList },
  props: {
    directoryData: {
      type: Array,
      required: true,
    },
    selectedBookId: {
      type: Number,
      required: false,
    },
  },
  emits: ['chapter-selected'],
  setup(props, { emit }) {
    const selectedBookId = props.selectedBookId;
    const books = computed(() => props.directoryData.map((d) => d.book));
    const selectedChapters = ref([]);

    watch(
      () => props.directoryData,
      (newData) => {
        if (newData && selectedBookId) {
          onBookSelected(selectedBookId);
        }
      }
    );

    // onMounted(() => {
    //   if (selectedBookId) {
    //     onBookSelected(selectedBookId);
    //     // console.log('selectedBookId:', selectedBookId);
    //   }
    // });

    const onBookSelected = (selectedBookId) => {
      console.log('directoryData:', props.directoryData);
      const book = props.directoryData.find((d) => d.book.id === selectedBookId);
      selectedChapters.value = book ? book.chapters : [];
    };

    const onChapterSelected = (selectedSubChapterId) => {
      console.log('ChapterSelecteSidebar log:', selectedSubChapterId);
      emit('chapter-selected', selectedSubChapterId);
    };

    return {
      books,
      selectedChapters,
      onBookSelected,
      onChapterSelected,
    };
  }
};
</script>

<style scoped>
.sidebar {
  border-right: 1px solid #ddd;
  padding: 20px;
  display: flex;
  flex-direction: column;
  
}
</style>
