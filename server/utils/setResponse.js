import { Error } from 'mongoose';

// error全域處理
const handleError = (event, error) => {
    // mongoose 驗證錯誤文字組合
    if (error instanceof Error.ValidationError) {
        const errorsMsg = Object.values(error.errors).map(err => err.message);
        return setResponse(event, { statusCode: 400, message: errorsMsg });
    }

    // 如果不是驗證錯誤，返回通用錯誤響應
    return setResponse(event, { statusCode: 500, message: '出現錯誤，請聯繫管理員。' });
};

// api 回傳訊息
const setResponse = (event, responseData) => {
    // 調整Headers的status code
    setResponseStatus(event, responseData.statusCode);
    return {
        ...responseData
    };
};

export { handleError, setResponse };
