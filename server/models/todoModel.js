import mongoose from 'mongoose';

// 建立 Schema
const todoSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, '此欄位必填。'],
            trim: true,
            maxlength: [50, '不可輸入超過50個字。']
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    { versionKey: false } // 禁止自動加入 __v 欄位
);

// 建立 Model
const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
