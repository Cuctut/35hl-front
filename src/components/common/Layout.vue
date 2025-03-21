<template>
  <a-layout style="height: 100vh">
    <Sidebar />
    <router-view />
  </a-layout>
</template>

<script>
import Sidebar from './MainSidebar.vue';

export default {
  name: 'Layout',
  components: {
    Sidebar,
  },
};
</script>
