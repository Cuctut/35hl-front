<template>
  <a-layout :style="{ height: '100%' }">
    <a-layout-content class="main-content">
      <a-card class="usermng-card" :bordered="false" :header-style="{ padding: '40px 20px' }" :body-style="{ padding: '40px 20px' }">
        <template #title>
          <div class="title">用户管理</div>
        </template>
        <!-- 搜索栏 -->
        <a-input-search
          v-model="searchQuery"
          placeholder="搜索用户名"
          allow-clear
          @search="query"
          style="margin-bottom: 20px; width: 300px;"
        />
        <!-- 用户列表 -->
        <a-table 
          :columns="columns" 
          :data="filteredUsers"
          row-key="id"
          :pagination="{ pageSize: 5 }"
        >
          <template #role="{ record }">
            <a-tag :color="record.role === 'ADMIN' ? 'red' : 'blue'">
              {{ record.role === 'ADMIN' ? '管理员' : '普通用户' }}
            </a-tag>
          </template>

          <template #status="{ record }">
            <a-tag :color="record.status === 1 ? 'green' : 'gray'">
              {{ record.status === 1 ? '启用' : '禁用' }}
            </a-tag>
          </template>

          <template #actions="{ record }">
            <a-button v-if="record.status === 0" type="outline" @click="udtUserStatus(record.id, 1)">启用</a-button>
            <a-button v-else type="outline" status="danger" @click="udtUserStatus(record.id, 0)">禁用</a-button>
          </template>
        </a-table>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { Message } from "@arco-design/web-vue";
import { getAllUsers, updateUserStatus } from "@/api/user";

export default {
  setup() {
    const columns = [
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "用户名", dataIndex: "username", key: "username" },
      { title: "角色", key: "role", slotName: "role" },
      { title: "状态", key: "status", slotName: "status" },
      { title: "操作", key: "actions", slotName: "actions" }
    ];
    const users = ref([]);
    const searchQuery = ref("");
    const filteredUsers = computed(() => {
      if (!searchQuery.value) return users.value;
      return users.value.filter(user => user.username.includes(searchQuery.value));
    });

    const fetchUsers = async () => {
      try {
        const { data } = await getAllUsers();
        users.value = data;
      } catch (error) {
        Message.error("获取用户列表失败");
      }
    };

    const udtUserStatus = async (id, status) => {
      try {
        await updateUserStatus(id, status);
        Message.success("更新用户状态成功");
        fetchUsers();
      } catch (error) {
        Message.error("更新用户状态失败");
      }
    };

    const query = () => {
      console.log(searchQuery.value);
    };

    onMounted(() => {
      fetchUsers();
    });

    return {
      searchQuery,
      columns,
      filteredUsers,
      query,
      udtUserStatus,
    };
  }

}
</script>

<style scoped>
.main-content {
  padding: 50px;
  /* 确保抽屉挂载到正确位置 */
  position: relative;
}

.usermng-card {
  width: 100%;
}

.title {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1.2px;
}

:deep(.arco-list-item-meta) {
  display: block;
}
</style>