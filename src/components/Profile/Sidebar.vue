<template>
  <a-layout-sider :style="{width:'100px'}" class="sidebar">
    <a-menu :style="{width:'100%'}">
      <!-- <template v-for="item in menuItems">
        <a-sub-menu v-if="item.children && item.children.length" :key="item.key">
          <template #title>{{ item.label }}</template>
          <a-menu-item v-for="child in item.children" :key="child.key">
            {{ child.label }}
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="item.key">
          {{ item.label }}
        </a-menu-item>
      </template> -->
      <a-menu-item v-for="item in menuItems" :key="item.key" @click="onClickMenuItem(item)">
        {{ item.label }}
      </a-menu-item>  
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Sidebar",
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {

    const router = useRouter();

    const onClickMenuItem = ({key}) => {
      console.log("click menu item", key);
      router.push(`/${key}`);
    };

    return {
      onClickMenuItem,
    };
  }
};
</script>

<style scoped>
.sidebar {
  border-right: 1px solid #ddd;
  padding: 20px;
  display: flex;
  flex-direction: column;
  padding-top: 72px;
}
</style>
