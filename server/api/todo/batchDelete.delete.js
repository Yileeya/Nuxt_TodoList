import Todo from '@/server/models/todoModel';
import { setResponse, handleError } from '@/server/utils/setResponse';

export default defineEventHandler(async event => {
    try {
        const body = await readBody(event);
        const ids = body.ids || [];
        if (!ids.length) {
            return setResponse(event, { statusCode: 400, message: '請選取項目。' });
        }
        await Todo.deleteMany({ _id: { $in: ids } });
        return setResponse(event, { statusCode: 200, message: '刪除成功！' });
    } catch (error) {
        return handleError(event, error);
    }
});
