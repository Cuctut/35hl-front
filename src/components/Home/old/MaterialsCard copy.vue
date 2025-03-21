<template>
  <a-card title="教材板块" :bordered="false" class="materials-card" :header-style="{ padding: '40px 20px' }" :body-style="{ padding: '40px 20px' }">
    <template #title>
      <div class="title">教材板块</div>
    </template>
    <div class="books-grid">
      <div v-for="(book, index) in books" :key="index" class="book-card" @mouseover="mouseOn = index" @mouseleave="mouseOn = ''">
        <div class="book-header">
          <h3 class="book-title">{{ book.title }}</h3>
          <a-button type="primary" class="view-btn" v-show="mouseOn === index" @click="goToMaterial(book.id)">查看教材</a-button>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchBooks } from '@/api/materials';

export default {
  name: 'MaterialsCard',
  setup() {
    const router = useRouter();
    const mouseOn = ref('');
    const books = ref([])

    onMounted(() => {
      getBooks()
    });
    const getBooks = async () => {
      const { data } = await fetchBooks()
      books.value = data
    };

    const goToMaterial = (bookId) => {
      router.push({ name: 'materials', query: { bookId } });
    };

    return {
      mouseOn,
      books,
      goToMaterial,
    };
  },
};
</script>

<style scoped>
.materials-card {
  width: 100%;
  margin: 0 20px;
}
.title {
  font-size: 30px;
  font-weight: bold;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 50px;
}

@media (max-width: 2560px) {
  .books-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 1480px) {
  .books-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 576px) {
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.book-card {
  /* background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%); */
  background-image: linear-gradient(-20deg, #f4ecfe 0%, #fbfcdb 100%);
  position: relative;
  height: 150px;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.book-card:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}

.book-header {
  position: absolute;
  top: 0px;
  left: 20px;
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 2px;
}

.book-title {
  margin-bottom: 30px;
}

.view-btn {
  position: absolute;
  left: 0;
}

</style>