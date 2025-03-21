<template>
  <div class="account-container">
    <a-form ref="formRef" :model="form" :rules="rules" layout="vertical" @submit="handleSubmit">
      <a-form-item label="用户身份" field="role">
        <a-input v-model="role" disabled />
      </a-form-item>
      <a-form-item label="用户名" field="username">
        <a-input v-model="form.username" placeholder="请输入新的用户名" />
      </a-form-item>
      <a-form-item label="旧密码" field="oldPassword">
        <a-input-password v-model="form.oldPassword" placeholder="请输入旧密码" />
      </a-form-item>
      <a-form-item label="新密码" field="newPassword">
        <a-input-password v-model="form.newPassword" placeholder="请输入新密码" />
      </a-form-item>
      <a-form-item label="确认新密码" field="confirmPassword">
        <a-input-password v-model="form.confirmPassword" placeholder="请确认新密码" />
      </a-form-item>
      <a-button type="primary" html-type="submit" long :style="{marginTop:'20px'}">保存修改</a-button>
      <a-divider />
      <a-button type="primary" @click="logout" long>退出登录</a-button>
    </a-form>
  </div>
</template>

<script>
import router from '@/router'
import { ref, reactive, computed, onMounted } from "vue";
import { removeToken, removeUid } from "@/utils/auth";
import { getUserInfo, udtUserInfo } from "@/api/user";
import { Notification } from "@arco-design/web-vue";

export default {
  setup() {
    const role = ref("");
    const formRef = ref(null);
    const form = reactive({
      username: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    const rules = computed(() => (
      {
        username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        oldPassword: form.newPassword
          ? [{ required: true, message: "旧密码不能为空", trigger: "blur" }]
          : [],
        newPassword: form.oldPassword
          ? [{ required: true, message: "新密码不能为空", trigger: "blur" }]
          : [],
        confirmPassword: form.newPassword
          ? [{ required: true, message: "确认密码不能为空", trigger: "blur" },
              {
                validator: (value, cb) => {
                  if (value !== form.newPassword) {
                    cb("两次输入的密码不一致");
                  } else {
                    cb();
                  }
                },
                trigger: "blur",
              },
            ]
          : [],
      }
    ))

    onMounted(() => {
      loadUserInfo();
    });
    const loadUserInfo = async () => {
      try {
        const { data } = await getUserInfo();
        form.username = data.username;
        role.value = data.role;
      } catch (error) {
        Notification.error({
          title: "加载失败",
          content: "无法加载账户信息",
        });
      }
    };

    const handleSubmit = async () => {
      formRef.value.validate(async (valid) => {
        if (valid) {
          Notification.warning({
            title: "提交失败",
            content: "请修正表单中的错误后重试",
          });
          return;
        }
        try {
          const payload = {
            username: form.username,
            oldPassword: form.oldPassword || null,
            newPassword: form.newPassword || null,
          };
          await udtUserInfo(payload);
          Notification.success({
            title: "修改成功",
            content: "账户信息已更新",
          });
        } catch (error) {
          Notification.error({
            title: "修改失败",
            content: error.message || "更新账户信息失败",
          });
        }
      });
    };

    const logout = () => {
      removeToken()
      removeUid()
      router.push({name: 'loginOrRegister', query: { redirect: "/profile" } })
    };

    return {
      role,
      formRef,
      form,
      rules,
      logout,
      handleSubmit,
    };
  },
}
</script>

<style scoped>
.account-container {
  padding: 70px;
  width: 500px;
}

</style>
