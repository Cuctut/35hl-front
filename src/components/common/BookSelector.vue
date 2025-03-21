<template>
  <a-select
    allow-clear
    allow-search
    placeholder="请选择课本"
    :style="{width:'calc(100% - 20px)'}"
    :options="books.map((book) => ({ label: book.title, value: book.id }))"
    v-model="selectOn"
    @change="handleBookChange"
  />
</template>

<script>
import { useBookStore } from "@/store/bookStore";
import { ref, computed, watch } from "vue";

export default {
  name: "BookSelector",
  setup() {
    const bookStore = useBookStore();

    const books = computed(() => bookStore.books);
    const selectOn = ref(null);
    const currentBookId = computed(() => bookStore.currentBookId);

    watch(currentBookId, (newVal) => {
      selectOn.value = newVal;
    });

    const handleBookChange = (selectedBookId) => {
      bookStore.onBookSelected(selectedBookId);
    };

    return {
      books,
      selectOn,
      handleBookChange,
    };
  },
};
</script>

<style scoped>
</style>
