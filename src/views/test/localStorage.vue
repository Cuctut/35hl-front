<template>
  <div style="margin: 80px;">
    <h1>Local Storage Data</h1>
    <p><strong>Token:</strong> {{ token }}</p>
    <p><strong>UID:</strong> {{ uid }}</p>
    <p><strong>Role:</strong> {{ role }}</p>
    <a-button type="primary" @click="logout" :disabled="!token && !uid">退出登录</a-button>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import router from '@/router'
import { getToken, getUid, getRole, removeToken, removeUid, removeRole } from "@/utils/auth";

export default {
  name: "TestLocalStorage",
  setup() {
    const state = reactive({
      token: null,
      uid: null,
      role: null,
    });

    onMounted(() => {
      state.token = getToken()
      state.uid = getUid()
      state.role = getRole()
    });

    const logout = () => {
      removeToken()
      removeUid()
      removeRole()
      state.token = getToken()
      state.uid = getUid()
      state.role = getRole()
      router.push({name: 'loginOrRegister', query: { redirect: "/profile" } })
    };

    return {
      ...toRefs(state),
      logout,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
p {
  font-size: 18px;
}
</style>