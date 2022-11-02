<script setup lang="ts">
  import { reactive } from 'vue';
  import type { FormInstance } from 'element-plus';
  import { login, verifyCaptcha } from 'api/auth';
  import { $ref } from 'vue/macros';
  import useStore from 'stores/index';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';

  const loginForm = reactive({
    username: '',
    password: '',
    captcha: '',
  });

  const loginFormRef = $ref<FormInstance>();

  const rules = reactive({});

  const { user } = useStore();
  const { setUserInfo } = user;

  const router = useRouter();

  const submit = () => {
    loginFormRef.validate(valid => {
      if (valid) {
        verifyCaptcha(loginForm.captcha)
          .then(async () => {
            const res = await login({ username: loginForm.username, password: loginForm.password });
            if (res.success) {
              setUserInfo(res.data);
              router.push('/');
            }
          })
          .catch(() => {
            resetCaptchaUrl();
          });
      }
    });
  };

  let captchaUrl = $ref<string>('/api/auth/captcha');

  const resetCaptchaUrl = () => (captchaUrl = captchaUrl + '?' + Math.random());
</script>

<template>
  <div w="300px" h="300px" @keyup.enter="submit">
    <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="pass">
        <el-input v-model="loginForm.username" type="text" />
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input v-model="loginForm.password" type="password" />
      </el-form-item>
      <div flex="~">
        <el-input v-model="loginForm.captcha" w="200px"></el-input>
        <img :src="captchaUrl" alt="验证码" @click="resetCaptchaUrl" cursor="pointer" />
      </div>
      <el-form-item>
        <el-button type="primary" @click="submit">登录</el-button>
        <el-button>Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
