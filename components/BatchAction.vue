<script setup>
const selectValue = ref(1);
const selectList = [
    {
        id: 1,
        name: '刪除'
    },
    {
        id: 2,
        name: '完成'
    },
    {
        id: 3,
        name: '未完成'
    }
];
</script>

<template>
    <div class="flex gap-2.5 items-stretch">
        <span class="text-lg leading-9">批次</span>
        <ElementSelect v-model="selectValue" class="px-2">
            <option v-for="option in selectList" :value="option.id">{{ option.name }}</option>
        </ElementSelect>
        <ElementButton class="py-1.5 px-4 bg-primary-dark">確定</ElementButton>
    </div>
</template>
