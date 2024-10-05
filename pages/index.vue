<script setup>
// 獲取待辦事項
const todos = ref([]);
const fetchAllTodo = async () => {
    const response = await $fetch('/api/todo/all', {
        method: 'GET'
    });
    if (response.statusCode === 200) {
        todos.value = response.data.map(todo => {
            return {
                ...todo,
                isCheck: false
            };
        });
    } else {
        todos.value = [];
        useNuxtApp().$toast.error('獲取待辦事項錯誤。');
    }
};
fetchAllTodo();

// 編輯項目
const isEditId = ref(''); // -1代表全部禁用
const itemEdit = (id = '') => {
    isEditId.value = id;
};

// 項目資料異動
const todoRemove = (id = '') => {
    todos.value = todos.value.filter(todo => todo._id !== id);
};
const todoUpdate = (id = '', newItem = {}) => {
    const matchTodoIndex = todos.value.findIndex(todo => todo._id === id);
    if (matchTodoIndex === -1) return;
    todos.value[matchTodoIndex] = { ...todos.value[matchTodoIndex], ...newItem };
};

// 項目勾選邏輯處理
const isExitChecked = computed(() => {
    const haveChecked = todos.value.findIndex(todo => todo.isCheck);
    return haveChecked !== -1;
});
const checkedAll = (checked = true) => {
    todos.value.forEach(todo => {
        todo.isCheck = checked;
    });
};
const checkedIds = computed(() => {
    return todos.value.filter(todo => todo.isCheck).map(item => item._id);
});
</script>

<template>
    <div class="max-w-5xl min-w-[576px] bg-white bg-opacity-70 p-5 rounded-2xl shadow-xl">
        <h1 class="text-6xl text-center">Todo List</h1>
        <AddTodo :class="[{ 'opacity-20 pointer-events-none': isEditId }]" @add-success="fetchAllTodo()" />
        <div v-show="todos.length && !isEditId" class="flex justify-between gap-2.5 mb-4">
            <ElementButton class="py-1.5 px-4 bg-primary-dark" @click="checkedAll(!isExitChecked)">
                {{ isExitChecked ? '取消全選' : '全選' }}
            </ElementButton>
            <BatchAction v-if="isExitChecked" :ids="checkedIds" @refresh="fetchAllTodo()" @edit-changed="itemEdit" />
        </div>
        <TodoItem
            v-for="todo in todos"
            :key="todo._id"
            :item="todo"
            :class="[{ 'opacity-20 pointer-events-none': isEditId && todo._id !== isEditId }]"
            @delete-success="todoRemove"
            @update-success="todoUpdate"
            @edit-changed="itemEdit"
        />
    </div>
</template>
