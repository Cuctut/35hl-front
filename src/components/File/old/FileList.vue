<template>
  <a-card :bordered="false" class="file-list-card" :header-style="{ padding: '40px 20px' }" :body-style="{ padding: '40px 20px' }">
    <template #title>
      <div class="title"> {{ title }} </div>
    </template>
  
    <a-table :columns="columns" :data="fileList" row-key="id" :bordered="{cell:true}" hoverable column-resizable :pagination="false">
      <template #operation="{ record }">
        <a-space>
          <a-button type="outline" @click="handlePreview(record)">预览</a-button>
          <a-button type="outline" @click="handleDownload(record)">下载</a-button>
          <a-button v-show="isAdmin" type="outline" status="danger" @click="confirmDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>

    <a-modal
      :visible="isDeleteConfirmVisible"
      title="确认删除"
      ok-text="删除"
      cancel-text="取消"
      @ok="handleConfirmDelete"
      @cancel="closeDeleteConfirm"
    >
      <p>确定要删除文件 <strong>{{ fileToDelete? fileToDelete.fileName : '' }}</strong> 吗？</p>
    </a-modal>

  </a-card>
</template>

<script>
import { ref, watch } from "vue";
import { downloadFile, deleteFile } from "@/api/files";

export default {
  name: "FileList",
  props: {
    fileType: {
      type: String,
      required: false,
      default: "default",
    },
    files: {
      type: Array,
      required: true,
    },
    role: {
      type: String,
      required: false,
    },
  },
  setup(props, { emit }) {

    const titleMap = {
      default: "文件列表",
      material: "教材文件",
      exercise: "练习文件",
    };
    const title = titleMap[props.fileType];
    const isAdmin = props.role === "ADMIN";

    const fileList = ref([]);
    const columns = [
      { title: "文件名", dataIndex: "fileName", key: "fileName", width: 200, minWidth: 150, ellipsis: true, tooltip: true,},
      { title: "文件类型", dataIndex: "type", key: "type", width: 100, minWidth: 80, ellipsis: true, tooltip: true,},
      { title: "文件大小", dataIndex: "size", key: "size", width: 100, minWidth: 80, ellipsis: true, tooltip: true,},
      { title: "操作", slotName: 'operation', key: "operation", width: 250, minWidth: 160, ellipsis: true, tooltip: true,},
      { title: "上传时间", dataIndex: "createdAt", key: "createdAt", ellipsis: true, tooltip: true,},
    ];
    watch(
      () => props.files,
      (newFiles) => {
        fileList.value = newFiles;
      }
    );

    const handlePreview = (file) => emit("preview", file);
    const handleDownload = (file) => { downloadFile(file.id); };

    const fileToDelete = ref(null);
    const isDeleteConfirmVisible = ref(false);
    const confirmDelete = (file) => {
      fileToDelete.value = file;
      isDeleteConfirmVisible.value = true;
    };
    const handleConfirmDelete = async () => {
      if (fileToDelete.value) {
        await deleteFile(fileToDelete.value.id);
        fileList.value = fileList.value.filter((file) => file.id !== fileToDelete.value.id);
        closeDeleteConfirm();
      }
    };
    const closeDeleteConfirm = () => {
      isDeleteConfirmVisible.value = false;
      fileToDelete.value = null;
    };

    return {
      title, 
      isAdmin,
      columns, 
      fileList, 
      fileToDelete,
      isDeleteConfirmVisible,
      handlePreview, 
      handleDownload,
      confirmDelete,
      handleConfirmDelete,
      closeDeleteConfirm,
    };
  },
};
</script>

<style scoped>
.file-list-card {
  width: 100%;
}
.title {
  font-size: 24px;
  font-weight: bold;
}
</style>

