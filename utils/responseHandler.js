export const handleResponse = (data, error) => {
    let success = false;
    let msg = '';
    if (data.value) {
        const { statusCode, message } = data.value;
        if (statusCode === 200) {
            useNuxtApp().$toast.success(message);
            success = true;
            msg = message;
        } else {
            useNuxtApp().$toast.error('出現錯誤，請重新嘗試。');
            msg = '出現錯誤，請重新嘗試。';
        }
    } else if (error.value) {
        const errorMessages = error.value.data.message || ['出現錯誤，請重新嘗試。'];
        useNuxtApp().$toast.error(errorMessages.join('，'));
        msg = errorMessages.join('，');
    }
    return {
        success: success,
        message: msg
    };
};
