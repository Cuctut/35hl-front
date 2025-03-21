<template>
  <a-menu :style="{width:'calc(100% - 20px)'}">
    <a-sub-menu
      v-for="chapter in chapters"
      :key="chapter.id"
      :title="chapter.title"
    >
      <a-menu-item v-for="sub in chapter.subChapters" :key="sub.id" @click="onChapterClick(sub)">
        {{ sub.title }}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
export default {
  props: {
    chapters: {
      type: Array,
      required: true,
    },
  },
  emits: ['chapter-selected'],
  setup(props, { emit }) {
    const onChapterClick = (subChapter) => {
      console.log('ChapterList log:', subChapter.id);
      emit('chapter-selected', subChapter.id);
    };

    return {
      onChapterClick,
    };
  },
};
</script>

<style scoped>
</style>
