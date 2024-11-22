<script setup lang="ts">
import { inject } from "vue";
import type { Ref } from "vue";

const flashState = inject<{ flashMessage: Ref<string>; isOpen: Ref<boolean> }>(
  "flashState"
);

if (!flashState) {
  throw new Error("flashState が提供されていません");
}

const { flashMessage, isOpen } = flashState;
</script>

<template>
  <div id="flash-message">
    <transition name="fade">
      <div v-if="isOpen">
        <pre class="message">{{ flashMessage }}</pre>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.flash-message {
  position: fixed;
  top: 20px;
  right: 0;
  left: 0;
  margin: auto;
  width: 90%;
  max-width: 1024px;
  display: flex;
  justify-content: center;
  z-index: 1000;
}

.message {
  padding: 10px 30px;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  border-radius: 8px;
  background-color: #333333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
