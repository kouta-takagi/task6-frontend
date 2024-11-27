<script setup lang="ts">
import { login } from "@/api/auth.js";
import axios from "axios";
import { getAuthDataFromStorage } from "@/utils/auth-data.js";

const router = useRouter();

const flash = inject("flash");

const formData = reactive({
  email: "",
  password: "",
});
const handleLogin = async () => {
  await login(formData.email, formData.password).then((res) => {
    if (res.status === 200) {
      console.log(res);
      flash("ログインが完了しました");
      router.push({ path: "/" });
    } else {
      flash("パスワードかメールアドレスが間違っています");
    }
  });
};

onMounted(() => {
  const autoLogin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/validate_token",
        {
          headers: getAuthDataFromStorage(),
        }
      );
      if (response.status === 200) {
        router.push({ path: "/" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  autoLogin();
});
</script>

<template>
  <form v-on:submit.prevent="handleLogin">
    <h2 class="mb-5">・ログイン</h2>
    <input type="email" placeholder="メールアドレス" v-model="formData.email" />

    <input type="text" placeholder="パスワード" v-model="formData.password" />
    <button type="submit">ログイン</button>
  </form>
  <NuxtLink to="/signup"> 新規登録ページへ </NuxtLink>
</template>
