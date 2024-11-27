<script setup lang="ts">
import { signUp } from "@/api/auth.js";
import { getAuthDataFromStorage } from "@/utils/auth-data.js";
import axios from "axios";
const flash = inject("flash");

const router = useRouter();

const formData = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const handleSignUp = async () => {
  try {
    const res = await signUp(
      formData.name,
      formData.email,
      formData.password,
      formData.password_confirmation
    );
    if (res.status === 200) {
      debugger;
      console.log(res);
      flash("新規登録が完了しました");
      router.push({ path: "/" });
    } else {
      const errorMessages = res.data.errors.full_messages.join("\n");
      console.log(errorMessages);
      flash(errorMessages);
    }
  } catch (error) {
    console.log(error);
  }
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
  <form v-on:submit.prevent="handleSignUp">
    <container>
      <h2 class="mb-5">・新規登録</h2>
      <row>
        <col cols="12" md="20">
          <input
            type="text"
            placeholder="名前"
            v-model="formData.name"
            required
        /></col>
        <col cols="12" md="20">
          <input
            type="email"
            placeholder="メールアドレス"
            v-model="formData.email"
            required
        /></col>
        <col cols="12" md="20">
          <input
            type="password"
            placeholder="パスワード"
            v-model="formData.password"
            required
        /></col>
        <col cols="12" md="20">
          <input
            type="password"
            placeholder="パスワードをもう一度入力"
            v-model="formData.password_confirmation"
            required
        /></col>
        <col cols="12" md="4"> <button type="submit">登録</button></col>
      </row>
    </container>
  </form>
  <NuxtLink
    to="/login"
  >
    ログインページへ
  </NuxtLink>
</template>
