<template>
  <a-select
    allow-clear
    allow-search
    placeholder="请选择教材"
    :style="{width:'calc(100% - 20px)'}"
    :options="books.map((book) => ({ label: book.title, value: book.id }))"
    @change="onBookChange"
  />
</template>

<script>
export default {
  name: "BookSelector",
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
  emits: ['book-selected'],
  setup(props, { emit }) {

    const onBookChange = (value) => {
      emit('book-selected', value);
    };

    return {
      onBookChange,
    };
  },
};
</script>

<style scoped>
</style>
