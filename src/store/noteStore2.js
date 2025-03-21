import { defineStore } from 'pinia';
import { listNotes, deleteNoteById } from "@/api/note";
import { t } from '@wangeditor/editor';

export const useNoteStore = defineStore('noteStore2', {
  state: () => ({
    noteType: 'default', // 文件类型
    notes: {
      materials: [],
      exercises: [],
    },
    noteToDelete: null,
    noteTypeTODelete: '',
    isDeleteConfirmVisible: false,
  }),
  actions: {
    async loadNotesList(selectedSubChapterId) {
       // 并行加载两种类型的笔记
       const [materialsRes, exercisesRes] = await Promise.all([
        listNotes("materials", selectedSubChapterId),
        listNotes("exercises", selectedSubChapterId),
      ]);
      this.notes.materials = materialsRes.data;
      this.notes.exercises = exercisesRes.data;
    },
    setNotesByType(noteType, newNoteList) {
      if (this.notes[noteType]) {
        this.notes[noteType] = newNoteList;
      }
    },
    addNoteToList(noteType, newNote) {
      if (this.notes[noteType]) {
        this.notes[noteType].unshift(newNote);
      }
    },
    removeNoteFromList(noteType, noteId) {
      console.log(noteType);
      if (this.notes[noteType]) {
        this.notes[noteType] = this.notes[noteType].filter((note) => note.id !== noteId);
      }
    },
    confirmDelete(noteType, note) {
      this.noteTypeToDelete = noteType;
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
        this.removeNoteFromList(this.noteTypeToDelete, this.noteToDelete.id);
        this.cancelDelete();
      }
    },
    resetState() {
      this.noteType = 'default';
      this.notes = { materials: [], exercises: [] };
    },
  },
});