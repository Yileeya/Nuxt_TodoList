<script setup>
const model = defineModel({
    default: null
});
</script>

<template>
    <select
        v-model="model"
        class="outline-none border border-solid border-slate-200 focus:border-primary-dark duration-100 disabled:cursor-not-allowed"
    >
        <slot></slot>
    </select>
</template>
