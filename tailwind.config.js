/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue'
    ],
    theme: {
        extend: {
            colors: {
                current: 'currentColor',
                primary: {
                    light: '#E0FBFC',
                    DEFAULT: '#98C1D9',
                    dark: '#3D5A80'
                }
            }
        }
    },
    plugins: []
};
