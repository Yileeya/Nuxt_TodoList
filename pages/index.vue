<script setup>
const todos = ref([]);
const fetchAllTodo = async () => {
    const response = await $fetch('/api/todo/all', {
        method: 'GET'
    });
    if (response.statusCode === 200) {
        todos.value = response.data.map((todo) => {
            return {
                ...todo,
                isCheck: false
            };
        });
    } else {
        todos.value = [];
    }
};
fetchAllTodo();

const todoRemove = (id = '') => {
    todos.value = todos.value.filter((todo) => todo._id !== id);
};
const todoUpdate = (id = '', newItem = {}) => {
    const matchTodoIndex = todos.value.findIndex((todo) => todo._id === id);
    if (matchTodoIndex === -1) return;
    todos.value[matchTodoIndex] = { ...todos.value[matchTodoIndex], ...newItem };
};

const isExitChecked = computed(() => {
    const haveChecked = todos.value.findIndex((todo) => todo.isCheck);
    return haveChecked !== -1;
});
const checkedAll = (checked = true) => {
    todos.value.forEach((todo) => {
        todo.isCheck = checked;
    });
};
const checkedIds = computed(() => {
    return todos.value.filter(todo => todo.isCheck).map(item => item._id)
});
</script>

<template>
    <div class="max-w-5xl min-w-[576px] bg-white bg-opacity-70 p-5 rounded-2xl shadow-xl">
        <h1 class="text-6xl text-center">Todo List</h1>
        <AddTodo @add-success="fetchAllTodo()" />
        <div class="flex justify-between gap-2.5 mb-4">
            <ElementButton class="py-1.5 px-4 bg-primary-dark" @click="checkedAll(!isExitChecked)">
                {{ isExitChecked ? '取消全選' : '全選' }}
            </ElementButton>
            <BatchAction v-if="isExitChecked" :ids="checkedIds" @refresh="fetchAllTodo()" />
        </div>
        <TodoItem
            v-for="todo in todos"
            :key="todo._id"
            :item="todo"
            @delete-success="todoRemove"
            @update-success="todoUpdate"
        />
    </div>
</template>
