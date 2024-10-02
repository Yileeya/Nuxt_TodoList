import Todo from '@/server/models/todoModel';
import { setResponse, handleError } from '@/server/utils/setResponse';

export default defineEventHandler(async event => {
    try {
        const body = await readBody(event);
        const ids = body.ids || [];
        if (!ids.length) {
            return setResponse(event, { statusCode: 400, message: '請選取項目。' });
        }

        await Todo.updateMany(
            { _id: { $in: ids } }, // 查詢條件：查找所有 ID 在傳入數組中的文檔
            { $set: { completed: body.completed } } // 更新內容：設置 completed 為傳入的值
        );

        return setResponse(event, { statusCode: 200, message: '修改成功！' });
    } catch (error) {
        return handleError(event, error);
    }
});
