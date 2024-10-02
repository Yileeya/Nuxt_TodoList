<script setup>
const newTodoItem = ref('');
const sending = ref(false);

const addTodo = async () => {
    if (!newTodoItem.value || sending.value) return;
    sending.value = true;
    const response = await $fetch('/api/todo/add', {
        method: 'POST',
        body: {
            text: newTodoItem.value
        }
    });
    if (response.statusCode === 200) {
        newTodoItem.value = '';
    }
    sending.value = false;
};
</script>

<template>
    <div class="flex gap-2.5 my-8">
        <ElementInput
            v-model="newTodoItem"
            class="flex-1 h-12"
            placeholder="新增待辦"
            :disabled="sending"
            @keydown.enter="addTodo()"
        />
        <ElementButton
            :disabled="!newTodoItem || sending"
            class="w-12 bg-primary-dark hover:rotate-90 transition-transform duration-300"
            @click="addTodo()"
        >
            <SvgAdd class="mx-auto duration-300" />
        </ElementButton>
    </div>
</template>
