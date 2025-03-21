import { defineStore } from "pinia";
import { fetchDirectories } from "@/api/books";

export const useBookStore = defineStore("bookStore", {
  state: () => ({
    directoryData: [],
    books: [],
    currentBook: null,
    currentBookId: null,
    currentChapters: [],
    selectedSubChapterId: null,
  }),
  actions: {
    async loadDirectoryData() {
      const { data } = await fetchDirectories();
      this.directoryData = data;
      this.books = this.directoryData.map((d) => d.book);
    },
    onBookSelected(selectedBookId) {
      this.currentBookId = Number(selectedBookId);
      this.currentBook = this.directoryData.find((d) => d.book.id === this.currentBookId);
      this.currentChapters = this.currentBook ? this.currentBook.chapters : [];
      if (!this.currentBook) console.error("Book not found");
    },
    resetState() {
      this.directoryData = [];
      this.books = [];
      this.currentBook = null;
      this.currentBookId = null;
      this.currentChapters = [];
      this.selectedSubChapterId = null;
    }
  },
});
