<script setup lang="ts">
const flashMessage = ref("");
const isOpen = ref(false);
function flash(message) {
  flashMessage.value = message;
  isOpen.value = true;
  setTimeout(() => {
    flashMessage.value = "";
    isOpen.value = false;
  }, 5000);
}

provide("flash", flash);
provide("flashState", { flashMessage, isOpen });
</script>

<template>
  <div>
    <Flash />
    <NuxtPage />
  </div>
</template>
