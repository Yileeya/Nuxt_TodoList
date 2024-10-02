import Todo from '@/server/models/todoModel';
import { setResponse, handleError } from '@/server/utils/setResponse';

export default defineEventHandler(async event => {
    try {
        const { id } = event.context.params;
        if (!id) {
            return setResponse(event, { statusCode: 400, message: '請選取項目。' });
        }
        const body = await readBody(event);
        await Todo.findByIdAndUpdate({ _id: id }, { text: body.text });
        return setResponse(event, { statusCode: 200, message: '更新成功！' });
    } catch (error) {
        return handleError(event, error);
    }
});
