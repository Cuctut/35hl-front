<template>
  <a-layout>
    <Sidebar :menuItems="menuItems" />
    <a-layout-content class="main-content">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script>
import { ref, onMounted } from 'vue';
import router from '@/router'
import { removeToken, removeUid } from '@/utils/auth'
import { getUserMenu } from '@/api/user'
import Sidebar from "@/components/Profile/Sidebar.vue";

export default {
  name: 'Profile',
  components: {
    Sidebar,
  },
  setup() {
    const menuItems = ref([])
    onMounted(() => {
      loadMenuItems();
    });
    const loadMenuItems = async () => {
      const res = await getUserMenu()
      menuItems.value = res.data
      // console.log(menuItems.value);
    }
    
    return {
      menuItems,
    }
  },
}
</script>

<style scoped>
.main-content {
  width: 100%;
  /* 确保抽屉挂载到正确位置 */
  position: relative;
}
</style>