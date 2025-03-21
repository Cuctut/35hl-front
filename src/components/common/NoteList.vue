<template>
  <a-card class="note-card" :bordered="false" :header-style="{ padding: '40px 20px' }" :body-style="{ padding: '40px 20px' }">
    <template #title>
      <div class="title">{{ noteTypeLabel }}笔记 ({{ noteList.length }})</div>
    </template>
    <template v-if="uploadChapterId" #extra>
      <a-button type="primary" @click="handleOpenDrawer">
        <template #icon><icon-plus /></template>写笔记
      </a-button>
    </template>

    <!-- 笔记列表 -->
    <a-collapse v-if="hasNote" accordion expand-icon-position="right">
      <a-collapse-item v-for="item in noteList" :key="item.id">
        <template #header>
          <div class="note-title">{{ item.title }}</div>
        </template>
        <template #extra>
          <div class="note-date">{{ item.createdAt }} by {{ item.creator }}</div>
        </template>
        
        <!-- 笔记内容 -->
        <div class="note-content" v-html="item.content"></div>

        <!-- 仅管理员可见的操作按钮 -->
        <a-space v-if="isAdmin && manage" class="actions">
          <!-- <a-button type="outline" @click="star(item.id)">精选</a-button> -->
          <a-button type="outline" status="danger" @click="confirmDelete(item)">删除</a-button>
        </a-space>
      </a-collapse-item>
    </a-collapse>
    <a-empty v-else/>

    <!-- 上传笔记的抽屉 -->
    <a-drawer
      :visible="drawerVisible"
      title="上传笔记"
      :width="1000"
      @ok="handleSubmitNote"
      @cancel="handleCloseDrawer"
      :ok-button-props="{ disabled: !noteForm.title || !noteForm.content }"
    >
      <a-form :model="noteForm" auto-label-width style="padding: 10px 0;">
        <a-form-item label="标题" field="title">
          <a-input v-model="noteForm.title" placeholder="请输入笔记标题" />
        </a-form-item>
        <a-form-item label="内容" field="content">
          <!-- <a-textarea
            v-model="noteForm.content"
            placeholder="请输入笔记内容"
            :auto-size="{ minRows: 10, maxRows: 20 }"
          /> -->
          <RichEditor v-model="noteForm.content" />
          <!-- <RichEditor/> -->
        </a-form-item>
      </a-form>
    </a-drawer>

    <!-- 删除确认 -->
    <a-modal :visible="isDeleteConfirmVisible" title="确认删除" ok-text="删除" cancel-text="取消" @ok="continueDelete"
      @cancel="cancelDelete">
      <p>确定要删除笔记 <strong>{{ noteToDelete ? noteToDelete.title : '' }}</strong> 吗？</p>
    </a-modal>
  </a-card>
</template>

<script>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { isRoleAdmin } from "@/utils/auth";
import { useBookStore } from "@/store/bookStore";
import { useNoteStore } from "@/store/noteStore2";
import { uploadNote } from "@/api/note"
import { Message, Modal } from "@arco-design/web-vue";
import katex from "katex";
import "katex/dist/katex.min.css";
import RichEditor from '@/components/common/RichEditor.vue'


export default {
  components: { 
    RichEditor, 
  },
  props: {
    manage: { type: Boolean, default: false },
    noteType: { type: String, required: true },
  },
  setup(props) {
    const bookStore = useBookStore();
    const noteStore = useNoteStore();

    const noteTypeMap = {
      materials: "教材",
      exercises: "习题",
    };
    const localNoteType = props.noteType;
    const noteTypeLabel = computed(() => noteTypeMap[localNoteType] || "未知");
    const noteList = computed(() => noteStore.notes[localNoteType] || []);
    const hasNote = computed(() => noteList.value && noteList.value.length > 0);
    const uploadChapterId = computed(() => bookStore.selectedSubChapterId);
    const isAdmin = isRoleAdmin();
    const drawerVisible = ref(false); // 控制抽屉显示
    const noteForm = ref({
      title: "",
      content: "",
    });

    const isDeleteConfirmVisible = computed(() => noteStore.isDeleteConfirmVisible);
    const noteToDelete = computed(() => noteStore.noteToDelete);
    const confirmDelete = (note) => {
      noteStore.confirmDelete(localNoteType, note)
    };
    const cancelDelete = () => noteStore.cancelDelete();
    const continueDelete = () => {
      noteStore.continueDelete();
      Message.success("笔记删除成功");
    };
    
    const handleOpenDrawer = () => drawerVisible.value = true;
    const handleCloseDrawer = () => drawerVisible.value = false;

    const handleSubmitNote = async () => {
      const newNote = {
        title: noteForm.value.title,
        content: noteForm.value.content,
        chapterId: uploadChapterId.value,
        noteType: localNoteType,
      };
      const { data } = await uploadNote(newNote);
      data.createdAt = "刚刚";
      noteStore.addNoteToList(localNoteType, data);
      Message.success("笔记上传成功");
      noteForm.value.title = "";
      noteForm.value.content = "";
      handleCloseDrawer();
    };

    // 富文本编辑器内容变化
    const handleContentChange = (content) => {
      noteForm.value.content = content;
    };

    onMounted(() => {
      renderMath();
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
      isAdmin,
      noteTypeLabel,
      noteList,
      hasNote,
      uploadChapterId,
      drawerVisible,
      isDeleteConfirmVisible,
      noteForm,
      handleOpenDrawer,
      handleCloseDrawer,
      handleContentChange,
      handleSubmitNote,
      confirmDelete,
      noteToDelete,
      cancelDelete,
      continueDelete,
    };
  },
};
</script>

<style scoped>
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
</style>