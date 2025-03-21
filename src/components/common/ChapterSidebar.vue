<template>
  <a-layout-sider :style="{width:'250px'}" class="sidebar" :resize-directions="['right']">
    <BookSelector :style="{margin: '58px 0'}"/>
    <ChapterList/>
  </a-layout-sider>
</template>

<script>
import BookSelector from "@/components/common/BookSelector.vue";
import ChapterList from "@/components/common/ChapterList.vue";

export default {
  name: "ChapterSidebar",
  components: { BookSelector, ChapterList },
  setup() {
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
:deep(.arco-layout-sider-children)::-webkit-scrollbar {
  display: none;
}
</style>
