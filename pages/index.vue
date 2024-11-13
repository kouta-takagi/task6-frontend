<script setup lang="ts">
import type { Todo } from "@/types/todo";
import type { User } from "@/types/user";

// レスポンス用の型定義
interface Data {
  finished_todos: Todo[];
  unfinished_todos: Todo[];
  user: User;
}

const formData = reactive({
  title: "",
  description: "",
  is_finished: false,
});

const message = ref("");

// useFetch でデータを取得し、型を指定。
const { data, refresh, clear } = await useFetch<Data | null>(
  `http://localhost:3000/users/1/todos`
);

async function handleCreate() {
  const { status } = await useFetch("http://localhost:3000/users/1/todos", {
    method: "POST",
    // ユーザーの情報はurlからとる
    body: formData,
  });
  if (status.value === "success") {
    refresh();
    message.value = "新しいTodoを作成しました";
  } else {
    message.value = "Todoの作成に失敗しました";
  }
}
</script>

<template>
  <div v-if="data">
    <h1 v-if="data.user">{{ data.user.name }}のTodo一覧</h1>
    <div>{{ message }}</div>
    <div v-if="data.unfinished_todos.length > 0">
      <h2>未完了のTodo</h2>
      <ul>
        <li v-for="todo in data.unfinished_todos" :key="todo.id">
          <h3>{{ todo.title }}</h3>
          <p>{{ todo.description }}</p>
        </li>
      </ul>
    </div>
    <div v-else>何もありません</div>
    <div v-if="data.finished_todos.length > 0">
      <h2>完了済みのTodo</h2>
      <ul>
        <li v-for="todo in data.finished_todos" :key="todo.id">
          <h3>{{ todo.title }}</h3>
          <p>{{ todo.description }}</p>
        </li>
      </ul>
    </div>
    <div v-else>何もありません</div>
  </div>
  <form v-on:submit.prevent="handleCreate">
    <input
      type="text"
      placeholder="タイトル"
      v-model="formData.title"
      required
    />
    <textarea placeholder="内容" v-model="formData.description"></textarea>
    <label>完了済</label>
    <input type="checkbox" name="checkbox" v-model="formData.is_finished" />
    <button type="submit">作成</button>
  </form>
</template>
