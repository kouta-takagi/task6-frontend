<!-- <script setup lang="ts">
const formData = reactive({
  email: "",
  password: "",
});
async function handleLogin() {
  debugger;
  const { data, status } = await useFetch("http://localhost:3000/login", {
    method: "POST",
    credentials: "include",
    body: {
      email: formData.email,
      password: formData.password,
    },
  });
  if (status.value === "success") {
    flash("ログインしました");
    await navigateTo("/");
  } else {
    flash("メールアドレスかパスワードが間違っています");
  }
}

const flash = inject("flash");
</script>

<template>
  <form v-on:submit.prevent="handleLogin">
    <input
      type="text"
      placeholder="メールアドレス"
      v-model="formData.email"
      required
    />
    <input
      type="text"
      placeholder="パスワード"
      v-model="formData.password"
      required
    />
    <button type="submit">作成</button>
  </form>
</template> -->
