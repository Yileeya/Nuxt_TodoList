<script setup>
const props = defineProps({
    ids: {
        type: Array,
        required: true,
        default: () => []
    }
});
const emit = defineEmits(['refresh']);

const selectValue = ref(1);
const selectList = [
    {
        id: 1,
        name: '刪除',
        action: () => batchDelete()
    },
    {
        id: 2,
        name: '完成',
        action: () => batchCompleted(true)
    },
    {
        id: 3,
        name: '未完成',
        action: () => batchCompleted(false)
    }
];

const sending = ref(false);
const submit = async () => {
    const match = selectList.find((select) => select.id === selectValue.value);
    sending.value = true;
    await match.action();
    sending.value = false;
};

const batchCompleted = async (completed = true) => {
    const response = await $fetch(`/api/todo/batchCompleted`, {
        method: 'POST',
        body: {
            ids: props.ids,
            completed: completed
        }
    });
    if (response.statusCode === 200) {
        alert(`${response.message}`);
        emit('refresh');
    } else {
        alert('失敗');
    }
};

const batchDelete = async () => {
    const response = await $fetch(`/api/todo/batchDelete`, {
        method: 'DELETE',
        body: {
            ids: props.ids
        }
    });
    if (response.statusCode === 200) {
        alert(`${response.message}`);
        emit('refresh');
    } else {
        alert('失敗');
    }
};
</script>

<template>
    <div class="flex gap-2.5 items-stretch">
        <span class="text-lg leading-9">批次</span>
        <ElementSelect v-model="selectValue" class="px-2">
            <option v-for="option in selectList" :value="option.id">{{ option.name }}</option>
        </ElementSelect>
        <ElementButton class="py-1.5 px-4 bg-primary-dark" @click="submit()">確定</ElementButton>
    </div>
</template>
