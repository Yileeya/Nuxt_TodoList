import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Vue3Toastify, {
        theme: 'colored',
        position: 'top-center',
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        transition: 'slide',
        dangerouslyHTMLString: true
    });

    return {
        provide: {
            toast
        }
    };
});
