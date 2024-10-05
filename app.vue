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
