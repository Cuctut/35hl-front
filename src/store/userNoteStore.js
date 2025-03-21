import { defineStore } from 'pinia';
import { listUserNotes, deleteNoteById } from '@/api/note';

export const useUserNoteStore = defineStore('userNoteStore', {
  state: () => ({
    notes: [],
    noteToDelete: null,
    isDeleteConfirmVisible: false,
  }),
  actions: {
    async loadNotesList() {
      const { data } = await listUserNotes();
      this.notes = data;
    },
    removeNoteFromList(noteId) {
      this.notes = this.notes.filter((note) => note.id !== noteId);
    },
    confirmDelete(note) {
      this.isDeleteConfirmVisible = true;
      this.noteToDelete = note;
    },
    cancelDelete() {
      this.isDeleteConfirmVisible = false;
      this.noteToDelete = null;
    },
    async continueDelete() {
      if (this.noteToDelete) {
        await deleteNoteById(this.noteToDelete.id);
        this.removeNoteFromList(this.noteToDelete.id);
        this.cancelDelete();
      }
    },
    resetState() {
      this.notes = [];
    }
  },
});