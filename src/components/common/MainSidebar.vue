<template>
  <a-layout-sider
    collapsible
    :collapsed="collapsed"
    :collapsed-width="60"
    hide-trigger
    class="sidebar"
  >
    <div class="logo" @click="collapsed = !collapsed">
      <img src="@/assets/logo.png" alt="Logo" />
    </div>
    <a-menu :default-selected-keys="['home']" :collapsed-width="60">
      <a-menu-item
        v-for="item in menuItems"
        :key="item.key"
        @click="onClickMenuItem(item.key)"
        :style="{ padding: '20px 10px' }"
      >
        <template #icon>
          <icon-font :type="item.icon" :size="32" />
        </template>
        {{ item.label }}
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@arco-design/web-vue";

const IconFont = Icon.addFromIconFontCn({
  src: "https://at.alicdn.com/t/c/font_4789376_1sxn6j26adq.js",
});

export default {
  name: "Siderbar",
  components: {
    IconFont,
  },
  setup() {
    const router = useRouter();

    const collapsed = ref(true);
    const menuItems = ref([]);

    const loadMenuItems = () => {
      menuItems.value = [
        { key: "home", label: "首页", icon: "icon-home" },
        { key: "profile", label: "个人中心", icon: "icon-user" },
        { key: "materials", label: "教材中心", icon: "icon-book" },
        { key: "exercises", label: "题目中心", icon: "icon-edit" },
        { key: "dailyQuestion", label: "每日一题", icon: "icon-rili" },
      ];
    };

    onMounted(() => {
      loadMenuItems();
    });

    const onClickMenuItem = (key) => {
      router.push({name: key});
    };

    return {
      collapsed,
      menuItems,
      onClickMenuItem,
    };
  },
};
</script>

<style scoped>
.sidebar {
  transition: 0.6s;
  color: #fff;
  /* border-right: #38bcd2 5px solid; */
  /* 右侧阴影 */
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.logo {
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 12px;
}

.logo img {
  max-height: 100%;
  max-width: 100%;
  border-radius: 50%;
  /* 阴影 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
