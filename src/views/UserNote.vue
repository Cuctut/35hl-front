<template>
  <a-layout :style="{ height: '100%' }">
    <a-layout-content class="main-content">
      <a-card class="note-card" :bordered="false" :header-style="{ padding: '40px 20px' }" :body-style="{ padding: '40px 20px' }">
        <template #title>
          <div class="title">我的笔记 ({{ noteList.length }})</div>
        </template>

        <!-- 笔记列表 -->
        <a-collapse v-if="hasNote" accordion expand-icon-position="right">
          <a-collapse-item v-for="item in noteList" :key="item.id">
            <template #header>
              <div class="note-title">{{ item.title }}</div>
            </template>
            <template #extra>
              <div class="note-date">{{ item.createdAt }}</div>
            </template>
            
            <!-- 笔记内容 -->
            <div class="note-content" v-html="item.content"></div>

            <!-- 仅管理员可见的操作按钮 -->
            <a-space class="actions">
              <!-- <a-button type="outline" @click="star(item.id)">精选</a-button> -->
              <a-button type="outline" status="danger" @click="confirmDelete(item)">删除</a-button>
            </a-space>
          </a-collapse-item>
        </a-collapse>
        <a-empty v-else/>

        <!-- 删除确认 -->
        <a-modal :visible="isDeleteConfirmVisible" title="确认删除" ok-text="删除" cancel-text="取消" @ok="continueDelete"
          @cancel="cancelDelete">
          <p>确定要删除笔记 <strong>{{ noteToDelete ? noteToDelete.title : '' }}</strong> 吗？</p>
        </a-modal>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';
import { useUserNoteStore } from '@/store/userNoteStore';
import { Message, Modal } from "@arco-design/web-vue";
import katex from "katex";
import "katex/dist/katex.min.css";

export default {
  setup() {
    const userNoteStore = useUserNoteStore();
    const noteList = computed(() => userNoteStore.notes);
    const hasNote = computed(() => noteList.value && noteList.value.length > 0);
    const isDeleteConfirmVisible = computed(() => userNoteStore.isDeleteConfirmVisible);
    const noteToDelete = computed(() => userNoteStore.noteToDelete);
    const confirmDelete = (note) => userNoteStore.confirmDelete(note);
    const cancelDelete = () => userNoteStore.cancelDelete();
    const continueDelete = () => {
      userNoteStore.continueDelete();
      Message.success("笔记删除成功");
    };

    onMounted(() => {
      userNoteStore.loadNotesList();
      renderMath();
    });

    onUnmounted(() => {
      userNoteStore.resetState();
    });

    // 监听 noteList 数据变化后再次执行
    watch(noteList, () => {
      renderMath();
    });

    const renderMath = () => {
      nextTick(() => {
        document.querySelectorAll('[data-w-e-type="formula"]').forEach((el) => {
          const formula = el.getAttribute("data-value");
          if (formula) {
            el.innerHTML = "";
            katex.render(formula, el, {
              throwOnError: false
            });
          }
        });
      });
    };

    return {
      noteList,
      hasNote,
      isDeleteConfirmVisible,
      noteToDelete,
      confirmDelete,
      cancelDelete,
      continueDelete,
    };
  },
};
</script>

<style scoped>
.main-content {
  padding: 50px;
  /* 确保抽屉挂载到正确位置 */
  position: relative;
}

.note-card {
  width: 100%;
}

.title {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1.2px;
}

:deep(.arco-list-item-meta) {
  display: block;
}

.note-meta {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.note-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}

.note-date {
  color: #999;
  font-size: 14px;
}

.note-content-wrapper {
  position: relative;
  margin-top: 10px;
}

.note-content {
  padding: 10px;
}

.actions {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.empty-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.empty-text {
  margin-top: 16px;
  font-size: 14px;
  color: #a9aeb8;
}
</style>
