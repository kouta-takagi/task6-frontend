<script setup lang="ts">
interface Props {
  id: number;
  title: string;
  description: string | null;
  is_finished: boolean;
  user_id: number;
  refresh: () => void;
}

const props = defineProps<Props>();

const isOpen = ref(false);

const message = ref("");

const updateFormData = reactive({
  title: props.title,
  description: props.description,
});

async function handleUpdate() {
  const { status } = await useFetch(
    `http://localhost:3000/users/1/todos/${props.id}`,
    {
      method: "PUT",
      body: updateFormData,
    }
  );
  if (status.value === "success") {
    props.refresh();
    isOpen.value = !isOpen.value;
    message.value = "Todoの編集が完了しました";
  } else {
    message.value = "Todoの編集に失敗しました";
  }
}

function handleToggleIsOpen() {
  isOpen.value = !isOpen.value;
}

async function handleToggleIsFinished() {
  const { status } = await useFetch(
    `http://localhost:3000/users/1/todos/${props.id}`,
    {
      method: "PUT",
      body: { is_finished: !props.is_finished },
    }
  );
  if (status.value === "success") {
    props.refresh();
    // ここにemitでメッセージ入れる
  }
}

async function handleDelete() {
  const { status } = await useFetch(
    `http://localhost:3000/users/1/todos/${props.id}`,
    {
      method: "DELETE",
    }
  );
  if (status.value === "success") {
    props.refresh();
  }
}
</script>

<template>
  <li>
    <h3>{{ props.title }}</h3>
    <p>{{ props.description }}</p>

    <button v-on:click="handleToggleIsFinished">
      {{ props.is_finished ? "未完了へ" : "完了" }}
    </button>
    <button v-on:click="handleDelete">削除</button>
    <button v-on:click="handleToggleIsOpen">
      {{ isOpen ? "編集をやめる" : "編集" }}
    </button>
    <div>{{ message }}</div>
    <form v-if="isOpen" v-on:submit.prevent="handleUpdate">
      <input
        type="text"
        placeholder="タイトル"
        v-model="updateFormData.title"
        required
      />
      <textarea
        placeholder="内容"
        v-model="updateFormData.description"
      ></textarea>
      <button type="submit">作成</button>
    </form>
  </li>
</template>
