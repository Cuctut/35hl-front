<template>
  <a-card :bordered="false" class="materials-card" :header-style="{ padding: '40px 20px' }" :body-style="{ padding: '40px 20px' }">
    <template #title>
      <div class="title-container">
        <h2 class="title">教材资源库</h2>
        <!-- <div class="decorative-line"></div> -->
      </div>
    </template>
    <div class="books-grid">
      <div 
        v-for="(book, index) in books" 
        :key="index" 
        class="book-card"
        @mouseenter="mouseOn = index"
        @mouseleave="mouseOn = null"
      >
        <div class="card-content">
          <!-- <div class="book-meta">
            <span class="subject-tag">{{ book.subject }}</span>
            <a-tooltip :content="book.publisher" position="top">
              <span class="publisher">{{ book.publisher }}</span>
            </a-tooltip>
          </div> -->
          
          <h3 class="book-title">{{ book.title }}</h3>
          
          <div class="hover-layer" :class="{ active: mouseOn === index }">
            <a-button 
              type="outline" 
              class="view-btn"
              @click="goToMaterial(book.id)"
            >
              <template #icon>
                <icon-book />
              </template>
              立即查看
            </a-button>
          </div>
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
/* 基础样式 */
.materials-card {
  background: #f8f9fa;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
}

.title-container {
  position: relative;
  padding-bottom: 30px;
}

.title {
  font-size: 2.2rem;
  color: #2c3e50;
  font-weight: 600;
  letter-spacing: 1px;
  margin: 0;
}

.decorative-line {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 2px;
}

/* 网格布局 */
.books-grid {
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* 卡片设计 */
.book-card {
  position: relative;
  background: white;
  border-radius: 12px;
  padding: 24px;
  min-height: 200px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(79, 172, 254, 0.15);
}

/* 卡片内容 */
.book-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.subject-tag {
  background: #e8f4ff;
  color: #4facfe;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.publisher {
  color: #7f8c8d;
  font-size: 0.9rem;
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-title {
  color: #2c3e50;
  font-size: 1.25rem;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 悬停层 */
.hover-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(2px);
}

.hover-layer.active {
  opacity: 1;
}

.view-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
}

.view-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(79, 172, 254, 0.2);
}

/* 响应式设计 */
@media (max-width: 992px) {
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .book-card {
    min-height: 180px;
  }
}

@media (max-width: 576px) {
  .title {
    font-size: 1.8rem;
  }
  
  .books-grid {
    grid-template-columns: 1fr;
  }
  
  .book-title {
    font-size: 1.1rem;
  }
  
  .view-btn {
    padding: 10px 20px;
  }
}
</style>