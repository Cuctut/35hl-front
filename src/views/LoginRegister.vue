<template>
  <div class="login-container">
    <a-card class="login-card">
      <template #title>
        <div class="title">
          {{ isLogin ? "登录" : "注册" }}
        </div>
      </template>

      <a-form
        :model="form"
        :rules="rules"
        @submit="handleSubmit"
        layout="vertical"
      >
        <a-form-item label="用户名" field="username">
          <a-input v-model="form.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="密码" field="password">
          <a-input-password v-model="form.password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item v-if="!isLogin" label="确认密码" field="confirmPassword">
          <a-input-password
            v-model="form.confirmPassword"
            placeholder="请确认密码"
          />
        </a-form-item>
        <a-button type="primary" html-type="submit" long>
          {{ isLogin ? "登录" : "注册" }}
        </a-button>
      </a-form>

      <div class="switch-mode">
        <a-link @click="toggleMode">
          {{ isLogin ? "还没有账号？点击注册" : "已有账号？点击登录" }}
        </a-link>
      </div>
    </a-card>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { login, register } from "@/api/user";
import { setToken, setUid, setRole } from "@/utils/auth";
import { Notification } from '@arco-design/web-vue';

export default {
  name: "LoginRegister",
  setup() {
    const router = useRouter();
    const isLogin = ref(true);
    const form = reactive({
      username: "",
      password: "",
      confirmPassword: "",
    });
    const rules = {
      username: [
        { required: true, message: "用户名不能为空", trigger: "blur" },
      ],
      password: [
        { required: true, message: "密码不能为空", trigger: "blur" },
      ],
      confirmPassword: [
        { required: !isLogin.value, message: "确认密码不能为空", trigger: "blur", },
        {
          validator: (value, cb) => {
            if (!isLogin.value && value !== form.password) {
              cb("两次输入的密码不一致");
            } else {
              cb();
            }
          },
          trigger: "blur",
        },
      ],
    };

    const toggleMode = () => {
      isLogin.value = !isLogin.value;
      form.username = "";
      form.password = "";
      form.confirmPassword = "";
    };

    const handleSubmit = async () => {
      try {
        const response = isLogin.value ? await login(form) : await register(form);
        const title = isLogin.value ? '登录' : '注册';
        console.log(title, response);
        if (response.code === '00000') {
          setToken(response.data.token);
          setUid(response.data.uid);
          setRole(response.data.role);
          Notification.success({ title: title+'成功' });
          // router.push({ name: "home" });
          const redirect = router.currentRoute.value.query.redirect || "/profile";
          router.push(redirect);
        }
      } catch (error) {
        console.log("操作失败：", error);
      }
    };

    return {
      form,
      rules,
      isLogin,
      toggleMode,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  /* border: red 1px solid; */
}

.login-card {
  width: 500px;
  padding: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.switch-mode {
  margin-top: 20px;
  text-align: center;
}
</style>
