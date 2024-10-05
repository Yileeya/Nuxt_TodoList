export const handleErrorResponse = error => {
    const errData = error.response._data;
    const errorMessages = errData.message || ['出現錯誤，請重新嘗試。'];
    useNuxtApp().$toast.error(errorMessages.join('，'));
};
