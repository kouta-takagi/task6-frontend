<script setup lang="ts">
import type { Todo } from "@/types/todo";
import type { User } from "@/types/user";

// レスポンス用の型定義
interface Data {
  finished_todos: Todo[];
  unfinished_todos: Todo[];
  user: User;
}

// useFetch でデータを取得し、型を指定。
const { data, refresh, clear } = await useFetch<Data | null>(
  "http://localhost:3000/todos"
);
</script>

<template>
  <div v-if="data">
    <h1 v-if="data.user">{{ data.user.name }}のTodo一覧</h1>
    <div v-if="data.unfinished_todos.length > 0">
      <h2>未完了のTodo</h2>
      <ul>
        <li v-for="todo in data.unfinished_todos" :key="todo.id">
          {{ todo.title }}
        </li>
      </ul>
    </div>
    <div v-else>何もありません</div>
    <div v-if="data.finished_todos.length > 0">
      <h2>完了済みのTodo</h2>
      <ul>
        <li v-for="todo in data.finished_todos" :key="todo.id">
          {{ todo.title }}
        </li>
      </ul>
    </div>
    <div v-else>何もありません</div>
  </div>
  <p v-else>No todos available.</p>
</template>
