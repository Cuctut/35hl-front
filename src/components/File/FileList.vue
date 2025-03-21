<template>
  <a-card :bordered="false" class="file-list-card" :header-style="{ padding: '40px 20px' }" :body-style="{ padding: '40px 20px' }">
    <template #title>
      <div class="title"> {{ fileTypeTitle }} </div>
    </template>

    <!-- 文件列表 -->
    <a-table :columns="columns" :data="fileList" row-key="id" :bordered="{ cell: true }" hoverable column-resizable
      :pagination="false">
      <template #operation="{ record }">
        <a-space>
          <a-button type="outline" @click="handlePreview(record)">预览</a-button>
          <a-button type="outline" @click="handleDownload(record)">下载</a-button>
          <a-button v-show="isAdmin&&manage" type="outline" status="danger" @click="confirmDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>

    <FileUploader v-show="isAdmin&&manage" :style="{ padding: '20px 0' }"/>

    <!-- 删除确认 -->
    <a-modal :visible="isDeleteConfirmVisible" title="确认删除" ok-text="删除" cancel-text="取消" @ok="continueDelete"
      @cancel="cancelDelete">
      <p>确定要删除文件 <strong>{{ fileToDelete ? fileToDelete.fileName : '' }}</strong> 吗？</p>
    </a-modal>

    <!-- 预览抽屉 -->
    <a-drawer :visible="isPreviewVisible" :popup-container="popupOnId" title="文件预览" :width="'100%'" placement="right"
      :footer="null" @cancel="handleCancelPreview">
      <FilePreview v-if="fileToPreview" :file="fileToPreview" />
    </a-drawer>

  </a-card>
</template>

<script>
import { computed } from "vue";
import { useFileStore } from "@/store/fileStore";
import { isRoleAdmin } from "@/utils/auth";
import { downloadFile } from "@/api/files";
import FilePreview from "@/components/File/FilePreview.vue";
import FileUploader from "@/components/File/FileUploader.vue";


export default {
  name: "FileList",
  components: { FilePreview, FileUploader },
  props: {
    manage: { type: Boolean, default: false },
    previewPopupOn: { type: String, default: "app" },
  },
  setup(props) {
    const fileStore = useFileStore();

    const fileTypeTitle = computed(() => fileStore.getFilesListTitle());
    const fileList = computed(() => fileStore.files);
    const isAdmin = isRoleAdmin();
    const columns = [
      { title: "文件名", dataIndex: "fileName", key: "fileName", width: 200, minWidth: 150, ellipsis: true, tooltip: true, },
      { title: "文件类型", dataIndex: "type", key: "type", width: 100, minWidth: 80, ellipsis: true, tooltip: true, },
      { title: "文件大小", dataIndex: "size", key: "size", width: 100, minWidth: 80, ellipsis: true, tooltip: true, },
      { title: "操作", slotName: 'operation', key: "operation", width: 250, minWidth: 160, ellipsis: true, tooltip: true, },
      { title: "上传时间", dataIndex: "createdAt", key: "createdAt", ellipsis: true, tooltip: true, },
    ];

    const isPreviewVisible = computed(() => fileStore.isPreviewVisible);
    const fileToPreview = computed(() => fileStore.fileToPreview);
    const popupOnId = "#" + props.previewPopupOn;
    const handlePreview = (file) => fileStore.previewFile(file);
    const handleCancelPreview = () => fileStore.closePreview();


    const isDeleteConfirmVisible = computed(() => fileStore.isDeleteConfirmVisible);
    const fileToDelete = computed(() => fileStore.fileToDelete);
    const confirmDelete = (file) => fileStore.confirmDelete(file);
    const cancelDelete = () => fileStore.cancelDelete();
    const continueDelete = () => fileStore.continueDelete();

    const handleDownload = (file) => { downloadFile(file.id); };

    return {
      fileTypeTitle,
      fileList,
      isAdmin,
      columns,

      isPreviewVisible,
      fileToPreview,
      popupOnId,
      handlePreview,
      handleCancelPreview,

      isDeleteConfirmVisible,
      fileToDelete,
      confirmDelete,
      cancelDelete,
      continueDelete,

      handleDownload,
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
  letter-spacing: 1.2px;
}
</style>
