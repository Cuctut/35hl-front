import { defineStore } from 'pinia';
import { listFiles, getFilePreviewURL, downloadFile, deleteFile } from '@/api/files';


export const useFileStore = defineStore('fileStore', {
  state: () => ({
    fileType: 'default', // 文件类型
    files: [], // 文件列表
    isPreviewVisible: false, // 是否显示预览
    fileToPreview: null, // 需要预览的文件
    isDeleteConfirmVisible: false, // 是否显示删除确认
    fileToDelete: null, // 需要删除的文件
    titleMap: {
      default: "文件列表",
      materials: "教材文件",
      exercises: "习题文件",
    },
  }),
  actions: {
    async loadFilesList(selectedSubChapterId) {
      const { data } = await listFiles(this.fileType, selectedSubChapterId);
      this.files = data;
    },
    getFilesListTitle() {
      return this.titleMap[this.fileType];
    },
    setFiles(newFiles) {
      this.files = newFiles;
    },
    addFile(file) {
      this.files.unshift(file);
    },
    removeFile(fileId) {
      this.files = this.files.filter((file) => file.id !== fileId);
    },
    async previewFile(file) {
      const { data } = await getFilePreviewURL(file.id);
      file.url = data;
      this.fileToPreview = file;
      this.isPreviewVisible = true;
    },
    closePreview() {
      this.isPreviewVisible = false;
      this.fileToPreview = null;
    },
    confirmDelete(file) {
      this.isDeleteConfirmVisible = true;
      this.fileToDelete = file;
    },
    cancelDelete() {
      this.isDeleteConfirmVisible = false;
      this.fileToDelete = null;
    },
    async continueDelete() {
      if (this.fileToDelete) {
        const fileId = this.fileToDelete.id;
        await deleteFile(fileId);
        this.removeFile(fileId);
        this.cancelDelete();
      }
    },
    resetState() {
      this.fileType = 'default';
      this.files = [];
      this.isPreviewVisible = false;
      this.fileToPreview = null;
      this.isDeleteConfirmVisible = false;
      this.fileToDelete = null;
    }
  },
});
