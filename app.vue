<script setup>
useHead({
    title: 'Nuxt - TodoList',
    meta: [{ name: 'description', content: 'use mongoose and nuxt.' }]
});
useSeoMeta({
    title: 'Nuxt - TodoList',
    ogTitle: 'Nuxt - TodoList',
    description: 'use mongoose and nuxt.',
    ogDescription: 'use mongoose and nuxt.',
    ogImage: 'https://images.unsplash.com/photo-1650735310415-392ab5378954',
    twitterCard: 'https://images.unsplash.com/photo-1650735310415-392ab5378954'
});
</script>
<template>
    <div class="app-bg-gradient p-2 md:p-10 min-h-dvh flex items-center justify-center">
        <NuxtPage />
    </div>
</template>

<style scoped>
.app-bg-gradient {
    background: linear-gradient(350deg, theme('colors.vueTheme.green') 25%, theme('colors.vueTheme.blue'));
}
</style>
