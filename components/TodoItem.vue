<script setup>
import { handleErrorResponse } from '@/utils/responseHandler.js';

const props = defineProps({
    item: {
        type: Object,
        required: true,
        default: () => ({
            _id: '',
            completed: false,
            text: '',
            isCheck: false
        })
    }
});
const emit = defineEmits(['deleteSuccess', 'updateSuccess', 'editChanged']);

const newInputValue = ref('');

// 編輯模式處理
const isEdit = ref(false);
const openEditMode = () => {
    isEdit.value = true;
    newInputValue.value = props.item?.text || '';
    emit('editChanged', props.item._id);
};
const closeEditMode = () => {
    isEdit.value = false;
    emit('editChanged', '');
};

const sending = ref(false);
// 編輯項目
const updateTodoText = async () => {
    const id = props.item._id;
    if (!id) return;
    sending.value = true;
    try {
        const response = await $fetch(`/api/todo/${id}`, {
            method: 'PUT',
            body: { text: newInputValue.value }
        });
        if (response.statusCode === 200) {
            closeEditMode();
            emit('updateSuccess', id, { ...props.item, text: newInputValue.value });
            useNuxtApp().$toast.success(response.message);
        }
    } catch (err) {
        handleErrorResponse(err);
    }
    sending.value = false;
};

// 刪除項目
const deleteTodo = async (id = '') => {
    if (!id) return;
    sending.value = true;
    try {
        const response = await $fetch(`/api/todo/batchDelete`, {
            method: 'DELETE',
            body: {
                ids: [id]
            }
        });
        if (response.statusCode === 200) {
            emit('deleteSuccess', id);
            useNuxtApp().$toast.success(response.message);
        }
    } catch (err) {
        handleErrorResponse(err);
    }
    sending.value = false;
};

// 完成、未完成項目
const changeCompleted = async (id = '', completed = false) => {
    if (!id) return;
    sending.value = true;
    try {
        const response = await $fetch(`/api/todo/batchCompleted`, {
            method: 'POST',
            body: {
                ids: [id],
                completed: completed
            }
        });
        if (response.statusCode === 200) {
            useNuxtApp().$toast.success(response.message);
            emit('updateSuccess', id, { ...props.item, completed: completed });
        }
    } catch (err) {
        handleErrorResponse(err);
    }
    sending.value = false;
};

// 勾選邏輯處理
const checkedItem = () => {
    if (isEdit.value || sending.value) return;
    emit('updateSuccess', props.item._id, { ...props.item, isCheck: !props.item.isCheck });
};
</script>
<template>
    <div
        class="flex bg-white shadow p-2.5 min-h-[50px] items-center gap-2.5 my-2 rounded-sm cursor-default"
        :class="[{ 'hover:cursor-not-allowed': sending }]"
        @click.prevent="checkedItem()"
    >
        <template v-if="isEdit">
            <ElementInput
                v-model="newInputValue"
                class="flex-1 py-1.5"
                :disabled="sending"
                @keydown.enter="updateTodoText()"
            />
            <ElementButton
                class="p-1 bg-amber-500"
                :disabled="!newInputValue || sending"
                @click.stop="updateTodoText()"
            >
                <SvgSave />
            </ElementButton>
            <ElementButton class="p-1 bg-rose-600" :disabled="sending" @click.stop="closeEditMode()">
                <SvgCancel />
            </ElementButton>
        </template>
        <template v-else>
            <ElementCheckbox :model-value="item.isCheck" :id="item._id" :disabled="sending" />
            <span class="flex-1" :class="[{ 'line-through': item.completed }]">{{ item.text }}</span>
            <ElementButton
                v-if="item.completed"
                class="p-1 bg-gray-400"
                :disabled="sending"
                @click.stop="changeCompleted(item._id, false)"
            >
                <SvgUnChecked />
            </ElementButton>
            <ElementButton
                v-if="!item.completed"
                class="p-1 bg-green-600"
                :disabled="sending"
                @click.stop="changeCompleted(item._id, true)"
            >
                <SvgChecked />
            </ElementButton>
            <ElementButton
                v-if="!item.completed"
                class="p-1 bg-amber-500"
                :disabled="sending"
                @click.stop="openEditMode()"
            >
                <SvgEdit />
            </ElementButton>
            <ElementButton class="p-1 bg-rose-600" :disabled="sending" @click.stop="deleteTodo(item._id)">
                <SvgDelete />
            </ElementButton>
        </template>
    </div>
</template>
