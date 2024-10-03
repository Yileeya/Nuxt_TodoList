<script setup>
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
const emit = defineEmits(['textUpdate', 'deleteSuccess', 'updateSuccess']);

const newInputValue = ref('');

const isEdit = ref(false);
const openEditMode = () => {
    isEdit.value = true;
    newInputValue.value = props.item?.text || '';
};

const sending = ref(false);
const updateTodoText = async () => {
    const id = props.item._id;
    if (!id) return;
    sending.value = true;
    const response = await $fetch(`/api/todo/${id}`, {
        method: 'PUT',
        body: { text: newInputValue.value }
    });
    if (response.statusCode === 200) {
        alert(`${response.message}`);
        isEdit.value = false;
        //emit 更新數據
        emit('textUpdate', id, newInputValue.value);
    } else {
        alert('失敗');
    }
    sending.value = false;
};

const deleteTodo = async (id = '') => {
    if (!id) return;
    sending.value = true;
    const response = await $fetch(`/api/todo/batchDelete`, {
        method: 'DELETE',
        body: {
            ids: [id]
        }
    });
    if (response.statusCode === 200) {
        alert(`${response.message}`);
        emit('deleteSuccess', id);
    } else {
        alert('失敗');
    }
    sending.value = false;
};

const changeCompleted = async (id = '', completed = false) => {
    if (!id) return;
    sending.value = true;
    const response = await $fetch(`/api/todo/batchCompleted`, {
        method: 'POST',
        body: {
            ids: [id],
            completed: completed
        }
    });
    if (response.statusCode === 200) {
        alert(`${response.message}`);
        emit('updateSuccess', id, { ...props.item, completed: completed });
    } else {
        alert('失敗');
    }
    sending.value = false;
};
</script>
<template>
    <div
        class="flex bg-white p-2.5 min-h-[50px] items-center gap-2.5 my-2 cursor-default"
        :class="[{ 'opacity-50': item.completed }]"
    >
        <template v-if="isEdit">
            <ElementInput
                v-model="newInputValue"
                class="flex-1 py-1.5"
                :disabled="sending"
                @keydown.enter="updateTodoText()"
            />
            <ElementButton class="p-1 bg-amber-500" :disabled="sending" @click.stop="updateTodoText()">
                <SvgSave />
            </ElementButton>
            <ElementButton class="p-1 bg-rose-600" :disabled="sending" @click.stop="isEdit = false">
                <SvgCancel />
            </ElementButton>
        </template>
        <template v-else>
            <ElementCheckbox :id="item._id" v-model="item.isCheck" :disabled="sending" />
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
