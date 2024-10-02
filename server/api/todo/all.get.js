import Todo from '@/server/models/todoModel';
import { setResponse, handleError } from '@/server/utils/setResponse';

export default defineEventHandler(async event => {
    try {
        const items = await Todo.find().sort({ completed: 1, createdAt: -1 });
        return setResponse(event, { statusCode: 200, message: '獲取清單成功。', data: items });
    } catch (error) {
        return handleError(event, error);
    }
});
