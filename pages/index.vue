<script setup lang="ts">
import type { Todo } from "@/types/todo";
import type { User } from "@/types/user";

definePageMeta({
  middleware: ["check-login"],
});

const flash = inject("flash");

// レスポンス用の型定義
interface Data {
  finished_todos: Todo[];
  unfinished_todos: Todo[];
  user: User;
}

const createFormData = reactive({
  title: "",
  description: "",
  is_finished: false,
});

const message = ref("");

// useFetch でデータを取得し、型を指定。
const { data, refresh } = await useFetch<Data | null>(
  `http://localhost:3000/users/1/todos`
);

async function handleCreate() {
  const { status } = await useFetch("http://localhost:3000/users/1/todos", {
    method: "POST",
    // ユーザーの情報はurlからとる
    body: createFormData,
  });
  if (status.value === "success") {
    refresh();
    flash("Todoの作成が完了しました");
  } else {
    flash("Todoの作成に失敗しました");
  }
}
</script>

<template>
  <div v-if="data">
    <h1 v-if="data.user">{{ data.user.name }}のTodo一覧</h1>
    <div>{{ message }}</div>
    <div>
      <h2>未完了のTodo</h2>
      <div v-if="data.unfinished_todos.length > 0">
        <ul>
          <todo
            v-for="todo in data.unfinished_todos"
            :key="todo.id"
            :id="todo.id"
            :title="todo.title"
            :description="todo.description"
            :user_id="todo.user_id"
            :is_finished="todo.is_finished"
            :refresh="refresh"
          >
          </todo>
        </ul>
      </div>
      <div v-else>何もありません</div>
    </div>
    <div>
      <h2>完了済みのTodo</h2>
      <div v-if="data.finished_todos.length > 0">
        <ul>
          <todo
            v-for="todo in data.finished_todos"
            :key="todo.id"
            :id="todo.id"
            :title="todo.title"
            :description="todo.description"
            :user_id="todo.user_id"
            :is_finished="todo.is_finished"
            :refresh="refresh"
          >
          </todo>
        </ul>
      </div>
      <div v-else>何もありません</div>
    </div>
  </div>
  <form v-on:submit.prevent="handleCreate">
    <input
      type="text"
      placeholder="タイトル"
      v-model="createFormData.title"
      required
    />
    <textarea
      placeholder="内容"
      v-model="createFormData.description"
    ></textarea>
    <label>完了済</label>
    <input
      type="checkbox"
      name="checkbox"
      v-model="createFormData.is_finished"
    />
    <button type="submit">作成</button>
  </form>
</template>
