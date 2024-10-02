import Todo from '@/server/models/todoModel';
import { setResponse, handleError } from '@/server/utils/setResponse';

export default defineEventHandler(async event => {
    try {
        const { text } = await readBody(event);
        await Todo.create({ text });
        return setResponse(event, { statusCode: 200, message: '新增成功！' });
    } catch (error) {
        return handleError(event, error);
    }
});
