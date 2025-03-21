// import { defineStore } from 'pinia';
// import { listNotes } from "@/api/note";

// export const useNoteStore = defineStore('noteStore', {
//   state: () => ({
//     noteType: 'default', // 文件类型
//     notes: [],
//   }),
//   actions: {
//     async loadNotesList(selectedSubChapterId) {
//       const { data } = await listNotes(this.noteType, selectedSubChapterId);
//       this.notes = data;
//     },
//     setNoteList(newNoteList) {
//       this.notes = newNoteList;
//     }, 
//     addNoteToList(newNote) {
//       this.notes.unshift(newNote);
//     },
//     removeNoteFromList(noteId) {
//       this.notes = this.notes.filter((note) => note.id !== noteId);
//     },
//     resetState() {
//       this.notes = [];
//     },
//   },
// });