<script setup>
const model = defineModel({
    default: ''
});
</script>

<template>
    <input
        v-model="model"
        class="p-2.5 outline-none border rounded border-solid border-slate-200 focus:border-primary-dark duration-100 disabled:cursor-not-allowed"
    />
</template>
